# @appdefence/bw-secrets

Simple Bitwarden secrets manager wrapper.

## Installation

```bash
npm install @appdefence/bw-secrets
# The package uses @bitwarden/sdk-napi under the hood; ensure it is available in your environment.
```

## Exports

This package exports two helpers:

- `createClient(config)` — low-level helper to create and initialize a Bitwarden client using an access token.
- `getAllSecrets(config)` — convenience helper that returns an array of secrets as `{ key, value }`.

## Programmatic usage

```javascript
const { getAllSecrets, createClient } = require('@appdefence/bw-secrets');
// Or using ES modules:
// import { getAllSecrets, createClient } from '@appdefence/bw-secrets';

const config = {
  apiUrl: 'https://api.bitwarden.com',
  identityUrl: 'https://identity.bitwarden.com',
  accessToken: 'YOUR_ACCESS_TOKEN',    // required
  organizationId: 'YOUR_ORG_ID'
};

(async () => {
  const secrets = await getAllSecrets(config);
  secrets.forEach(({ key, value }) => console.log(`${key}: ${value}`));
})();
