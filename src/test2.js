import React from 'react'
import { create } from 'peer-info';
const IPFS = require('ipfs')
// import ipfs from './ipfs'
const OrbitDB = require('orbit-db');

    async function createDB(){
    
      const ipfs = new IPFS({
        EXPERIMENTAL: {
          pubsub: true
        }, config: {
          Addresses: {
            Swarm: [
              // '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
              '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
          }
        }
      })
    
      ipfs.on('ready', async () => {
      ipfs.swarm.peers()
      await ipfs.swarm.peers().then((peers)=>console.log(peers))
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
      const db = await orbitdb.log('hello')
      console.log('db :',db)
      await db.load()
      
      db.events.on('replicated', (address) => {
        console.log(db.iterator({ limit: -1 }).collect())
      })

      // const data = {
      //   has:'confirm',
      //   data: 'confirm',
      //   category:['confirm','done','test']
      // }
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

  const db = createDB()

export default db;
  