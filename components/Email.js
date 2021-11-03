import React, { Component } from 'react';
import '../css/Emails.css';

class Email extends Component {
    render() {
        return (
            <div>
                <div className="container box">
                    <h4 className="box-sub">Subscribe to: </h4>
                    <form>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Feedback Emails</label>
                            <p><small className="form-text text-muted">Give feedback on Instagram</small></p>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Reminder</label>
                            <p><small className="form-text text-muted">Get notifications you may have missed.</small></p>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Products Email</label>
                            <p><small className="form-text text-muted">Get tips about Instagram's tools.</small></p>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">News emails</label>
                            <p><small className="form-text text-muted">Learn about new Instagram features.</small></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Email;