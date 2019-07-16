import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import MovieSearchBox from './MovieSearchBox'

class Advertise extends React.Component{

    render(){
        return(
            <div>
                <p>
                    Advertiser
                </p>
            <MovieSearchBox />
            </div>
        )
    }
}

export default withRouter(Advertise)