'use strict';

const dotenv = require('dotenv');
const { BitwardenClient, DeviceType } = require('@bitwarden/sdk-napi');

// Initialize environment variables before usage
dotenv.config();

/**
 * Bitwarden SDK configuration
 */
const config = {
    apiUrl: process.env.BW_API_URL,
    identityUrl: process.env.BW_IDENTITY_URL,
    userAgent: 'Bitwarden SDK',
    deviceType: DeviceType.SDK,
};

/**
 * Lists all secrets from Bitwarden
 * @throws {Error} If authentication or API calls fail
 */
async function main() {
    try {
        const client = new BitwardenClient(config);
        await client.auth().loginAccessToken(process.env.BW_ACCESS_TOKEN);

        const secretsClient = client.secrets();
        const { data: secrets } = await secretsClient.list(process.env.BW_ORGANIZATION_ID);

        for (const sec of secrets) {
            const secret = await secretsClient.get(sec.id);
            console.log(`${secret.key} | ${secret.value}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Execute with proper error handling
main().catch(() => process.exit(1));