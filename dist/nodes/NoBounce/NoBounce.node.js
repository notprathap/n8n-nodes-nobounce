"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoBounce = void 0;

class NoBounce {
    constructor() {
        this.description = {
            displayName: 'NoBounce Email Validator',
            name: 'noBounce',
            icon: 'file:nobounce.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] === "validateBulk" ? "Validate Bulk Emails" : "Validate Single Email"}}',
            description: 'Real-time Email Validation & Bulk Verification API (~15ms DNS/MX, Disposable, Role-Based & Typo Detection) — 75% more affordable than ZeroBounce & NeverBounce.',
            defaults: {
                name: 'NoBounce',
            },
            inputs: ['main'],
            outputs: ['main'],
            usableAsTool: true,
            credentials: [
                {
                    name: 'noBounceApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Validate Single Email',
                            value: 'validateSingle',
                            description: 'Verify syntax, live DNS/MX records, disposable status, role account, free webmail, and typo suggestions for a single email',
                            action: 'Validate a single email address',
                        },
                        {
                            name: 'Validate Bulk Emails',
                            value: 'validateBulk',
                            description: 'Verify up to 5,000 email addresses in a single high-speed batch request',
                            action: 'Validate multiple email addresses in bulk',
                        },
                    ],
                    default: 'validateSingle',
                },
                {
                    displayName: 'Email Address',
                    name: 'email',
                    type: 'string',
                    default: '',
                    required: true,
                    placeholder: 'contact@github.com',
                    displayOptions: {
                        show: {
                            operation: ['validateSingle'],
                        },
                    },
                    description: 'The email address to validate (e.g., {{ $json.email }})',
                },
                {
                    displayName: 'Emails (Comma or Newline Separated)',
                    name: 'emails',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    default: '',
                    required: true,
                    placeholder: 'contact@github.com, test@mailinator.com, user@gmial.com',
                    displayOptions: {
                        show: {
                            operation: ['validateBulk'],
                        },
                    },
                    description: 'Comma-separated or newline-separated list of email addresses to validate (up to 5,000 per batch)',
                },
            ],
        };
    }

    async execute() {
        const items = this.getInputData();
        const returnData = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i, 'validateSingle');
                const credentials = await this.getCredentials('noBounceApi', i);
                const baseUrl = String(credentials.baseUrl || 'https://nobounceapi.com').replace(/\/+$/, '');
                const apiKey = String(credentials.apiKey || '').trim();

                if (operation === 'validateSingle') {
                    const email = String(this.getNodeParameter('email', i, '')).trim();
                    const responseData = await this.helpers.httpRequest({
                        method: 'GET',
                        url: `${baseUrl}/api/validate`,
                        qs: { email },
                        headers: {
                            'X-API-Key': apiKey,
                        },
                        json: true,
                    });

                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                } else if (operation === 'validateBulk') {
                    const rawEmails = this.getNodeParameter('emails', i, '');
                    const emailList = Array.isArray(rawEmails)
                        ? rawEmails
                        : String(rawEmails)
                              .split(/[\n,;]+/)
                              .map((e) => e.trim())
                              .filter(Boolean);

                    const responseData = await this.helpers.httpRequest({
                        method: 'POST',
                        url: `${baseUrl}/api/validate-bulk`,
                        headers: {
                            'X-API-Key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            emails: emailList,
                        },
                        json: true,
                    });

                    returnData.push({
                        json: responseData,
                        pairedItem: { item: i },
                    });
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}
exports.NoBounce = NoBounce;
