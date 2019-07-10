import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './components/Map'
import Sidebar from './components/Sidebar'
//import imgNotAvailable from './img/business_large_square.png'
import escapeRegExp  from 'escape-string-regexp'


//YELP API KEY
const apikey = 'N9uoPrrbgvV9bZzZDgt0EfHLfVIpgtWXYpwno1jTgJbvbSfD1_1dN589w6Egvkp_QN-TKdUMtGohdENnIlRlXQu6sSd2b5_MhyUXmUT6af7mTLlneezTfR36InUSXXYx';

//BASE URLs
const herokucors = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = "https://api.yelp.com/v3/businesses";



class App extends React.Component {
  
  constructor() {
    super()

    this.state = {
      placesinCuiaba: [],
      markers: [],
      map: {},
      filteredresults: [],
      query: '',

      updateState: item => {
        this.setState(item)
      }
    }
  }
  

  updateQuery = (event) => {
      this.setState({query: event.target.value});
      let filteredresults;
    
   if(this.state.query && this.state.query.length !== 0 ) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      filteredresults = this.state.markers.filter((local) => match.test(local.title));
      this.state.updateState({filteredresults: filteredresults})
   } else {
      
   }    
    
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
        limit: 10
      }
    }
    axios.get(`${herokucors}${apiUrl}/search`, configuration)
    .then(response => {
      let placesinCuiaba = response.data.businesses;
      //console.log(placesinCuiaba)
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
            <Map {...this.state} showInfoWindow={this.showInfoWindow} tabIndex="0" role="application" />          

          {/* LIST OF WHERE PLACES */}
          <aside className="filter">
              <Sidebar {...this.state} handleClickList={this.handleClickList} updateQuery={this.updateQuery} tabIndex="0"/>             
          </aside>
          
      </div>
    );
  }
}


export default App;
