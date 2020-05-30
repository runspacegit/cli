import {Command} from '@oclif/command'
import {createDaemon} from '../../create'
import {cli} from 'cli-ux'
import {Network} from 'ataraxia'
import {Services} from 'ataraxia-services'
// import {Daemon} from '@runspace/daemon/dist/daemon'

export default class DaemonRunner extends Command {
  static description = 'starts daemon';

  static examples = [
    '$ runspace daemon',
  ];

  async run() {
    cli.prideAction.start('Starting', 'daemon')
    let net: Network
    let services: Services
    // let daemon: Daemon

    try {
      const runspace = await createDaemon()
      net = runspace.net
      services = runspace.services
    //   daemon = runspace.daemon
    } catch (error) {
      cli.error('Error creating the network, are you sure that another daemon is not running? \n' + error)
    }

    cli.prideAction.start('Running', 'Press Ctrl+C to safe exit')
    process.on('SIGINT', async () => {
      cli.prideAction.start('Closing network and exiting')
      await services.stop()
      await net.stop()
      cli.prideAction.stop('stopped')
      // eslint-disable-next-line no-process-exit
      process.exit()
    })
  }
}
