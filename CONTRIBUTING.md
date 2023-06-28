# Contributing
Below are a few guidelines that should help you prepare if you want to contribute to the Edumeet project.

## Reach out

Before you start to code, create an issue describing what you want to do. Perhaps someone else is already doing similar work. Or perhaps the topic of interest has already been discussed and rejected for a reason. The maintainers will point you in the right direction.

## Development

The following steps will get you setup to contribute changes to this repo:

1. Fork this repo.

2. Clone your forked repo: `git clone git@github.com:{your_username}/edumeet-common.git`

3. Run `yarn install` to install dependencies.

4. You should probably get your IDE working with our eslint config. This is an example of `.vscode/settings.json` and it's how I, [pnts-se](https://github.com/pnts-se), personally get it to work on Vscode.

    ```json
    {
      "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
      ],
      "eslint.format.enable": true,
      "editor.defaultFormatter": "dbaeumer.vscode-eslint",
      "editor.formatOnSave": true,
      "editor.formatOnSaveMode": "modifications",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      },
      "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
      },
    }
    ```
5. Create pull request to the main branch of edumeet-common.
### Git hooks
We're using husky git-hooks. When you do a commit, it will run `yarn build`. If new content was generated to `./lib` you have to commit that as well.

### Commands
**`yarn test`**

- runs all Jest unit tests

**`yarn test:coverage`**

- export unit-test coverage

### Tests

The Edumeet project uses Jest for testing. After implementing your contribution, write tests for it. Just create a new file under `__tests__/` or add additional tests to the appropriate existing file. Update existing tests if your changes require it.

### Documentation

Our documentation lives in README.md. Be sure to document any changes you implement.

## License

By contributing your code to the Edumeet GitHub repository, you agree to
license your contribution under the MIT license.

## Acknowledgement

Inspiration to this document taken from the Zod project.
https://github.com/colinhacks/zod/blob/master/CONTRIBUTING.md
