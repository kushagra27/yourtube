import React from 'react'
import IPFS from 'ipfs'
import BuyElement from './BuyElement'
const OrbitDB = require('orbit-db');

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
  

export default class OrderBook extends React.Component{
    constructor() {
        super();
        this.state = {
          ipfs: null,
          amount:'',
          validity:'',
          orders:'',
          orbitdb: null,
          buy:false,
          sell:false
        };
    }

    async componentDidMount(){
      ipfs.on('ready', async () => {
        ipfs.swarm.peers()
        await ipfs.swarm.peers().then((peers)=>console.log(peers))
        
        const options = {
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

        const db = await this.state.orbitdb.docs('orders',{indexBy:'timestamp'})
        console.log('db :',db)
        await db.load()
        
        // db.events.on('replicated', (address) => {
        //   console.log(db.iterator({ limit: -1 }).collect())
        // })
        this.setState({db:db})
      })
    }

    handleBuy= async (event)=>{
      event.preventDefault()
      console.log('buy')
      this.setState({buy:true})
      const orders = await this.state.db.get('')
      console.log(orders)
      const transactionData = orders.map(element => <BuyElement transaction={element} db={this.state.db} />)
      this.setState({transactionData:transactionData})
    }

    handleSell=(event)=>{
      event.preventDefault()
      console.log('sell')
      this.setState({sell:true})
    }

    handleChange=(event)=>{
      const {id,value} = event.target
      this.setState({[id]:value})
    }

    createContract = async(event)=>{
      event.preventDefault()
      
    }

    submitSell = async (event)=>{
      event.preventDefault()
      console.log('sold')
      const date = new Date()
      const timestamp = date.getTime()
      console.log(timestamp)
      const transaction = {
        seller:'',
        amount:this.state.amount,
        validity:this.state.validity,
        status:'active',
        timestamp: timestamp,
        contractAddress:''
      }
      // const orbitHash = await this.state.db.put(transaction)
      // console.log(orbitHash)
    }
    render(){
      if(this.state.buy){
        return (
            <div>
              <p>BUY</p>
              {this.state.transactionData}
            </div>
          )
      } else if(this.state.createContract){
        return (
            <div>
              <p>SELL</p>
              <form onSubmit={this.submitSell}>
                <input type="text" id='amount' placeholder="Amount in ETH" value={this.state.amount} onChange={this.handleChange} />
                <input type="text" id='validity' placeholder="Validity in days" value={this.state.validity} onChange={this.handleChange} />
                <p>{this.state.amount}</p>
                <button
                    bsStyle="primary" 
                    type="submit"> 
                    DEPOSIT
                </button>
            </form>
            </div>
          )
      } else{
        return(
            <div>
                <p>Pubsub</p>
                <button
                  onClick = {this.handleBuy}
                >
                  BUY
                </button>
                <button
                  onClick = {this.handleSell}
                >
                  SELL
                </button>
            </div>
        )
      }
    }
}