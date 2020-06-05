import { Component } from "react"
import { Menu } from "antd"
const { SubMenu } = Menu;
import { menus } from "../../router/index.js"

export default class SildMenus extends Component {
    renderItem = (menus) => {
        return menus.map(item => {
            if (item.children) {
                return <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
                    {this.renderItem(item.children)}
                </SubMenu>
            } else {
                return <Menu.Item key={item.path} icon={<item.icon />}>{item.title}</Menu.Item>
            }
        })
    }
    menuclick = (e) => {
        this.props.history.push(e.key)
    }
    render() {
        let pathname = this.props.location.pathname
        let name = pathname.split("/") 
        let openKey = ["/" + name[1] + "/" + name[2]]
        let selk = [pathname]
        return (
            <Menu
                mode="inline"
                onClick={this.menuclick}
                defaultOpenKeys={openKey}
                selectedKeys={selk}
                theme="dark"
            >
                {this.renderItem(menus)}
            </Menu>
        )
    }
}