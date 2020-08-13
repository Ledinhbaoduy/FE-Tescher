import React, { Component } from 'react';
import { APP_ROUTER } from '../../constants/router.constants';
import history from '../../navigation/App.history';
export class TeacherScreen extends Component {

    redirectToLogin = () => {
    }

    render() {
        return (
            <div>
                <button onClick={this.redirectToLogin}>Go To Login</button>

            </div>
        )
    }
}
