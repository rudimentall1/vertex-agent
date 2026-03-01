import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { mdns } from '@libp2p/mdns'
import { bootstrap } from '@libp2p/bootstrap'

const peers = new Map()
let leaderId = null

async function startNode() {
  const node = await createLibp2p({
    addresses: { listen: ['/ip4/0.0.0.0/tcp/4001'] },
    transports: [tcp()],
    streamMuxers: [yamux()],
    connectionEncryption: [noise()],
    peerDiscovery: [
      mdns(),
      bootstrap({
        list: [
          '/ip4/212.113.107.0/tcp/4001',
          '/ip4/77.239.125.37/tcp/4001',
          '/ip4/77.239.125.233/tcp/4001'
        ]
      })
    ]
  })

  await node.start()
  console.log('\n=== VERTEX SWARM AGENT ===')
  console.log('PeerId:', node.peerId.toString())
  
  const myPeerId = node.peerId.toString()
  
  node.addEventListener('peer:connect', (evt) => {
    const peerId = evt.detail.remotePeer.toString()
    peers.set(peerId, Date.now())
    console.log('✅ Peer connected:', peerId)
  })

  node.addEventListener('peer:disconnect', (evt) => {
    const peerId = evt.detail.remotePeer.toString()
    peers.delete(peerId)
    console.log('🔌 Peer disconnected:', peerId)
  })

  setInterval(() => {
    console.log('Active peers:', peers.size + 1)
  }, 10000)
}

startNode().catch(console.error)
