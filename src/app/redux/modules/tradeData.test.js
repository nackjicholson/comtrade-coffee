import assert from 'assert';
import tradeDataReducer, { TRADE_DATA_SUCCESS } from './tradeData';

describe('app/redux/modules/tradeData', () => {
  describe('tradeDataReducer', () => {
    it('should return incoming state if it does not handle action.type', () => {
      const inState = 'test.inState';
      const action = { type: 'UNHANDLED_ACTION' };

      const actual = tradeDataReducer(inState, action);
      const expected = 'test.inState';

      assert.equal(actual, expected, 'incoming state is returned as next state for unhandled action');
    });

    it('should set default state', () => {
      const actual = tradeDataReducer(undefined, {});
      const expected = {
        isFetching: false,
        dataset: []
      };

      assert.deepEqual(actual, expected, 'tradeData is defaulted');
    });


    it('should handle TRADE_DATA_SUCCESS', () => {
      const inState = { isFetching: true, dataset: 'test.oldDataset'}
      const action = {
        type: TRADE_DATA_SUCCESS,
        payload: {
          lastUpdated: 'test.lastUpdated',
          dataset: 'test.newDataset'
        }
      };

      const actual = tradeDataReducer(undefined, action);
      const expected = {
        isFetching: false, // isFetching becomes false after success
        lastUpdated: 'test.lastUpdated',
        dataset: 'test.newDataset'
      };

      assert.deepEqual(actual, expected, 'updates tradeData state with received action data');
    });
  });
});
