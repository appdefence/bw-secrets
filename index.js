'use strict';

const dotenv = require('dotenv');
const { getAllSecrets } = require('./lib/bitwarden');

// Initialize environment variables
dotenv.config();

/**
 * Main application entry point
 */
async function main() {
    try {
        const config = {
            apiUrl: process.env.BW_API_URL,
            identityUrl: process.env.BW_IDENTITY_URL,
            accessToken: process.env.BW_ACCESS_TOKEN,
            organizationId: process.env.BW_ORGANIZATION_ID,
        };

        const secrets = await getAllSecrets(config);
        secrets.forEach(({ key, value }) => console.log(`${key} | ${value}`));
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Execute with proper error handling
main().catch(() => process.exit(1));