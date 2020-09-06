import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginRequest} from '../../actions/login-action';
import loadjs from 'loadjs';

//COMPONENTS
import LoginForm from '../../components/login/login-form';

class LoginFormContainer extends Component {
    componentDidMount() {
        loadjs('/plugins/jquery/jquery.min.js', function () {
            loadjs('/plugins/bootstrap/js/bootstrap.bundle.min.js', function() {
                loadjs('/dist/js/adminlte.min.js', function() {
                        loadjs('/dist/js/demo.js');
                    })
            })
        })
    }
    onSubmit(values) {
        console.log(values);
        this.props.loginRequest(values);
    }
    render() {
        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="# "><img src={'/dist/img/Namuna News English Logo.png'}/></a>
                    </div>
                    {/* <!-- /.login-logo --> */}
                    <div className="card">
                        <div className="card-body login-card-body">

                            <LoginForm onSubmit={this.onSubmit.bind(this)}/>

                            
                            <p className="mb-1">
                                <a href="# ">I forgot my password</a>
                            </p>
                            <p className="mb-0">
                                <a href="# " className="text-center">Register a new member</a>
                            </p>
                        </div>
                    </div>
                    {/* <!-- /.login-card-body --> */}
                </div>
            </div>
        );
    }
}

export default connect(null,{loginRequest})(LoginFormContainer);