import React, { Component } from 'react';
import List from './List'


class Sidebar extends Component {

    updateQuery = (query) => {
        this.setState({query: query})
    }

    render () {
        return (
            <div >
                <div className="search">
                <label htmlFor="options"><span className="label-search">Restaurants in Cuiabá</span></label>
                  <input type='search' id="search" placeholder="Filter restaurant"></input>
                </div>
                  <List {...this.props} handleClickList={this.props.handleClickList}/>
            </div>
         
        )
    }     
    
}



export default Sidebar