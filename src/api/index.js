import config from '@sample/config';
import API from '@core/model/api';

class SampleAPI extends API {
	constructor(props) {
		super(props);

		this._username = props.username;
	}
}

export default SampleAPI;