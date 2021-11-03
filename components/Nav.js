import React, { Component } from 'react';
import '../css/Nav.css';

class Nav extends Component {
    render() {
        return (
            <div>
                <div className="navigation">
                    <div className="logo">
                        <img alt="Instagram" class="s4Iyt" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"></img>
                    </div>
                    <div className="navigation-search-container">
                        <i className="fa fa-search" />
                        <input className="search-field" type="text" placeholder="Search" />
                        <div className="search-container">
                            <div className="search-container-box">
                                <div className="search-results">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navigation-icons">
                        <a href="#" target="_blank" className="navigation-link">
                            <i class="fal fa-home-lg-alt"></i>
                        </a>
                        <a href="#" className="navigation-link">
                            <i className="fas fa-location-arrow"></i>
                        </a>
                        <a href="#" className="navigation-link">
                            <i class="far fa-plus-square"></i>
                        </a>
                        <a href="#" className="navigation-link">
                            <i className="find">
                                <svg aria-label="Find People" class="_8-yf5 " color="#262626" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm12.2 13.8l-7 14.8c-.1.3-.4.6-.7.7l-14.8 7c-.2.1-.4.1-.6.1-.4 0-.8-.2-1.1-.4-.4-.4-.6-1.1-.3-1.7l7-14.8c.1-.3.4-.6.7-.7l14.8-7c.6-.3 1.3-.2 1.7.3.5.4.6 1.1.3 1.7zm-15 7.4l-5 10.5 10.5-5-5.5-5.5z" fill-rule="evenodd"></path></svg>
                            </i>
                        </a>
                        <a className="navigation-link notifica">
                            <i className="far fa-heart"></i>
                        </a>
                        <a href="#" className="navigation-link">
                            <i className="far fa-user-circle" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;