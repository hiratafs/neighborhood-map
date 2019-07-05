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
 
  

 
/*   searchYelp = (query) => {
    const configuration = {
      headers: {'Authorization': `Bearer ${apikey}` },
      params: { 
        location: 'Cuiaba',
        categories: 'restaurants',
        term: query
      }
    }
    axios.get(`${herokucors}${apiUrl}/search`, configuration)
    .then(response => {
      if(response.status === 200 && response.data.length !== 0) {

      }
    })
    .catch(err => console.log(err))
  } */

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
        animation: window.google.maps.Animation.DROP
        }
      })
      this.setState({placesinCuiaba:placesinCuiaba, markers: markers})
    })
  }


  render () {
    return (
      <div className="App">
          {/* MAP CONTAINER */}
            <Map {...this.state}/>          

          {/* LIST OF WHERE PLACES */}
          <aside className="filter">
              <Sidebar {...this.state}/>             
          </aside>
          
      </div>
    );
  }
}


export default App;
