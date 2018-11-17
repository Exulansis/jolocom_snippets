import { JolocomLib, claimsMetadata } from 'jolocom-lib'
import { data } from './data'

const registry = JolocomLib.registries.jolocom.create()
const vaultedKeyProvider = new JolocomLib.keyProvider(data.seed, data.secret)

registry
  .authenticate(vaultedKeyProvider, {
    derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
    encryptionPass: data.secret
  })
  .then(async iw => {
    const mobilePhoneNrCredential = await iw.create.signedCredential(
      {
        metadata: claimsMetadata.mobilePhoneNumber,
        claim: {
          telephone: '01234567'
        },
        subject: iw.did
      },
      data.secret
    )

    console.log(mobilePhoneNrCredential.toJSON())

    const emailCredential = await iw.create.signedCredential(
      {
        metadata: claimsMetadata.emailAddress,
        claim: {
          email: 'eugeniu@jolocom.com'
        },
        subject: iw.did
      },
      data.secret
    )

    console.log(emailCredential.toJSON())
  })