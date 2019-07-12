import React from 'react'

export default class ErrorBoundaries extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, info) {
        this.setState({error, info})
    }
    
   /*  static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
 */
    
    render () {
        if(this.state.error) {
            return (
                <div>
                    {this.props.name ? (
                            <h3 style={{textAlign: 'center'}}>Oh, no! Something went wrong on {this.props.name}! Try again later!</h3>
                    ) : (
                            <h3>Oh, no! Something went wrong! :(</h3>

                    )}

                    <p>{this.state.error && this.state.error.toString()}</p>
                    <p>{this.state.info.componentStack}</p>
                </div>
            )
        }

        return this.props.children
    }

}

