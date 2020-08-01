import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

//containers
import LoginFormContainer from '../containers/login/login-form-container'

const UnauthorizedLayout = () => (
    <div>
        <Switch>
            <Route path="/auth/login" component={LoginFormContainer}/>
            <Redirect to="/" />
        </Switch>
    </div>
)

export default UnauthorizedLayout