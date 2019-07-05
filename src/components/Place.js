import React, { Component } from 'react';

class Place extends Component {
    render () {
        return(
           <li>{this.props.name}</li>
        )
    }
}

export default Place