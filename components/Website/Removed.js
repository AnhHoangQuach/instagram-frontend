import React, { Component } from 'react';

class Removed extends Component {
    render() {
        return (
            <div className="container">
                <p>These are apps and websites you removed from your account. 
                    This means they may still have information you previously shared, but can't make additional requests. You can ask an app to delete your information. To do it, review their Privacy Policy for details and contact information. 
                    If you contact an app, they may need your User ID.
                </p>
                <br></br>
                <p>You have no removed applications that had access to your Instagram account.</p>
            </div>
        );
    }
}

export default Removed;