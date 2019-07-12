import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, InfoWindow, GoogleMap, Marker } from 'react-google-maps';
import ErrorBoundaries from './ErrorBoundaries'

//REACT-GOOGLE-MAPS CONFIGURATION 
const MyMapComponent = withScriptjs(withGoogleMap((props) =>


  <GoogleMap
    defaultZoom={13.75}
    defaultCenter={{lat: -15.5926919, lng: -56.0903047}}
  >
    {/* CREATE MARKERS AND INFOWINDOWS ON MAP */}
    {props.filteredresults.map((marker, id) => (
        <Marker key={id} position={{ lat: marker.lat, lng: marker.lng}} containerProps={{tabIndex: 0}} title={marker.title} animation={marker.animation} onClick={() => props.showInfoWindow(marker)}>
            {marker.infowindowIsOpen && 
            (<InfoWindow>
                <div>
                    <h1>{marker.title}</h1>
                        <img src={marker.image && marker.image !== '' ? marker.image 
                        : 'https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_styleguide/4f30aa60678e/assets/img/default_avatars/business_large_square.png'} 
                        alt={marker.title} style={{maxWidth: 250}}/>
                        <p><strong>Address:</strong>{marker.address} </p>
                        <p><strong>Phone:</strong>{marker.phone}</p>
                        <p><strong>Rating:</strong>{marker.rating}</p>
                        <p style={{color: 'red', textAlign:'center'}}><strong>Powered by <a href="http://yelp.com">Yelp!</a></strong></p>
                </div>
            </InfoWindow>)}
        </ Marker>
    )
        )}
  </GoogleMap>

))

class Map extends Component {
    

    render () {
        return(
            <ErrorBoundaries>
            <MyMapComponent
                {...this.props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB9FdQGy5y1yZLQcG20qvf2FwVeVu6UMsM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                containerProps={{tabIndex: 0}}
            />

            </ErrorBoundaries>
        )
    }
}

export default Map