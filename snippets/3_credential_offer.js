const fetch = require('node-fetch')
const { JolocomLib } = require('jolocom-lib')
const { credentialOfferEndpoint, credentialReceiveEndpoint, privateIdentityKey } = require('./data')

const reg = JolocomLib.registry.jolocom.create()

reg.authenticate(Buffer.from(privateIdentityKey, 'hex')).then(async identityWallet => {
  const { token } = await fetch(credentialOfferEndpoint).then(res => res.json())
  const { credentialOffer } = await JolocomLib.parse.interactionJSONWebToken.decode(token)

  const credentialOfferResponse = identityWallet.create.credentialOfferResponseJSONWebToken({
    typ: 'credentialOfferResponse',
    credentialOffer
  })

  const response = await fetch(credentialReceiveEndpoint, {
    method: 'POST',
    body: JSON.stringify({ token: credentialOfferResponse.encode() }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())

  const { credentialsReceive } = await JolocomLib.parse.interactionJSONWebToken.decode(response.token)
  console.log(credentialsReceive.signedCredentials)
})
