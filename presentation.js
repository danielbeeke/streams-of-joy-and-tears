import Reveal from 'reveal.js';
import HighLight from 'reveal.js/plugin/highlight/highlight.esm'
import revealSvgFragment from './reveal-svg-fragment';

const deck = new Reveal()
deck.initialize({
   hash: true,
   plugins: [revealSvgFragment, HighLight],
   controlsTutorial: false,
   controls: false
})