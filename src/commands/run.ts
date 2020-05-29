import {Command, flags} from '@oclif/command'
import {existsSync, readFileSync} from 'fs'
import cli from 'cli-ux'
import {RunspaceRuntime} from '@runspace/runtime'

export default class Run extends Command {
  static description = 'runs runspace function locally';

  static examples = [
    `$ runspace run examples/functions/hello.js
{ log: '', data: [ 'Hello, World!' ] }
running... done
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  };

  static args = [{name: 'file'}];

  async run() {
    const {args} = this.parse(Run)
    if (!args.file) {
      cli.error('File is not specified')
    }
    if (!existsSync(args.file)) {
      cli.error('File not found')
    }
    const runtime = new RunspaceRuntime({})
    try {
      cli.action.start('running', '⏳', {stdout: true})
      // eslint-disable-next-line no-console
      console.log(await runtime.runScript(readFileSync(args.file).toString()))
      cli.action.stop('done ✅')
    } catch (error) {
      cli.action.stop('error ❌')
      cli.error(error)
    }
    cli.action.stop('done ✅')
  }
}
