import pm2 from 'pm2'
import {Command} from '@oclif/command'
import cli from 'cli-ux'

export default class List extends Command {
  static description = 'shows daemon status';

  static examples = [
    `$ runspace daemon:runner
⛓ Runspace Daemon Process List
Name               Status  User 
runspace-daemon    stopped 0x77 
    `,
  ];

  async run() {
    pm2.connect(true, (err): void => {
      if (err !== null) cli.error(err)
    })

    pm2.list((err, processes): void => {
      if (err !== null) cli.error(err)
      cli.info('⛓', 'Runspace Daemon Processes List')
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      cli.table(processes.filter(process => process.name?.includes('runspace')), {name: {}, status: {header: 'Status', get: row => row.pm2_env?.status}, username: {header: 'User', get: row => row.pm2_env?.username}})
      pm2.disconnect()
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit()
    })
  }
}
