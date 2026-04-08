# edumeet-common

Common shared library for the [eduMEET](https://github.com/edumeet) project. Used by [edumeet-room-server](https://github.com/edumeet/edumeet-room-server) and [edumeet-media-node](https://github.com/edumeet/edumeet-media-node).

## Usage

This package is consumed as a Git dependency:

```json
"edumeet-common": "github:edumeet/edumeet-common#0.7.0"
```

## Development

This project uses Yarn 4 via Corepack.

```bash
$ corepack enable
$ yarn install
$ yarn build
```

## Building from source

```bash
$ corepack enable
$ yarn install --immutable
$ yarn build
```

The compiled output is in the `lib/` directory.

## License

MIT
