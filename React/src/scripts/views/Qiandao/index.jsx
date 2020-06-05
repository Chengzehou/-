import { Component } from "react";
import { Button } from 'antd';
import { axios } from "@/utils/index.js";
import "./index.scss"
import { connect } from "react-redux";
import { userpostqd,userpostqt } from "../../redux/actions";

@connect(
    state=>{
        return {
            userqd:state.userqd
        }
    }
)

export default class Qiand extends Component {
    state={
        timeaction:"",
        timelast:"",
        timenow:"",
        qd:false,
        qt:true
    }
    handleqiandao = () => {//点击签到
        this.props.dispatch(userpostqd())
    }
    handleqiantui = () => {//签退
        let data = {
            timenow:this.props.userqd.timenow,
            timeaction:this.props.userqd.timeaction,
        }
        this.props.dispatch(userpostqt(data))
    }
    render() {
        return (
            <div className="qiandbox">
                <Button type="primary" danger disabled={this.props.userqd.qd} onClick={this.handleqiandao}>今日签到</Button>
                <Button type="primary" disabled={this.props.userqd.qt} onClick={this.handleqiantui}>今日签退</Button>
            </div>
        )
    }
}