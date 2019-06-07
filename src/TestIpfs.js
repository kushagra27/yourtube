import React from 'react'
import * as IPFS from 'ipfs'
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
    
    componentDidMount(){
    
      const ipfs = new IPFS({
        EXPERIMENTAL: {
          pubsub: true
        }
      })
    
      ipfs.on('ready', async () => {
      console.log('ipfs ready' , ipfs);

      //Create OrbitDB instance
      const orbitdb = await OrbitDB.createInstance(ipfs);

      console.log("orbitdb ready");

      //store ipfs and orbitdb in state
      this.setState({
        ipfs: ipfs,
        orbitdb: orbitdb
      });
      const db = await orbitdb.log('hello')
      console.log('db :',db)
      await db.load()
      
      db.events.on('replicated', (address) => {
        console.log(db.iterator({ limit: -1 }).collect())
      })

      const data = {
        has:'random',
        data: 'asusc  uhe k',
        category:['test','poiuu','uvac']
      }
      // const hash = await db.add(data)
      // console.log(hash)

      const result = db.iterator({ limit: -1 }).collect()
      console.log(result)
      console.log(result.map((element)=>{
        return element.payload.value
      }))

      // db.drop()
    })   
  }

  render() {
    return(
      <div>
        <h1>Connect to IPFS and OrbitDB</h1>
        <p>{this.state.ipfs === null ? `IPFS Not connected` : `IPFS Connected`}</p>
        <p>{this.state.orbitdb === null ? `OrbitDB Not Instantiated` : `OrbitDB Instantiated`}</p>
      </div>
    );
  }
}
export default OrbitDBHandler;