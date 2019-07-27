import React, { Component } from 'react'
import {ipfs,ipfs2} from '../ipfs'
import CryptoJS from 'crypto-js'
const OrbitDB = require('orbit-db');
const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(){
        super()
        this.state={
            name:'test',
            ipfs:'',
            ipfs2:'',
            orbitdb:'',
            localAccount:'',
            orbitAccount:'',
            search:'',
            library:'',
            channelList:'',
            videoList:'',
            adSlots:'',
            loading:true,
            auth:false,
        }
    }

    async componentDidMount(){
        console.log('ipfs:',ipfs)
        console.log('ipfs2:',ipfs2)
        this.setState({ipfs:ipfs})
        this.setState({ipfs2:ipfs2})
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
            console.log('orbitdb: ',orbitdb)
            // const library = await orbitdb.docs('library',{indexBy:'hash'})
            const library = await orbitdb.open('/orbitdb/zdpuAytQMXvmgxoBSkfaQTdrcMaN8C1vDFxw27AUSR3gKt8vo/library',{indexBy:'hash'})
            console.log('library :',library)
            await library.load()
            console.log('library loaded')
            this.setState({library:library})
            const channelList = await orbitdb.docs('channelLists',{indexBy:'channelName'})
            await channelList.load()
            this.setState({channelList:channelList})
            // const adSlots = await orbitdb.docs('Ads',{indexBy:'date'})
            // await adSlots.load()
            // this.setState({adSlots:adSlots})
            const videoList = await orbitdb.docs('videos',{indexBy:'hash'})
            await videoList.load()
            this.setState({videoList:videoList})
            this.setState({loading:false})
        })
    }

    login = async() => {
        this.setState({auth:true})
    }

    logout = async() => {
        this.setState({auth:false})
    }

    updateAccount = async (account)=>{
        await this.setState({localAccount:account})
        await this.state.orbitAccount.put(account)
        let accountCipher = await CryptoJS.AES.encrypt(JSON.stringify(account),this.state.localAccount.mnemonic).toString()
        await localStorage.setItem('1', accountCipher)
        console.log('account set')
    }

    updateOrbit = (account)=>{
        this.setState({orbitAccount:account},()=>console.log('orbit account set'))
    }

    setChannel = async (channelInfo)=>{
        const check = await this.state.channelList.get(channelInfo.channelName)
        await console.log(check.length)
        if(check.length !== 0){
            return false
        } else {
            console.log('name:' , channelInfo.channelName)
            
            const hash = await this.state.channelList.put(channelInfo)
            console.log(hash)
            let account = this.state.localAccount
            console.log(channelInfo)
            account.channelInfo = channelInfo
            console.log('account: ',account)
            await this.updateAccount(account)
            await console.log(this.state.channelList.get(channelInfo.channelName))
            return true
        }
    }

    updateSlots = async (bookInfo)=>{
        
    }

    newUpload = async(hash)=>{
        const account = this.state.localAccount
        console.log(account.channelInfo)
        account.channelInfo.uploads.push(hash)
        console.log(account.channelInfo)
        await this.updateAccount(account)
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                updateAccount : this.updateAccount,
                updateOrbit : this.updateOrbit,
                setChannel : this.setChannel,
                newUpload : this.newUpload,
                login : this.login,
                logout : this.logout,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )

    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };