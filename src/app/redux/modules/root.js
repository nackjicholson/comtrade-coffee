import { combineReducers } from 'redux';
import partnerAreas from './partnerAreas';
import tradeData from './tradeData/';
import tradeRegimes from './tradeRegimes';

export default combineReducers({
  partnerAreas,
  tradeData,
  tradeRegimes
});
