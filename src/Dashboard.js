import React from 'react'
import { withRouter , Link } from "react-router-dom"

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    handleUpload = (event)=>{
        event.preventDefault()
        if(this.props.value.localAccount.channelInfo.channelName)
          this.props.history.push('/upload')
        else 
          this.props.history.push('/new_channel')
    }
  

    render(){
        return(
            <div>
                <p>Dashboard</p>
                <button onClick={this.handleUpload}>
                    Upload
                </button>
                <p>Details: </p>
                
            </div>
        )
    }
}

export default withRouter(Dashboard)