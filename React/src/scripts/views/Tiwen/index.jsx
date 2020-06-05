import { Component } from "react";
import { Form, InputNumber, Button, DatePicker} from 'antd';
import { axios } from "@/utils/index.js";

export default class Tiwendj extends Component {
    onFinish = (fieldsvalue) => {
        const values = {
            ...fieldsvalue,
            'time': fieldsvalue['time'].format('YYYY-MM-DD HH:mm:ss'),
            userid:JSON.parse(localStorage.user).userid
        }
        axios.post("/react/wendusubmit",values).then(res=>{})
        console.log(values);
    }
    gotwjl = () => {
        this.props.history.push("/home/tiwen/jilu")
    }
    render() {
        return (
            <div>
                <h2>每日体温如实登记，健康服务你我他</h2>
                <Form
                    name="lqtiwen"
                    onFinish={this.onFinish}
                >
                    <Form.Item 
                    name="tiwen" 
                    label="填写体温"
                    rules={[
                        {
                            required: true,
                            message: '请填写体温',
                        }
                    ]}
                    >
                        <InputNumber min={30} max={50} />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="量取时间"
                        rules={[
                            {
                                type: 'object',
                                required: true,
                                message: '请选择时间',
                            }
                        ]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登记
                        </Button>
                    </Form.Item>

                    <Button type="primary" htmlType="button" onClick={this.gotwjl}>
                        查看体温记录
                    </Button>
                </Form>
            </div >
        )
    }
}