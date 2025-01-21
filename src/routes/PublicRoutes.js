import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import Login from 'pages/login/Login';
import Signup from 'pages/register/Signup';


function PublicRoutes() {
    return (
        <Switch>
            {/* <Route path={SLUGS.login} render={() => <div>login</div>} /> */}
            <Route path={SLUGS.login} component={Login} />
            {/* <Route path={SLUGS.signup} render={() => <div>signup</div>} /> */}
            <Route path={SLUGS.signup} component={Signup} />
            <Route path={SLUGS.recuperarPasswordPassword} render={() => <div>recuperarPassword</div>} />
            <Redirect to={SLUGS.login} />
        </Switch>
    );
}

export default PublicRoutes;
