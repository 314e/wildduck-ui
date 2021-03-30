<p align="center">
    <img src="./src/assets/icons/wildduck.png" alt="WildDuck UI logo" />
</p>

<p align="center">
  <strong>Administrative UI for WildDuck IMAP server</strong>
</p>

<h3 align="center">
  <a href="./CONTRIBUTING.md">Contribute</a>
  <span> · </span>
  <a href="./CODE_OF_CONDUCT.md">Code of Conduct</a>
  <span> · </span>
  <a href="./CHANGELOG.md">Change Log</a>
</h3>

## Setup

```js
git clone git@github.com:softwareartistry/wildduck-ui.git

cd wildduck-ui

npm run project:init

```

### Dev Server

`npm run dev`

<http://localhost:3000/>

### Pre-requisite

-   Need IMAP Server endpoint to make API calls
-   Access Token

    -   You can find accessToken that is setup in your server, which locates in `/opt/wildduck/config/api.toml`
    -   If accessToken is commentend please uncomment and set secure accessToken, example

    ```toml
    # If set requires all API calls to have accessToken query argument with that value

    #accessToken="somesecretvalue"

    accessToken="somesecretvalue"
    ```

### Project structure

We are maintaining two git repositories for this project

-   [wildduck-ui](https://github.com/softwareartistry/wildduck-ui): Main project which contains react components
-   [wildduck-redux](https://github.com/softwareartistry/wildduck-redux): Redux state and API to support wildduck IMAP
    server

### Tech Stack

-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [React Query](https://react-query.tanstack.com/)
-   [KeaJS](https://kea.js.org/)
-   [Ant Design](https://ant.design/)
-   Open Api ( [_@openapitools/openapi-generator-cli_](https://github.com/OpenAPITools/openapi-generator-cli) to
    generate API's from https://docs.wildduck.email/api/openapi.yml)

### Pull Requests / Creating of branch

-   `if there are changes related to redux or api support, create branch in submodule/wildduck-redux and commit these changes before committing main branch`

-   `Please keep same branch name in main project as well as in submoules/wildduck-redux`

-   `first commit and push changes if there any in submodules/wildduck-redux`

-   `don't forget to add and commit submodules/wildduck-redux from main project`

-   `if there is no changes related to redux state or api support, no need of creating a branch in submodules/wildduck-redux, creating in main project enough for your changes`

submodules/wildduck-redux

```shell
    git add [files]
    git commit -m 'your commit message'
    git push <branch_name>
```

wildduck-ui

```shell
   git add submodules/wildduck-redux
   git add [files]
   git commit -m 'your commit message'
   git push <branch_name>
```

## Contributions

Project is open to contributions, but I recommend creating an issue or replying in a comment to let me know what you are
working on first that way we don't overwrite each other.

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on this project.

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details on our code of conduct.
