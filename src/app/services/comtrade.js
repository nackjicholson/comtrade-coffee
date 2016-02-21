import fetch from 'isomorphic-fetch';

const comtrade = {
  get(parameters) {
    return fetch(`http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&cc=09&fmt=json&ps=2015&r=all&p=${parameters.partnerArea}&rg=${parameters.tradeRegime}`)
      .then(req => req.json());
  },

  partnerAreas() {
    return fetch(`http://comtrade.un.org/data/cache/partnerAreas.json`)
      .then(req => req.json());
  },

  tradeRegimes() {
    return fetch(`http://comtrade.un.org/data/cache/tradeRegimes.json`)
      .then(req => req.json());
  }
};

export default comtrade;
