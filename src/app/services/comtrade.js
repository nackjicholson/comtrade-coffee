import fetch from 'isomorphic-fetch';

const comtrade = {
  get(parameters) {
    // jscs:disable maximumLineLength
    return fetch(`http://comtrade.un.org/api/get?max=50000&type=C&freq=A&px=HS&cc=09&fmt=json&ps=2015&r=all&p=${parameters.partnerArea}&rg=${parameters.tradeRegime}`)
      .then(req => req.json());
  }
};

export default comtrade;
