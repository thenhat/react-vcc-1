import React, {Component} from '@core/common/react';
import {inject, observer} from '@core/common/mobx-react';
import { BrowserRouter, Route, Link  } from "react-router-dom";


import '../../../styles/todo.scss';
import Baimoi from "../../todo2/components/Baimoi";
import View from "../../todo2/components/View";
import Baicu from "./Baicu";

@inject('store')
@observer
class Main extends Component {

    constructor(props) {
        super(props);
    }

    render()  {
        return  (
            <BrowserRouter>

                <div>
                    <ul>
                        <li>
                            <Link to="/">Bai Cu</Link>
                        </li>
                        <li>
                            <Link to="/baimoi">Bai Moi</Link>
                        </li>
                        <li>
                            <Link to="/view">View</Link>
                        </li>
                    </ul>

                    <hr />
                    <div styleName="main-route-place">
                        <Route exact path="/" component={Baicu} />
                        <Route path="/baimoi" component={Baimoi} />
                        <Route path="/view" component={View} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;