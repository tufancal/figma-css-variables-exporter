import { createRealColorsCssVariables } from './helpers/getColors';
import { getTShirtVariables } from './helpers/getTShirtVariables';

figma.showUI(__html__);

figma.ui.onmessage = async (msg: { type: string }) => {
	if (msg.type === 'create-css-variables') {
		const cssColorVariables = await createRealColorsCssVariables();
		const cssDistanceVariables = getTShirtVariables();

		figma.ui.postMessage({
			type: 'css-generated',
			css: [...cssColorVariables, ...cssDistanceVariables],
		});
	}

	if (msg.type === 'cancel') {
		figma.closePlugin();
	}
};
