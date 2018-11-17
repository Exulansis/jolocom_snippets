import fetch from 'node-fetch'
import { JolocomLib } from 'jolocom-lib'
import { data } from './data'
import { JSONWebToken } from 'jolocom-lib/js/interactionTokens/JSONWebToken'
import { CredentialOffer } from 'jolocom-lib/js/interactionTokens/credentialOffer'
import { ICredentialOfferAttrs } from 'jolocom-lib/js/interactionTokens/interactionTokens.types'

const reg = JolocomLib.registries.jolocom.create()
const vault = new JolocomLib.keyProvider(data.seed, data.secret)
const derivationArgs = {
  derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
  encryptionPass: data.secret
}

reg.authenticate(vault, derivationArgs).then(async identityWallet => {
  const { token } = await fetch(data.credentialOfferEndpoint).then(res => res.json())
  const parsed: JSONWebToken<CredentialOffer> = await JolocomLib.parse.interactionToken.fromJWT(token)

  const credentialOfferResponse = await identityWallet.create.interactionTokens.response.offer(
    parsed.interactionToken.toJSON() as ICredentialOfferAttrs,
    data.secret,
    parsed
  )

  const encodedCredentialToken = await fetch(data.credentialReceiveEndpoint, {
    method: 'POST',
    body: JSON.stringify({ token: credentialOfferResponse.encode() }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())

  const receivedCredential = await JolocomLib.parse.interactionToken.fromJWT(encodedCredentialToken.token)
  console.log(receivedCredential.interactionToken.signedCredentials)
})
