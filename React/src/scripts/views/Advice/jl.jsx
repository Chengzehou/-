import { Component } from "react";
import { Table, Tag, Space, Button, Modal, Form, Select, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { axios } from "@/utils/index.js";
const { Option } = Select;

export default class Advicejl extends Component {
    state = {
        columns: [
            {
                title: '日期',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '所属部门',
                dataIndex: 'bumen',
                key: 'bumen',
            },
            {
                title: '建议',
                dataIndex: 'advice',
                key: 'advice',
                ellipsis: true,
            },
            {
                title: '操作',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button type="danger" shape="circle" onClick={() => this.handleDelClick(item._id)} icon={<DeleteOutlined />} ></Button>
                        <Button type="primary" shape="circle" onClick={() => this.handleChange(item)} icon={<EditOutlined />} ></Button>
                    </Space>
                ),
            },
        ],
        useradvice: [],
        visibleUpdate: false,
        val: {},
    }
    handleDelClick = (val) => {//当点击删除按钮时
        axios.post("/react/deladvise", { delId: val })
            .then(res => {
                if (res.data.type) {
                    let useradvice = this.state.useradvice.filter((item) => !(item._id == val))
                    this.setState({//更新本地state
                        useradvice,
                    })
                }
            })
    }
    handleChange = (val) => {//当点击修改按钮时
        console.log(val);
        this.setState({
            visibleUpdate: true,
            val: val//存储所点击修改的数据
        })
        const {
            bumen,
            advice
        } = val
        this.refs.adform && this.refs.adform.setFieldsValue({
            bumen,
            advice
        })
    }

    handleUpdateOk = () => {
        this.refs.adform.validateFields().then(
            values => {
                console.log(values);
                axios.post("/react/updatadvise", {
                    uid: this.state.val._id,
                    values: values
                }).then(res => {
                    var useradvice  = this.state.useradvice.map((item)=>{
                        if(item._id==this.state.val._id){
                            item = {...item,...values};
                        }
                        return item;
                    })
                    this.setState({//更新本地修改后的
                        visibleUpdate:false,
                        useradvice,
                    })
                })
            }
        )
    }

    componentDidMount() {
        axios.post("/react/getalladvise", { userid: JSON.parse(localStorage.user).userid })
            .then(res => {
                console.log(res.data.result);
                let useradvice = res.data.result.map((item, index) => {
                    item.key = index
                    item.description = item.advice
                    if (item.advice.length > 15) {
                        item.name = "advice"
                    } else {
                        item.name = "other"
                    }
                    return item
                })
                this.setState({
                    useradvice,
                })
            })
    }
    render() {
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.useradvice}
                    pagination={{ pageSize: 6 }}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name == 'advice',
                    }}
                />


                <Modal
                    title="修改信息"
                    visible={this.state.visibleUpdate}
                    onOk={this.handleUpdateOk}
                    onCancel={() => this.setState({ visibleUpdate: false })}
                >
                    <Form
                        name="useradvice"
                        ref="adform"
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

                    </Form>
                </Modal>
            </div>
        )
    }
}