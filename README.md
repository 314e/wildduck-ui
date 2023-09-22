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
git clone https://github.com/softwareartistry/wildduck-ui.git

cd wildduck-ui
npm install --legacy-peer-deps
npm run dev

```

<strong> \* Note Currently project supports node version below or v14.16.0 </strong>

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

### Tech Stack

-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [React Query](https://react-query.tanstack.com/)
-   [KeaJS](https://kea.js.org/)
-   [Ant Design](https://ant.design/)
-   Open Api ( [_@openapitools/openapi-generator-cli_](https://github.com/OpenAPITools/openapi-generator-cli) to
    generate API's from https://docs.wildduck.email/api/openapi.yml)

wildduck-ui

```shell
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
