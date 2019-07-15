import React, { Component } from 'react';

import { Layout } from 'antd';


import  HeaderWrapper  from './Header';
import  FooterWrapper  from './Footer';
import  ContentWrapper  from './Content';

class LayoutWrapper extends Component {

    render() { 

        return (
            <Layout className="layout">
                <HeaderWrapper  />
                <ContentWrapper />
                <FooterWrapper  />
            </Layout>
        );     
    }
}

export default LayoutWrapper;