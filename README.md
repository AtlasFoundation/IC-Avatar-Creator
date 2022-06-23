# Avatar Creator For Internet Computer
We created this for the Supernova Hackathon, [read about our submission here](https://devpost.com/software/open-character-creator-minter)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
An open, collaborative and evolving character creator project for the open metaverse.

Want to contribute? Please check out the [issues](https://github.com/AtlasFoundation/AvatarCreator/issues), or submit a pull request.

# Quick Start
For Internet Computer support you will need to install dfx and run "dfx deploy" after installing node_modules but before running npm run dev. You can get more information on setting dfx up [here](https://internetcomputer.org/docs/current/developer-docs/ic-overview)

You will also need to download [Psychedelic Dab.js Package](https://github.com/Psychedelic/DAB-js#interaction-guide).

```
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
npm install
dfx deploy
npm run dev
```
## Interaction guide

To pull and install from @Psychedelic via the NPM CLI, you'll need:

### A Github account

A Github personal access token you can [create a personal acess token here](https://github.com/settings/tokens)
The personal access token with the correct scopes, **repo** and **read:packages** to be granted access to the [GitHub Package Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
Authentication via npm login, using your Github email for the username and the personal access token as your password:

Once you have those ready, run:
```
npm login --registry=https://npm.pkg.github.com --scope=@psychedelic
```
Note: *You only need to configure this once to install the package!*

On npm login provide your Github email as your username and the Personal access token as the password. You can also setup your npm global settings to fetch from the Github registry everytime it finds a @Psychdelic package, find the instructions here.

⚠️ Alternatively, a token could be passed to the .npmrc as //npm.pkg.github.com/:_authToken=xxxxxx but we'd like to keep it clean and tokenless.

## Setting up DAB-js in your project
First, you need to install the DAB-js npm package into your project.

You can do so from the command line:
```
npm install @psychedelic/dab-js@latest
```
Find more details about [installing dab jshere](https://github.com/Psychedelic/DAB-js/packages/987540)
