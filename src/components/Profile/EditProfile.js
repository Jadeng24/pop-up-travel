import React, { Component } from 'react';
import './EditProfile.css';
import axios from 'axios';
import PlaceholderImg from '../Assets/person.png';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';

class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            userID: null,
            imgUrl: '',
            firstName: '',
            lastName: '',
            userEmail: '',
            city: '',
            USstate: ''

        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
    }
    componentDidMount() {
        axios.get('/auth/me')
            .then(res => {
                this.setState({
                    user: res.data,
                    userID: res.data.id,
                    imgUrl: res.data.image,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    userEmail: res.data.email,
                    city: res.data.location_city,
                    USstate: res.data.location_state
                }, () => console.log('state', this.state))
            })
    }


    //=====| Cloudinary & Dropzone |==================================
    //upload images from computer
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "kgjwyzim"); // Replace the preset name with your own
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post("https://api.cloudinary.com/v1_1/dfkw5isvi/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                // const fileURL = data.secure_url // You should store this URL for future references in your app
                axios.get(data.secure_url).then(res => {
                    // console.log(res);
                    this.setState({
                        imgUrl: res.config.url
                    })
                })
            })


        })
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }
    //change first,last,location etc onto state
    handleChange(prop, val) {
        this.setState({
            [prop]: val,

        })
    }
    // save info from edit profile
    saveInfo(id) {
        axios.put(`/api/saveuser/${id}`, this.state).then(res => {
            console.log('saveinfoRes', res)
        })
    }
    render() {
        const dropZoneStyles = {
            // border: 'solid 1px black',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

        }


        const TextFieldName = () => (
            <div>
                <TextField
                    hintText=''
                    floatingLabelText="First name"
                    value={this.state.firstName ? this.state.firstName : ''}
                    onChange={(e) => this.handleChange('firstName', e.target.value)}
                    style={{ width: '48%', maxWidth: '300px', minWidth: '100px', marginRight: '10px' }}
                />
                <TextField
                    hintText=''
                    floatingLabelText="Last name"
                    value={this.state.lastName ? this.state.lastName : ''}
                    onChange={(e) => this.handleChange('lastName', e.target.value)}
                    style={{ width: '48%', maxWidth: '300px', minWidth: '100px' }}
                /> <br />
            </div>
        )

        const TextFieldLocation_city = () => (
            <div>
                <TextField
                    hintText=''
                    floatingLabelText="City"
                    value={this.state.city ? this.state.city : ''}
                    onChange={(e) => this.handleChange('city', e.target.value)}
                    style={{ width: '48%', maxWidth: '300px', minWidth: '100px', marginRight: '10px' }}
                />
                <TextField
                    hintText=''
                    floatingLabelText="State"
                    value={this.state.USstate ? this.state.USstate : ''}
                    onChange={(e) => this.handleChange('USstate', e.target.value)}
                    style={{ width: '48%', maxWidth: '300px', minWidth: '100px' }}
                />
            </div>
        )

        const user = this.state.user;
        return (
            <div className='EditProfile'>

                {/*===| LEFT PROFILE SECTION |=================================*/}
                <div className='EditleftProfile'>

                    {/*===| CLOUDINARY |=================================*/}


                    {/* DROPZONE */}
                    <Dropzone
                        onDrop={this.handleDrop}
                        multiple
                        accept="image/*"
                        style={dropZoneStyles}>
                        <img src={this.state.imgUrl ? this.state.imgUrl : PlaceholderImg} alt='profileimg' className='EditprofileImage' />
                        <h2 className='dropZoneText'>{user.new_user ? 'UPLOAD PHOTO' : 'CHANGE PHOTO'}</h2>
                    </Dropzone>

                </div>

                {/*===| RIGHT PROFILE SECTION |=================================*/}
                <div className='EditrightProfile'>
                    <div className='EdittopRightProfile'>
                        {TextFieldName()}
                        <h3>{TextFieldLocation_city()} </h3>
                        <h3>{user.email}</h3>
                    </div>
                    <div className='EditbottomRightProfile'>
                        <Link to={'/loading'}><div onClick={() => this.saveInfo(user.id)}><h3 className='ProfileBtn'> {user.new_user ? 'Join now' : 'Save'} </h3></div></Link>
                    </div>
                </div>


            </div>
        )
    }
}
export default EditProfile;