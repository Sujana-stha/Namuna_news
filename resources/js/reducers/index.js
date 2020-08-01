import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';

//REDUCER
import loginReducer from './login-reducers';
import categoryReducer from './categories-reducers';
import languagesReducer from './languages-reducers';
import newsReducer from './news-reducers';
import provincesReducer from './provinces-reducers';
import resourcesReducer from './resources-reducers'

const rootReducer = (history) => combineReducers({
    form: formReducer,
    router: connectRouter(history),

    loginState: loginReducer,
    categoryState: categoryReducer,
    languageState: languagesReducer,
    newsState: newsReducer,
    provincesState: provincesReducer,
    resourcesState: resourcesReducer
});

export default rootReducer;