import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Email from '../components/Email';
import EditProfile from '../components/EditProfile';
import Change_Pwd from '../components/Change_Pwd'; 
import Website from '../components/Website';
import Active from '../components/Website/Active';
import Expired from '../components/Website/Expired';
import Removed from '../components/Website/Removed';

class Dieuhuong extends Component {
    render() {
        return (
            <div>
                <Route exact path="/home" component={EditProfile}></Route>
                <Route exact path="/email" component={Email}></Route>
                <Route exact path="/change_pwd" component={Change_Pwd}></Route>
                <Route exact path="/website" component={Website}></Route>
                <Route exact path="/active" component={Active}></Route>
                <Route exact path="/expired" component={Expired}></Route>
                <Route exact path="/removed" component={Removed}></Route>
            </div>
        );
    }
}

export default Dieuhuong;