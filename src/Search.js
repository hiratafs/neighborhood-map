import React from 'react'

const Search = (props) => {
    return (
        <div className="search">
              <label htmlFor="options"><span className="label-search">Where to eat in Cuiabá</span></label>
              <input type='text' id="options" placeholder="Type here"></input>
        </div>
    )
}

export default Search