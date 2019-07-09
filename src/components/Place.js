import React, { Component } from 'react';

class Place extends Component {
    render () {
        return(
           <li onClick={() => this.props.handleClickList(this.props)} onKeyPress={() => this.props.handleClickList(this.props)} tabIndex="0">{this.props.name}</li>
        )
    }
}

export default Place