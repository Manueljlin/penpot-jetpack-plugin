import { PenpotLibraryColor } from '@penpot/plugin-types'
import { optimize } from 'svgo'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


export const svgo = async (params: {
  svg:       string,
  multipass: boolean,
  prettify:  boolean
}): Promise<string> => {
  const {
    svg,
    multipass,
    prettify
  } = params

  return await optimize(svg, { // it's actually a promise. the d.ts is outdated
    multipass: multipass,
    js2svg: {
      indent: 2,
      pretty: prettify
    }
  }).data // lovely error "handling" I know
}



export const parseSvgString = (svg: string) =>
  new DOMParser()
    .parseFromString(svg, 'image/svg+xml')
    .documentElement as unknown as SVGElement


export const sizeOnlyInViewbox = (svg: SVGElement) => {
  const width  = svg.getAttribute('width')
  const height = svg.getAttribute('height')

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  if (svg.getAttribute('viewBox') == null)
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


const svgOpt = async (params: {
  svgs: string[]
  libraryColors: PenpotLibraryColor[],
  options: {
    multipass: boolean,
    prettify: boolean,
    defineLibColors: boolean
  }
}) => {
  const {
    svgs,
    libraryColors,
    options
  } = params


  svgs.map(async _svg => {
    // Optimize with SVGO
    //
    let _opt = await svgo({
      svg: _svg,
      multipass: options.multipass,
      prettify: options.prettify
    })


    // Parse to SVGElement
    //
    let parsedSvg = parseSvgString(_opt)


    // Remove SVG fill if empty
    //
    if (parsedSvg.getAttribute('fill') == '')
      parsedSvg.removeAttribute('fill')


    // Ensure size is only set with viewbox
    //
    sizeOnlyInViewbox(parsedSvg)


    // If user wants to define library colors as css variables...
    //
    if (options.defineLibColors) {
      const ns = 'http://www.w3.org/2000/svg'

      // Ensure <defs> element isn't missing
      let defs: SVGDefsElement | null = parsedSvg.querySelector('defs')

      if (defs == null)
        defs = document.createElementNS(ns, 'defs') as SVGDefsElement
      else
        parsedSvg.removeChild(defs)

      // Rearrange defs to top
      parsedSvg.insertBefore(defs, parsedSvg.firstChild)
      parsedSvg.insertBefore(
        document.createTextNode('\n  '),
        parsedSvg.firstChild
      )

      // ensure <style> isn't missing
      // let style = SVGStyleElement | null = defs
      //   .querySelector('style')
    }
  })
}

export default svgOpt
