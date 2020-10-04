import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

//REDUCER
import categoryReducer from './categories-reducers';
import languagesReducer from './languages-reducers';
import newsReducer from './news-reducers';
import provincesReducer from './provinces-reducers';
import resourcesReducer from './resources-reducers';
import categoryTransReducer from './categoriesTrans-reducers';
import newsTransReducer from './newsTrans-reducers';
import resourcesTransReducer from './resourcesTrans-reducers';
import provincesTransReducer from './provinceTrans-reducers';
import usersReducer from './users-reducer';
import subscribesReducer from './subscribers-reducer';

const rootReducer = (history) => combineReducers({
    form: formReducer,
    router: connectRouter(history),

    userState: usersReducer,
    categoryState: categoryReducer,
    languageState: languagesReducer,
    newsState: newsReducer,
    provincesState: provincesReducer,
    resourceState: resourcesReducer,
    categoryTransState: categoryTransReducer,
    newsTransState: newsTransReducer,
    provinceTransState: provincesTransReducer,
    resourcesTransState: resourcesTransReducer,
    subscribeState: subscribesReducer
});

export default rootReducer;