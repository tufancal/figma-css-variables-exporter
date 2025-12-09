const getFontWeights = () => {
	const FONT_WEIGHTS = [
		{ value: '100', name: 'thin' },
		{ value: '200', name: 'extra-light' },
		{ value: '300', name: 'light' },
		{ value: '400', name: 'regular' },
		{ value: '500', name: 'medium' },
		{ value: '600', name: 'semi-bold' },
		{ value: '700', name: 'bold' },
		{ value: '800', name: 'extra-bold' },
		{ value: '900', name: 'black' },
	];
	const variables: string[] = [];

	const collectFontWeights = (): string[] => {
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

		return fontWeights;
	};

	const fontWeights = collectFontWeights();

	fontWeights.forEach((value) => {
		const matchedWeight = FONT_WEIGHTS.find((weight) => weight.value === value);
		if (matchedWeight) {
			variables.push(`--font-weight-${matchedWeight.name}: ${value};`);
		}
	});

	return variables;
};

export { getFontWeights };
