import React, { Component } from 'react';
import List from './List'
import ErrorBoundaries from './ErrorBoundaries'

class Sidebar extends Component {
           
    render () {
        return (
            <div className="wrap">
                <div className="search">
                <label htmlFor="options"><span className="label-search">Restaurants in Cuiabá</span></label>
                  <input type='search' id="search" placeholder="Filter restaurant" onChange={this.props.updateQuery}></input>
                </div>
                <ErrorBoundaries>
                  <List {...this.props} handleClickList={this.props.handleClickList}/>
                  </ErrorBoundaries>
            </div>
         
        )
    }     
    
}



export default Sidebar