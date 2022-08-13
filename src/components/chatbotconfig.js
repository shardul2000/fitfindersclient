import { LexRuntimeV2Client} from "@aws-sdk/client-lex-runtime-v2";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

    const REGION = "us-east-1";
    
    // Create an Amazon Lex service client object.
    const lexClient = new LexRuntimeV2Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "us-east-1" }),
        identityPoolId: 'us-east-1:0b2de831-4bfa-4fb1-ad59-fd9c47c9c238',
    }),
    });





    export { lexClient}; 

    
