import {all, fork} from 'redux-saga/effects';

//SAGA FILE
import * as loginSaga from './loginSaga';
import * as categorySaga from './categoriesSaga';
import * as languageSaga from './languagesSaga';
import * as newsSaga from './newsSaga';
import * as newsTransSaga from './newsTrans-saga';
import * as categoryTransSaga from './categoriesTrans-saga';
import * as provinceSaga from './provincesSaga';
import * as provinceTransSaga from './provinceTrans-saga';
import * as resourceSaga from './resourcesSaga';
import * as resourceTransSaga from './resourceTrans-saga'

export default function* rootSaga() {
    yield all (
        [
            ...Object.values(loginSaga),
            ...Object.values(categorySaga),
            ...Object.values(languageSaga),
            ...Object.values(newsSaga),
            ...Object.values(newsTransSaga),
            ...Object.values(categoryTransSaga),
            ...Object.values(provinceSaga),
            ...Object.values(provinceTransSaga),
            ...Object.values(resourceSaga),
            ...Object.values(resourceTransSaga)
        ].map(fork)
    );
}