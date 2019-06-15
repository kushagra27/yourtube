import React, { Component } from 'react'
import ipfs from '../ipfs'
const OrbitDB = require('orbit-db');
const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(){
        super()
        this.state={
            name:'test',
            ipfs:'',
            orbitdb:'',
            localAccount:'',
            orbitAccount:'',
            search:'',
        }   
    }

    updateAccount = (account)=>{
        this.setState({localAccount:account},()=>console.log('accoutn set'))
    }

    updateOrbit = (account)=>{
        this.setState({orbitAccount:account},()=>console.log('accoutn set'))
    }

    componentDidMount(){
        this.setState({ipfs:ipfs})
        ipfs.on('ready', async () => {
            ipfs.swarm.peers()
            
            const options = {
                accessController: {
                write: ['*']
                }
            }
            //Create OrbitDB instance
            const orbitdb = await OrbitDB.createInstance(ipfs , options);
            console.log("orbitdb ready");
            await this.setState({orbitdb:orbitdb})
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                updateAccount : this.updateAccount,
                updateOrbit : this.updateOrbit,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )

    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };