import type { Config as SvgoConfig } from 'svgo'
import moveChildAttrToSVGElement from './svgo-plugins/moveChildAttrToSVGElement'
import responsiveSVGSize from './svgo-plugins/responsiveSVGSize'

export interface OptimizeSvgExtraOptions {
  /** whether to enable moveStrokeAttrToSvgNode plugin */
  moveStrokeAttrToSvgNode?: boolean
  /** whether to enable movePathFillAttrToSvgNode plugin */
  movePathFillAttrToSvgNode?: boolean
  /** whether to enable responsiveSVGSize plugin */
  responsiveSVGSize?: boolean
  /** Whether to add preset-default config for svgo */
  presetDefault?: boolean
}

export type CreateSvgoConfig = (
  incomingConfig?: SvgoConfig,
  extraOptions?: OptimizeSvgExtraOptions
) => SvgoConfig

const createSvgoConfig: CreateSvgoConfig = (
  svgoConfig: SvgoConfig = {},
  extraOptions: OptimizeSvgExtraOptions = {}
) => {
  const finalExtraOptions = Object.assign({ presetDefault: true }, extraOptions)
  let finalSvgoConfig: SvgoConfig = {}

  finalSvgoConfig.plugins = []

  if (finalExtraOptions.presetDefault) {
    finalSvgoConfig.plugins.push('preset-default')
  }

  if (extraOptions.moveStrokeAttrToSvgNode) {
    finalSvgoConfig.plugins.push(
      moveChildAttrToSVGElement('moveStrokeAttrToSVGNode', {
        targetChildElementNames: ['path'],
        targetChildElementAttributes: [
          'stroke',
          'stroke-opacity',
          'stroke-width',
        ],
      })
    )
  }

  if (extraOptions.movePathFillAttrToSvgNode) {
    finalSvgoConfig.plugins.push(moveChildAttrToSVGElement())
  }

  if (responsiveSVGSize) {
    finalSvgoConfig.plugins.push(responsiveSVGSize())
  }

  if (svgoConfig.plugins && svgoConfig.plugins.length > 0) {
    finalSvgoConfig.plugins = [
      ...finalSvgoConfig.plugins,
      ...svgoConfig.plugins,
    ]
  }

  delete svgoConfig.plugins

  finalSvgoConfig = { ...finalSvgoConfig, ...svgoConfig }

  return finalSvgoConfig
}

export default createSvgoConfig
