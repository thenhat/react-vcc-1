import config from '@sample/config';
import API from '@core/model/api';

class SampleAPI extends API {
	constructor(props) {
		super(props);

		this.gorestInstace = this.create(config.api.gorest);
	}
	getUsers() {
		return this.gorestInstace.get('/users', {
			_format: 'json',
			'access-token': 'OZLjSzXZ3IWDaFe2rLWUB0hYwRVJ_9FsZWo1'
		});
	}
}

export default SampleAPI;