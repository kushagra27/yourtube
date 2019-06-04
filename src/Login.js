import React from 'react'
import { Redirect , Link } from "react-router-dom"
import CryptoJS from 'crypto-js'
// import Background from './assets/img/login.jpg'

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        password: '',
        auth:false,
        watch:false,
        upload:false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleWatch = this.handleWatch.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
    }
  
    componentDidMount(){
      const encA = localStorage.getItem('1')
      const encM = localStorage.getItem('2')
      this.setState({
        encA:encA,
        encM:encM
      })
    }

    handleChange(event) {
      this.setState({password: event.target.value});
    }
  
    handleLogin(event){
        event.preventDefault()
        try{
          const bytes  = CryptoJS.AES.decrypt(this.state.encM , this.state.password)
          const mnemonic = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          const byt  = CryptoJS.AES.decrypt(this.state.encA, mnemonic)
          var accounts = JSON.parse(byt.toString(CryptoJS.enc.Utf8))
          console.log(accounts)
          this.setState({auth:true})
      } catch(error){
          console.log(error)
          alert('Incorrect Password')
      }
    }

    handleUpload(event){
      event.preventDefault()
      this.setState({upload:true})
    }

    handleWatch(event){
      event.preventDefault()
      this.setState({watch:true})
    }

    render() {
      if(!this.state.auth){
        return (
          <div>
              <form>
                  <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                  <button onClick={this.handleLogin}>
                  LOG IN 
                  </button>
              </form>
              <Link type="button" to='/import'>
                 IMPORT FROM SEED
              </Link>
              <br/>
              <Link to='/register'>
                 REGISTER
              </Link>
          </div>
        )
      } else if(this.state.watch) {
        return(
          <Redirect to='/watch' />
        )
      } else if(this.state.upload) {
        return(
          <Redirect to='/upload' />
        )
      } else {
        return(
          <div>
            <h1> Welcome </h1>
            <button
              onClick={this.handleWatch}
            >
              Watch
            </button>
            <button
              onClick={this.handleUpload}
            >
              Upload
            </button>
          </div>
        )
      }
    }
  }