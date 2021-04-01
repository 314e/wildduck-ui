# Contributing to WildDuck-UI

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

-   Reporting an issue
-   Discussing the current state of the code
-   Submitting a fix
-   Proposing new features

## Code of Conduct

The code of conduct is described in [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Our Development Process

All changes happen through pull requests. Pull requests are the best way to propose changes. We actively welcome your
pull requests and invite you to submit pull requests directly
<a href="https://github.com/softwareartistry/wildduck-ui/pulls">here</a>, and after review, these can be merged into the
project.

## Using the Project's Standard Commit Messages

This project is using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Please
follow these steps to ensure your commit messages are standardized:

1. Make sure your shell path is in the root of the project (not inside any of the packages).
2. Run `npm i`.
3. Stage the files you are commiting with `git add [files]`.
4. `git commit -m < you_message >`:
    1. Prefix commit message with `fix:` or `feat:` according to type of commit.
    2. Write a short, imperative tense description of the change.
    3. Provide a issue number if your're creating pull request related the specific issue

## Project structure

We have two repositories one for React and another for Redux state and API support

-   [wildduck-ui](https://github.com/softwareartistry/wildduck-ui): React
-   [wildduck-redux](https://github.com/softwareartistry/wildduck-ui): Redux and API support
-   wilddck-redux is added as a submodule in wildduck-ui repository

## Pull Requests

1. Fork the repo and create your branch (usually named `patch-%the number of PRs you've already made%`) from `staging`.
2. If you've added code that should be tested, add some test examples.
3. Ensure to describe your pull request.

### Creating a branch

-   `if there are changes related to redux or api support, create branch in submodule/wildduck-redux and commit these changes before committing main branch`

-   `Please keep same branch name in main project as well as in submoules/wildduck-redux`

-   `first commit and push changes if there any in submodules/wildduck-redux`

-   `don't forget to add and commit submodules/wildduck-redux from main project`

-   `if there is no changes related to redux state or api support, no need of creating a branch in submodules/wildduck-redux, creating in main project enough for your changes`

1. submodules/wildduck-redux

```shell
    git add [files]
    git commit -m 'your commit message'
    git push <branch_name>
```

2. wildduck-ui

```shell
   git add submodules/wildduck-redux
   git add [files]
   git commit -m 'your commit message'
   git push <branch_name>
```

## Quickstart Local Frontend Development

-   Run `npm run project:init`
-   Run `npm run dev`
-   [http://localhost:3000](http://locahost:3000)

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be
able to reproduce the issue. Report a bug by <a href="https://github.com/softwareartistry/wildduck-ui/pulls">opening a
new issue</a>; it's that easy!

## Frequently Asked Questions (FAQs)

<!--- I thought it would be great to have a list of FAQs for the project to help save time for new contributors--->

    - Q: [The Question?]
    - A: [The Answer!]

## Feature Request

Great Feature Requests tend to have:

-   A quick idea summary.
-   What & why you wanted to add the specific feature.
-   Additional context like images, links to resources to implement the feature etc, etc.

## License

By contributing to WildDuck Ui, you agree that your contributions will be licensed under the [LICENSE file](LICENSE).
