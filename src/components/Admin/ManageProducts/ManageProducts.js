import React, { Component } from 'react';
import './ManageProducts.css';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PlaceholderImg from '../../Assets/noProduct.png';
import { Link } from 'react-router-dom';
class ManageProducts extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            title: '',
            category: '',
            description: '',
            imgUrl: '',
            price: null,
            in_stock: null,
            tab: 'a'
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.InOutofStock = this.InOutofStock.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.featuredProduct = this.featuredProduct.bind(this);
    }
    componentDidMount() {
        // getting all products
        axios.get('/getallproducts').then(products => {
            this.setState({
                products: products.data
            })
        })
    }
    handleTabChange = (value) => {
        this.setState({
            tab: value,
        });
    };
    handleDrop = files => {
        const uploaders = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "kgjwyzim");
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
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


    handleChange(prop, val) {
        this.setState({
            [prop]: val,

        })
    }

    handleInStock = (event, index, value) => this.setState({ in_stock: value });

    saveProduct() {
        if (this.state.title && this.state.price && this.state.description) {
            axios.post('/addproduct', this.state).then(() => {
                axios.get('/getallproducts').then(products => {
                    this.setState({
                        products: products.data
                    })
                })
            })
        } else {
            alert('Please add a title, price, in stock, and description.')
        }

    }

    removeProduct(id) {
        axios.delete(`/removeproduct/${id}`).then(
            axios.get('/getallproducts').then(products => {
                this.setState({
                    products: products.data
                })
            }))
    }
    getProducts() {
        axios.get('/getallproducts').then(products => {
            this.setState({
                products: products.data
            })
        })
    }
    InOutofStock(myId, myStatus) {

        const notStatus = !myStatus;
        console.log('id', myId, 'status', notStatus)
        axios.put(`/productstatus/${myId}/${notStatus}`).then(
            axios.get('/getallproducts').then(products => {
                this.setState({
                    products: products.data
                })
            })
        )
    }
    featuredProduct(myId, myFeatured) {
        console.log('hi')
        const notFeatured = !myFeatured;
        console.log('id', myId, 'featured', notFeatured)
        axios.put(`/productfeatured/${myId}/${notFeatured}`).then(
            axios.get('/getallproducts').then(products => {
                this.setState({
                    products: products.data
                })
            })
        )
    }
    render() {


        // styles for tab and addproduct / view products holder
        const tabStyles = {
            headline: {
                fontSize: 24,
                padding: 20,
                marginBottom: 12,
                fontWeight: 400,
            },
        };
        // dropzone styles
        const dropZoneStyles = {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }
        const TextFieldsAddProducts = () => (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <TextField
                    hintText=''
                    floatingLabelText="Category"
                    value={this.state.category ? this.state.category : ''}
                    onChange={(e) => this.handleChange('category', e.target.value)}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /><br />
                <TextField
                    hintText=''
                    floatingLabelText="Title"
                    value={this.state.title ? this.state.title : ''}
                    onChange={(e) => this.handleChange('title', e.target.value)}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /><br />
                <TextField
                    hintText=''
                    floatingLabelText="Description"
                    value={this.state.description ? this.state.description : ''}
                    onChange={(e) => this.handleChange('description', e.target.value)}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /> <br />
                <TextField
                    floatingLabelText='Price'
                    label="Price"
                    value={this.state.price ? this.state.price : 0}
                    onChange={(e) => this.handleChange('price', e.target.value)}
                    type="number"
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                /><br />
                <SelectField
                    floatingLabelText="In Stock"
                    value={this.state.in_stock}
                    onChange={this.handleInStock}
                    style={{ width: '100%', maxWidth: '500px', minWidth: '100px' }}
                >
                    <MenuItem value={null} primaryText="" />
                    <MenuItem value={true} primaryText="Yes" />
                    <MenuItem value={false} primaryText="No" />

                </SelectField>
            </div>
        )

        // map of all products to be rendered below
        const allProducts = this.state.products.map((product, i) => {
            return (
                <div key={i} className='manageProductItem'>
                    <div className='manageProductHeader'>
                        {/* change if product is in stock or out of stock */}
                        <div className='manageInStock' onClick={() => this.InOutofStock(product.id, product.in_stock)}>{product.in_stock ? <h2 className='inStock manageInStock'>In Stock</h2> : <h2 className='outOfStockBtn manageInStock'>Out of Stock</h2>}</div>
                        {/* change if product is featured or not featured */}
                        <div className='manageInStock' onClick={() => this.featuredProduct(product.id, product.featured)}>{product.featured ? <h2 className='inStock manageInStock'>Featured</h2> : <h2 className='outOfStockBtn manageInStock'>Not Featured</h2>}</div>
                        {/* remove product from db */}
                        <i className="fa fa-trash" aria-hidden="true" onClick={() => this.removeProduct(product.id)}></i>
                    </div>

                    <img src={product.image} alt={product.title} className='manageProductImg' />
                    <h2>{product.title}</h2>

                </div>
            )
        })



        //=====| RETURN |==================================
        return (
            <div className='ManageProducts'>
                <div>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                    >


                        <Tab label="Manage Products" value="a" onClick={() => this.getProducts()}
                        >
                            <Link to='/admin'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                            <div className='tabItemHolder'>

                                <h2 style={tabStyles.headline}>View all Products</h2>
                                <div className='manageProductsHolder'>{allProducts}</div>
                            </div>
                        </Tab>
                        <Tab label="Add a Product" value="b" className='tabButton'>
                            <Link to='/admin'><i className="fa fa-chevron-left" aria-hidden="true"></i></Link>
                            <div className='tabItemHolder'>
                                {/*===| CLOUDINARY |======================*/}
                                <div className='cloudinary'>
                                    <Dropzone
                                        onDrop={this.handleDrop}
                                        multiple
                                        accept="image/*"
                                        style={dropZoneStyles}>
                                        <img src={this.state.imgUrl ? this.state.imgUrl : PlaceholderImg} alt='profileimg' className='EditprofileImage' />
                                        <h2 className='dropZoneText'>{this.state.imgUrl ? 'Change Product Image' : 'Upload Product Image'}</h2>
                                    </Dropzone>
                                </div>
                                {TextFieldsAddProducts()}
                                <button className='addProductBtn' onClick={() => this.saveProduct()}>Save</button>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        )
    }
}
export default ManageProducts;