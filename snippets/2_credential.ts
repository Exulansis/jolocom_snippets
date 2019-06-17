import { JolocomLib, claimsMetadata } from 'jolocom-lib'
import {claimsMetadata as demoClaimsMetadata} from 'cred-types-jolocom-demo'
import { data } from './data'

const registry = JolocomLib.registries.jolocom.create()
const vaultedKeyProvider = new JolocomLib.KeyProvider(data.seed, data.secret)

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
          telephone: '000111222'
        },
        subject: iw.did
      },
      data.secret
    )

    console.log(mobilePhoneNrCredential.toJSON())

    const driverLicenseCredential = await iw.create.signedCredential(
      {
        metadata: demoClaimsMetadata.demoDriversLicence,
        claim: {
          familyName: 'Test Name',
          givenName: 'Test Given Name',
          identifier: 'DOC0123',
          postalCode: '12351',
          residence: 'Berlin'
        },
        subject: iw.did
      },
      data.secret
    )

    console.log(driverLicenseCredential)
  })
