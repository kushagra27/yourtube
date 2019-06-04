import React from 'react'
import bip39 from 'bip39'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'
import './assets/css/now-ui-kit.css'
import { Redirect } from "react-router-dom";


export default class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            password:'',
            repassword:'',
            match:false,
            mnemonic:'',
            set:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount(){
        const mnem = bip39.generateMnemonic()
        this.setState({mnemonic:mnem})
        
    }

    handleChange(event){
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
            address : [wallet.address],
            privateKey : wallet.privateKey,
            publicKey : wallet.signingKey.keyPair.publicKey,
            mnemonic : this.state.mnemonic
        }
        let mnemonicCipher = CryptoJS.AES.encrypt(JSON.stringify(this.state.mnemonic),this.state.password).toString()
        let accountCipher = CryptoJS.AES.encrypt(JSON.stringify(account),this.state.mnemonic).toString()
        localStorage.setItem('1', accountCipher)
        localStorage.setItem('2', mnemonicCipher)
        console.log('Account Created')
        this.setState({set:true})
    }


    render(){
        if(!this.state.set)
            return(
                <div>
                    <p>{this.state.mnemonic}</p>
                    <div>
                        <p>Regisrer</p>
                        <form>
                            <div className={this.state.length?"form-group has-success":"form-group"}>
                                <input className="form-control form-control-success" type="password" id="password" placehoolder="Enter password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className={this.state.match?"form-group has-success":"form-group"}>
                                <input className="form-control form-control-success" type="password" id="repassword" placehoolder="Re-Enter password" value={this.state.repassword} onChange={this.handleChange} />
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
        else
            return(
                <Redirect to='/' />
            )
    }
}
