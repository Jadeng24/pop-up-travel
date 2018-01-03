import React, { Component } from 'react';
import './ManageUsers.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ManageUsers extends Component {
    constructor() {
        super();

        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get('/getallusers').then(res => {
            this.setState({
                users: res.data
            })
        })
    }
    render() {
        const myUsers = this.state.users.map((user, i) => {
            return (
                <div key={i}>
                    <Link to={`/userprofile/${user.id}`}><div className='userBox'>
                        <img src={user.image} alt='noImage' />
                        <h2>{user.first_name} {user.last_name} </h2>
                    </div></Link>
                </div>
            )
        })
        return (
            <div className='ManageUsers'>
                <div className='goBacktoAdminBtn'>
                    <Link to='/admin'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                </div>
                <div>
                    {myUsers}
                </div>
            </div>
        )
    }
}
export default ManageUsers;