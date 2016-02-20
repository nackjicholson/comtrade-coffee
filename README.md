# comtrade-coffee

> Sample usage of the comtrade UN database API

### Intro

This project is meant to be a small digestible example of how I might get started building a React/Redux application
from scratch. It is meant to show my comfort with that ecosystem, and usage of tools to help me build in that ecosystem
quickly. Much of the foundation of this app was generated with a yeoman generator that I use often when starting a new
project ([yo react-nack](https://github.com/nackjicholson/generator-react-nack).

The Application is a simple visualization based off of the [Comtrade UN Data API](http://comtrade.un.org/data/doc/api/).
It pulls information from that service about worldwide coffee trading. So far it allows you to pick a country that
you're interested in and view a visualization of who that country partners with in coffee trading, and allows you to
compare the USD amount and the Kg weight of those trades during 2015.

It's not much but it's a start.

### NPM Scripts Documentation

**Linting with Eslint**

Configured by default to use the "airbnb/base" eslint preset which provides 
a mostly sane set of rules for writing JavaScript, learn more [here](https://github.com/airbnb/javascript)

`$ npm run lint`

Will lint your code anytime a file changes in the `src` directory. Analyzes your code for adherence to
a [`jscs`](http://jscs.info/) code style specification. Uses the "airbnb" jscs preset.

**Tests with mocha**

`$ npm test`

Runs a test of your `src` code using mocha. Tests can be written using es2015 as well.

`$ npm run cov`

Produces an istanbul coverage report in the `coverage/` directory.

**Dev Mode**

`$ npm run tdd`

Run a file watcher to run the tests anytime a file in `src` is changed.

`$ npm run tdd:lint`

Run a file watcher which performs linting, code style checks, and tests anytime you save a file.

**Transpile to ES5 with Babel**

`$ npm run build`

Packages your library to an es5 commonjs module using webpack and places it in the `dist/` dir.

**Start the server**

`$ npm start`

**NOT IMPLEMENTED FULLY** Needs a build/devServer.js that can serve a bundle that pulls in the component and uses it.
Starts a webpack-dev-server that serves the `example/index.html`.
