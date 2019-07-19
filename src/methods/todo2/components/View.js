import React, {Component} from '@core/common/react';
import {inject, observer} from '@core/common/mobx-react';

import '../../../styles/todo.scss';
import Baimoi from "./Baimoi";

@inject('store')
@observer
class View extends Component {
    render() {
        const {store} = this.props;
        const {Baimoi} = this.props;
        return (
            <div styleName="todo-wrapper">
                <div styleName="todo-list">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{index + 1}</td>
                        </tr>
                        <tr>
                            < th> FirstName</th>
                            <td>{Baimoi.d.first_name}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{Baimoi.d.last_name}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{Baimoi.d.gender}</td>
                        </tr>
                        <tr>
                            <th>Dob</th>
                            <td>{Baimoi.d.dob}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{Baimoi.d.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{Baimoi.d.phone}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{Baimoi.d.website}</td>
                        </tr>
                        <tr>
                            <th>Avatar</th>
                            <td>{Baimoi.d.avatar}</td>
                        </tr>
                        <tr>
                            <th>About</th>
                            <td>{Baimoi.d.about}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{Baimoi.d.address}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{Baimoi.d.status}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default View;

