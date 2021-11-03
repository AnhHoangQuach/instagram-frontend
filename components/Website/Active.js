import React, { Component } from 'react';

class Active extends Component {
    render() {
        return (
            <div className="container">
                <p>These are apps and websites you've used Instagram to log into and have recently used. They can request info you chose to share with them.</p>
                <br></br>
                <p>You have not authorized any applications to access your Instagram account.</p>
            </div>
        );
    }
}

export default Active;