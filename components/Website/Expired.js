import React, { Component } from 'react';

class Expired extends Component {
    render() {
        return (
            <div className="container">
                <p>These are apps and websites you've used Instagram to log into and may not have used in a while. They may still have information you previously shared, but their ability to make additional requests for private info has expired. You can ask an app to delete your information. To do it, review their Privacy Policy for details and contact information.
                    If you contact an app, they may need your User ID.</p>
                <br></br>
                <p>You have no expired applications that had access to your Instagram account.</p>
            </div>
        );
    }
}

export default Expired;