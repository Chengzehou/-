import { Component } from "react";
import { Table, Tag, Space, Button } from 'antd';
import { axios } from "@/utils/index.js";

export default class Qiandjl extends Component{
    state = {
        columns:[
            {
                title: '签到时间',
                dataIndex: 'timeaction',
                key: 'timeaction',
            },
            {
                title: '签退时间',
                dataIndex: 'timelast',
                key: 'timelast',
            },
            {
                title: "工作时长",
                dataIndex: "workhour",
                key: "workhour",
            },
        ],
        qddata:[]
    }
    componentDidMount(){
        axios.post("/react/getqd",{userid:JSON.parse(localStorage.user).userid})
        .then(res=>{
            let qddata = res.data.result.map((item,index)=>{
                item.key = index
                return item
            })
            this.setState({
                qddata:qddata
            })
        })
    }
    render(){

        return (
            <div>
                <h2>这是签到记录</h2>
                <Table columns={this.state.columns} dataSource={this.state.qddata} pagination={{ pageSize: 6 }} />
            </div>
        )
    }
}