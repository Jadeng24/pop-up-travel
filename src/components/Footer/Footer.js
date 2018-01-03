import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './Footer.css';
import facebook from './facebook.png';
import instagram from './instagram.png';
import pinterest from './pinterest.png';
import twitter from './twitter.png';
class Footer extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className='Footer'>

                <div className='footerItemHolder'>
                    <div className='footerItem'>
                        <h2>Pages</h2>
                        <div className='footerItemContent pageLinks'>
                            <Link to='/destinations'> Destinations</Link>
                            <Link to='/shop'> Shop </Link>
                            <Link to='/trailers'> Trailers </Link>
                            <Link to='/about'> About </Link>
                            <Link to='/contact'> Contact </Link>
                        </div>

                    </div>
                    <div className='footerItem followUs'>
                        <h2>Follow Us</h2>
                        <div className='footerItemContent socialLinks'>

                            <a href=''><img src={facebook} alt='Facebook' className='socialIcon facebook' /></a>
                            <a href='https://www.instagram.com/popuptravel/' target="_blank"><img src={instagram} alt='Instagram' className='socialIcon instagram' /></a>
                            <a href=''><img src={pinterest} alt='pinterest' className='socialIcon pinterest' /></a>
                            <a href=''><img src={twitter} alt='twitter' className='socialIcon twitter' /></a>

                        </div>
                    </div>
                    <div className='footerItem'>
                        <h2>Contact</h2>
                        <div className='footerItemContent'>
                            <p>(801)-838-2222</p>
                        </div>
                    </div>
                </div> {/*End of footerItemHolder*/}
            </div>
        )
    }
}
export default Footer;