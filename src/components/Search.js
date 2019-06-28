import React, { Component } from 'react';
//import debounce from 'lodash/debounce'

class Search extends Component {

    state = {
        query: '',
        searchresults: [],
        limpabusca: false
    }

    search(value) {
        console.log(value)
    }

    handlechange = e => {
        this.search(e.target.value);
    }
    render () {
        return (
            <div className="search">
                  <label htmlFor="options"><span className="label-search">Where to eat in Cuiabá</span></label>
                  <input type='text' id="options"onChange={this.handlechange} placeholder="Type here"></input>
            </div>
        )
    }     
    
}



export default Search