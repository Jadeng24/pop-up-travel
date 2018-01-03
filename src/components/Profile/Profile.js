import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import PlaceholderImg from './../Assets/person.png';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        axios.get('/auth/me')
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
    }
    render() {
        const user = this.state.user;
        return (
            <div className='Profile'>
                {/*===| LEFT PROFILE SECTION |=================================*/}
                <div className='leftProfile'>
                    {this.state.user.image ? <img src={user.image} alt='profile' className='profileImage' /> : <img src={PlaceholderImg} alt='profile' className='profileImage' />}
                    <Link to='/editprofile'><h2 className='ProfileBtn'>Edit Profile</h2></Link>
                    <a href='http://localhost:3002/auth/logout'><h3 className='ProfileBtn'><i className="fa fa-user-circle" aria-hidden="true"></i>LOG OUT</h3></a>
                </div>

                {/*===| RIGHT PROFILE SECTION |=================================*/}
                <div className='rightProfile'>
                    <div className='topRightProfile'>
                        <h1>{user.first_name} {user.last_name} </h1>
                        <h3><i class="fa fa-map-marker" aria-hidden="true"></i> {user.location_city}, {user.location_state} </h3>
                        <h3><i class="fa fa-envelope" aria-hidden="true"></i> {user.email} </h3>
                    </div>
                    <div className='bottomRightProfile'>
                        {/* need to first make a cart and db cart for each user with foreign key to users and products     */}
                        <h1>Orders</h1>
                    </div>
                </div>


            </div>
        )
    }
}
export default Profile;