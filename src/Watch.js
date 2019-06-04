import React from 'react'
import ReactPlayer from 'react-player'

export default class Watch extends React.Component{
    render(){
        return( 
            <div>
                <ReactPlayer url='https://ipfs.io/ipfs/QmTca4A43f4kEvzTouvYTegtp6KobixRqweV12NrvwwtFP' on playing />
            </div>
        )
    }
}