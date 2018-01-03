import React, { Component } from 'react';
import './Destinations.css';
import USAMap from 'react-usa-map';
import axios from 'axios';

class Destinations extends Component {
    constructor() {
        super();

        this.state = {
            selectedST: 'AllStates',
            photos: []
        }
        this.mapHandler = this.mapHandler.bind(this);
    }

    componentDidMount() {
        axios.get('/getallimages').then(images => {
            this.setState({
                photos: images.data
            }, () => console.log(this.state.photos))
        })
    }
    mapHandler = (event) => {
        var selected = event.target.dataset.name
        // console.log(selected);
        this.setState({
            selectedST: selected
        })
    }
    statesFilling = () => {
        return {
            [this.state.selectedST]: {
                fill: "#ddd",

                // clickHandler: () => alert("Custom callback for the UT state")
            },

        };
    };
    render() {
        const viewImagesAllStates = this.state.photos.map((photo, i) => {
            if (this.state.selectedST === 'AllStates') {
                return (
                    <div key={i} className='destinationImageHolder'>

                        <img src={photo.image} alt={photo.title} className='destinationImage' />
                        <h2 className='destinationTitle'>{photo.title}</h2>

                    </div>
                )
            }

        })
        const myImagesByState = this.state.photos.map((photo, i) => {
            if (photo.location_state === this.state.selectedST) {
                return (
                    <div key={i} className='destinationImageHolder'>

                        <img src={photo.image} alt={photo.title} className='destinationImage' />
                        <h2 className='destinationTitle'>{photo.title}</h2>

                    </div>
                )
            }

        })
        return (
            <div className='Destinations mainContent'>
                <h1>View images by State</h1>
                <h3 className='viewAllStatesBtn' onClick={() => this.setState({ selectedST: 'AllStates' })}>View all Images</h3>
                <div className='myMap'>

                    <USAMap customize={this.statesFilling()} onClick={this.mapHandler} defaultFill='black' width={400} />
                </div>

                <div className='destinationsImagesHolder'>
                    {this.state.selectedST === 'AllStates' ? viewImagesAllStates : myImagesByState}
                </div>


            </div>
        )
    }
}
export default Destinations;