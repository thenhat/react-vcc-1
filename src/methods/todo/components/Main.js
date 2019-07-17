import React, {Component} from '@core/common/react';
import {inject, observer} from '@core/common/mobx-react';


import '../../../styles/todo.scss';

import {Input} from '@core/ui/input';
import {FontAwesome} from '@core/ui/icons';
import {Button} from "@core/ui/button";
import {Dialog, renderDialog} from '@core/ui/dialog';
import Paging from "@core/ui/paging/PagingSimple";

import {Pane,Radio,Select} from "evergreen-ui";


@inject('store')
@observer
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: 0,
            Name: '',
            Age: null,
            Gtinh: 'Male',
            Email: '',
            Status:'Active',
            cheked:false,
            dialogVisible: false
        };

    }

    addTodo = () => {
        const {store} = this.props;
        const {Name, Age, Gtinh, Email, Status, Id} = this.state;
        console.log(this.state);

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
        var detail = store.getTodoDetail(id);
        var that =this;
        detail.then(function(p) {
            console.log(p);
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
    };

    updateTodo = (data) => {
        const {store} = this.props;
        store.updateTodo(data)
    };

    removeTodo = (id) => {
        const {store} = this.props;
        store.removeTodo(id)
    };


    render() {
        const {store} = this.props;
        const {input} = this.state;

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
                            })
                        }}
                    ><FontAwesome
                        icon="fa fa-plus"
                    />
                        <p>Thêm công việc</p></Button>

                    <Input
                        value={input}
                        height={40}
                        onChange={(val) => this.setState({input: val})}
                        onEnter={this.addTodo}
                    />

                    {/*<ButtonColor />*/}
                    {/*<Radio checked={true} value={1} groupId={'test'} children={'Nam'}/>*/}
                    {/*<Radio value={2} groupId={'test'} children={'Nu'}/>*/}
                    {/*<RadioGroup/>*/}
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
                            <input type="hidden" value={this.state.Id} />

                            <label><strong>Age</strong></label>
                            <Input
                                value={this.state.Age}
                                height={40}
                                placeholder={'Add Age...'}
                                onChange={(val) => this.setState({Age: val})}
                            />
                            <label><strong>Render</strong></label>
                            <Pane aria-label="Radio Group Label 12" role="group" onClick={(t) => this.setState({Gtinh: t.target.value})} value={this.state.Gtinh}>

                                <Radio name="group" label="Male" value="Male"/>
                                <Radio name="group" label="Female" value="Female"/>
                                <Radio name="group" label="Other" value="Other"/>
                            </Pane>

                            <label><strong>Email</strong></label>
                            <Input
                                value={this.state.Email}
                                height={40}
                                placeholder={'Add email...'}
                                onChange={(val) => this.setState({Email: val})}

                            />
                            <label><strong>Status</strong></label>
                            <Select width={240} onChange={(t) => this.setState({Status: t.target.value})} value={this.state.Status}>
                                <option value="Active" selected>Active</option>
                                <option value="Inactive">Inactive</option>
                            </Select>

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
