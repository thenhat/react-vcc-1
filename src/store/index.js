import Store from '@core/model/store';
import {action, observable} from '@core/common/mobx';
import uuid from '@core/common/uuid';


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
            email: 'thenhat@gmail',
            status: 'Active'

        }, {
            id: 2,
            name: 'Nguyen The Quyen',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail',
            status: 'Inactive'

        }, {
            id: 3,
            name: 'Nguyen Hoang Nhi',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail',
            status: 'Active'

        }, {
            id: 4,
            name: 'Nguyen The Khai',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail',
            status: 'Active'

        }, {
            id: 5,
            name: 'Nguyen Thi Ha',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail',
            status: 'Inactive'

        }, {
            id: 6,
            name: 'Nguyen Thi Chinh',
            age: 22,
            gtinh: 'Female',
            email: 'thequyen@gmail',
            status: 'Inactive'

        }, {
            id: 7,
            name: 'Nguyen Van Thinh',
            age: 21,
            gtinh: 'Other',
            email: 'vannam@gmail',
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
                console.log(todo);
                todo.name = opts.Name;
                todo.age = opts.Age;
                todo.gtinh = opts.Gtinh;
                todo.email = opts.Email;
                todo.status = opts.Status;
                console.log(todo);
                resolve(todo.id);
            }
        });
    }

    @action updateTodo(data = {}) {
        return new Promise((resolve) => {
            const todo = this.listTodo.find(t => t.id == data.id);
            todo.name = data.name;
            todo.age = data.age;
            todo.gtinh = data.gtinh;
            todo.email = data.email;
            todo.status = data.status;

            resolve('Done');
        })
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
}

export default SampleStore;
