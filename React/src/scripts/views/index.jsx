//视图主入口
import {Switch,Route, Redirect} from "react-router-dom";
import { Component } from "react";
import Login from "./Login/index.jsx";
import Home from "./Home/index.jsx";
import NotFound from "./404";


export default class MainViews extends Component{
    render(){
        return (
            <Switch>
                {/* 精准匹配，重定向到login页面 */}
                <Route path="/" exact render={()=><Redirect to="/login" />} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/404" component={NotFound} />
                <Route render={()=><Redirect to="/404" />} />
            </Switch>
        )
    }
}