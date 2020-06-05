import { Component } from "react";
import "./index.scss"
import { Tabs, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
import {axios} from "@/utils/index.js"

const layout = {   // 表单 input 
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
        offset: 4,
    },
};
const tailLayout = {   // button 
    wrapperCol: {
        offset: 4,  //偏移4
        span: 16,
    },
};
const Reglayout = {
    labelCol: { //标签
        span: 8, //宽8
    },
    wrapperCol: { //输入框
        span: 12,   //宽12
    },
};
const RegtailLayout = {   // button 
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default class Login extends Component {
    handleChangeTabs = (value) => {
        console.log(value);
        this.setState({
            activeKey:value
        })
    }
    state={
        activeKey: "1"
    }
    render() {
        return (
            <div className="lm">
                <div className="lbox">
                    <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.handleChangeTabs}>
                        <TabPane tab="登录" key="1">
                            <UserLogin history={this.props.history} />
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <UserRegister history={this.props.history} handleChangeTabs={this.handleChangeTabs} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}


class UserLogin extends Component {  //登录
    constructor(){
        super()
    }
    onFinish = (value) => {//验证登录
        console.log(value);
        axios.post("/react/login",value)
        .then(res=>{
            if(res.data.type){
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("isLogin",true)
                localStorage.setItem("user",JSON.stringify({
                    userid:value.userid,
                    phone:value.phone,
                }))
                this.props.history.push("/home")
            }
        })
    }
    render() {
        return (
            <Form
                {...layout}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="userid"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入员工号" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const UserRegister = ({handleChangeTabs}) => { //注册
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        axios.post("/react/register",values)
        .then(res=>{
            if(res.data.type){
                setTimeout(()=>{
                    handleChangeTabs("1")
                    //myEvent.emit("sendLoginuserid",res.data.result[0].userid);
                },1000)
            }else{//注册失败，重新注册
                form.resetFields();
            }
        })
    }
    const handleReset = () => {//重置表单
        form.resetFields();
    }
    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            {...Reglayout}
        >
            <Form.Item
                name="userid"
                label="工号"
                rules={[
                    {
                        required: true,
                        message: '工号不能为空',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="手机号"
                rules={[
                    {
                        required: true,
                        message: '手机号不能为空',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="设置密码"
                rules={[
                    {
                        required: true,
                        message: '请设置密码',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="再次输入"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '密码不能为空',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('两次密码输入不一致');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...RegtailLayout}>
                <Button type="danger" htmlType="submit">
                    注册
                </Button>
                <Button type="primary" htmlType="button" onClick={handleReset} className="resetbtn">
                    重置
                    </Button>
            </Form.Item>
        </Form>
    )

}