import React, { Component } from 'react';
import './Admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../Assets/person.png';
class Admin extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            redirect: false
        }
        this.redirectMe = this.redirectMe.bind(this);
    }
    componentDidMount() {
        axios.get('/auth/me')
            .then(res => {
                if (res.data.is_admin) {
                    this.setState({
                        user: res.data
                    })
                }
                else {
                    this.myWaitTime();

                }
            })
    }
    myWaitTime() {
        if (this.state.redirect) {
            window.location.assign('http://localhost:3000/#/profile')
        }

    }
    redirectMe() {
        this.setState({
            redirect: true
        }, () => this.myWaitTime());

    }
    render() {
        const user = this.state.user;
        return (
            <div className='Admin'>

                {/* display if non-admin tries to view page     */}
                <div className={this.state.user.is_admin ? 'hideMe' : 'notAdmin'}>
                    <h1>Oops!</h1>
                    <h1>You must be an admin to view this page.</h1>
                    <button onClick={() => this.redirectMe()}>Okay</button>
                </div>

                {/* -----admin content----- */}
                <div className='adminNav'>

                    <Link to='/profile'><img src={this.state.user.image ? user.image : PlaceholderImage} alt='admin' className='adminPhoto' /></Link>
                    <h2>Welcome back {user.first_name}</h2>
                </div>
                <div className='adminContent'>
                    <h1 className='adminDashboardH1'>Dashboard</h1>
                    <div className='adminItemHolder'>
                        <Link to='/manageproducts'>
                            <div className='adminItem'>
                                <i className="fa fa-dropbox adminItemIcon" aria-hidden="true"></i>
                                <h2>Products</h2>
                            </div>
                        </Link>
                        <Link to='/managephotos'>
                            <div className='adminItem'>
                                <i className="fa fa-picture-o adminItemIcon" aria-hidden="true"></i>
                                <h2>Photos</h2>
                            </div>
                        </Link>
                        <Link to='/manageusers'>
                            <div className='adminItem'>
                                <i className="fa fa-users adminItemIcon" aria-hidden="true"></i>
                                <h2>Users</h2>
                            </div>
                        </Link>
                        <Link to='/managevehicles'>
                            <div className='adminItem'>
                                <i className="fa fa-road adminItemIcon" aria-hidden="true"></i>
                                <h2>Vehicles</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Admin;