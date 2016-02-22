# comtrade-coffee

> Sample usage of the comtrade UN database API

### Intro

This project is meant to be a small digestible example of how I might get started building a React/Redux application
from scratch. Much of the foundation of this app was generated with a yeoman generator that I use often when starting a new
project ([yo react-nack](https://github.com/nackjicholson/generator-react-nack).

The Application is a simple visualization based off of the [Comtrade UN Data API](http://comtrade.un.org/data/doc/api/).
It pulls information from that service about international coffee trade. So far it allows you to pick a country that
you're interested in and view a visualization which compares the USD to Kg weight of those trades during 2015.

### Install

You will need Node >= 4. I suggest you use [nvm](https://github.com/creationix/nvm) to manage your node version if
you're not already.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Close and open terminal, or `source ~/.nvm/nvm.sh`

```bash
# Install node 4 and update npm to 3+
nvm install 4
npm install -g npm

# get the code
cd ~/path/where/you/put/code/
git clone git@github.com:nackjicholson/comtrade-coffee.git
cd comtrade-coffee

# install dependencies (could take a while)
npm install

# start the webpack-dev-server
npm start
```

Open chrome to [http://localhost:3000](http://localhost:3000) to view the running application.
