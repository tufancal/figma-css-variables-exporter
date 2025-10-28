const getFontWeights = () => {
	const FONT_WEIGHTS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

	const fontWeights: string[] = [];

	for (const node of figma.currentPage.findAll()) {
		if (node.type === 'FRAME' && node.name.toLowerCase().includes('font weights')) {
			if (node.children && node.children.length > 0) {
				const firstChild = node.children[0];
				if ('children' in firstChild && firstChild.children) {
					for (const child of firstChild.children) {
						if (child.type === 'TEXT') {
							fontWeights.push(child.characters);
						}
					}
				}
			}
		}
	}
};

export { getFontWeights };
