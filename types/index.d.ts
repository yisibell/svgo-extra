import type { CustomPlugin } from 'svgo'
import type { CreateSvgoConfig } from '../src/createSvgoConfig'

export interface MoveChildAttrToSVGElementOptions {
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

export {
  MoveChildAttrToSVGElement,
  moveChildAttrToSVGElement,
  responsiveSVGSize,
  ResponsiveSVGSize,
  createSvgoConfig,
}
