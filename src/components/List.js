import React from 'react'
import Place from './Place'

class List extends React.Component {
    render() {
        return (
            <div className="places-options">
                <ul>
                {this.props.placesinCuiaba && this.props.placesinCuiaba.map((local, id) => 
                    <Place key={id} {...local} />
                )}
                </ul>
            </div>
        )
    }
}

export default List