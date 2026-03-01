// src/agent.js — универсальный для всех серверов

import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { mdns } from '@libp2p/mdns'

const peers = new Map()

// Используем порт из переменной окружения или 4001 по умолчанию
const PORT = process.env.VERTEX_PORT || 4001

async function startNode() {
  const node = await createLibp2p({
    addresses: { listen: [`/ip4/0.0.0.0/tcp/${PORT}`] },
    transports: [tcp()],
    streamMuxers: [yamux()],
    connectionEncryption: [noise()],
    peerDiscovery: [mdns()]
  })

  await node.start()
  console.log('\n=== ВЕРТЕКС АГЕНТ ЗАПУЩЕН ===')
  console.log('Мой PeerId:', node.peerId.toString())
  console.log('Слушаю порт:', PORT)

  node.addEventListener('peer:discovery', (evt) => {
    console.log('🔍 Найден пир:', evt.detail.id.toString())
  })

  node.addEventListener('peer:connect', (evt) => {
    const peerId = evt.detail.remotePeer.toString()
    console.log('✅ Подключился пир:', peerId)
  })
}

startNode().catch(console.error)
