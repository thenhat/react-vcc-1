import Store from '@core/model/store';
import {action, observable} from '@core/common/mobx';
import uuid from '@core/common/uuid';
import axios from 'axios'


class SampleStore extends Store {
    constructor(props) {
        super(props);
    }


    @observable listTodo = []

    @action addTodo(opts) {
        return new Promise((resolve) => {
            if (opts.Id == 0) {
                const data = {
                    id: uuid(),
                    first_name: opts.First_name,
                    last_name: opts.Last_name,
                    phone: opts.Phone,
                    gender: opts.Gender,
                    email: opts.Email,
                    status: opts.Status
                };
                this.listTodo.push(data);
                resolve(data.id);
            } else {
                const todo = this.listTodo.find(t => t.id == opts.Id);
                todo.first_name = opts.First_name;
                todo.last_name = opts.Last_name;
                todo.phone = opts.Phone;
                todo.gender = opts.Gender;
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
            axios.request({
                url: 'https://gorest.co.in/public-api/users/'+id,
                method: 'DELETE',
                headers: {'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj'}
            })
            const idx = this.listTodo.findIndex(t => t.id == id);
            if (idx !== -1) {
                this.listTodo.splice(idx, 1);
            }
            resolve('Done')
        })
    }

    @action callServiceApi(pageId) {
        return new Promise((resolve) => {
            if (pageId == null) {
                pageId = 1;
            }
            axios.request({
                url: 'https://gorest.co.in/public-api/users?page=' + pageId,
                method: 'get',
                headers: {'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj'}
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
            const data = {
                first_name: opts.First_name,
                last_name: opts.Last_name,
                phone: opts.Phone,
                gender: opts.Gender,
                email: opts.Email,
                status: opts.Status
            };

            if (opts.Id == 0) {
                axios.request({
                    url: 'https://gorest.co.in/public-api/users',
                    method: 'post',
                    data: data,
                    headers: {'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj'}
                }).then(function (response) {
                    console.log(response);
                    resolve(response);
                })
                    .catch(function (error) {
                        resolve(error);
                    });
            }else {
                axios.request({
                    url: 'https://gorest.co.in/public-api/users/'+opts.Id,
                    method: 'PATCH',
                    data: data,
                    headers: {'Authorization': 'Bearer v75N3W4fG2C9uIvXWwL4A6M0s-hHcWNMi4mj'}
                }).then(function (response) {
                    resolve(response);
                })
                    .catch(function (error) {
                        resolve(error);
                    });
            }
        });
    }

}

export default SampleStore;
