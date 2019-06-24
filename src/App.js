import React from 'react';
import './App.css';
import dataPlaces from './dataPlaces.js';
import { GMAP_ID } from './dataAPI.js';
//import { FS_ID } from './dataAPI.js';
//import { FS_CLIENT_ID } from './dataAPI.js';
import { getPlace } from './FoursquareAPI.js'
 //import Map from './Map.js';

class App extends React.Component {
  
  state = {
    dataPlaces : dataPlaces,
    markers: [],
  }

  
  //RENDER MAP
  componentDidMount() {
    this.showMap()
  }

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

    let largeInfowindow = new window.google.maps.InfoWindow();
    let bounds = new window.google.maps.LatLngBounds();

    for(let i = 0; i < dataPlaces.length; i++) {
      let position = dataPlaces[i].location;
      let title = dataPlaces[i].title;
      

      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i,

      })

      this.state.markers.push(marker);
      bounds.extend(marker.position);
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      })
    }    

    map.fitBounds(bounds);

    function populateInfoWindow(marker, infowindow) {
      if(infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {
          infowindow.setMap(null)
        })
      }
    }

  }   


  render () {
    dataPlaces.map((place) => {
      return getPlace(place)
    });
    return (
      <div className="App">
          {/* MAP CONTAINER */}
          <div id="map" tabIndex='-1'></div>
          
          
          {/* LIST OF SIGHTS */}
          <aside className="filter">
            <div className="search">
              <label htmlFor="options"><span className="label-search">Search in Cuiabá</span></label>
              <input type='text' id="options" placeholder="Type here"></input>
            </div>
                <div className="places-options">
                  <ul>
                      <li><a href="http://localhost:3000">Sesc Arsenal</a></li>
                      <li><a href="http://localhost:3000">Parque das Águas</a></li>
                      <li><a href="http://localhost:3000">Orla do Porto</a></li>
                      <li><a href="http://localhost:3000">Arena Pantanal</a></li>
                      <li><a href="http://localhost:3000">Parque Tia Nair</a></li>
                      <li><a href="http://localhost:3000">Feira do Porto</a></li>
                      <li><a href="http://localhost:3000">Praça Popular</a></li>
                      <li><a href="http://localhost:3000">Praça da Mandioca</a></li>
                      <li><a href="http://localhost:3000">Igreja Bom Despacho</a></li>
                      <li><a href="http://localhost:3000">Igreja do Rosário</a></li>
                      <li><a href="http://localhost:3000">Raposa Vegana</a></li>
                      <li><a href="http://localhost:3000">Arado Natural</a></li>
                      <li><a href="http://localhost:3000">Burguer na Praça</a></li>
                      <li><a href="http://localhost:3000">Shopping Estação Cuiabá</a></li>
                      <li><a href="http://localhost:3000">Goiabeiras Shopping</a></li>
                      <li><a href="http://localhost:3000">Pantanal Shopping</a></li>
                      <li><a href="http://localhost:3000">Shopping 3 Américas</a></li>
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
