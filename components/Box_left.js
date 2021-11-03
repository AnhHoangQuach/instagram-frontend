import React, { Component } from 'react';
import '../css/Box_left.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
class Box_left extends Component {
    render() {
        return (
            <div className="container box-left">
                <div className="row">
                    <div className="">
                        <div className="box-left-top border border-secondary">
                            <ul>
                                <li className="box-left-top-li"><NavLink to="/home" activeClassName="selected">Edit Profile</NavLink></li>
                                <li className="box-left-top-li"><NavLink to="/change_pwd" activeClassName="selected">Change Password</NavLink></li>
                                <li className="box-left-top-li"><NavLink to="/website" activeClassName="selected">App and Websites</NavLink></li>
                                <li className="box-left-top-li"><NavLink to="/email" activeClassName="selected">Emails and SMS</NavLink></li>
                                <li className="box-left-top-li"><a href="#">Push Notifications</a></li>
                                <li className="box-left-top-li"><a href="#">Manage Contacts</a></li>
                                <li className="box-left-top-li"><a href="#">Privacy and Security</a></li>
                                <li className="box-left-top-li"><a href="#">Login Activity</a></li>
                                <li className="box-left-top-li"><a href="#">Emails from Instagram</a></li>
                                <li className="box-left-top-li"><a href="#"><p className="text-primary fw-bold">Switch to Professional Account</p></a></li>
                            </ul>
                        </div>
                        <div className="box-left-bottom border-bottom border-start border-end border-secondary">
                            <div className="box-left-bottom-content">
                                <span>FACEBOOK</span>
                                <i className="fab fa-facebook" />
                                <i className="fab fa-facebook-messenger" />
                                <i className="fab fa-whatsapp" />
                                <p className="text-primary fw-bold"><a href="#">Accounts Center</a></p>
                                <p>Control settings for connected experiences across Instagram,
                                    the Facebook app and Messenger,
                                    including story and post sharing and logging in.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Box_left;