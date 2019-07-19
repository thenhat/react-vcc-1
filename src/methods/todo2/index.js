export default {
	props: {
		placeholder: {
			type: 'string',
			required: true,
			validation: /^#.*/gi
		}
	},
	load(store) {
		import('./main.js')
			.then(({default: fn}) => fn(store, this.props))
			.catch(err => {
				throw err;
			});
	}
};