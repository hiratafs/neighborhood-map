import React from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map'
import Search from './Search'
import imgNotAvailable from './img/business_large_square.png'

//GOOGLE MAP ID
const GMAP_ID = 'AIzaSyB9FdQGy5y1yZLQcG20qvf2FwVeVu6UMsM';

//YELP API KEY
const apikey = 'N9uoPrrbgvV9bZzZDgt0EfHLfVIpgtWXYpwno1jTgJbvbSfD1_1dN589w6Egvkp_QN-TKdUMtGohdENnIlRlXQu6sSd2b5_MhyUXmUT6af7mTLlneezTfR36InUSXXYx';

//
const herokucors = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = "https://api.yelp.com/v3/businesses/search";



/* CONFIGURATION TO RETRIEVE YELP DATA */
const configuration = {
  headers: {
    'Authorization': `Bearer ${apikey}`
  },
  params: { 
    location: 'Cuiaba',
    categories: 'restaurants'
  }
}

class App extends React.Component {
  
  state = {
    cuiabaPlaces: [],
    markers: [],
  }

  
  //RENDER MAP
  componentDidMount() {
    this.retrieveYelpData();
  }

  //FUNCTION TO RETRIEVE YELP DATA WITH AXIOS
  retrieveYelpData = () => {
    axios.get(`${herokucors}${apiUrl}`, configuration)
    .then(response => {
      if(response.status === 200) {
        this.setState({cuiabaPlaces: response.data}, this.showMap());
        console.log(this.state.cuiabaPlaces.businesses)
      }
    })
    .catch(err => console.log(err))
  }

  //FUNCTION TO SHOW MAP ON THE BROWSER
  showMap = () => {
    installMap(`https://maps.googleapis.com/maps/api/js?key${GMAP_ID}&callback=initMap`);
    window.initMap = this.initMap
  }

  //MAP CONFIGURATION 
 initMap = () => {
      let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -15.5926919, lng: -56.0903047},
      zoom: 13.75,
      mapTypeControl: false
    });

    //Array for Yelp markers
    let YelpMarkers = [];

    //Map array cuiabaPlaces from state then create a marker for each place
    this.state.cuiabaPlaces.businesses.map(local => {
      let marker = new window.google.maps.Marker({
        position: {lat: local.coordinates.latitude, lng: local.coordinates.longitude},
        map: map,
        title: local.name,
        animation: window.google.maps.Animation.DROP
      })

      //Infowindow design
      let imgReview = local.image_url && local.image_url !== '' ? local.image_url : imgNotAvailable;

      let contentString = `<div className="infowindow">` +
      `<h1> ${local.name} </h1>` +
      `<img style='max-width:200px' src=${imgReview} alt=${local.name} />` +
      `<p><strong>Address:</strong> ${local.location.display_address} </p>` +
      `<p><strong>Phone:</strong> ${local.phone} </p>` +
      `<p><strong>Price:</strong> ${local.price} </p>` +
      '</div>'

   
      //Insert markers into YelpMarkers array
      YelpMarkers.push(marker);

      //Add a event listener to each marker and open an infowindow
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow, contentString)
      })
    })

   

    let largeInfowindow = new window.google.maps.InfoWindow({maxWidth:250});
    //let bounds = new window.google.maps.LatLngBounds();

          
       
    //map.fitBounds(bounds);

   // FUNCTION TO DISPLAY INFOWINDOW
    function populateInfoWindow(marker, infowindow, data) {
      if(infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent(data);
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
          infowindow.setMap(null)
        })
      }
    }   

  }   


  render () {
    return (
      <div className="App">
          {/* MAP CONTAINER */}
            <Map />          
          
          {/* LIST OF WHERE TO EAT IN CUIABA */}
          <aside className="filter">
              <Search />
                <div className="places-options">
                  <ul>
                      <li><a placename={this.state.cuiabaPlaces.name} href="http://localhost:3000">Sesc Arsenal</a></li>
                      <li><a placename={this.state.cuiabaPlaces.name} href="http://localhost:3000">Parque das Águas</a></li>
                      <li><a placename={this.state.cuiabaPlaces.name} href="http://localhost:3000">Arena Pantanal</a></li>
                      <li><a placename={this.state.cuiabaPlaces.name} href="http://localhost:3000">Parque Tia Nair</a></li>
                      <li><a placename={this.state.cuiabaPlaces.name} href="http://localhost:3000">Feira do Porto</a></li>
                  </ul>
                </div>
          </aside>
          
      </div>
    );
  }
}

// INSERT GOOGLE MAPS API SCRIPT
function installMap (url) {
    let getfirstscript = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    getfirstscript.parentNode.insertBefore(script, getfirstscript);
}

export default App;
