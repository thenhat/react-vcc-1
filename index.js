import Store from './src/store';

import todo from './src/methods/todo';

export default {
	props: {
		namespace: {
			required: true,
			type: 'string',
			empty: false
		},
		username: {
			required: true,
			type: 'string',
			empty: false
		},
		getTokenFunction: {
			required: true,
			type: 'function'
		}
	},
	methods: {
		todo
	},
	load() {
		return new Promise((resolve, reject) => {
			const store = new Store(this.props);

			resolve(store);
		});
	}
};