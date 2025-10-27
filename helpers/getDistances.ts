const getDistances = () => {
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
	const distancesArray: string[] = [];

	for (const node of figma.currentPage.findAll()) {
		if (node.type === 'FRAME' && node.name.toLocaleLowerCase().includes('distances')) {
			if (node.children && node.children.length > 0) {
				const firstChild = node.children[0];

				if ('children' in firstChild && firstChild.children) {
					for (const child of firstChild.children) {
						if (child.type === 'TEXT') {
							distancesArray.push(child.characters);
						}
					}
				}
			}
		}
	}

	const medianIndex = Math.floor(distancesArray.length / 2);
	const mIndex = T_SHIRT_SIZES.indexOf('m');

	const distanceMapping: Record<string, string> = {};

	distancesArray.forEach((distance, index) => {
		const offset = index - medianIndex;

		const tShirtIndex = mIndex + offset;

		if (tShirtIndex >= 0 && tShirtIndex < T_SHIRT_SIZES.length) {
			const size = T_SHIRT_SIZES[tShirtIndex];
			distanceMapping[size] = distance;
		}
	});
	const distancesVariables = Object.entries(distanceMapping).map(([size, distance]) => `--distance-${size}: ${distance};`);

	return distancesVariables;
};

export { getDistances };
