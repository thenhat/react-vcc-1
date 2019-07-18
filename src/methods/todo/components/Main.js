import React, {Component} from '@core/common/react';
import {inject, observer} from '@core/common/mobx-react';


import '../../../styles/todo.scss';

import {Input} from '@core/ui/input';
import {FontAwesome} from '@core/ui/icons';
import {Button} from "@core/ui/button";
import {Dialog, renderDialog} from '@core/ui/dialog';
import SelectBox from "coreplugin/core/ui/selectbox";
import Paging from "coreplugin/core/ui/paging/PagingSimple";
import Checkbox from "coreplugin/core/ui/checkbox";
import ButtonColor from "coreplugin/core/ui/color-picker/ButtonColor";
import Drawer from "coreplugin/core/ui/drawer";
import DropList from "coreplugin/core/ui/droplist";
import {Radio, RadioGroup} from "coreplugin/core/ui/radio";
import validator from "coreplugin/core/ui/checkbox";
import {isEmpty, isBoolean, isNumber, isRegExp} from 'coreplugin/core/utils/validator';

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
            isValidate:true,
            errors: {}
        };

    }

    addTodo = () => {
        const {store} = this.props;
        const {Name, Age, Gtinh, Email, Status, Id} = this.state;
        if(!this.handleValidation())
        {
            return;
        }

        store.addTodo({
            Name,
            Age,
            Gtinh,
            Email,
            Status,
            Id
        });
    };

    showPopupEdit = (id) => {
        const {store} = this.props;
        let detail = store.getTodoDetail(id);
        var that =this;
        detail.then(function(p) {
            that.setState({
                dialogVisible: true,
                Name: p.name,
                Age: p.age,
                Gtinh: p.gtinh,
                Email:p.email,
                Status:p.status,
                Id: p.id
            });
        });


    }
    updateTodo = (data) => {
        const {store} = this.props;
        store.updateTodo(data)
    }

    removeTodo = (id) => {
        const {store} = this.props;
        store.removeTodo(id)
    }

    handleValidation = () =>{
        let errors = {};
        let isValidated = true;
        if(isEmpty(this.state.Name))
        {
            errors["Name"] = "Cannot be empty";
        }

        if(isEmpty(this.state.Age))
        {
            errors["Age"] = "Cannot be empty";
        }
        else if(isNaN(this.state.Age))
        {
            errors["Age"] = "Please input number";
        }

        if(isEmpty(this.state.Email))
        {
            errors["Email"] = "Cannot be empty";
        }
        /*else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.Email)))
        {
            errors["Email"] = "Email invalid";
        }*/
        else if(!this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
        {
            errors["Email"] = "Email invalid";
        }

        if(!isEmpty(errors))
        {
            isValidated = false;
        }

        this.setState({errors: errors});
        return isValidated;
    }


    render() {
        const {store} = this.props;
        const {input, editId, editValue} = this.state;

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
                        }}

                    ><FontAwesome
                        icon="fa fa-plus"
                    />
                        <p>Them cong viec</p></Button>

                    <Input
                        value={input}
                        height={40}
                        onChange={(val) => this.setState({input: val})}
                        onEnter={this.addTodo}
                    />
                    <ButtonColor />
                    <Radio checked={true} value={1} groupId={'test'} children={'Nam'}/>
                    <Radio value={2} groupId={'test'} children={'Nu'}/>
                    <RadioGroup/>
                    <SelectBox data={['test','abc']}/>


                    {/*<SelectBox*/}
                    {/*    width={150}*/}
                    {/*    height={30}*/}
                    {/*    dropWidth={150}*/}
                    {/*    dropHeight={300}*/}
                    {/*    placeholder={'Chọn giá trị'}*/}
                    {/*    value={null}*/}
                    {/*    emptyText={['An']}*/}
                    {/*    ignoreValues={['nhat', 'nhi']}*/}
                    {/*    disableValues={['nhat', 'nhi']}*/}

                    {/*/>*/}
                </div>

                <div styleName="todo-list">
                    <table>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên</th>
                            <th>Tuổi</th>
                            <th>Giới Tính</th>
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
                                    <td><Button
                                        width={70}
                                        height={30}
                                        bgColor={'#f0ad4e'}
                                        textColor={'#fff'}
                                        onClick={() => this.showPopupEdit(todo.id)}
                                    ><FontAwesome
                                        icon="fa fa-pencil"
                                    />Sua</Button>
                                        <Button
                                            width={70}
                                            height={30}
                                            bgColor={'#d9534f'}
                                            textColor={'#fff'}
                                            onClick={() => this.removeTodo(todo.id)}
                                        ><FontAwesome
                                            icon="fa fa-trash"

                                        />Xoa</Button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {/*
                    Total => Tổng số dòng

                    */}

                    <Paging total={store.listTodo.length} page={1} size={5} />
                    <Dialog
                        visible={this.state.dialogVisible}
                        onClose={() => {
                            this.setState({dialogVisible: false})
                        }}
                    >
                        <div>
                            <label><strong>Name</strong></label>
                            <Input
                                value={this.state.Name}
                                height={40}
                                placeholder={'Add Name...'}
                                onChange={(val) => this.setState({Name: val})}
                            />
                            <span className="error">{this.state.errors["Name"]}</span>
                            <input type="hidden" value={this.state.Id} />

                            <label><strong>Age</strong></label>
                            <Input
                                value={this.state.Age}
                                height={40}
                                placeholder={'Add Age...'}
                                onChange={(val) => this.setState({Age: val})}
                            />
                            <span className="error">{this.state.errors["Age"]}</span>
                            <label><strong>Gioi Tinh</strong></label>
                            <Input
                                value={this.state.Gtinh}
                                height={40}
                                placeholder={'Add Gtinh...'}
                                onChange={(val) => this.setState({Gtinh: val})}

                            />
                            <label><strong>Email</strong></label>
                            <Input
                                value={this.state.Email}
                                height={40}
                                placeholder={'Add email...'}
                                onChange={(val) => this.setState({Email: val})}

                            />
                            <span className="error">{this.state.errors["Email"]}</span>
                            <label><strong>Status</strong></label>
                            <Input
                                value={this.state.Status}
                                height={40}
                                placeholder={'Add Status...'}
                                onChange={(val) => this.setState({Status: val})}

                            />

                            <Checkbox
                                label={'Trang Thai'}
                                checked={false}
                            />
                            <Button
                                width={70}
                                height={40}
                                bgColor={'#d9534f'}
                                textColor={'#fff'}
                                onClick={this.addTodo}
                            >ADD</Button>

                        </div>
                    </Dialog>

                </div>

            </div>
        )
    }
}


export default Main;