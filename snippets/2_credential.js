const { JolocomLib, claimsMetadata } = require('jolocom-lib')
const {privateIdentityKey} = require('./data')

const reg = JolocomLib.registry.jolocom.create()

reg.authenticate(Buffer.from(privateIdentityKey, 'hex')).then(async iw => {
  const mobilePhoneNrCredential = await iw.create.signedCredential({
    metadata: claimsMetadata.mobilePhoneNumber,
    claim: {
      telephone: '01234567'
    }
  })

  console.log(mobilePhoneNrCredential.toJSON())

  const emailCredential = await iw.create.signedCredential({
    metadata: claimsMetadata.emailAddress,
    claim: {
      email: 'eugeniu@jolocom.com'
    }
  })

  console.log(emailCredential.toJSON())
})

// reg.resolve('did:jolo:dfbd781eeeb7a1344f66ac6c29bf1605a8600b46e0267fc5dd82d59a9506f13e').then(identity => console.log(identity))
