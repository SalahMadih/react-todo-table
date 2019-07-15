import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import omit from 'lodash/omit';
import FirebaseHelper from '../../helpers/firebase';

const {
  database,
  rsfFirestore,
  processFireStoreCollection,
} = FirebaseHelper

const COLLECTION_NAME = 'users';
const ORDER_BY = 'id';
const ORDER = 'desc';

function* loadFromFirestore() {

  try {
    const collections = database
      .collection(COLLECTION_NAME)
      .where('deleted_at', '==', null)
      .orderBy(ORDER_BY, ORDER);
    const snapshot = yield call(rsfFirestore.getCollection, collections);
    let data = processFireStoreCollection(snapshot);
    yield put(actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }

}

function* storeIntoFirestore({ payload }) {
  const { data, actionName } = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          deleted_at: new Date().getTime(),
        });
        break;
      case 'update':
          yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
            ...omit(data, ['key']),
          });
        break;
      default:
        yield call(rsfFirestore.addDocument, COLLECTION_NAME, data);
        break;
    }
    yield put({ type: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error);
    yield put(actions.saveIntoFireStoreError(error));
  }

}

function* resetFireStoreDocuments() {
  console.log("I would reset from  firestore")
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}

