import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className='Cart'>
                <h2>Your Cart is Empty</h2>
            </div>
        )
    }
}
export default Cart;