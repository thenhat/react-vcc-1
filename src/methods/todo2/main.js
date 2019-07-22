import React from '@core/common/react';
import { Provider } from '@core/common/mobx-react';
import { safeRender } from '@core/utils/safe-mode';

import Baimoi from "./components/View";

export default function(store, props) {
	const element = document.querySelector(props.placeholder);

	safeRender(
		<Provider store={store}>
			<Baimoi />
		</Provider>,
		element
	);
}
