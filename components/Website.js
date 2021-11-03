import React, { Component } from 'react';
import Active from '../components/Website/Active';
import  '../css/Website.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Website extends Component {
    render() {
        return (
            <div>
                <div className="container box">
                    <h4 className="text-left">Apps and Websites</h4>
                    <ul className="d-flex">
                        <li><Link to="/active">Active</Link></li>
                        <li><Link to="/expired">Expired</Link></li>
                        <li><Link to="removed">Removed</Link></li>
                    </ul>
                    <br></br>
                    <Active/>
                </div>
            </div>
        );
    }
}

export default Website;