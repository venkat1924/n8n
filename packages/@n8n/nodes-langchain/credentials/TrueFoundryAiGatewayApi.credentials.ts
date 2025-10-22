import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TrueFoundryAiGatewayApi implements ICredentialType {
	name = 'trueFoundryAiGatewayApi';

	displayName = 'TrueFoundry AI Gateway';

	documentationUrl = 'truefoundryaigateway';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key or OIDC Token',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your credentials for the TrueFoundry AI Gateway',
		},
		{
			displayName: 'Base URL',
			name: 'url',
			type: 'string',
			required: true,
			default: 'https://api.truefoundry.com/v1',
			description: 'The base URL for your TrueFoundry AI Gateway instance',
			placeholder: 'https://api.truefoundry.com/v1',
		},
		{
			displayName: 'Add Custom Header',
			name: 'header',
			type: 'boolean',
			default: false,
		},
		{
			displayName: 'Header Name',
			name: 'headerName',
			type: 'string',
			displayOptions: {
				show: {
					header: [true],
				},
			},
			default: '',
		},
		{
			displayName: 'Header Value',
			name: 'headerValue',
			type: 'string',
			typeOptions: {
				password: true,
			},
			displayOptions: {
				show: {
					header: [true],
				},
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.url }}',
			url: '/chat/completions',
			method: 'POST',
			body: {
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: 'test' }],
				max_tokens: 1,
			},
		},
	};
}
