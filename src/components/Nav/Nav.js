import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Logo from '../Assets/logo.png';
import axios from 'axios';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            Modal: false,
            user: {}
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        axios.get('/auth/me')
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
    }
    toggleModal() {
        this.setState({
            Modal: !this.state.Modal
        }, () => console.log('Modal: ' + this.state.Modal))
    }
    closeModal() {
        this.setState({
            Modal: false
        })
    }
    render() {
        return (
            <div className='Nav'>
                {/* top section of nav */}
                <div className='topSectionNav'>
                    <div className={this.state.user.is_admin ? 'topNavItem' : 'hideMe'}>

                        <Link to='/admin'>
                            <h3 className='adminNavItem'>
                                <i className="fa fa-id-card" aria-hidden="true"></i>
                                ADMIN
                            </h3>
                        </Link>
                    </div>

                    <div className='topNavItem'>

                        <Link to='/cart'>
                            <h3>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i> CART
                            </h3>
                        </Link>
                    </div>
                    <div className='topNavItem'>

                        {this.state.user.id ? <Link to='/profile'><h3><i className="fa fa-user-circle" aria-hidden="true"></i> PROFILE</h3></Link> : <a href={process.env.REACT_APP_LOGIN}><h3><i className="fa fa-user-circle" aria-hidden="true"></i> LOG IN </h3></a>}
                    </div>
                </div>

                {/* left side of nav */}
                <div className='bottomSectionNav'>
                    <div className='navGroup sideNav'>
                        <Link to='/destinations'> Destinations</Link>
                        <Link to='/shop'> Shop </Link>
                    </div>
                    <div className='mobileNav'></div>
                    {/* center of nav */}
                    <Link to='/'><div className='logoNav centerNav' onClick={this.closeModal}>
                        <img src={Logo} alt='logo' className='logoImg' />
                        PopUp Travel
                </div></Link>
                    {/* right side of nav */}
                    <div className='navGroup sideNav'>
                        <Link to='/vehicles'> Vehicles </Link>
                        <Link to='/about'> About </Link>
                        <Link to='/contact'> Contact </Link>
                    </div>


                    {/* drop down menu button */}
                    <div className='dropDownMenuBtn' onClick={this.toggleModal}>
                        <div className={this.state.Modal ? 'bar bar1 animateBar1' : 'bar bar1'}></div>
                        <div className={this.state.Modal ? 'bar midBar1 animateMidBar1' : 'bar midBar1'}></div>
                        <div className={this.state.Modal ? 'bar midBar2 animateMidBar2' : 'bar midBar2'}></div>
                        <div className={this.state.Modal ? 'bar bar3 animateBar3' : 'bar bar3'}></div>

                    </div>
                </div>




                <div className={this.state.Modal ? 'modal' : ' modal hide'} onClick={this.toggleModal}>
                    <div className='modalItemsHolder'>
                        <Link to='/destinations'> Destinations</Link>
                        <Link to='/shop'> Shop </Link>
                        <Link to='/vehicles'> Vehicles </Link>
                        <Link to='/about'> About </Link>
                        <Link to='/contact'> Contact </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Nav;