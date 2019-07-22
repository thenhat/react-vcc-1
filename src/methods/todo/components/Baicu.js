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
import Loading from "coreplugin/core/ui/loading";

@inject('store')
@observer
class Baicu extends Component {
    constructor(props) {
        super(props);
        const {store} = this.props;
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
            errors: {},
            isLoading:false,
            message:'',
            First_name: '',
            Last_name: '',
            Phone: '',
            Gender: ''

        };
        this.getDataPaging(1);
    }

    addTodo = () => {
        const {store} = this.props;
        const {First_name, Last_name, Gender, Phone, Email, Status, Id} = this.state;
        var that =this;

        if (this.handleValidation()) {
            store.callServiceApiAdd({
                First_name,
                Last_name,
                Gender,
                Phone,
                Email,
                Status,
                Id
            })

                .then((response) => {
                    console.log(response)
                    if(response.data._meta.status)
                    {
                        that.setState({
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
                            errors: {},
                            isLoading:false,
                            message:'',
                            First_name: '',
                            Last_name: '',
                            Phone: '',
                            Gender: ''
                        });

                    }
                    else
                    {
                        that.setState({
                            message: response.data._meta.message
                        });
                        this.getDataPaging(1);
                    }

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
                First_name: p.first_name,
                Last_name: p.last_name,
                Phone: p.phone,
                Gender: p.gender,
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
        if (isEmpty(this.state.First_name)) {
            errors["First_name"] = "Cannot be empty";
        }
        if (isEmpty(this.state.Last_name)) {
            errors["Last_name"] = "Cannot be empty";
        }

        if (isEmpty(this.state.Phone)) {
            errors["Phone"] = "Cannot be empty";
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

        if (p == 'active') {
            this.setState({isChecked1: true, isChecked2: false})
        } else {
            this.setState({isChecked1: false, isChecked2: true})
        }


    };

    getDataPaging= (pageId) => {
        this.setState({isLoading:true});
        const {store} = this.props;
        var that = this;
        store.callServiceApi(pageId).then(function (p) {
            store.listTodo = p.data.result;

            that.setState({
                totalCount: p.data._meta.totalCount,
                pageCount: p.data._meta.pageCount,
                perPage: p.data._meta.perPage,
                currentPage: p.data._meta.currentPage,
                isLoading:false
            });
        });
    };

    getValid =(e)=> {
        let errors = {};
        let isValidated = true;
        var fieldName =e;

        switch (fieldName) {
            case "First_name":
                if (isEmpty(this.state.First_name)) {
                    errors["First_name"] = "Cannot be empty";
                }
                break;
            case "Last_name":
                if (isEmpty(this.state.Last_name)) {
                    errors["Last_name"] = "Cannot be empty";
                }
                break;

            case "Phone":
                if (isEmpty(this.state.Phone)) {
                    errors["Phone"] = "Cannot be empty";
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
                            <th styleName="color-text">ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th styleName="color-text">Gender</th>
                            <th styleName="color-text">Email</th>
                            <th styleName="color-text">Phone</th>
                            <th styleName="color-text">Status</th>
                            <th styleName="color-text">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            store.listTodo.map((todo, index) => (
                                <tr styleName="todo-item" key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.first_name}</td>
                                    <td>{todo.last_name}</td>
                                    <td>{todo.gender}</td>
                                    <td styleName="color-text">{todo.email}</td>
                                    <td styleName="color-phone">{todo.phone}</td>
                                    <td>{todo.status}</td>
                                    <td styleName="color-text">
                                        <FontAwesome
                                            icon="fa fa-eye"
                                            color={'#e95420'}
                                            onClick={() => this.showPopupEdit(todo.id)}
                                        />
                                        <FontAwesome
                                            icon="fa fa-pencil"
                                            color={'#e95420'}
                                            onClick={() => this.showPopupEdit(todo.id)}
                                        />
                                        <FontAwesome
                                            icon="fa fa-trash"
                                            color={'#e95420'}
                                            onClick={() => this.removeTodo(todo.id)}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>

                    <Paging total={this.state.totalCount} page={this.state.currentPage} size={this.state.perPage} onChange={(pageNew) => this.getDataPaging(pageNew)}/>
                    <Loading visible={this.state.isLoading}  />
                    <Dialog
                        visible={this.state.dialogVisible}
                        onClose={() => {
                            this.setState({
                                Id: 0,
                                First_name: '',
                                Last_name: '',
                                Phone: '',
                                Gender: '',
                                Email: '',
                                Status: '',
                                dialogVisible: false,
                                isValidate: true,
                                isChecked1: false,
                                isChecked2: false,
                                errors: {}})
                        }}>

                        <div>
                            {this.state.message}
                            <label><strong>First_name</strong></label>
                            <Input
                                value={this.state.First_name}
                                height={40}
                                placeholder={'Add First Name...'}
                                onChange={(value) => this.setState({First_name: value},
                                    () => this.getValid('First_name'))}
                            />
                            <span styleName="error">{this.state.errors["First_name"]}</span>
                            <input type="hidden" value={this.state.Id}/>

                            <label><strong>Last_name</strong></label>
                            <Input
                                value={this.state.Last_name}
                                height={40}
                                placeholder={'Add Last Name...'}
                                onChange={(value) => this.setState({Last_name: value},
                                    () => this.getValid('Last_name'))}
                            />
                            <span styleName="error">{this.state.errors["Last_name"]}</span>
                            <input type="hidden" value={this.state.Id}/>

                            <label><strong>Phone</strong></label>
                            <Input
                                value={this.state.Phone}
                                height={40}
                                placeholder={'Add Phone...'}
                                onChange={(value) => this.setState({Phone: value},
                                    () => this.getValid('Phone'))}
                            />
                            <span styleName="error">{this.state.errors["Phone"]}</span>

                            <label><strong>Gioi Tinh</strong></label>
                            <SelectBox
                                data={[
                                    {
                                        value: 'male', label: 'male', parent: 0,
                                    }
                                    , {
                                        value: 'female', label: 'female', parent: 0
                                    }, {
                                        value: 'other', label: 'other', parent: 0
                                    }
                                ]}
                                onChange={(data) => this.setState({Gender: data})}
                                value={this.state.Gender}
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
                                value={'active'}
                                onChange={(value) => this.setState({Status: value},
                                    () => this.getChecked(), () => this.getValid('Status'))}>
                                Active</Radio>
                            <Radio
                                checked={this.state.isChecked2}
                                value={'inactive'}
                                onChange={(value) => this.setState({Status: value},
                                    () => this.getChecked(), () => this.getValid('Status'))}>
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


export default Baicu;
