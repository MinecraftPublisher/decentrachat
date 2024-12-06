import { DataConnection, Peer } from 'peerjs'
import scope from './effects'

const id = prompt('Input a handle if you want a custom username, or leave empty for a random one:') ?? ''
const handle = new Peer(id)

const box = scope()
const { state, immediateEffect: effect } = box

const storage = state(JSON.parse(localStorage.decentrachat_storage ?? '{'))

effect(() => {
    localStorage.setItem('decentrachat_storage', JSON.stringify(storage.get()))
}, storage)

function handler(con: DataConnection) {
    con.on('data', data => {
        con.send('hi')
    })
}

// Sender client
function connect(name: string) {
    const con = handle.connect(name)

    con.on('open', () => {
        console.log('Connected to ' + name)
        handler(con)
    })
}

// Receiver client
handle.on('connection', con => {
    handler(con)
})