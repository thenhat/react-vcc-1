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
import {Line,Doughnut,Pie,chart,Bar,Bubble,HorizontalBar} from 'coreplugin/core/ui/chart';

const data6 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const data2 = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 130],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const data3 = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const data4 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
let data ={};

const data5 = {
    labels: ['January'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{x:10,y:20,r:5}]
        }
    ]
};

const data7 = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const legendOpts = {
    display: true,
    position: 'top',
    fullWidth: true,
    reverse: false,
    labels: {
        fontColor: 'rgb(255, 99, 132)'
    }
};
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
            Gender: '',
            displayName: 'LineExample',

        };
        this.getData();

        this.getDataPaging(1);
    }


    getInitialState() {
        return {
            legend: legendOpts
        }
    }

    applyLegendSettings() {
        const { value } = this.legendOptsInput;

        try {
            const opts = JSON.parse(value);
            this.setState({
                legend: opts
            });
        } catch(e) {
            alert(e.message);
            throw Error(e);
        }
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

    getData =() =>{
        const {store} = this.props;
        var chartX = [];
        var chartY = [];

        store.callChartApi().then(function (x) {
            var x1;
            var y1;
            for (var i = 0; i < x.data.length; i++) {
                x1 = new Date(x.data[i].session_date).getTime();
                x.data[i].session_date =x1;
            }
            x.data.sort(function(a, b){return a.session_date - b.session_date});

            for (var i = 0; i < x.data.length; i++) {
                x1 = new Date(x.data[i].session_date).toLocaleDateString();
                y1 = Number(x.data[i].score);
                chartX.push(x1);
                chartY.push(y1)
            }
            console.log(chartX);
            console.log(chartY)

            data = {
                labels: chartX,
                datasets: [
                    {
                        label: 'My First dataset',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: chartY
                    }
                ]
            };

        });
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
                    <div styleName="Loading"> <Loading visible={this.state.isLoading}  /></div>
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
                                errors: {},
                                message:''
                            })
                        }}>

                        <div>
                            <p styleName="message">{this.state.message}</p>
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
                    <div>
                        <h2>Line Example</h2>
                        <Line data={data} />
                    </div>

                    <div>

                        <h2>Line Example</h2>

                        <Line data={data2} />

                    </div>

                    <div>

                        <h2>Line Example</h2>

                        <Line data={data3} />

                    </div>
                    <div>
                        <h2>Bar Example (custom size)</h2>
                        <Bar
                            data={data4}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>

                    <div>
                        <h2>Bubble Example</h2>
                        <Bubble data={data5} />
                    </div>

                    <div>
                        <h2>Horizontal Bar Example</h2>
                        <HorizontalBar data={data6} />
                    </div>

                    <div>
                        <h2>Legend Options Example</h2>
                        <div>
                            <button onClick={this.applyLegendSettings}>Apply legend settings</button>
                        </div>
                        <Pie data={data7} legend={this.state.legend} redraw />
                    </div>
                </div>
            </div>
        )
    }
}


export default Baicu;
