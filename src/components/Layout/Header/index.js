import React, { Component } from 'react';

import { Layout  } from 'antd';
import  MenuWrapper  from '../../Layout/Menu';

class HeaderWrapper extends Component {

    render() {
        const { Header } = Layout;
        return (
            <div>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <MenuWrapper/>
               </Header>
            </div>
        );     
    }
}

export default HeaderWrapper;