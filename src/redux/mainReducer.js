import {combineReducers} from 'redux';
import rootReducer from '../containers/redux/reducer';

//@BlueprintReduxImportInsertion

export const combinedReducers = combineReducers({rootReducer});
