import { Component } from "react";
import {
    Form,
    Select,
    Input,
    Button
} from 'antd';
const { Option } = Select;
import { axios } from "@/utils/index.js";

const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  };
export default class Advice extends Component {
    onFinish=(values)=>{
        console.log(values);
        axios.post("/react/addadvise",{...values,userid:JSON.parse(localStorage.user).userid})
        .then(res=>{})
    }
    render() {
        return (
                <Form
                    name="useradvice"
                    {...layout}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="bumen"
                        label="所属部门"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请选择对应部门',
                            },
                        ]}
                    >
                        <Select placeholder="请选择对应部门">
                            <Option value="sc">市场营销</Option>
                            <Option value="xz">行政人事</Option>
                            <Option value="ws">卫生管理</Option>
                            <Option value="cw">财务管理</Option>
                            <Option value="js">技术中心</Option>
                            <Option value="qt">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="advice" label="建议">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                     wrapperCol={{
                        span:8,
                        offset: 3,
                      }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
        )
    }
}