import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from './util';

class PrivateRoute extends Component {

  render() {
    const { component: Component, ...rest } = this.props
    
    return (
      <Route
        {...rest}
        render={props =>
          isLogin()  ? 
        <Component {...props} />
        : <Redirect to="/auth/login"/>
        }
      />
    )
  }
}

export default (PrivateRoute);
