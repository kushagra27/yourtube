//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.

import IPFS2 from 'ipfs'
const IPFS = require('ipfs-api');
const ipfs2 = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'
  });

const ipfs = new IPFS2({
  EXPERIMENTAL: {
    pubsub: true
  }
  , config: {
    Addresses: {
      Swarm: [
        // '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})


//run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs2 = new ipfsApi('localhost', '5001', {protocol:'http'});

export {ipfs,ipfs2};