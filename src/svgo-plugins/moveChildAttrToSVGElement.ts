import type { XastElement, XastChild } from 'svgo/lib/types'
import type { MoveChildAttrToSVGElement } from '../../types'

export const moveAttrToSvgNode = (
  svgNode: XastElement,
  targetElements: XastElement[],
  targetAttribute: string
) => {
  if (targetElements.length <= 0) return

  const allTargetElementAttrValues = targetElements
    .map((v) => v.attributes[targetAttribute])
    .filter((attrValue) => !!attrValue)

  const hasTargetAttr = allTargetElementAttrValues.length > 0

  const isMonochromeAttr =
    hasTargetAttr && [...new Set(allTargetElementAttrValues)].length === 1

  if (isMonochromeAttr) {
    svgNode.attributes[targetAttribute] = allTargetElementAttrValues[0]

    targetElements.forEach((v) => {
      delete v.attributes[targetAttribute]
    })
  }
}

export const createTargetElements = (
  nodes: XastChild[],
  targetChildElementNames: string[],
  wrapperElementNames: string[],
  res: XastElement[] = []
) => {
  const elements = nodes.filter(
    (v) =>
      v.type === 'element' &&
      (targetChildElementNames.includes(v.name) ||
        (wrapperElementNames.length > 0 &&
          wrapperElementNames.includes(v.name)))
  ) as XastElement[]

  elements.forEach((v) => {
    if (targetChildElementNames.includes(v.name)) {
      res.push(v)
    }

    if (v.children && v.children.length > 0) {
      createTargetElements(
        v.children,
        targetChildElementNames,
        wrapperElementNames,
        res
      )
    }
  })

  return res
}

/**
 * move child element attribute to it's parent node (svg) when the children elements are monochrome.
 */
const moveChildAttrToSVGElement: MoveChildAttrToSVGElement = (
  name = 'movePathFillAttrToSVGNode',
  option
) => {
  const finalOption = Object.assign(
    {
      wrapperElementNames: ['g'],
      targetChildElementNames: ['path'],
      targetChildElementAttributes: ['fill', 'fill-opacity'],
    },
    option
  )

  return {
    name,
    fn() {
      return {
        element: {
          enter: (node) => {
            if (node.name === 'svg') {
              if (!node.children || node.children.length <= 0) return

              const targetElements = createTargetElements(
                node.children,
                finalOption.targetChildElementNames,
                finalOption.wrapperElementNames
              )

              finalOption.targetChildElementAttributes.forEach((attrName) => {
                moveAttrToSvgNode(node, targetElements, attrName)
              })
            }
          },
        },
      }
    },
  }
}

export default moveChildAttrToSVGElement
