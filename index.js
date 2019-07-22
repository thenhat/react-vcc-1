import Store from './src/store';

import todo from './src/methods/todo';
import todo2 from './src/methods/todo2';
import UserService from "./src/store/userService";

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
		todo,todo2
	},
	load() {
		return new Promise((resolve, reject) => {
			const store = new Store(this.props);
			resolve(store);
		});
	}
};
