@runspace/cli
=============

Runspace daemon cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@runspace/cli.svg)](https://npmjs.org/package/@runspace/cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/12024b4af777d8de8deb/maintainability)](https://codeclimate.com/github/runspacegit/cli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/12024b4af777d8de8deb/test_coverage)](https://codeclimate.com/github/runspacegit/cli/test_coverage)
[![Downloads/week](https://img.shields.io/npm/dw/@runspace/cli.svg)](https://npmjs.org/package/@runspace/cli)
[![License](https://img.shields.io/npm/l/@runspace/cli.svg)](https://github.com/runspacegit/cli/blob/master/package.json)

[![asciicast](https://asciinema.org/a/335210.svg)](https://asciinema.org/a/335210)

## Installing
Using docker

```shell
$ docker run --net=host -it docker.pkg.github.com/runspacegit/cli/runspace-cli:latest bash
root@docker-desktop:/app# runspace help
```

Using local machine with Node.js

```shell
$ # lowdb types is missing some where, so its temproary solution.
$ yarn global add @types/lowdb @runspace/cli
$ # or using npm
$ npm i -g @types/lowdb @runspace/cli
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
@runspace/cli/0.1.5 darwin-x64 node-v12.16.3
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
* [`runspace daemon`](#runspace-daemon)
* [`runspace daemon:broadcast [FILE]`](#runspace-daemonbroadcast-file)
* [`runspace daemon:nodes`](#runspace-daemonnodes)
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

## `runspace daemon`

starts daemon

```
USAGE
  $ runspace daemon

EXAMPLE
  $ runspace daemon
```

_See code: [src/commands/daemon/index.ts](https://github.com/runspacegit/cli/blob/v0.1.5/src/commands/daemon/index.ts)_

## `runspace daemon:broadcast [FILE]`

broadcasts runspace daemon script inside network

```
USAGE
  $ runspace daemon:broadcast [FILE]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ runspace daemon:broadcast ./examples/functions/hello.js
```

_See code: [src/commands/daemon/broadcast.ts](https://github.com/runspacegit/cli/blob/v0.1.5/src/commands/daemon/broadcast.ts)_

## `runspace daemon:nodes`

discovers nodes

```
USAGE
  $ runspace daemon:nodes

EXAMPLE
  $ runspace daemon:nodes
```

_See code: [src/commands/daemon/nodes.ts](https://github.com/runspacegit/cli/blob/v0.1.5/src/commands/daemon/nodes.ts)_

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

_See code: [src/commands/run.ts](https://github.com/runspacegit/cli/blob/v0.1.5/src/commands/run.ts)_

## `runspace update [CHANNEL]`

update the runspace CLI

```
USAGE
  $ runspace update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
