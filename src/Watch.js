import React from 'react'
import {withRouter} from 'react-router-dom'
import VideoComponent from './VideoComponent'
class Watch extends React.Component{
    constructor(){
        super()
        this.state = {
            videos:'',
            ads:''
        }
    }

    async componentDidMount(){
        const result = this.props.value.library.query((doc) => doc.category !== 'advertisement')
        const ads = this.props.value.library.query((doc) => doc.category === 'advertisement')
        console.log(result)
        const videos = await result.map(vid =>{
            console.log(vid)
            return <VideoComponent vid={vid} ad={ads[0]} />
        })
        this.setState({videos:videos})
    }

    render(){
        return(
            <div>
                <p>Watch</p>
                {this.state.videos}
            </div>
        )
    }
}

export default withRouter(Watch)