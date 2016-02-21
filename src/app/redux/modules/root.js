import { combineReducers } from 'redux';
import greeting from './greeting';
import partnerAreas from './partnerAreas';
import tradeData from './tradeData';
import tradeRegimes from './tradeRegimes';

export default combineReducers({
  greeting,
  partnerAreas,
  tradeData,
  tradeRegimes
});
