//import {GMAP_ID} from './dataAPI.js';
import { FS_ID } from './dataAPI.js';
import { FS_CLIENT_SECRET } from './dataAPI.js';
import dataPlaces from './dataPlaces.js';


export const getPlace = () => {
    let placesinCuiaba = [];
    dataPlaces.map((place) => 
        fetch(`https://api.foursquare.com/v2/venues/${place.venueID}?client_id=${FS_ID}&client_secret=${FS_CLIENT_SECRET}&v=20190624`)
        .then(res => res.json())
        .then(data => {
            if(data.meta.code === 200) {
                placesinCuiaba.push(data.response.venue);
            }
        })
        .catch(error => {console.log(error)})
    )
}





