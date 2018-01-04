import React, { Component } from 'react';
import './ProductDetails.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
class ProductDetails extends Component {
    constructor() {
        super();

        this.state = {
            product: {}
        }
    }
    componentDidMount() {
        const productId = this.props.match.params.id;

        axios.get(`/detailedproduct/${productId}`)
            .then(product => {
                this.setState({
                    product: product.data[0]
                })
            })
    }
    render() {
        return (
            <div className='ProductDetailsHolder'>
                <Link to='/shop' className='ProductDetailsBackBtn' ><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                <div className='ProductDetails'>
                    <div className='ProductDetailsLeft'>

                        <img src={this.state.product.image} className='ProductDetailsImg' alt={'product'} />
                        
                    </div>
                    <div className='ProductDetailsRight'>
                        <h1 className='PDRightItem'>${this.state.product.price}</h1>
                        <h1 className='PDRightItem'>{this.state.product.title}</h1>
                        <h3 className='PDRightItem'>AVAILABILITY: {this.state.product.in_stock ? 'This item is available.' : 'This item is currently out of stock. We will have this item back in stock soon.'}</h3>
                        
                        <div className='divider'></div>
                        {this.state.size ? <h3>SIZE *</h3> : ''}
                        <div className='addToCartBtn'> ADD TO CART </div>

                        <h3 className='PDRightItem'>DETAILS <br/>{this.state.product.description}</h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetails;