import React, { Component } from 'react';

import { Breadcrumb   } from 'antd';

class BreadcrumbWrapper extends Component {

    render() {
       
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home light</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );     
    }
}

export default BreadcrumbWrapper;