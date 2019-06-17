import { JolocomLib, claimsMetadata } from "jolocom-lib";
import {claimsMetadata as demoClaimsMetadata} from 'cred-types-jolocom-demo'
import {constraintFunctions} from 'jolocom-lib/js/interactionTokens/credentialRequest'
import { data } from "./data";

const reg = JolocomLib.registries.jolocom.create();

const vault = new JolocomLib.KeyProvider(data.seed, data.secret);
const derivationArgs = {
  derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
  encryptionPass: data.secret
};

const callbackURL = "https://example.service.com/";

reg.authenticate(vault, derivationArgs).then(async identityWallet => {
  const authRequest = await identityWallet.create.interactionTokens.request.auth({
    callbackURL,
    description: 'Signature required'
  }, data.secret)

  console.log(authRequest.encode())

  const simpleCredentialRequest = await identityWallet.create.interactionTokens.request.share(
    {
      callbackURL,
      credentialRequirements: [
        {
          type: claimsMetadata.emailAddress.type,
          constraints: []
        }
      ]
    },
    data.secret
  );

  console.log(simpleCredentialRequest.encode())

  const credentialRequest = await identityWallet.create.interactionTokens.request.share(
    {
      callbackURL,
      credentialRequirements: [
        {
          type: demoClaimsMetadata.demoDriversLicence.type,
          constraints: [constraintFunctions.is('issuer', 'did:jolo:abcdefabcdef...')]
        }
      ]
    },
    data.secret
  );

  console.log(credentialRequest.encode())
});
