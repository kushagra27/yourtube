import React from 'react'
// const IPFS = require('ipfs')
import {ipfs} from './ipfs'
const OrbitDB = require('orbit-db');

export class OrbitDBHandler extends React.Component {
  
  constructor(props) {
    super(props);
      this.state = {
        ipfs: null,
        orbitdb: null
      };
    }
    //connect to IPFS
    
    handleClick = async ()=>{
    
      // while(1){
      //   if(this.props.value.loading===true)
      //     break
      // }

      // const ipfs = new IPFS({
      //   EXPERIMENTAL: {
      //     pubsub: true
      //   }, config: {
      //     Addresses: {
      //       Swarm: [
      //         // '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
      //         '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      //       ]
      //     }
      //   }
      // })

      // ipfs.on('ready', async () => {
      //   ipfs.swarm.peers()
      //   await ipfs.swarm.peers().then((peers)=>console.log(peers))
        const options = {
          // Give write access to everyone
          accessController: {
            write: ['*']
          }
        }
      
        //Create OrbitDB instance
        const orbitdb = await OrbitDB.createInstance(ipfs , options);

        console.log("orbitdb ready");

        //store ipfs and orbitdb in state
        this.setState({
          ipfs: ipfs,
          orbitdb: orbitdb
        });
        const db = await this.state.orbitdb.docs('channels',{indexBy:'channelName'})
        // const db = await this.state.orbitdb.open('/orbitdb/zdpuAytQMXvmgxoBSkfaQTdrcMaN8C1vDFxw27AUSR3gKt8vo/library' , {replicate:true})
        console.log('db :',db)
        // await db.load()
        
        // db.events.on('replicated', (address) => {
        //   console.log(db.iterator({ limit: -1 }).collect())
        // })

        // const data = {
        //   has:'confirm',
        //   data: 'confirm',
        //   category:['confirm','done','test']
        // }
        const data2 = {
          category: "advertisement",
          description: "test",
          hash: "QmTca4A43f4kEvzTouvYTegtp6KobixRqweV12NrvwwtFP",
          title: "test",
          uploader: "test",
          upvotes: "",
          views:[
              {dateStart:'23072019 24072019'},
              {dateStart:'26072019 27072019'}
            ]
        }
        // const hash = await db.put(data2)
        // console.log(hash)

        // const result = db.iterator({ limit: -1 }).collect()
        // console.log(result)
        // console.log(result.map((element)=>{
        //   return element.payload.value
        // }))

        await console.log(db.get(''))

        // console.log(db.query((doc) => {
        //   console.log(doc)
        //   if(doc.views !==''){
        //       doc.views.map((booking)=>{
        //         booking.dateStart
        //       })
        //     return (doc.category ==='advertisement' && doc.views[0].dateStart > '22072019')

        //   }
        // } ))

        // console.log(db.query((doc) => doc.category === 'fun'))
        
        // db.drop() 
        // console.log(db)
        // await db.del()
    }
  //   )   
  // }

  render() {
    return(
      <div>
        <h1>Connect to IPFS and OrbitDB</h1>
        <p>{this.state.ipfs === null ? `IPFS Not connected` : `IPFS Connected`}</p>
        <p>{this.state.orbitdb === null ? `OrbitDB Not Instantiated` : `OrbitDB Instantiated`}</p>
        <button
          onClick={this.handleClick}
        >
        Click Me!
        </button>
      </div>
    );
  }
}
export default OrbitDBHandler;
