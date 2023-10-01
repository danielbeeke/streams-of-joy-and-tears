export default () => ({
  id: 'svg-fragment',
  init: async ( deck ) => {
    const svgs = document.querySelectorAll('[data-svg]')
    for (const svg of svgs) {
      const fileName = svg.getAttribute('data-svg')
      const file = await fetch(location.pathname + fileName).then(response => response.text())
      svg.innerHTML = file.replaceAll('inkscape:label', 'inkscape-label')
      svg.children[0].removeAttribute('width')
      svg.children[0].removeAttribute('height')
      const layers = [...svg.querySelectorAll(`[inkscape-label]`)]
      layers.shift()
      const fragments = svg.getAttribute('data-svg-fragments')?.split(',') ?? layers.map(layer => layer.getAttribute('inkscape-label'))

      for (const fragment of fragments) {
        const layer = svg.querySelector(`[inkscape-label="${fragment}"]`)
        layer?.classList.add('fragment')
      }
    }

    deck.on('fragmentshown', event => {
      document.body.dataset.lastFragment = event.fragment.getAttribute('inkscape-label')
    })

    deck.on('fragmenthidden', event => {
      if (document.body.dataset.lastFragment === event.fragment.getAttribute('inkscape-label')) {
        document.body.dataset.lastFragment = ''
      }
    })

  }
})