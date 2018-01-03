import React, { Component } from 'react';
import './Home.css';
import { Carousel } from 'react-responsive-carousel';

import axios from 'axios';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            photos: [],
            isFeatured: true,
            featuredPhotos: []
        }
    }
    componentDidMount() {

        axios.get('/getallproducts').then(res => {

            this.setState({
                products: res.data
            })
        })
        axios.get('/auth/me')
            .then(res => {
                console.log(res.data);
            })
        // getting all images
        axios.get('/getallimages').then(images => {
            const featuredPics = []
            images.data.map((photo, i) => {

                if (photo.featured) {

                    featuredPics.push(photo)
                    this.setState({
                        featuredPhotos: featuredPics
                    }, () => console.log('featured state', this.state.featuredPhotos))

                }


            })
            // this.setState({
            //     photos: images.data
            // }, () => console.log(this.state.photos))
        })

    }
    render() {
        // mapping over products and setting them on a variable
        const allProducts = this.state.products.map((product, i) => {
            if (product.featured) {
                return (
                    <div key={i} className={product.in_stock ? 'featuredProduct' : 'featuredProduct outOfStock'} >

                        <img src={product.image} alt={product.title} className='featuredProductImg' />
                        {product.title}
                    </div>
                )
            }

        })
        // map of all products to be rendered below
        const allPhotos = this.state.featuredPhotos.map((myImg, i) => {
            // console.log(myImg);

            return (
                <div key={i}>

                    <img src={myImg.image} alt={myImg.title} />
                    <p className="legend">{myImg.title}</p>
                </div>
            )


        })
        return (
            <div className='Home mainContent'>
                <div className='CarouselHolder'>
                    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={6000} showStatus={false}>
                        {allPhotos}

                    </Carousel>
                </div>
                {/* end of carousel holder */}
                <div className='seperatorDiv'><h2> FEATURED PRODUCTS </h2></div>

                <div className='allProductsHolder'>{allProducts}</div>
            </div>
        )
    }
}
export default Home;