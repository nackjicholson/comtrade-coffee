import { combineReducers } from 'redux';
import partnerAreasReducer, {
  partnerAreasFailure,
  partnerAreasRequest,
  partnerAreasSuccess
} from './partnerAreas';
import tradeDataReducer, {
  tradeDataFailure,
  tradeDataRequest,
  tradeDataSuccess
} from './tradeData';
import tradeRegimesReducer, {
  tradeRegimesFailure,
  tradeRegimesRequest,
  tradeRegimesSuccess
} from './tradeRegimes';

// Actions

/**
 * Async action which manages loading of initial app data.
 *
 * @param comtrade
 * @param parameters
 * @returns {Function}
 */
export function appInit(comtrade, parameters) {
  return (dispatch) => {
    dispatch(partnerAreasRequest());
    dispatch(tradeRegimesRequest());
    dispatch(tradeDataRequest());

    function handleInitSuccess(values) {
      const [
        partnerAreas,
        tradeRegimes,
        tradeData
      ] = values;

      dispatch(partnerAreasSuccess(partnerAreas));
      dispatch(tradeRegimesSuccess(tradeRegimes));
      dispatch(tradeDataSuccess(tradeData));
    }

    function handleInitFailure(err) {
      dispatch(partnerAreasFailure(err));
      dispatch(tradeRegimesFailure(err));
      dispatch(tradeDataFailure(err));
    }

    return Promise.all([
      comtrade.partnerAreas(),
      comtrade.tradeRegimes(),
      comtrade.get(parameters)
    ]).then(handleInitSuccess, handleInitFailure);
  };
}

export default combineReducers({
  partnerAreas: partnerAreasReducer,
  tradeData: tradeDataReducer,
  tradeRegimes: tradeRegimesReducer
});
