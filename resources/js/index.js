import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import {Route, Switch, Redirect} from 'react-router-dom';
import history from './myhistory';
import PrivateRoute from './privateRouter';

//LAYOUTS
import DashboardLayout from './layouts/primaryLayouts';
import UnauthorizedLayout from './layouts/unauthorizedLayouts';


ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history = {history}>
                    <Switch>
                        <Route path="/auth" component={UnauthorizedLayout}/>
                        <Route path="/" component={DashboardLayout}/>
                        <Redirect to="/auth"/>
                    </Switch>
            </ConnectedRouter>
	    </Provider>,
    document.getElementById('root')
);

// serviceWorker.unregister();