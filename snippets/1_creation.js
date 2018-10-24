const { JolocomLib } = require('jolocom-lib')
const { entropy } = require('./data')

const reg = JolocomLib.registry.jolocom.create()

reg.createIdentity(Buffer.from(entropy, 'hex')).then(({ did, identityWallet, privateIdentityKey }) => {
  console.log(`did - ${did}`)
  console.log(`private key - ${privateIdentityKey.toString('hex')}`)
})
