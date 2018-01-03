import React, { Component } from 'react';
import './Shop.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Shop extends Component {
    constructor() {
        super();

        this.state = {
            products: []
        }
    }
    componentDidMount() {
        axios.get('/getallproducts').then(products => {
            this.setState({
                products: products.data
            })
        })
    }

    render() {


        const allProducts = this.state.products.map((product, i) => {
            return (
                <div key={i} className='featuredProduct'>
                    <Link to={`/productdetails/${product.id}`}>
                        <img src={product.image} alt={product.title} className='featuredProductImg' />
                        {product.title}
                    </Link>
                </div>
            )
        })

        return (
            <div className='Shop mainContent'>
                <div className='productsHolder'>{allProducts}</div>
            </div>
        )
    }
}
export default Shop;