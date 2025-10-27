import { createRealColorsCssVariables } from './helpers/getColors';

figma.showUI(__html__);
figma.ui.onmessage = async (msg: { type: string }) => {
	if (msg.type === 'create-css-variables') {
		const cssColorVariables = await createRealColorsCssVariables();
		const cssVariablesString = cssColorVariables.join('\n');
		console.log(cssVariablesString);

		figma.ui.postMessage({
			type: 'css-generated',
			css: cssColorVariables,
		});
	}

	if (msg.type === 'cancel') {
		figma.closePlugin();
	}
};
