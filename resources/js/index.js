import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import {Route, Switch} from 'react-router-dom';
import history from './myhistory';

//LAYOUTS
import DashboardLayout from './layouts/primaryLayouts';


ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history = {history}>
                    <Switch>
                        <Route path="/" component={DashboardLayout}/>
                    </Switch>
            </ConnectedRouter>
	    </Provider>,
    document.getElementById('root')
);

// serviceWorker.unregister();