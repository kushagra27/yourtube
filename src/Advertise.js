import React from 'react'
import { withRouter } from 'react-router-dom'
import MovieSearchBox from './MovieSearchBox'
import BookSlot from './BookSlot'

class Advertise extends React.Component{

    render(){
        return(
            <div>
                <p>
                    Advertiser
                </p>
            {/* <MovieSearchBox /> */}
            <BookSlot value={this.props.value}/>
            </div>
        )
    }
}

export default withRouter(Advertise)