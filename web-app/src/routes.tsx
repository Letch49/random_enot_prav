import React from "react";
import {
    Route, Switch,
} from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Appeals from "./pages/Appeals";
import Appeal from "./pages/Appeal";
import BasePageComponent from "./pages/BasePageComponent";
import CreateAppeal from "./pages/CreateAppeal";

// @ts-ignore
const PrivateRoute = ({component: Component, isShowHeader = true, ...rest},) => (
    <Route
        {...rest}
        render={props => <BasePageComponent isShowHeader={isShowHeader}><Component {...props}/></BasePageComponent>}
    />
)

const routes = (
    <Switch>
        <PrivateRoute path={'/'} component={Index} exact={true}/>
        <PrivateRoute path={'/auth'} component={Auth} isShowHeader={false} exact={true}/>
        <PrivateRoute path={'/appeals'} component={Appeals} exact={true}/>
        <PrivateRoute path={'/appeals/create'} component={CreateAppeal} exact={true}/>
        <PrivateRoute path={'/appeals/:id'} component={Appeal} exact={true}/>
    </Switch>
)

export default routes
