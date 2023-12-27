<p align="center">
  <a href="https://www.npmjs.org/package/svgo-extra">
    <img src="https://img.shields.io/npm/v/svgo-extra.svg">
  </a>
  <a href="https://npmcharts.com/compare/svgo-extra?minimal=true">
    <img src="https://img.shields.io/npm/dm/svgo-extra.svg">
  </a>
  <br>
</p>

# svgo-extra

A collection of **SVGO** Plug-ins.

- [Release Notes](./CHANGELOG.md).

# Features

- Make SVG's color easy to change.
- Make SVG's size responsive.
- Create a suitable configuration for **SVGO**.

# Installation

```bash
# pnmp
$ pnpm add svgo-extra

# yarn
$ yarn add svgo-extra

# npm
$ npm i svgo-extra
```

# APIS

## moveChildAttrToSVGElement

Create an **SVGO** plug-in that can move the attribute of the child node you specify to the svg node.

## responsiveSVGSize

Create a **SVGO** plug-in that can make svg size responsive.

## createSvgoConfig

Create a suitable configuration for **SVGO**, use `preset-default` config by default.



