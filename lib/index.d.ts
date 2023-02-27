import { CustomPlugin } from 'svgo';

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

export { MoveChildAttrToSVGElement, MoveChildAttrToSVGElementOptions, ResponsiveSVGSize, moveChildAttrToSVGElement, responsiveSVGSize };
