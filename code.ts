import { createRealColorsCssVariables } from './helpers/getColors';

figma.showUI(__html__);
figma.ui.onmessage = async (msg: { type: string }) => {
	if (msg.type === 'create-css-variables') {
		const cssColorVariables = await createRealColorsCssVariables();
		console.log(cssColorVariables);
	}

	figma.closePlugin();
};
