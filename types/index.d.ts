import type { CustomPlugin } from 'svgo'

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

export {
  MoveChildAttrToSVGElement,
  moveChildAttrToSVGElement,
  responsiveSVGSize,
  ResponsiveSVGSize,
}
