import { Config, CustomPlugin } from 'svgo';

interface OptimizeSvgExtraOptions {
  /** whether to enable moveStrokeAttrToSvgNode plugin */
  moveStrokeAttrToSvgNode?: boolean
  /** whether to enable movePathFillAttrToSvgNode plugin */
  movePathFillAttrToSvgNode?: boolean
  /** whether to enable responsiveSVGSize plugin */
  responsiveSVGSize?: boolean
  /** Whether to add preset-default config for svgo */
  presetDefault?: boolean
}

type CreateSvgoConfig = (
  incomingConfig?: Config,
  extraOptions?: OptimizeSvgExtraOptions
) => Config

interface MoveChildAttrToSVGElementOptions {
  wrapperElementNames?: string[]
  targetChildElementNames?: string[]
  targetChildElementAttributes?: string[]
}

type MoveChildAttrToSVGElement = (
  name?: string,
  options?: MoveChildAttrToSVGElementOptions
) => CustomPlugin

type ResponsiveSVGSize = () => CustomPlugin

declare const moveChildAttrToSVGElement: MoveChildAttrToSVGElement

declare const responsiveSVGSize: ResponsiveSVGSize

declare const createSvgoConfig: CreateSvgoConfig

export { MoveChildAttrToSVGElement, MoveChildAttrToSVGElementOptions, ResponsiveSVGSize, createSvgoConfig, moveChildAttrToSVGElement, responsiveSVGSize };
