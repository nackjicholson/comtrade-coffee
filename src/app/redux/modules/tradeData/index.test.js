import assert from 'assert';
import { spy, stub, useFakeTimers } from 'sinon';
import
  tradeDataReducer,
{
  TRADE_DATA_FAILURE,
  TRADE_DATA_REQUEST,
  TRADE_DATA_SUCCESS,
  fetchTradeData
} from './';

describe('app/redux/modules/tradeData', () => {
  describe('fetchTradeData action', () => {
    it('should manage event dispatching for successful trade data requests', (done) => {
      // Using sinon fake timers to control the output of the date in the action
      // Forcing javascript's internal clock to produce midnight on christmas.
      const clock = useFakeTimers(new Date(2015, 11, 25).getTime());

      // The data comes in from the comtrade api with some validation data, which
      // will be ignored from the time being. The data relevant to the app, is the
      // data stored in the "dataset" field of the tradeData results.
      const comtradeData = {
        validation: 'test.validation',
        dataset: [
          { rtTitle: 'alpha', TradeValue: 1, TradeQuantity: 4 },
          { rtTitle: 'bravo', TradeValue: 2, TradeQuantity: 5 },
          { rtTitle: 'charlie', TradeValue: 3, TradeQuantity: 6 }
        ]
      };

      const comtrade = { get: stub() };
      const parameters = { tradeRegime: 'test.tradeRegime', partnerAreas: 'test.partnerAreas' };
      const dispatch = spy();

      const thunk = fetchTradeData(comtrade, parameters);

      comtrade.get.returns(Promise.resolve(comtradeData));

      // Execute the async action
      thunk(dispatch)
        .then(() => {
          // Assertions that the comtrade.get api is called correctly
          assert(comtrade.get.calledOnce, 'comtrade.get is called once');
          assert.equal(comtrade.get.args[0].length, 1, 'comtrade.get called with one argument');

          const actualGetArg = comtrade.get.args[0][0];
          assert.equal(actualGetArg, parameters, 'comtrade.get called with supplied parameters');

          // Assertions that TRADE_DATA_REQUEST and TRADE_DATA_SUCCESS actions are dispatched.
          assert(dispatch.calledTwice, 'dispatch is called twice');

          assert.equal(dispatch.args[0].length, 1, 'first dispatch call has one argument');

          const actualRequestAction = dispatch.args[0][0];
          const expectedRequestAction = { type: TRADE_DATA_REQUEST, payload: undefined };

          assert.deepEqual(
            actualRequestAction,
            expectedRequestAction,
            'TRADE_DATA_REQUEST action is dispatched'
          );

          assert.equal(dispatch.args[1].length, 1, 'second dispatch call has one argument');

          const actualSuccessAction = dispatch.args[1][0];
          const expectedSuccessAction = {
            type: TRADE_DATA_SUCCESS,
            payload: {
              data: {
                raw: comtradeData.dataset,
                quantityTreemap: [
                  { label: 'alpha', value: 4 },
                  { label: 'bravo', value: 5 },
                  { label: 'charlie', value: 6 }
                ],
                valueTreemap: [
                  { label: 'alpha', value: 1 },
                  { label: 'bravo', value: 2 },
                  { label: 'charlie', value: 3 }
                ]
              },
              lastUpdated: Date.now()
            }
          };

          assert.deepEqual(
            actualSuccessAction,
            expectedSuccessAction,
            'TRADE_DATA_SUCCESS action is dispatched'
          );
        })
        .then(() => clock.restore())
        .then(done, done);
    });

    it('should manage event dispatching for failed trade data requests', (done) => {
      const err = new Error('test.error');

      const comtrade = { get: stub() };
      const parameters = { tradeRegime: 'test.tradeRegime', partnerAreas: 'test.partnerAreas' };
      const dispatch = spy();

      const thunk = fetchTradeData(comtrade, parameters);

      comtrade.get.returns(Promise.reject(err));

      // Execute the async action
      thunk(dispatch)
        .then(() => {
          // Assertions that the comtrade.get api is called correctly
          assert(comtrade.get.calledOnce, 'comtrade.get is called once');
          assert.equal(comtrade.get.args[0].length, 1, 'comtrade.get called with one argument');

          const actualGetArg = comtrade.get.args[0][0];
          assert.equal(actualGetArg, parameters, 'comtrade.get called with supplied parameters');

          // Assertions that TRADE_DATA_REQUEST and TRADE_DATA_FAILURE actions are dispatched.
          assert(dispatch.calledTwice, 'dispatch is called twice');

          assert.equal(dispatch.args[0].length, 1, 'first dispatch call has one argument');

          const actualRequestAction = dispatch.args[0][0];
          const expectedRequestAction = { type: TRADE_DATA_REQUEST, payload: undefined };

          assert.deepEqual(
            actualRequestAction,
            expectedRequestAction,
            'TRADE_DATA_REQUEST action is dispatched'
          );

          assert.equal(dispatch.args[1].length, 1, 'second dispatch call has one argument');

          const actualFailureAction = dispatch.args[1][0];
          const expectedFailureAction = {
            type: TRADE_DATA_FAILURE,
            payload: err,
            error: true
          };

          assert.deepEqual(
            actualFailureAction,
            expectedFailureAction,
            'TRADE_DATA_FAILURE action is dispatched'
          );
        })
        .then(done, done);
    });
  });

  describe('tradeDataReducer', () => {
    it('should return incoming state if it does not handle action.type', () => {
      const inState = 'test.inState';
      const action = { type: 'UNHANDLED_ACTION' };

      const actual = tradeDataReducer(inState, action);
      const expected = 'test.inState';

      assert.equal(
        actual,
        expected,
        'incoming state is returned as next state for unhandled action'
      );
    });

    it('should set default state', () => {
      const actual = tradeDataReducer(undefined, {});
      const expected = {
        isFetching: false,
        data: {}
      };

      assert.deepEqual(actual, expected, 'tradeData is defaulted');
    });

    it('should handle TRADE_DATA_SUCCESS', () => {
      const inState = { isFetching: true, data: 'test.oldDataset' };
      const action = {
        type: TRADE_DATA_SUCCESS,
        payload: {
          lastUpdated: 'test.lastUpdated',
          data: 'test.newDataset'
        }
      };

      const actual = tradeDataReducer(inState, action);
      const expected = {
        isFetching: false, // isFetching becomes false after success
        lastUpdated: 'test.lastUpdated',
        data: 'test.newDataset'
      };

      assert.deepEqual(actual, expected, 'updates tradeData state with received action data');
    });
  });
});
