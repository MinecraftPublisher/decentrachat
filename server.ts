import { DataConnection, Peer } from 'peerjs'
import scope from './effects'

const handle = new Peer('alpha_server')

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