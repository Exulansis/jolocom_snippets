import { JolocomLib } from 'jolocom-lib'
import { data } from './data'

const registry = JolocomLib.registries.jolocom.create()
const vaultedProvider = new JolocomLib.keyProvider(data.seed, data.secret)

const publicEthereumKey = vaultedProvider.getPublicKey({
  derivationPath: JolocomLib.KeyTypes.ethereumKey,
  encryptionPass: data.secret
})

JolocomLib.util.fuelKeyWithEther(publicEthereumKey).then(() => {
  registry.create(vaultedProvider, data.secret).then(identityWallet => {
    console.log(`did - ${identityWallet.did}`)
  })
})
