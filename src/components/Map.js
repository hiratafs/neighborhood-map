import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, InfoWindow, GoogleMap, Marker } from 'react-google-maps';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13.75}
    defaultCenter={{lat: -15.5926919, lng: -56.0903047}}
  >
    {props.markers.map((marker, id) => (
        
        <Marker key={id} position={{ lat: marker.lat, lng: marker.lng}} title={marker.title} animation={marker.animation} onClick={() => props.showInfoWindow(marker)}>
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
            <MyMapComponent
                {...this.props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB9FdQGy5y1yZLQcG20qvf2FwVeVu6UMsM"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default Map