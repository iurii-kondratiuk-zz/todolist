import { combineReducers } from 'redux';

import fetching from './fetching';
import todos from './todos';

const rootReducer = combineReducers({
	fetching,
  todos,
});

export default rootReducer;
