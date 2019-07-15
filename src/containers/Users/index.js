import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/users/actions';
import { Table, Modal, Tag, Popconfirm, Icon, Select, Input, Form, Button } from 'antd';
import clone from 'clone';
import {
  Fieldset,
  Label
} from './users.style';


const { TextArea, } = Input;
const { Option } = Select;

class Users extends Component {
  componentDidMount() {
    this.props.loadFromFireStore();
  }

  handleRecord = (actionName, user) => {
    if (user.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(user, actionName);
  };

  handleModal = (users = null) => {
    this.props.toggleModal(users);
  };

  onRecordChange = (key, event) => {
    let {user} = clone(this.props);
    if(key) user[key] = event.target.value;
    this.props.update(user);
  };

  onSelectChange = (key, value) => {
    let { user } = clone(this.props);
    if (key) user[key] = value;
    this.props.update(user);
  };

  render() {

    const { modalActive, users } = this.props;
    const { user } = clone(this.props);
    const dataSource = [];

    Object.keys(users).map((user, index) => {
      return dataSource.push({
        ...users[user],
        key: user,
      });
    });

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, row) => {
          let tag = 'disbale';
          let color = 'red';
          if (text == 1) {
            tag = 'active';
            color = 'green';
          }
          return <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        },
      },
      {
        title: 'created_at',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Actions',
        key: 'action',
        width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <div>
              <a href="#" onClick={this.handleModal.bind(this, row)} >
                <Icon type="fullscreen-exit" />
              </a>
              |
              <Popconfirm
                title="Are you sure to delete this user ？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <Icon type="delete" />
                </a>
              </Popconfirm>
            </div>
          );
        },
      },

    ];
    return (
      <div>
        <h3> Page User </h3>
        <Button style={{ margin: '10px 0' }}
          type="primary"
          onClick={this.handleModal.bind(this, null)}
        >
          Add new User
                </Button>
        <Modal
          visible={modalActive}
          onClose={this.props.toggleModal.bind(this, null)}
          title={user.key ? 'Update user' : 'Add New user'}
          okText={user.key ? 'Update user' : 'Add user'}
          onOk={this.handleRecord.bind(this, 'insert', user)}
          onCancel={this.props.toggleModal.bind(this, null)}
        >
          <Form>
            <Fieldset>
              <Label>First name</Label>
              <Input
                label="First name"
                placeholder="Enter First name"
                value={user.firstname}
                onChange={this.onRecordChange.bind(this, 'firstname')}
              />
            </Fieldset>
            <Fieldset>
              <Label>Last name</Label>
              <Input
                label="Last name"
                placeholder="Enter Lastname"
                value={user.lastname}
                onChange={this.onRecordChange.bind(this, 'lastname')}
              />
            </Fieldset>
            <Fieldset>
            <Label> Phone </Label>
              <Input
                label="Phone"
                placeholder="Enter Phone"
                value={user.phone}
                onChange={this.onRecordChange.bind(this, 'phone')}
              />
            </Fieldset>
            <Fieldset>
              <Label>Address</Label>
              <TextArea
                label="Address"
                rows={5}
                placeholder="Enter Address"
                value={user.address}
                onChange={this.onRecordChange.bind(this, 'address')}
              />
            </Fieldset>
    
            <Fieldset>
              <Label>Status</Label>
              <Select
                defaultValue={user.status}
                placeholder="Enter Status"
                onChange={this.onSelectChange.bind(this, 'status')}
                style={{ width: '170px' }}
              >
                <Option value="1" >active</Option>
                <Option value="0" >disbale</Option>
              </Select>
            </Fieldset>
          </Form>
        </Modal>

        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.Users,
  }),
  actions
)(Users);
