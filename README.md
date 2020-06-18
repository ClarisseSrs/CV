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

1. By pushing a commit to a Gitlab's hosted repository, `.gitlab-ci.yml` will trigger the CI and build/deploy your page.
2. Once the job done, your page will be found at <account_name>.gitlab.io/<project_name>

**Note:** Add `[ci skip]` in (one of) your commits' message to prevent the CI to run, usefull when you only want to update the Readme or push a non-tested feature on master.

**Note:** VueJS also published a guide to deploy VueJS sites to other platforms, checkout the [deployment](https://cli.vuejs.org/guide/deployment.html) documentation for other platforms or [the forked repo](https://github.com/webdevsuperfast/startbootstrap-resume-vue) which
deploy on GitHub pages.

## Customize
If you want to use this template as it and only import your data, please follow these steps:

* In `public/images` change the profile images and backgrounds.
* In `public/` change the favicon.
* In `public/` modify the `index.html` to display a message pointing to your ressources (in case of diisabled javascript).
* In `src/plugins/X` change data to match your's (if you add/remove languages, apply changes in `src/plugins/i18n.js` file).
* More personnal data should be changed in `src/components/About.vue` (socials and addresses).
* To customize 'tools and languages' icons, go to `src/coponents/Skills.vue` and change `toolsList` (if you add new icons here, don't forget to modify your libraries' imports in `main.js`).
* In `assets/scss/_variables_.scss` change 'primary' and 'secondary' colors to the ones suiting you.

## Features

1. Built with Bootstrap Vue and Font Awesome Vue.
2. No jQuery dependency.

## Todos

* handle multiple languages in projects part.
* remove hackfix nav padding.

## Credits

* [i18n](https://kazupon.github.io/vue-i18n/introduction.html) for internationalization
* [Wikipedia](https://fr.wikipedia.org/) for the skill details information
* [Pexels](https://www.pexels.com) for background images
* [Pixabay](https://pixabay.com) for background images
* [SVG-Porn](https://github.com/gilbarbara/logos)
* [Webdevsuperfast](https://github.com/webdevsuperfast/startbootstrap-resume-vue)
* [StartBootstrap Resume](https://github.com/BlackrockDigital/startbootstrap-resume)
* [Bootstrap Vue](https://bootstrap-vue.js.org/)
* [Font Awesome Vue](https://github.com/FortAwesome/vue-fontawesome)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)