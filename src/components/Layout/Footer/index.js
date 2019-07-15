import React, { Component } from 'react';
import { Layout } from 'antd';

class FooterWrapper extends Component {

    render() {
        const { Footer } = Layout;
        return (
            <div>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </div>
        );     
    }
}

export default FooterWrapper;