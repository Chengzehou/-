import { Component } from "react";
import { Table, Tag, Space, Button } from 'antd';
import { getusertiwen } from "../../redux/actions"
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons"
import { axios } from "@/utils/index.js";

@connect(
    state => {
        return {
            usertiwen: state.usertiwen
        }
    }
)
export default class Tiwenjl extends Component {
    state = {
        columns:[
            {
                title: '日期',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '温度',
                dataIndex: 'tiwen',
                key: 'tiwen',
            },
            {
                title: "类型",
                dataIndex: "toggle",
                key: "toggle",
                render: (toggle) => {
                    return (
                        <Tag
                            color={toggle ? "red" : "green"}
                        > {toggle ? '发烧' : '正常'}</Tag>
                    )
                }
            },
            {
                title: '删除',
                key: 'action',
                render: (item) => (
                    <Space size="middle">
                        <Button type="danger" shape="circle" onClick={() => this.handleDelClick(item.time)} icon={<DeleteOutlined />} ></Button>
                    </Space>
                ),
            },
        ],
    }
    handleDelClick=(val)=>{//删除当前体温
        axios.post("/react/deltw",{deltime:val})
        .then(res=>{
            this.props.dispatch(getusertiwen())
        })
    }
    componentDidMount() {
        this.props.dispatch(getusertiwen())
    }
    render() {
        return (
            <div>
                <h2>这是体温记录</h2>
                <Table columns={this.state.columns} dataSource={this.props.usertiwen} pagination={{ pageSize: 6 }} />
            </div>
        )
    }
}