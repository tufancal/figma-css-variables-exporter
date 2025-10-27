const getColors = () => {
	const rgbToHex = (r: number, g: number, b: number): string => {
		const toHex = (n: number) => {
			const hex = Math.round(n * 255).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
	};

	const colorHexCodes: string[] = [];

	for (const node of figma.currentPage.findAll()) {
		if (node.type === 'FRAME' && node.name.toLocaleLowerCase().includes('color')) {
			if (node.children && node.children.length > 0) {
				const firstChild = node.children[0];

				if ('children' in firstChild && firstChild.children) {
					for (const child of firstChild.children) {
						if (child.type === 'RECTANGLE') {
							if ('fills' in child) {
								const fills = child.fills;

								if (fills !== figma.mixed && Array.isArray(fills) && fills.length > 0) {
									const firstFill = fills[0];

									if (firstFill.type === 'SOLID') {
										const hexColor = rgbToHex(firstFill.color.r, firstFill.color.g, firstFill.color.b);
										colorHexCodes.push(hexColor);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return colorHexCodes;
};

const getRealColor = async (colorHexCode: string): Promise<string | null> => {
	try {
		const hex = colorHexCode.replace('#', '');
		const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);

		if (!response.ok) {
			console.error('API error:', response.status, response.statusText);
			return null;
		}

		const data = await response.json();
		return data.name.value;
	} catch (error) {
		return null;
	}
};

const createRealColorsCssVariables = async () => {
	const colorHexCodes = getColors();
	const realColors = await Promise.all(colorHexCodes.map(getRealColor));

	const colorsObject: Record<string, string> = {};

	for (let index = 0; index < realColors.length; index++) {
		colorsObject[colorHexCodes[index]] = realColors[index] || '';
	}

	const cssVariables = Object.entries(colorsObject).map(
		([colorHexCode, realColor]: [string, string]) => `--color-${realColor.replace(' ', '-').toLowerCase()}: ${colorHexCode};`
	);
	return cssVariables;
};

export { createRealColorsCssVariables };
