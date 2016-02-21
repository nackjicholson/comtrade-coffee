import assert from 'assert';
import nock from 'nock';
import comtrade from './comtrade';

describe('app/services/comtrade', () => {
  describe('get', () => {
    it('should apply parameters to comtrade data api request for coffee', (done) => {
      const coffeeData = { validation: 'test.validation', dataset: 'test.dataset' };

      nock('http://comtrade.un.org')
        .get('/api/get')
        .query({
          max: '50000',
          type: 'C',
          freq: 'A',
          px: 'HS',
          cc: '09', // coffee buzz buzz!
          fmt: 'json',
          ps: '2015',
          r: 'all',
          p: 'test.partnerArea', // from parameters
          rg: 'test.tradeRegime' // from parameters
        })
        .reply(200, coffeeData);

      const parameters = {
        partnerArea: 'test.partnerArea',
        tradeRegime: 'test.tradeRegime'
      };

      comtrade
        .get(parameters)
        .then((actual) => {
          assert.deepEqual(actual, coffeeData, 'returns json parsed coffee data');
        })
        .then(done, done);
    });
  });
});
