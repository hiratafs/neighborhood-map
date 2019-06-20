import React from 'react';
import './App.css';
import dataPlaces from './dataPlaces';
//import Map from './Map.js';

class App extends React.Component {
  
  state = {
    dataPlaces : dataPlaces,
    markers: [],

  }


  componentDidMount() {
    this.showMap()
  }

  showMap = () => {
    installMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyB9FdQGy5y1yZLQcG20qvf2FwVeVu6UMsM&callback=initMap');
    window.initMap = this.initMap
  }

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
      let placecontent = dataPlaces[i].content;

      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i,
        content: placecontent
      })

      this.state.markers.push(marker);
      bounds.extend(marker.position);
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      })
    }    

    map.fitBounds(bounds);

    function populateInfoWindow(marker, infowindow) {
      if(infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.content + '</div>');
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
          <div id="map" role="aplication" tabIndex='-1'></div>
          
          
          {/* LIST OF SIGHTS */}
          <aside className="filter">
            <input type='text'></input>
                  <ul className="places-options">
                    <li><a href="#">Sesc Arsenal</a></li>
                    <li><a href="#">Parque das Águas</a></li>
                    <li><a href="#">Orla do Porto</a></li>
                    <li><a href="#">Arena Pantanal</a></li>
                    <li><a href="#">Parque Tia Nair</a></li>
                    <li><a href="#">Feira do Porto</a></li>
                    <li><a href="#">Praça Popular</a></li>
                    <li><a href="#">Praça da Mandioca</a></li>
                    <li><a href="#">Igreja Bom Despacho</a></li>
                    <li><a href="#">Igreja do Rosário</a></li>
                  </ul>
          </aside>
          
      </div>
    );
  }
}

function installMap (url) {
    let getfirstscript = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    getfirstscript.parentNode.insertBefore(script, getfirstscript);
}

export default App;
