import React from 'react'
import { withRouter , Link } from "react-router-dom"
import CryptoJS from 'crypto-js'

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        password: '',
        auth:false,
        watch:false,
        upload:false,
        search:false,
        query:'',
        user:''
      };
    }
  
    async componentDidMount(){
      const encA = localStorage.getItem('1')
      const encM = localStorage.getItem('2')
      this.setState({
        encA:encA,
        encM:encM
      })
    }

    handleChange = (event)=>{
      const {id,value} = event.target
      this.setState({[id]: value});
    }
  
    handleLogin = async (event)=>{
        event.preventDefault()
        try{
          const bytes  = CryptoJS.AES.decrypt(this.state.encM , this.state.password)
          const mnemonic = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          const byt  = CryptoJS.AES.decrypt(this.state.encA, mnemonic)
          var account = JSON.parse(byt.toString(CryptoJS.enc.Utf8))
          console.log(account)
          const db = await this.props.value.orbitdb.docs(account.address,{indexBy:'address'})
          await db.load()
          this.props.value.updateOrbit(db)
          this.props.value.login()
          this.props.value.updateAccount(account)
      } catch(error){
          console.log(error)
          alert('Incorrect Password')
      }
    }

    render() {
      if(!this.props.value.auth){
        return (
          <div>
              <form>
                <input type="password" id='password' placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.handleLogin} disabled={this.props.value.loading}>
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
      } else {
        return(
          <div>
            <h1> Welcome </h1>
            <form>
                  <input type="text" id='query' placeholder="Search" value={this.state.query} onChange={this.handleChange} />
                  <button  onClick={
                    (event)=>{
                      event.preventDefault()
                      this.props.history.push('/search')
                    }}>
                  SEARCH
                  </button>
              </form>
            <button onClick={()=>this.props.history.push('watch')}>
              Watch
            </button>

            <button onClick={()=>this.props.history.push('dashboard')}>
              Dashboard
            </button>
            <button onClick={()=>this.props.history.push('/advertise')}>
              Advertise
            </button>
            <button
              onClick = {this.props.value.logout}
            >
              LOGOUT
            </button>
          </div>
        )
      }
    }
  }

export default withRouter(Login)