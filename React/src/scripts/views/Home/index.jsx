import { Component } from "react";
import "./index.scss"
import { Layout, Modal, Button, Space } from 'antd';
import HeadMain from "../../components/head/index.jsx"
import {
    ExclamationCircleOutlined,
    PieChartOutlined,
    UserOutlined,
    HeartFilled,
    ScheduleFilled,
    MailFilled
} from '@ant-design/icons';
import SildMenus from "./sildmenus.jsx";
const { confirm } = Modal;
const { Header, Footer, Sider, Content } = Layout;
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import Shouye from "../Shouye";
import Userinfor from "../Userinfor/index.jsx";
import Tiwendj from "../Tiwen";
import Tiwenjl from "../Tiwen/jl";
import Qiand from "../Qiandao";
import Qiandjl from "../Qiandao/jl";
import Advice from "../Advice";
import Advicejl from "../Advice/jl";


export default class Home extends Component {
    componentDidMount() {
        let token = sessionStorage.token;
        if (!token) {
            confirm({
                title: '提示：',
                icon: <ExclamationCircleOutlined />,
                content: '您还没有登陆，请先登录',
                onOk: () => {
                    this.props.history.push("/login");
                },
                onCancel: () => {
                    this.props.history.push("/login");
                }
            });
        }
    }
    state = {
        user: localStorage.user ? JSON.parse(localStorage.user) : null
    }
    render() {
        return (
            <Layout style={{ height: "100%" }}>
                <Header>
                    <HeadMain history={this.props.history} />
                </Header>
                <Layout>
                    <Sider>
                        <SildMenus {...this.props}></SildMenus>
                    </Sider>
                    <Content style={{ margin: "10px 10px" }}>
                        <Switch>
                            <Route path="/home/shouye" component={Shouye} />
                            <Route path="/home/user" component={()=><Userinfor />} />
                            <Route path="/home/tiwen" render={() => (
                                <Switch>
                                    <Route path="/home/tiwen/dengji" component={Tiwendj} />
                                    <Route path="/home/tiwen/jilu" component={()=><Tiwenjl/>} />
                                </Switch>
                            )} />
                            <Route path="/home/qiandao" render={() => (
                                <Switch>
                                    <Route path="/home/qiandao/q" component={()=><Qiand />} />
                                    <Route path="/home/qiandao/j" component={Qiandjl} />
                                </Switch>
                            )} />
                            <Route path="/home/advice" render={() => (
                                <Switch>
                                    <Route path="/home/advice/fankui" component={Advice} />
                                    <Route path="/home/advice/adjl" component={Advicejl} />
                                </Switch>
                            )} />
                            <Route render={
                                () => (<Redirect to="/home/shouye" />)
                            } />
                        </Switch>
                    </Content>
                </Layout>
                {/* <Footer style={{textAlign:"center"}}>成长网络科技员工管理系统</Footer> */}
            </Layout>
        )
    }
}