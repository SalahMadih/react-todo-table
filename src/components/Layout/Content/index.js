import React, { Component } from 'react';
import { Route } from "react-router-dom";

import { Layout  } from 'antd';

import  Breadcrumb  from '../Breadcrumb';
import Users from '../../../containers/Users';
import Posts from '../../../containers/Posts';
import Home from '../../../containers/Home';

class ContentWrapper extends Component {

    render() {
        
        const { Content } = Layout;
        
        return (
            <div>
                <Content style={{ padding: '0 50px', marginTop: 100}}>
                    <Breadcrumb  />
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Route exact path="/" component={Home} />
                        <Route path="/users" component={Users} />
                        <Route exact path="/posts" component={Posts} />
                    </div>
                </Content>
            </div>
        );     
    }
}

export default ContentWrapper;