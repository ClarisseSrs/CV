# Introduction

This is a Bootstrap/Vue resume forked from [webdevsuperfast](https://github.com/webdevsuperfast/startbootstrap-resume-vue) github

## Building from Source

1. Install [Git](https://git-scm.com/).
2. Clone or download the repository to your local machine.
3. Install [Node](https://nodejs.org/en/).
4. Install [Yarn](https://yarnpkg.org).
5. Install Vue CLI globally, `yarn global add @vue/cli` or `npm i -g @vue/cli`.
6. Run `yarn install` to install dependencies through terminal/CLI program.
7. Run `yarn run serve` through your favorite CLI program.

 **Note:** I suggest using package manager to install Git, Node and Yarn. You can use [Homebrew](httsp://brew.sh) if you're on a Mac or Linux/WSL, [Scoop](https://scoop.sh) or [Chocolatey](https://chocolatey.org/), [WinGet](https://docs.microsoft.com/en-us/windows/package-manager/) if you're on Windows.

## Deploying to Gitlab Pages

1. Pushing commits to a Gitlab's hosted repository `.gitlab-ci.yml` will trigger the CI and build/deploy your page.
2. Once the job done, your page will be found at <account_name>.gitlab.io/<project_name>

**Note:** Add `[ci skip]` in (one of) your commit message to prevent the CI to run, usefull when you only want to update the Readme or push a non-tested feature.


**Note:** VueJS also published a guide to deploy VueJS sites to other platforms, checkout the [deployment](https://cli.vuejs.org/guide/deployment.html) documentation for other platforms or [the forked repo](https://github.com/webdevsuperfast/startbootstrap-resume-vue) which
deploy on GitHub pages.

## Features

1. Built with Bootstrap Vue and Font Awesome Vue.
2. No jQuery dependency.

## Todos

* export data in external db file
* Readme in Asciidoctor
* handle multiple languages : all labels should be exported from Vue-data + add a language button selection
* use Vuex to handle properly multy context information (theme, langue, technologies, etc.) with store.

## Credits

* [Wikipedia](https://fr.wikipedia.org/) for the skill details information
* [Pexels](https://www.pexels.com) for background images
* [Pixabay](https://pixabay.com) for background images
* [SVG-Porn](https://github.com/gilbarbara/logos)
* [Webdevsuperfast](https://github.com/webdevsuperfast/startbootstrap-resume-vue)
* [StartBootstrap Resume](https://github.com/BlackrockDigital/startbootstrap-resume)
* [Bootstrap Vue](https://bootstrap-vue.js.org/)
* [Font Awesome Vue](https://github.com/FortAwesome/vue-fontawesome)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)