@runspace/cli
=============

Runspace daemon cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@runspace/cli.svg)](https://npmjs.org/package/@runspace/cli)
[![Codecov](https://codecov.io/gh/runspacegit/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/runspacegit/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@runspace/cli.svg)](https://npmjs.org/package/@runspace/cli)
[![License](https://img.shields.io/npm/l/@runspace/cli.svg)](https://github.com/runspacegit/cli/blob/master/package.json)

## Installing
```shell
$ yarn global add @runspace/cli
$ # or using npm
$ npm i -g @runspace/cli
$ runspace help
```

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @runspace/cli
$ runspace COMMAND
running command...
$ runspace (-v|--version|version)
@runspace/cli/0.0.0 darwin-x64 node-v12.16.3
$ runspace --help [COMMAND]
USAGE
  $ runspace COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`runspace autocomplete [SHELL]`](#runspace-autocomplete-shell)
* [`runspace commands`](#runspace-commands)
* [`runspace help [COMMAND]`](#runspace-help-command)
* [`runspace run [FILE]`](#runspace-run-file)
* [`runspace update [CHANNEL]`](#runspace-update-channel)

## `runspace autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ runspace autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ runspace autocomplete
  $ runspace autocomplete bash
  $ runspace autocomplete zsh
  $ runspace autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `runspace commands`

list all the commands

```
USAGE
  $ runspace commands

OPTIONS
  -h, --help  show CLI help
  -j, --json  output in json format
  --hidden    also show hidden commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.2.3/src/commands/commands.ts)_

## `runspace help [COMMAND]`

display help for runspace

```
USAGE
  $ runspace help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_

## `runspace run [FILE]`

runs runspace function locally

```
USAGE
  $ runspace run [FILE]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ runspace run examples/functions/hello.js
  { log: '', data: [ 'Hello, World!' ] }
  running... done
```

_See code: [src/commands/run.ts](https://github.com/runspacegit/cli/blob/v0.0.0/src/commands/run.ts)_

## `runspace update [CHANNEL]`

update the runspace CLI

```
USAGE
  $ runspace update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
