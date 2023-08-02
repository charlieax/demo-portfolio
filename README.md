#Demo Portfolio

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/charlieax/demo-portfolio)

This is a demo portfolio for everything Charlie Axtell. It is available to view [here](https://charlie.axtell.cloud).

#### About

![Example GIF][example-gif]

It is currently just a tech demo of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). The following are part of the roadmap:

- [x] Conway's Game of Life
- [ ] Portfolio Home Page
- [ ] Authentication to allow users to save progress
- [ ] Marketplace of interesting boards
- [ ] Variable board sizes

#### Technologies

It is built with the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [SST](https://serverless-stack.com/)
- [OpenNext](https://open-next.js.org/)
- [Material UI](https://mui.com/)
- [AWS](https://aws.amazon.com/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Husky](https://typicode.github.io/husky/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Commitlint](https://commitlint.js.org/)

#### Getting Started

1. Run `yarn install` to install all dependencies.
2. Run `source scripts/aws-session.sh` to setup your AWS credentials.
3. Run `yarn dev:api` to start the API server.
4. Run `yarn dev:web` to start the web app.

#### Testing

The unit tests run locally on commit. To run these manually run the following command to run both the api and web app unit tests:

- `yarn test`

#### Deployment

To build and deploy the app run the following command:

- `yarn sst:deploy --stage production`

#### Commit messages

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: The Jira ticket number. For example asc-123.
  │
  └─⫸ Commit Type: build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test
```

- **build**: Changes that affect the build system
- **chore**: Changes that do not relate to a fix or feature and don't modify src or test files
- **ci**: Reserved for changes from GitHub
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Undoes an earlier change
- **style**: A code change that only affects code formatting
- **test**: Adding missing tests or correcting existing tests

[example-gif]: https://github.com/charlieax/demo-portfolio/raw/main/packages/web/public/example.gif 'Example GIF'
