import {Command, flags} from '@oclif/command'
import {Network, AnonymousAuth} from 'ataraxia'
import {TCPTransport, TCPPeerMDNSDiscovery} from 'ataraxia-tcp'
import {WebSocketServerTransport} from 'ataraxia-ws-server'
import {MachineLocalTransport} from 'ataraxia-local'
import {Services} from 'ataraxia-services'
import {ConfigUtil} from '@runspace/daemon/dist/utils/config'
import {Daemon} from '@runspace/daemon/dist/daemon'
import {cli} from 'cli-ux'
import {existsSync, readFileSync} from 'fs'
import winston, {createLogger} from 'winston'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default class Start extends Command {
  static description = 'broadcasts runspace daemon script inside network';

  static examples = [
    '$ runspace daemon broadcast ./examples/functions/hello.js',
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  };

  static args = [{name: 'file'}];

  async run() {
    const {args} = this.parse(Start)
    if (!args.file) {
      cli.error('File is not specified')
    }
    if (!existsSync(args.file)) {
      cli.error('File not found')
    }
    cli.prideAction.start('Running...')
    const configUtil = new ConfigUtil()
    await configUtil.bootstap()
    const logger = createLogger({
      transports: [
        new winston.transports.Console(),
      ],
    })
    const net = new Network({
      name: configUtil.config.network.name,
      authentication: [new AnonymousAuth()],
    })
    const services = new Services(net)
    const local = new MachineLocalTransport()
    local.onLeader(() => {
      cli.info('This node is leader')
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
    try {
      await net.start()
      cli.info('Network started')
    } catch (error) {
      cli.error(error)
    }
    try {
      await services.start()
      cli.info('Services started')
    } catch (error) {
      cli.error(error)
    }
    process.on('SIGINT', async () => {
      cli.prideAction.start('Closing network and exiting')
      await services.stop()
      await net.stop()
      cli.prideAction.stop('stopped')
      // eslint-disable-next-line no-process-exit
      process.exit()
    })
    try {
      const daemon = new Daemon(net, configUtil, logger)
      cli.log('Waiting 10 seconds')
      await delay(10000)
      await daemon.broadcastRawFunction(readFileSync(args.file).toString())
      cli.prideAction.start('Waiting for the events', 'use Ctrl+C to exit')
    } catch (error) {
      cli.error(error)
    }
  }
}
