import assert from 'assert';
import tradeRegimesReducer, { TRADE_REGIMES_SUCCESS } from './tradeRegimes';

describe('app/redux/modules/tradeRegimes', () => {
  describe('tradeRegimesReducer', () => {
    it('should return incoming state if it does not handle action.type', () => {
      const inState = 'test.inState';
      const action = { type: 'UNHANDLED_ACTION' };

      const actual = tradeRegimesReducer(inState, action);
      const expected = 'test.inState';

      assert.equal(
        actual,
        expected,
        'incoming state is returned as next state for unhandled action'
      );
    });

    it('should set default state', () => {
      const actual = tradeRegimesReducer(undefined, {});
      const expected = {
        isFetching: false,
        dataset: []
      };

      assert.deepEqual(actual, expected, 'tradeRegimes is defaulted');
    });

    it('should handle TRADE_REGIMES_SUCCESS', () => {
      const inState = { isFetching: true, dataset: 'test.oldDataset' };
      const action = {
        type: TRADE_REGIMES_SUCCESS,
        payload: {
          lastUpdated: 'test.lastUpdated',
          dataset: 'test.newDataset'
        }
      };

      const actual = tradeRegimesReducer(inState, action);
      const expected = {
        isFetching: false, // isFetching becomes false after success
        lastUpdated: 'test.lastUpdated',
        dataset: 'test.newDataset'
      };

      assert.deepEqual(actual, expected, 'updates tradeRegimes state with received action data');
    });
  });
});
