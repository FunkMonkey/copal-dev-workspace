# dev-workspace

Workspace for dealing with multi package development

## Development

### Basic Setup

Developing multiple inter-connected modules with npm/node is a pain. Thus our setup is a little convoluted.

1. install yarn (faster than npm)
```
npm install yarn --global
```
2. Clone `dev-workspace` repository
3. Clone repositories into `dev-workspace/modules`
4. Install all dependencies (performs deduplication, as we have a lot of common dependencies)
```
yarn install
```
5. Symlink repositories / modules for easier development
 1. cut & paste the `node_modules` directories from `dev-workspace/node_modules/*my_module*` to `dev-workspace/modules/*my_module*`
 2. delete `dev-workspace/node_modules/*my_module*` (just contains copies anyway)
 3. create the symbolic links (currently needs admin privileges in Windows)
```
npm run dev:link
```

### Build & Run
