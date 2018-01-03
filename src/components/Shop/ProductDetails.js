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
            <div className='UserProfileHolder'>

                <div className='UserProfile'>
                    <Link to='/shop'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                    <img src={this.state.product.image} className='featuredProductImg' alt={'product'} />
                    <div><h1>{this.state.product.title}</h1><h1>${this.state.product.price}</h1></div>
                    <h3>{this.state.product.description}</h3>
                    <button>Add To Cart</button>
                </div>
            </div>
        )
    }
}
export default ProductDetails;