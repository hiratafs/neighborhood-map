import React from 'react';
import './App.css';
//import Map from './Map.js';

class App extends React.Component {

  componentDidMount() {
    this.showMap()
  }

  showMap = () => {
    installMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyB9FdQGy5y1yZLQcG20qvf2FwVeVu6UMsM&callback=initMap');
    window.initMap = this.initMap
  }

  initMap = () => {
      let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -15.5979387 , lng: -56.0930488},
      zoom: 13.75,
      mapTypeControl: false
    })
  }  


  render () {
    return (
      <div className="App">
  
        {/* MAP CONTAINER */}
          <div id="map"></div>
          {/* LIST OF SIGHTS */}

          <aside>
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
