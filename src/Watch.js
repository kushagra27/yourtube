import React from 'react'
import ReactPlayer from 'react-player'

export default function Watch(props){
  return( 
      <div>
          <ReactPlayer 
              url={'https://ipfs.io/ipfs/' + props.vid.hash} 
              onEnded={()=>{console.log("end")}} 
              width='20%'
              height='30%'
              controls
              />
          <p>{props.vid.title}</p>
      </div>
  )
}