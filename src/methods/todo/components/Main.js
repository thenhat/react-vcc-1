import React, {Component} from '@core/common/react';
import {inject, observer} from '@core/common/mobx-react';


import '../../../styles/todo.scss';

import {Input} from '@core/ui/input';
import {FontAwesome} from '@core/ui/icons';
import {Button} from "@core/ui/button";
import {Dialog} from '@core/ui/dialog';
import SelectBox from "coreplugin/core/ui/selectbox";
import Paging from "coreplugin/core/ui/paging/PagingSimple";
import {Radio} from "coreplugin/core/ui/radio";
import {isEmpty} from 'coreplugin/core/utils/validator';

@inject('store')
@observer
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            Name: '',
            Age: null,
            Gtinh: '',
            Email: '',
            Status: '',
            dialogVisible: false,
            isValidate: true,
            isChecked1: false,
            isChecked2: false,
            errors: {}
        };

    }

    addTodo = () => {
        const {store} = this.props;
        const {Name, Age, Gtinh, Email, Status, Id} = this.state;
        if (this.handleValidation()) {
            store.addTodo({
                Name,
                Age,
                Gtinh,
                Email,
                Status,
                Id
            })
                .then(() => {
                    this.setState({
                        Id: 0,
                        Name: '',
                        Age: null,
                        Gtinh: '',
                        Email: '',
                        isValidate: true,
                        errors: {},
                        Status: '',
                        isChecked1: false,
                        isChecked2: false
                    });
                });
        }
    };

    showPopupEdit = (id) => {
        const {store} = this.props;
        let detail = store.getTodoDetail(id);
        var that = this;
        detail.then(function (p) {
            that.setState({
                dialogVisible: true,
                Name: p.name,
                Age: p.age,
                Gtinh: p.gtinh,
                Email: p.email,
                Status: p.status,
                Id: p.id
            });
            that.getChecked()

        });
    };

    removeTodo = (id) => {
        const {store} = this.props;
        store.removeTodo(id)
    };

    handleValidation = () => {
        let errors = {};
        let isValidated = true;
        if (isEmpty(this.state.Name)) {
            errors["Name"] = "Cannot be empty";
        }

        if (isEmpty(this.state.Age)) {
            errors["Age"] = "Cannot be empty";
        } else if (isNaN(this.state.Age)) {
            errors["Age"] = "Please input number";
        }

        if (isEmpty(this.state.Email)) {
            errors["Email"] = "Cannot be empty";
        } else if (!this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            errors["Email"] = "Email invalid";
        }

        if (!isEmpty(errors)) {
            isValidated = false;
        }

        this.setState({errors: errors});
        return isValidated;
    };

    getChecked = () => {
        var p = this.state.Status;

        if (p == 'Active') {
            this.setState({isChecked1: true, isChecked2: false})
        } else {
            this.setState({isChecked1: false, isChecked2: true})
        }


    };

    getValid =(e)=> {
        let errors = {};
        let isValidated = true;
        var fieldName =e;

        switch (fieldName) {
            case "Name":
                if (isEmpty(this.state.Name)) {
                    errors["Name"] = "Cannot be empty";
                }
                break;

            case "Age":
                if (isEmpty(this.state.Age)) {
                    errors["Age"] = "Cannot be empty";
                } else if (isNaN(this.state.Age)) {
                    errors["Age"] = "Please input number";
                }
                break;

            case "Email":
                if (isEmpty(this.state.Email)) {
                    errors["Email"] = "Cannot be empty";
                } else if (!this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    errors["Email"] = "Email invalid";
                }
                break;
            default:
                break;
        }
        if (!isEmpty(errors)) {
            isValidated = false;
        }

        this.setState({errors: errors});
    };

    render() {
        const {store} = this.props;

        return (
            <div styleName="todo-wrapper">
                <div styleName="todo-input">
                    <Button
                        style={'default'}
                        height={40}
                        width={150}
                        bgColor={'#337ab7'}
                        textColor={'#fff'}
                        onClick={() => {
                            this.setState({
                                dialogVisible: true,
                                editId: 2000
                            })
                        }}>
                        <FontAwesome
                            icon="fa fa-plus"/>
                        <p>Add Students</p>
                    </Button>
                </div>

                <div styleName="todo-list">
                    <table>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            store.listTodo.map((todo, index) => (
                                <tr styleName="todo-item" key={todo.id}>
                                    <td>{index + 1}</td>
                                    <td>{todo.name}</td>
                                    <td>{todo.age}</td>
                                    <td>{todo.gtinh}</td>
                                    <td>{todo.email}</td>
                                    <td>{todo.status}</td>
                                    <td>
                                        <Button
                                            width={70}
                                            height={30}
                                            bgColor={'#f0ad4e'}
                                            textColor={'#fff'}
                                            onClick={() => this.showPopupEdit(todo.id)}>
                                            <FontAwesome
                                                icon="fa fa-pencil"/>
                                            Edit
                                        </Button>

                                        <Button
                                            width={70}
                                            height={30}
                                            bgColor={'#d9534f'}
                                            textColor={'#fff'}
                                            onClick={() => this.removeTodo(todo.id)}>
                                            <FontAwesome
                                                icon="fa fa-trash"/>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <Paging total={store.listTodo.length} page={1} size={5}/>
                    <Dialog
                        visible={this.state.dialogVisible}
                        onClose={() => {
                            this.setState({
                                Id: 0,
                                Name: '',
                                Age: null,
                                Gtinh: '',
                                Email: '',
                                isValidate: true,
                                errors: {},
                                Status: '',
                                isChecked1: false,
                                isChecked2: false,
                                dialogVisible: false})
                        }}>

                        <div>
                            <label><strong>Name</strong></label>
                            <Input
                                value={this.state.Name}
                                height={40}
                                placeholder={'Add Name...'}
                                onChange={(value) => this.setState({Name: value},
                                    () => this.getValid('Name'))}
                            />
                            <span styleName="error">{this.state.errors["Name"]}</span>
                            <input type="hidden" value={this.state.Id}/>

                            <label><strong>Age</strong></label>
                            <Input
                                value={this.state.Age}
                                height={40}
                                placeholder={'Add Age...'}
                                onChange={(value) => this.setState({Age: value},
                                    () => this.getValid('Age'))}
                            />
                            <span styleName="error">{this.state.errors["Age"]}</span>

                            <label><strong>Gioi Tinh</strong></label>
                            <SelectBox
                                data={[
                                    {
                                        value: 'Male', label: 'Male', parent: 0,
                                    }
                                    , {
                                        value: 'Female', label: 'Female', parent: 0
                                    }, {
                                        value: 'Other', label: 'Other', parent: 0
                                    }
                                ]}
                                onChange={(data) => this.setState({Gtinh: data})}
                                value={this.state.Gtinh}
                            />

                            <label><strong>Email</strong></label>
                            <Input
                                value={this.state.Email}
                                height={40}
                                placeholder={'Add email...'}
                                onChange={(value) => this.setState({Email: value},
                                    () => this.getValid('Email'))}

                            />
                            <span styleName="error">{this.state.errors["Email"]}</span>

                            <label><strong>Status</strong></label>
                            <Radio
                                checked={this.state.isChecked1}
                                value={'Active'}
                                onChange={(value) => this.setState({Status: value},
                                    () => this.getChecked(),()=>this.getValid('Status'))}>
                                Active</Radio>
                            <Radio
                                checked={this.state.isChecked2}
                                value={'Inactive'}
                                onChange={(value) => this.setState({Status: value},
                                    () => this.getChecked(),()=>this.getValid('Status'))}>
                                Inactive
                            </Radio>

                            <div styleName="clear"></div>

                            <Button
                                width={70}
                                height={40}
                                bgColor={'#d9534f'}
                                textColor={'#fff'}
                                onClick={this.addTodo}>
                                ADD
                            </Button>
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default Main;