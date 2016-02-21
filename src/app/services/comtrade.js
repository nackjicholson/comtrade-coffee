import fetch from 'isomorphic-fetch';
import partnerAreas from './partnerAreas.json';
import tradeRegimes from './tradeRegimes.json';

const comtrade = {
  get(parameters) {
    // jscs:disable maximumLineLength
    return fetch(`http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&cc=09&fmt=json&ps=2015&r=all&p=${parameters.partnerArea}&rg=${parameters.tradeRegime}`)
      .then(req => req.json());
  },

  partnerAreas() {
    // Wasn't able to load this cross origin
    // Hacking it to load from a JSON file. But still adhere to Promise API

    // return fetch(`http://comtrade.un.org/data/cache/partnerAreas.json`)
    //  .then(req => req.json());

    return Promise.resolve(partnerAreas);
  },

  tradeRegimes() {
    // Wasn't able to load this cross origin
    // Hacking it to load from a JSON file. But still adhere to Promise API

    // return fetch(`http://comtrade.un.org/data/cache/tradeRegimes.json`)
    //  .then(req => req.json());

    return Promise.resolve(tradeRegimes);
  }
};

export default comtrade;
