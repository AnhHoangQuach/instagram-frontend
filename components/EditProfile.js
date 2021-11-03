import React, { Component } from 'react';
import '../css/EditProfile.css';

class EditProfile extends Component {
    render() {
        return (
            <div classnam="container">
                <div className="box-form">
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <img src="data:image/jpeg;base64,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" className="box-form_if-l_avt"></img>
                        </div>
                        <div className="box-form_if-r">
                            <h5>viethoangkudo</h5>
                            <a href="#" className="box-form_if-r-link text-decoration-none">Change Profile Photo</a>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Name</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                <div id="namelHelp" class="form-text">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                    You can only change your name twice within 14 days.</div>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Username</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                <div id="namelHelp" class="form-text">In most cases, you'll be able to change your username back to viethoangkudo for another 14 days. <span><a href="#" className="text-decoration-none">Learn More</a></span></div>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Website</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" placeholder="Website"></input>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Bio</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                <div id="namelHelp" class="form-text">
                                    <h6>Personal Information</h6>
                                    Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</div>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Email</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" placeholder="Email"></input>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Phone Number</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Gender</p>
                        </div>
                        <div className="box-form_if-r">
                            <form>
                                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Gender"></input>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                            <p>Similar Account Suggestions</p>
                        </div>
                        <div className="box-form_if-r">
                            <form className="d-inline-flex mt-15">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"></input>
                                <label class="form-check-label" for="flexCheckIndeterminate">
                                    <h6>Include your account when recommending similar accounts people might want to follow. <a href="#" className="text-decoration-none">[?]</a></h6>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className="box-form_if">
                        <div className="box-form_if-l">
                        </div>
                        <div className="box-form_if-r">
                            <form className="d-flex justify-content-between">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <a href="#" className="text-decoration-none">Temporarily disable my account</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;