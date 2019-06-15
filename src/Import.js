import React from 'react'
import CryptoJS from 'crypto-js'
import bip39 from 'bip39'
import { ethers } from 'ethers'


export default class Import extends React.Component{
    constructor(){
        super()
        this.state = {
            encA:'',
            mnemonic:'',
            len:false,
            mnemonicSet:false,
            npwd:'',
            cpwd:'',
            valid:false,
            matching:false
        }
    }
    componentDidMount(){
        const encodedAccount = localStorage.getItem('1');
        if(encodedAccount !== null){
            this.setState({
                encA: encodedAccount
            })
            console.log('Account Found')
            console.log(this.state)
        } else {
            console.log('Account Not Found')
        }
    }

    handleChange = (event)=>{
        this.setState({
            mnemonic:event.target.value
        },()=>{
            if (this.state.mnemonic.split(" ").length !== 12){
                this.setState({
                    len:false
                })
            } else {
                this.setState({
                    len:true
                })
            }
        })
        }

    handlePress = async (event)=> {
        event.preventDefault();
        const mnemonic = this.state.mnemonic
        try{
            const byt  = CryptoJS.AES.decrypt(this.state.encA, mnemonic)
            var accounts = JSON.parse(byt.toString(CryptoJS.enc.Utf8))
            console.log(accounts)
            const mnemonicCipher = CryptoJS.AES.encrypt(JSON.stringify(mnemonic),this.state.npwd).toString()
            localStorage.setItem('mnemonic', mnemonicCipher)
            console.log("done")
        } catch (err) {
            console.log(err)
            const wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic)
            const account = {
                address : wallet.address,
                privateKey : wallet.privateKey,
                publicKey : wallet.signingKey.keyPair.publicKey,
                mnemonic : this.state.mnemonic,
                uploads:'',
                userInfo:'',
                channelInfo:'',
            }
            const db = await this.props.value.orbitdb.docs(account.address,{indexBy:'address'})
            await db.load()
            const result = await db.get(account.address)
            console.log(result)
            if (result[0]){
                console.log('found')
                console.log(result)
                const mnemonicCipher = CryptoJS.AES.encrypt(JSON.stringify(this.state.mnemonic),this.state.npwd).toString()
                const accountCipher = CryptoJS.AES.encrypt(JSON.stringify(result[0]),this.state.mnemonic).toString()
                localStorage.setItem('1', accountCipher)
                localStorage.setItem('2', mnemonicCipher)
                console.log(account)
            } else {
                console.log('nopr')
                const mnemonicCipher = CryptoJS.AES.encrypt(JSON.stringify(this.state.mnemonic),this.state.npwd).toString()
                const accountCipher = CryptoJS.AES.encrypt(JSON.stringify(account),this.state.mnemonic).toString()
                localStorage.setItem('1', accountCipher)
                localStorage.setItem('2', mnemonicCipher)
                const orbitHash = await db.put(account)
            }
            // console.log(db)
            alert('Account Created')

        }
    }

    render(){
        if(!this.state.mnemonicSet){
            return(
                <div>
                    <p>Enter your 12 word mnemonic</p>
                    <form>
                        <div className={this.state.length?"form-group has-success":"form-group"}>
                            <input className="form-control form-control-success" type="text" id="password" placehoolder="Enter password" value = {this.state.mnemonic}
                            onChange = {this.handleChange} />
                        </div>
                        <button
                            disabled={!this.state.len}
                            onClick = {()=>{
                                this.setState({
                                    mnemonicSet:true
                                })
                            }}
                        >
                            NEXT
                        </button>
                    </form>

                    <p>{this.state.mnemonic}</p>
                    <p>Already have an Account?</p>
                </div>
            )
        } else {
            return(
                <div>
                    <form>
                        <div className={this.state.length?"form-group has-success":"form-group"}>
                            <input className="form-control form-control-success" type="password" id="password" placehoolder="Enter password" value={this.state.npwd} 
                            onChange={(event)=>{
                                this.setState({npwd:event.target.value},()=>{
                                    if (this.state.npwd.length.toString() < 8){
                                        this.setState({valid:false})
                                    } else {
                                        this.setState({valid:true})
                                    }
                                })
                            }} />
                        </div>
                        <div className={this.state.match?"form-group has-success":"form-group"}>
                            <input className="form-control form-control-success" type="password" id="repassword" placehoolder="Re-Enter password" value={this.state.cpwd} 
                            onChange={(event)=>{
                                this.setState({cpwd:event.target.value},()=>{
                                    if (this.state.cpwd != this.state.npwd){
                                        this.setState({matching:false})
                                    } else {
                                        this.setState({matching:true})
                                    }
                                })
                            }} />
                        </div>
                        <button
                            disabled={!this.state.matching}
                            onClick={this.handlePress}
                        >
                            CREATE
                        </button>
                    </form>
                    <p>Already have an Account?</p>
                </div>
            )
        }
    }
}