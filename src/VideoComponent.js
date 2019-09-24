import React from 'react'
import ReactPlayer from 'react-player'
import { withRouter } from 'react-router-dom'

class VideoComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            first : true,
        }
    }

    adFinish = ()=>{
        if (this.state.first){
            console.log('ad finish')
        }
        this.setState({first:false})
    }

    render(){
        return(
            <div>
                <ReactPlayer
                    // url={'http://localhost:8080/ipfs/' + (this.state.first?this.props.ad.hash:this.props.vid.hash)}
                    url={'https://ipfs.io/ipfs/' + (this.state.first?this.props.ad.hash:this.props.vid.hash)}
                    onEnded={this.adFinish}
                    width='20%'
                    height='30%'
                    controls
                    />
                <p>{this.props.vid.title}</p><p>{this.props.vid.views}</p>
            </div>
        )
      }
    }

export default withRouter(VideoComponent)