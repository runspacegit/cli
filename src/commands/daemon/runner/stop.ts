/* eslint-disable no-process-exit */
import pm2 from 'pm2'
import {Command} from '@oclif/command'
import cli from 'cli-ux'

export default class Stop extends Command {
  static description = 'stops daemon';

  static examples = [
    `$ runspace daemon:runner:stop
Stopping background daemon... ✅`,
    `$ runspace daemon:runner:stop
Stopping background daemon... ❌`,
  ];

  async run() {
    cli.prideAction.start('Stopping background daemon', '⏳')
    pm2.connect(false, (err): void => {
      if (err !== null) cli.error(err)
      cli.prideAction.start('Stopping background daemon', '⏳ connected to pm2')
    })
    pm2.list((err, processes): void => {
      if (err !== null) cli.error(err)
      const [daemonProcess] = processes.filter(process => process.name === 'runspace-daemon')
      // eslint-disable-next-line no-negated-condition
      if (typeof daemonProcess === 'object') {
        pm2.delete('runspace-daemon', function (err) {
          if (err) {
            cli.prideAction.stop('❌')
            cli.error(err)
          }
          cli.prideAction.stop('✅')
          pm2.disconnect()
          // eslint-disable-next-line unicorn/no-process-exit
          process.exit()
        })
      } else {
        cli.prideAction.stop('not started yet ❓')
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit()
      }
    })
  }
}
