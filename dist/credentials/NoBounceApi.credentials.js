"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoBounceApi = void 0;

class NoBounceApi {
    constructor() {
        this.name = 'noBounceApi';
        this.displayName = 'NoBounce API';
        this.documentationUrl = 'https://nobounceapi.com/compare/n8n-email-validation';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                placeholder: 'nb-...',
                description: 'Your NoBounce API Key from https://nobounceapi.com/dashboard (starts with nb-). Free tier includes 100 validations/month.',
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://nobounceapi.com',
                required: true,
                description: 'Base URL of the NoBounce Email Validation API.',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'X-API-Key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/api/validate',
                method: 'GET',
                qs: {
                    email: 'contact@github.com',
                },
            },
        };
    }
}
exports.NoBounceApi = NoBounceApi;
