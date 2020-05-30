import {Network, AnonymousAuth} from 'ataraxia'
import {TCPTransport, TCPPeerMDNSDiscovery} from 'ataraxia-tcp'
import {MachineLocalTransport} from 'ataraxia-local'
import {Services} from 'ataraxia-services'
import {ConfigUtil} from '@runspace/daemon/dist/utils/config'
import {Daemon} from '@runspace/daemon/dist/daemon'
import {WebSocketServerTransport} from 'ataraxia-ws-server'
import winston, {createLogger} from 'winston'

export const createDaemon = async () => {
  const configUtil = new ConfigUtil()
  await configUtil.bootstap()
  const logger = createLogger({
    transports: [
      new winston.transports.Console({level: 'info'}),
    ],
  })
  const net = new Network({
    name: configUtil.config.network.name,
    authentication: [new AnonymousAuth()],
  })
  const services = new Services(net)
  const local = new MachineLocalTransport()
  local.onLeader(() => {
    net.addTransport(
      new TCPTransport({
        discovery: new TCPPeerMDNSDiscovery(),
      }),
    )
  })
  net.addTransport(
    new WebSocketServerTransport({
      port: configUtil.config.network.bridgePort || 65535,
    }),
  )
  net.addTransport(local)
  const daemon = new Daemon(net, configUtil, logger)
  await services.start()
  await net.start()
  return {net, daemon, services}
}
