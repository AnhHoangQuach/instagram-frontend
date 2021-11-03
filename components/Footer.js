import React, { Component } from 'react';
import '../css/Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row footer">
                    <ul className="footer-top">
                        <li><a>Meta</a></li>
                        <li><a>About</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Jobs</a></li>
                        <li><a>Help</a></li>
                        <li><a>API</a></li>
                        <li><a>Privacy</a></li>
                        <li><a>Terms</a></li>
                        <li><a>Top Accounts</a></li>
                        <li><a>Hashtags</a></li>
                        <li><a>Locations</a></li>
                        <li><a>Instagram Lite</a></li>
                    </ul>
                    <p className="text-center">© 2021 Instagram from Facebook</p>
                </div>
            </div>
        );
    }
}

export default Footer;