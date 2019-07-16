import React from 'react'
import bip39 from 'bip39'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'
import { withRouter } from "react-router-dom";

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            password:'',
            repassword:'',
            match:false,
            mnemonic:''
        }
    }

    async componentDidMount(){
        const mnem = bip39.generateMnemonic()
        this.setState({mnemonic:mnem})
    }

    handleChange = (event)=>{
        const {id,value} = event.target 
        this.setState({[id]:value},()=>{
            if(id ==='password'){
                if (this.state.password.length <8){
                    this.setState({length:false})
                } else 
                    this.setState({length:true})
            }
            if(id ==='repassword'){
                if (this.state.password === this.state.repassword){
                    this.setState({match:true})
                } else 
                    this.setState({match:false})
            }
        })
    }

    handleRegister = async(event)=>{
        event.preventDefault();
        console.log('pressed')
        const wallet = new ethers.Wallet.fromMnemonic(this.state.mnemonic)
        console.log(wallet)
        const account = {
            address : wallet.address,
            YTbalance : 0,
            pendingBalance : 0,
            privateKey : wallet.privateKey,
            publicKey : wallet.signingKey.keyPair.publicKey,
            mnemonic : this.state.mnemonic,
            userInfo : '',
            channelInfo : {},
        }
        let mnemonicCipher = CryptoJS.AES.encrypt(JSON.stringify(this.state.mnemonic),this.state.password).toString()
        let accountCipher = CryptoJS.AES.encrypt(JSON.stringify(account),this.state.mnemonic).toString()
        localStorage.setItem('1', accountCipher)
        localStorage.setItem('2', mnemonicCipher)
        console.log(account.address)

        const db = await this.props.value.orbitdb.docs(account.address,{indexBy:'address'})
        await db.load()
        console.log('db :',db)

        const orbitHash = await db.put(account)
        console.log(orbitHash)
        alert("Account Created")
        this.props.history.push('/')
    }


    render(){
        return(
            <div>
                <p>{this.state.mnemonic}</p>
                <div>
                    <p>Regisrer</p>
                    <form>
                        <div>
                            <input type="password" id="password" placehoolder="Enter password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div>
                            <input type="password" id="repassword" placehoolder="Re-Enter password" value={this.state.repassword} onChange={this.handleChange} />
                        </div>
                        <button
                            onClick={this.handleRegister}
                            disabled={!(this.state.match&&this.state.length)}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
                <p>{this.state.password}</p><br/>
                <p>{this.state.repassword}</p>
            </div>
        )
    }
}

export default withRouter(Register)