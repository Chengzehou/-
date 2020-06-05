//项目主路由
import {HashRouter as Hash,Route} from "react-router-dom"
import { Component } from "react";
import MainViews from "./views";

export default class MainRouter extends Component{
    render(){
        return (
            <div className="main">
                <Hash>
                    <Route component={MainViews} />
                </Hash>
            </div>
        )
    }
}
