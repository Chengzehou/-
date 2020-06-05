import { Form, Input, InputNumber, Button, Modal, Radio, } from 'antd';
import { Component } from 'react';
import { connect } from "react-redux";
import { axios } from "@/utils/index.js";
import { Changebaseuserinfor,getbaseuserinfor } from "../../redux/actions"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


const mapStatetoProps = (state) => {//输入逻辑
    return { ...state }
}

class Changeuserinfor extends Component {
    componentDidMount(){
        this.props.dispatch(getbaseuserinfor())
    }
    inforform = React.createRef();
    state = {
        visible: false
    }
    handlechanginfor = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        console.log("修改成功");
        this.inforform.current.validateFields()//表单正则验证通过
            .then(values => {//values为填写的表单值
                let data = this.inforform.current.getFieldsValue();//获取表单值
                axios.post("/react/updateuser", data)
                    .then(res => {
                        if (res.data.type) {
                            this.props.dispatch(Changebaseuserinfor(data)) //发送action给reducer更新store
                            this.setState({//关闭修改框
                                visible: false
                            })
                        }
                    })
            })
    }
    handleCancel = () => {
        console.log("取消修改");
        this.setState({
            visible: false
        })
    }
    render() {
        console.log(this.props);

        return (
            <div>
                <Button type="primary" onClick={this.handlechanginfor}>点击修改</Button>
                <Modal
                    title="修改个人信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout} name="nest-messages" ref={this.inforform}>
                        <Form.Item
                            name="username"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: '不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="userid"
                            label="工号"
                            rules={[
                                {
                                    required: true,
                                    message: '不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="jiguan"
                            label="籍贯"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="sex" label="性别">
                            <Radio.Group>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="age"
                            label="年龄"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="idcard"
                            label="身份证号"
                            rules={[
                                {
                                    required: true,
                                    message: '不能为空'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="department"
                            label="部门"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="address" label="详细地址">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect(//订阅store,暴露组件
    mapStatetoProps
)(Changeuserinfor)