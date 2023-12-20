const moveAttrToSvgNode = (svgNode, targetElements, targetAttribute) => {
    if (targetElements.length <= 0)
        return;
    const allTargetElementAttrValues = targetElements
        .map((v) => v.attributes[targetAttribute])
        .filter((attrValue) => !!attrValue);
    const hasTargetAttr = allTargetElementAttrValues.length > 0;
    const isMonochromeAttr = hasTargetAttr && [...new Set(allTargetElementAttrValues)].length === 1;
    if (isMonochromeAttr) {
        svgNode.attributes[targetAttribute] = allTargetElementAttrValues[0];
        targetElements.forEach((v) => {
            delete v.attributes[targetAttribute];
        });
    }
};
const createTargetElements = (nodes, targetChildElementNames, wrapperElementNames, res = []) => {
    const elements = nodes.filter((v) => v.type === 'element' &&
        (targetChildElementNames.includes(v.name) ||
            (wrapperElementNames.length > 0 &&
                wrapperElementNames.includes(v.name))));
    elements.forEach((v) => {
        if (targetChildElementNames.includes(v.name)) {
            res.push(v);
        }
        if (v.children && v.children.length > 0) {
            createTargetElements(v.children, targetChildElementNames, wrapperElementNames, res);
        }
    });
    return res;
};
const moveChildAttrToSVGElement = (name = 'movePathFillAttrToSVGNode', option) => {
    const finalOption = Object.assign({
        wrapperElementNames: ['g'],
        targetChildElementNames: ['path'],
        targetChildElementAttributes: ['fill', 'fill-opacity'],
    }, option);
    return {
        name,
        fn() {
            return {
                element: {
                    enter: (node) => {
                        if (node.name === 'svg') {
                            if (!node.children || node.children.length <= 0)
                                return;
                            const targetElements = createTargetElements(node.children, finalOption.targetChildElementNames, finalOption.wrapperElementNames);
                            finalOption.targetChildElementAttributes.forEach((attrName) => {
                                moveAttrToSvgNode(node, targetElements, attrName);
                            });
                        }
                    },
                },
            };
        },
    };
};

const setAttr = (node, name, value) => {
    node.attributes[name] = value;
};
const genStyles = (cssObj) => {
    return Object.keys(cssObj).reduce((res, key) => {
        const item = `${key}:${cssObj[key]};`;
        res += item;
        return res;
    }, '');
};
const responsiveSVGSize = () => {
    return {
        name: 'responsiveSVGSize',
        fn: () => {
            return {
                element: {
                    enter(node) {
                        if (node.name === 'svg') {
                            const { width, height, style } = node.attributes;
                            const wNumber = Number.parseFloat(width);
                            const hNumber = Number.parseFloat(height);
                            const addStyle = genStyles({
                                '--svg-origin-width': wNumber,
                                '--svg-origin-height': hNumber,
                                '--svg-origin-width--with-unit': `${wNumber}px`,
                                '--svg-origin-height--with-unit': `${hNumber}px`,
                            });
                            const styleValue = style ? `${addStyle}${style}` : addStyle;
                            setAttr(node, 'style', styleValue);
                            setAttr(node, 'data-svg-origin-width', width);
                            setAttr(node, 'data-svg-origin-height', height);
                            if (width) {
                                setAttr(node, 'font-size', width);
                            }
                            setAttr(node, 'width', '1em');
                            delete node.attributes.height;
                        }
                    },
                },
            };
        },
    };
};

const createSvgoConfig = (svgoConfig = {}, extraOptions = {}) => {
    const finalExtraOptions = Object.assign({ presetDefault: true }, extraOptions);
    let finalSvgoConfig = {};
    finalSvgoConfig.plugins = [];
    if (finalExtraOptions.presetDefault) {
        finalSvgoConfig.plugins.push('preset-default');
    }
    if (extraOptions.moveStrokeAttrToSvgNode) {
        finalSvgoConfig.plugins.push(moveChildAttrToSVGElement('moveStrokeAttrToSVGNode', {
            targetChildElementNames: ['path'],
            targetChildElementAttributes: [
                'stroke',
                'stroke-opacity',
                'stroke-width',
            ],
        }));
    }
    if (extraOptions.movePathFillAttrToSvgNode) {
        finalSvgoConfig.plugins.push(moveChildAttrToSVGElement());
    }
    if (responsiveSVGSize) {
        finalSvgoConfig.plugins.push(responsiveSVGSize());
    }
    if (svgoConfig.plugins && svgoConfig.plugins.length > 0) {
        finalSvgoConfig.plugins = [
            ...finalSvgoConfig.plugins,
            ...svgoConfig.plugins,
        ];
    }
    delete svgoConfig.plugins;
    finalSvgoConfig = { ...finalSvgoConfig, ...svgoConfig };
    return finalSvgoConfig;
};

export { createSvgoConfig, moveChildAttrToSVGElement, responsiveSVGSize };
