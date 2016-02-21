import assert from 'assert';
import partnerAreasReducer, { PARTNER_AREAS_SUCCESS } from './partnerAreas';

describe('app/redux/modules/partnerAreas', () => {
  describe('partnerAreasReducer', () => {
    it('should return incoming state if it does not handle action.type', () => {
      const inState = 'test.inState';
      const action = { type: 'UNHANDLED_ACTION' };

      const actual = partnerAreasReducer(inState, action);
      const expected = 'test.inState';

      assert.equal(
        actual,
        expected,
        'incoming state is returned as next state for unhandled action'
      );
    });

    it('should set default state', () => {
      const actual = partnerAreasReducer(undefined, {});
      const expected = {
        isFetching: false,
        dataset: []
      };

      assert.deepEqual(actual, expected, 'partnerAreas is defaulted');
    });

    it('should handle PARTNER_AREAS_SUCCESS', () => {
      const inState = { isFetching: true, dataset: 'test.oldDataset' };
      const action = {
        type: PARTNER_AREAS_SUCCESS,
        payload: {
          lastUpdated: 'test.lastUpdated',
          dataset: 'test.newDataset'
        }
      };

      const actual = partnerAreasReducer(inState, action);
      const expected = {
        isFetching: false, // isFetching becomes false after success
        lastUpdated: 'test.lastUpdated',
        dataset: 'test.newDataset'
      };

      assert.deepEqual(actual, expected, 'updates partnerAreas state with received action data');
    });
  });
});
