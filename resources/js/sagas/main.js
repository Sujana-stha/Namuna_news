import {all, fork} from 'redux-saga/effects';

//SAGA FILE
import * as loginSaga from './loginSaga';
import * as categorySaga from './categoriesSaga';
import * as languageSaga from './languagesSaga';

export default function* rootSaga() {
    yield all (
        [
            ...Object.values(loginSaga),
            ...Object.values(categorySaga),
            ...Object.values(languageSaga)
        ].map(fork)
    );
}