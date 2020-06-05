import { Component } from "react";
import { Descriptions, } from 'antd';
import Changeuserinfor from "../../components/userinfor/index.jsx";
import { connect } from "react-redux";

const mapStatetoProps = (state) => {//输入逻辑
    return { ...state }
}

class Userinfor extends Component {
    render() {
        return (
            <div>
                <Descriptions title="我的名片">
                    <Descriptions.Item label="姓名">{this.props.baseuser.username}</Descriptions.Item>
                    <Descriptions.Item label="工号">{this.props.baseuser.userid}</Descriptions.Item>
                    <Descriptions.Item label="籍贯">{this.props.baseuser.jiguan}</Descriptions.Item>
                    <Descriptions.Item label="性别">{this.props.baseuser.sex}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{this.props.baseuser.age}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{this.props.baseuser.phone}</Descriptions.Item>
                    <Descriptions.Item label="身份证号">{this.props.baseuser.idcard}</Descriptions.Item>
                    <Descriptions.Item label="部门">{this.props.baseuser.department}</Descriptions.Item>
                    <Descriptions.Item label="详细地址">{this.props.baseuser.address}</Descriptions.Item>
                </Descriptions>
                <Changeuserinfor></Changeuserinfor>
            </div>
        )
    }
}

export default connect(//订阅store,暴露组件
    mapStatetoProps
)(Userinfor)