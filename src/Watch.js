import React from 'react'
import ReactPlayer from 'react-player'

export default class Watch extends React.Component{
    render(){
        return( 
            <div>
                <ReactPlayer 
                    url='https://ipfs.io/ipfs/QmPdSwMEm8f7MrH6ayfeQb2B6gJtiaR2vAXzrHwsa6tHuB' 
                    onEnded={()=>{console.log("end")}} 
                    on playing />
            </div>
        )
    }
}