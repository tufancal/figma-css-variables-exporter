const getTShirtVariables = () => {
	const T_SHIRT_SIZES = [
		'7xs',
		'6xs',
		'5xs',
		'4xs',
		'3xs',
		'2xs',
		'xs',
		's',
		'm',
		'l',
		'xl',
		'2xl',
		'3xl',
		'4xl',
		'5xl',
		'6xl',
		'7xl',
		'8xl',
		'9xl',
		'10xl',
	];

	const mIndex = T_SHIRT_SIZES.indexOf('m');
	const allVariables: string[] = [];

	const collectDataFromFrames = (frameName: string): string[] => {
		const dataArray: string[] = [];

		for (const node of figma.currentPage.findAll()) {
			if (node.type === 'FRAME' && node.name.toLowerCase().includes(frameName)) {
				if (node.children && node.children.length > 0) {
					const firstChild = node.children[0];
					if ('children' in firstChild && firstChild.children) {
						for (const child of firstChild.children) {
							if (child.type === 'TEXT') {
								dataArray.push(child.characters);
							}
						}
					}
				}
			}
		}

		return dataArray;
	};

	const processDataToVariables = (dataArray: string[], cssPrefix: string): string[] => {
		if (dataArray.length === 0) return [];

		const medianIndex = Math.floor(dataArray.length / 2);
		const mapping: Record<string, string> = {};

		dataArray.forEach((value, index) => {
			const offset = index - medianIndex;
			const tShirtIndex = mIndex + offset;

			if (tShirtIndex >= 0 && tShirtIndex < T_SHIRT_SIZES.length) {
				const size = T_SHIRT_SIZES[tShirtIndex];
				mapping[size] = value;
			}
		});

		const variables: string[] = [];
		for (const size in mapping) {
			variables.push(`--${cssPrefix}-${size}: ${mapping[size]};`);
		}
		return variables;
	};

	const frameConfigs = [
		{ frameName: 'distances', cssPrefix: 'distance' },
		{ frameName: 'font sizes', cssPrefix: 'font-size' },
		{ frameName: 'line heights', cssPrefix: 'line-height' },
		{ frameName: 'border radius', cssPrefix: 'border-radius' },
	];

	frameConfigs.forEach(({ frameName, cssPrefix }) => {
		const dataArray = collectDataFromFrames(frameName);
		const variables = processDataToVariables(dataArray, cssPrefix);
		allVariables.push(...variables);
	});

	return allVariables;
};

export { getTShirtVariables };
