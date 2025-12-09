import { createRealColorsCssVariables } from './helpers/getColors';
import { getTShirtVariables } from './helpers/getTShirtVariables';
import { getFontWeights } from './helpers/getFontWeights';

figma.showUI(__html__);

figma.ui.onmessage = async (msg: { type: string }) => {
	if (msg.type === 'create-css-variables') {
		const cssColorVariables = await createRealColorsCssVariables();
		const cssDistanceVariables = getTShirtVariables();
		const cssFontWeightVariables = getFontWeights();

		figma.ui.postMessage({
			type: 'css-generated',
			css: [...cssColorVariables, ...cssDistanceVariables, ...cssFontWeightVariables],
		});
	}

	if (msg.type === 'cancel') {
		figma.closePlugin();
	}
};
