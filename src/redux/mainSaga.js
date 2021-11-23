import {all} from 'redux-saga/effects';
import AletheaSaga from '../containers/redux/sagas';

//@BlueprintReduxSagaImportInsertion

export function* mainSaga() {
  yield all([AletheaSaga]);
}
