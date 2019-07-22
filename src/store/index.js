import Store from '@core/model/store';
import {action, observable} from '@core/common/mobx';
import uuid from '@core/common/uuid';
import axios from 'axios'

class SampleStore extends Store {
    constructor(props) {
        super(props);
    }

    @observable listTodo = [
        {
            id: 1,
            name: 'Nguyen The Nhat',
            age: 24,
            gtinh: 'Male',
            email: 'thenhat@gmail.com',
            status: 'Active'

        }, {
            id: 2,
            name: 'Nguyen The Quyen',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail.com',
            status: 'Inactive'

        }, {
            id: 3,
            name: 'Nguyen Hoang Nhi',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail.com',
            status: 'Active'

        }, {
            id: 4,
            name: 'Nguyen The Khai',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail.com',
            status: 'Active'

        }, {
            id: 5,
            name: 'Nguyen Thi Ha',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail.com',
            status: 'Inactive'

        }, {
            id: 6,
            name: 'Nguyen Thi Chinh',
            age: 22,
            gtinh: 'Female',
            email: 'thequyen@gmail.com',
            status: 'Inactive'

        }, {
            id: 7,
            name: 'Nguyen Van Thinh',
            age: 21,
            gtinh: 'Other',
            email: 'vannam@gmail.com',
            status: 'Active'

        }
    ]

    @action addTodo(opts) {
            return new Promise((resolve) => {
                if(opts.Id == 0)
                {
                    const data = {
                        id: uuid(),
                        name: opts.Name,
                        age: opts.Age,
                        gtinh: opts.Gtinh,
                        email: opts.Email,
                        status: opts.Status
                    };
                    this.listTodo.push(data);
                    resolve(data.id);
                }
                else{
                    const todo = this.listTodo.find(t => t.id == opts.Id);
                    todo.name = opts.Name;
                    todo.age = opts.Age;
                    todo.gtinh = opts.Gtinh;
                    todo.email = opts.Email;
                    todo.status = opts.Status;
                    resolve(todo.id);
                }
            });
        }

        @action getTodoDetail(id) {
            return new Promise((resolve) => {
                const todo = this.listTodo.find(t => t.id == id);
                resolve(todo);
            });
        }

        @action removeTodo(id) {
            return new Promise((resolve) => {
                const idx = this.listTodo.findIndex(t => t.id == id);
                if (idx !== -1) {
                    this.listTodo.splice(idx, 1);
                }
                resolve('Done')
            })
        }

        @action callServiceApi(pageId) {
            return new Promise((resolve) => {
                if(pageId == null)
                {
                    pageId = 1;
                }
                axios.request({
                    url: 'https://gorest.co.in/public-api/users?page='+pageId,
                    method: 'get',
                    headers: { 'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj' }
                }).then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    resolve(error);
                });
            });
        }

    @action callServiceApiAdd(opts) {
        return new Promise((resolve) => {
            if(opts.Id == 0)
            {
                axios.request({
                    url: 'https://gorest.co.in/public-api/users',
                    method: 'post',
                    data: opts,
                    headers: { 'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj' }
                }).then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    resolve(error);
                });
            }
            else{
                const todo = this.listTodo.find(t => t.id == opts.Id);
                todo.name = opts.Name;
                todo.age = opts.Age;
                todo.gtinh = opts.Gtinh;
                todo.email = opts.Email;
                todo.status = opts.Status;
                resolve(todo.id);
            }


        });
    }

    }

export default SampleStore;
