import React, { Component } from 'react';

class Place extends Component {
    render () {
        return(
           <li onClick={() => this.props.handleClickList(this.props)}>{this.props.name}</li>
        )
    }
}

export default Place