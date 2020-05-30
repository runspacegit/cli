/* eslint-disable no-process-exit */
import pm2 from 'pm2'
import {Command} from '@oclif/command'
import cli from 'cli-ux'
import path from 'path'

export default class Start extends Command {
  static description = 'starts daemon';

  static examples = [
    `$ runspace daemon:runner:start
Starting daemon in the background... ✅`,
    `$ runspace daemon:runner:start
Starting daemon in the background... ❌`,
  ];

  async run() {
    cli.prideAction.start('Starting daemon in the background', '⏳')
    pm2.connect(true, (err): void => {
      if (err !== null) cli.error(err)
      cli.prideAction.start('Starting daemon in the background', '⏳ connected to pm2')
    })

    pm2.start({
      name: 'runspace-daemon',
      script: process.argv[0],
      args: [
        path.join(__dirname, '..', '..', '..', '..', 'bin', 'run'),
        'daemon',
      ],
    }, function (err) {
      pm2.disconnect()
      if (err) {
        cli.prideAction.stop('❌')
        cli.error(err)
      }
      cli.prideAction.stop('✅')
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit()
    })
  }
}
