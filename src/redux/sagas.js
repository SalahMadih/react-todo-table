import { all } from 'redux-saga/effects';
import users from './users/sagas';


export default function* rootSaga(getState) {
    yield all([
      users(),
    ]);
  }
  