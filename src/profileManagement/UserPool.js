import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData={
    UserPoolId: "us-east-1_HbvJ4FD4H",
    ClientId:"1pa6fkssctobn8j5e1kcl7u2b9"
}

export default new CognitoUserPool(poolData);