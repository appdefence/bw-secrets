const dotenv = require('dotenv');
const sdk = require("@bitwarden/sdk-napi");

dotenv.config();

const { BitwardenClient, DeviceType } = sdk;
// Optional settings
const settings = {
    apiUrl: process.env.BW_API_URL,
    identityUrl: process.env.BW_IDENTITY_URL,
    userAgent: "Bitwarden SDK",
    deviceType: DeviceType.SDK,
};

async function main() {
    const accessToken = process.env.BW_ACCESS_TOKEN;
    const client = new BitwardenClient(settings);

    // Authenticating using a machine account access token
    await client.auth().loginAccessToken(accessToken);

    // List secrets
    const secretsClient = client.secrets();
    const {data: secrets} = await secretsClient.list(process.env.BW_ORGANIZATION_ID);

    for(const sec of secrets) {
        const secret = await secretsClient.get(sec.id);
        console.log(`${secret.key} | ${secret.value}`);
    }

}

main();