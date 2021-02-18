

import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  LineChartOutlined,
  MessageOutlined
} from '@ant-design/icons'


const { SubMenu } = Menu

export const ForMenu = () => {

  return (
    <>
      <Menu
        style={{ width: 300 }}
      >

        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Profile">

            <Menu.Item key="1" icon={<ProfileOutlined />}>
                <Link to="/profile" >Profile</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<MailOutlined />}>
                <Link to="/dialogs" >Message</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/userProfile" >User profile</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<TeamOutlined />}>
                <Link to="/users" >Users</Link>
            </Menu.Item>

        </SubMenu>


        <SubMenu key="sub2" icon={<SafetyCertificateOutlined />} title="Options">
            
            <Menu.Item key="5">Option 1</Menu.Item>
            <Menu.Item key="6">Option 2</Menu.Item>
            
            <SubMenu key="sub1-2" title="Submenu">

                <Menu.Item key="7">Option 3</Menu.Item>
                <Menu.Item key="8">Option 4</Menu.Item>

            </SubMenu>

        </SubMenu>

        <Menu.Item key="9" icon={<MessageOutlined />}>
                <Link to="/chat" >Chat</Link>
        </Menu.Item>

        <Menu.Item key="10" icon={<LineChartOutlined />}>
                <Link to="/news" >News</Link>
        </Menu.Item>

        <Menu.Item key="11" icon={<SettingOutlined />}>
                <Link to="/Settings" >Settings</Link>
        </Menu.Item>

        <Menu.Item key="link" icon={<LinkOutlined />}>
          <a href="https://github.com/Seyit-web" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </Menu.Item>
      </Menu>
    </>
  )
}