'use strict';

const { BitwardenClient, DeviceType } = require('@bitwarden/sdk-napi');

/**
 * @typedef {Object} BitwardenConfig
 * @property {string} apiUrl - Bitwarden API URL
 * @property {string} identityUrl - Bitwarden Identity URL
 * @property {string} accessToken - Access token for authentication
 * @property {string} organizationId - Organization ID
 */

/**
 * Creates a configured Bitwarden client
 * @param {BitwardenConfig} config
 * @returns {Promise<BitwardenClient>}
 */
async function createClient(config) {
    const client = new BitwardenClient({
        apiUrl: config.apiUrl,
        identityUrl: config.identityUrl,
        userAgent: 'Bitwarden SDK',
        deviceType: DeviceType.SDK,
    });

    await client.auth().loginAccessToken(config.accessToken);
    return client;
}

/**
 * Fetches all secrets from Bitwarden
 * @param {BitwardenConfig} config
 * @returns {Promise<Array<{key: string, value: string}>>}
 */
async function getAllSecrets(config) {
    const client = await createClient(config);
    const secretsClient = client.secrets();
    const { data: secrets } = await secretsClient.list(config.organizationId);

    const results = [];
    for (const sec of secrets) {
        const secret = await secretsClient.get(sec.id);
        results.push({ key: secret.key, value: secret.value });
    }

    return results;
}

module.exports = {
    createClient,
    getAllSecrets,
};
