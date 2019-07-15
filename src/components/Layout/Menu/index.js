import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {  Menu  } from 'antd';

     
class MenuWrapper extends Component {

    state = {
        current: 'home',
      };

    handleClick = e => {
        this.setState({
          current: e.key,
        });
      };

    render() {
        
        return (
            <div> 
                  <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                    >
                        <Menu.Item key="home">
                        <span>Deshboard</span>
                                <Link to="/" />
                          </Menu.Item>
                        <Menu.Item key="users">
                        <span>Users</span>
                                <Link to="/users" />
                          
                          </Menu.Item>
                        <Menu.Item key="posts">
                        <span>Posts</span>
                                <Link to="/posts" />
                          </Menu.Item>
                    </Menu>
            </div>  
        );     
    }
}

export default MenuWrapper;