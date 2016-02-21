import tradeRegimesJSON from '../../services/tradeRegimes.json';

// Reducer
const defaultState = {
  results: tradeRegimesJSON.results,
  selectedId: 'all'
};

export default function tradeRegimesReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
