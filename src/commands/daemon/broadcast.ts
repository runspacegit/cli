import {Command, flags} from '@oclif/command'
import {createDaemon} from '../../create'
import {existsSync, readFileSync} from 'fs'
import {cli} from 'cli-ux'
import {Network} from 'ataraxia'
import {Services} from 'ataraxia-services'
import {Daemon} from '@runspace/daemon/dist/daemon'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default class Start extends Command {
  static description = 'broadcasts runspace daemon script inside network';

  static examples = [
    '$ runspace daemon:broadcast ./examples/functions/hello.js',
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
    let net: Network
    let services: Services
    let daemon: Daemon

    try {
      const runspace = await createDaemon()
      net = runspace.net
      services = runspace.services
      daemon = runspace.daemon
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
    try {
      cli.log('Waiting 10 seconds')
      await delay(10000)
      await daemon.broadcastRawFunction(readFileSync(args.file).toString())
      cli.prideAction.start('Waiting for the events', 'use Ctrl+C to exit')
    } catch (error) {
      cli.error(error)
    }
  }
}
