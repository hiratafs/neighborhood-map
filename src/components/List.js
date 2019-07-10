import React from 'react'
import Place from './Place'



class List extends React.Component {


    render() {
        return (
            <div className="places-options">
                <ul>
                {this.props.filteredresults && this.props.filteredresults.map((marker, id) => 
                    <Place key={id} {...marker} name={marker.title} handleClickList={this.props.handleClickList} tabIndex="0" />
                )}
                </ul>
            </div>
        )
    }
}

export default List