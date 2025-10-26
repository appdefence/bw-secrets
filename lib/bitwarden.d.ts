export interface BitwardenConfig {
    apiUrl: string;
    identityUrl: string;
    accessToken: string;
    organizationId: string;
}

export interface Secret {
    key: string;
    value: string;
}

export function createClient(config: BitwardenConfig): Promise<any>;
export function getAllSecrets(config: BitwardenConfig): Promise<Secret[]>;
