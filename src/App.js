import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './components/Map'
import Sidebar from './components/Sidebar'
//import imgNotAvailable from './img/business_large_square.png'


//YELP API KEY
const apikey = 'N9uoPrrbgvV9bZzZDgt0EfHLfVIpgtWXYpwno1jTgJbvbSfD1_1dN589w6Egvkp_QN-TKdUMtGohdENnIlRlXQu6sSd2b5_MhyUXmUT6af7mTLlneezTfR36InUSXXYx';

//BASE URLs
const herokucors = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = "https://api.yelp.com/v3/businesses";



class App extends React.Component {
  
  state = {
    placesinCuiaba: [],
    markers: [],
    map: {}
  }

  //RENDER MAP
  componentDidMount() {
    this.getAllLocations()
  }
 
  hideInfoWindow = () => {
    const markers = this.state.markers.map(marker => {
      marker.infowindowIsOpen = false;
      return marker
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  showInfoWindow = marker => {
    this.hideInfoWindow();
    marker.infowindowIsOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)})
    this.searchLocation(marker.id)
  }


  searchLocation = (localID) => {
    let configuration = {
      headers: {'Authorization': `Bearer ${apikey}`}
    }
    axios.get(`${herokucors}${apiUrl}/${localID}`, configuration)
    .then(response => {return response.data})
    
  }

  handleClickList = local => {
    const marker = this.state.markers.find(marker => marker.id === local.id);
    this.showInfoWindow(marker)
  }


  // GET ALL LOCATIONS FUNCTION
  getAllLocations = () => {
    const configuration = {
      headers: {'Authorization': `Bearer ${apikey}` },
      params: { 
        location: 'Cuiaba',
        categories: 'pizza,restaurants,steak',
      }
    }
    axios.get(`${herokucors}${apiUrl}/search`, configuration)
    .then(response => {
      let placesinCuiaba = response.data.businesses;
      let markers = placesinCuiaba.map(local => {
        return {
        lat: local.coordinates.latitude,
        lng: local.coordinates.longitude,
        title: local.name,
        animation: window.google.maps.Animation.DROP,
        id: local.id,
        address: local.location.address1,
        phone: local.phone,
        rating: local.rating,
        infowindowIsOpen: false,
        markerIsVisible: true,
        image: local.image_url
        }
      })
      this.setState({placesinCuiaba:placesinCuiaba, markers: markers})
    })
  }


  render () {
    return (
      <div className="App">
          {/* MAP CONTAINER */}
            <Map {...this.state} showInfoWindow={this.showInfoWindow}/>          

          {/* LIST OF WHERE PLACES */}
          <aside className="filter">
              <Sidebar {...this.state} handleClickList={this.handleClickList}/>             
          </aside>
          
      </div>
    );
  }
}


export default App;
