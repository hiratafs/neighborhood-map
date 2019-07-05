import React, { Component } from 'react';
import List from './List'


class Sidebar extends Component {
    render () {
        return (
            <div >
                <div className="search">
                <label htmlFor="options"><span className="label-search">Restaurants in Cuiabá</span></label>
                  <input type='search' id="search" placeholder="Filter restaurant"></input>
                </div>
                  <List {...this.props} />
            </div>
         
        )
    }     
    
}



export default Sidebar