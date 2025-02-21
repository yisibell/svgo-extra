import { createSvgoConfig } from '../lib/index.esm.js'

console.log(
  createSvgoConfig(
    {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false, // 保留 viewBox
            },
          },
        },
      ],
    },
    {
      moveStrokeAttrToSvgNode: true,
      movePathFillAttrToSvgNode: true,
      responsiveSVGSize: true,
      presetDefault: true,
    },
  ),
)
