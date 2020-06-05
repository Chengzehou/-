import { Component } from "react";
import { Button, Space } from 'antd';
import "./index.scss"

export default class HeadMain extends Component {
    state = {
        user: localStorage.user ? JSON.parse(localStorage.user) : null
    }
    goout=()=>{
        sessionStorage.setItem("token","")
        sessionStorage.setItem("isLogin",false)
        this.props.history.push("/login")
    }
    render() {
        return (
            <div className="head">
                <h2>成长网科技员工管理系统</h2>
                <div className="right">
                    <Space>
                        <h2>欢迎您：{this.state.user.userid}</h2>
                        <Button
                            type="danger"
                            size="large"
                            onClick={this.goout}
                        >
                            退出
                        </Button>
                    </Space>
                </div>
            </div>
        )
    }
}