import React from 'react'
import { withRouter } from 'react-router-dom'

class NewChannel extends React.Component{
    constructor(){
        super()
        this.state = {
            alias:'',
            channelName:'',
            email:'',
        }
    }
    
    handleChange = (event) => {
        const {id,value} = event.target
        this.setState({[id]: value})
    }

    handleSubmit = async (event)=>{
        event.preventDefault()
        const channelInfo = {
            owner:this.props.value.localAccount.address,
            alias:this.state.alias,
            channelName:this.state.channelName,
            email:this.state.email,
            uploads:[],
            subscribers:'',
        }
        const res = await this.props.value.setChannel(channelInfo)
        console.log(res)
        if(res)
            this.props.history.push('/upload')
        else {
            alert('Channel Name is taken. Please choose another.')
        }
    }

    render(){
        return(
            <div>
                <p>NewChannel</p>
                <form>
                    <input type="text" id='channelName' placeholder ='Enter Channel Name' value={this.state.channelName} onChange={this.handleChange} />
                    <input type="text" id='email' placeholder ='Enter Email' value={this.state.email} onChange={this.handleChange} />
                    <input type="text" id='alias' placeholder ='Enter alias' value={this.state.alias} onChange={this.handleChange} />
                    <button
                        onClick = {this.handleSubmit}
                    >
                        CREATE
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewChannel)