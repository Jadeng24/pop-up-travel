import React, { Component } from 'react';
import './Loading.css';
import axios from 'axios';
class Loading extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillMount() {
        setTimeout(this.myWaitTime, 1800);
    }


    myWaitTime() {
        axios.get('/auth/me').then(res => {
            console.log(res.data);


            if (res.data.is_admin) {

                window.location.assign('http://localhost:3000/#/admin')


            } else {
                if (res.data.new_user) {

                    window.location.assign('http://localhost:3000/#/editprofile')


                }
                else {

                    window.location.assign('http://localhost:3000/#/')


                }
            }
        })

    }
    render() {
        return (
            <div className='Loading'>
                <h1>Loading . . .</h1>
                <div class="loader">
                    <div class="loader2">
                        <div class="loader3">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loading;