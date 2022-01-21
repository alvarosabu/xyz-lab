import { Pane, FpsGraph } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

let pane: Pane
let fpsGraph: FpsGraph
export const useTweakPane = () => {
  if (!pane) {
    pane = new Pane()
    pane.registerPlugin(EssentialsPlugin)
    fpsGraph = pane.addBlade({
      view: 'fpsgraph',
      label: 'fpsgraph',
    })
  }

  return { pane, fpsGraph }
}
