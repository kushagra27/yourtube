import React from 'react'
import web3 from './web3'
import ipfs from './ipfs'

export default class Watch extends React.Component{
    constructor(){
        super()
        this.state = {
            ipfsHash:null,
            buffer:'',
            ethAddress:'',
            blockNumber:'',
            transactionHash:'',
            gasUsed:'',
            txReceipt: ''   
          };
    }
    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
          const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
          this.setState({buffer});
          console.log(buffer)
      };

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

      onSubmit = async (event) => {
        event.preventDefault();
  
       //bring in user's metamask account address
        const accounts = await web3.eth.getAccounts();
       
        console.log('Sending from Metamask account: ' + accounts[0]);
  
      //obtain contract address from storehash.js
        // const ethAddress= await storehash.options.address;
        // this.setState({ethAddress});
  
      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
  
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          console.log(err,ipfsHash);
          //setState by setting ipfsHash to ipfsHash[0].hash 
          this.setState({ ipfsHash:ipfsHash[0].hash });
          console.log(ipfsHash)
  
     // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
    //return the transaction hash from the ethereum contract
   //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

       //   storehash.methods.sendHash(this.state.ipfsHash).send({
        //     from: accounts[0] 
        //   }, (error, transactionHash) => {
        //     console.log(transactionHash);
        //     this.setState({transactionHash});
        //   }); //storehash 
        }) //await ipfs.add 
      }; //onSubmit
    
    render(){
        return( 
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type = "file"
                        onChange = {this.captureFile}
                    />
                    <button 
                        bsStyle="primary" 
                        type="submit"> 
                        Send it 
                    </button>
                </form>
            </div>
        )
    }
}