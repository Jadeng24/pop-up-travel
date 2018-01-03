import React, { Component } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
class UserProfile extends Component {
    constructor() {
        super();

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.id;

        axios.get(`/detailedprofile/${userId}`)
            .then(user => {
                this.setState({
                    user: user.data[0]
                })
            })
    }
    removeUser(id) {
        if (!this.state.user.is_admin) {
            axios.delete(`/removeuser/${id}`).then(
                window.location.assign('http://localhost:3000/#/manageusers')
            )
        }
        else {
            alert('You may not remove an admin');
        }

    }
    render() {
        return (
            <div className='UserProfileHolder'>

                <div className='UserProfile'>
                    <div className='UserProfileHeader'>
                        <Link to='/manageusers'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>

                        <h1>{this.state.user.first_name} {this.state.user.last_name}</h1>

                        <h2 className='removeUserBtn' onClick={() => this.removeUser(this.state.user.id)}>Remove User</h2>

                    </div>

                    <img src={this.state.user.image} alt={this.state.user.first_name} />
                    <div className='userprofileInfo'>
                        <h2>{this.state.user.location_city}, {this.state.user.location_state}</h2>
                        <h3>{this.state.user.email}</h3>
                    </div>

                </div>
            </div>
        )
    }
}
export default UserProfile;