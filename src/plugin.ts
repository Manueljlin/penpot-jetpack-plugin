import type { FromPluginMessageEvent, FromUiMessageEvent, LibraryColorsSyncEvent, SelectionChangeEvent, SelectionChangeEventPayload, ThemeChangeEvent } from './model'
import type { PenpotFrame } from '@penpot/plugin-types'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// UI -> Penpot message

penpot.ui.onMessage<FromUiMessageEvent>(m => {
  console.log('Received event from the UI!', m)

  // can't use actual external libraries quite yet (such as ts-pattern).
  // it's a skill issue of my vite config for sure, but it doesn't really matter
  // for now
  switch (m.type) {
  case 'poke':
    console.log('Plugin/i have indeed been subjected to poking by the vue ui')
    break;

  case 'request-library-colors':
    console.log('Plugin/Sending ui the library colors as requested')
    sendMessage({
      type: 'send-library-colors',
      content: {... penpot.library.local.colors}
    } as LibraryColorsSyncEvent)
    break;

  default:
    console.log("Plugin/i don't really know what you want from me", m)
    break;
  }
})





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Penpot -> UI message

//penpot.ui.sendMessage(...)

const sendMessage = (m: FromPluginMessageEvent) =>
  penpot.ui.sendMessage(m)

penpot.on('themechange', theme => {
  // console.log(theme)
  sendMessage({

  } as ThemeChangeEvent)
})


penpot.on('selectionchange', async payload => {
  console.log('selection change')

  const res: SelectionChangeEventPayload[] = await Promise.all(
    payload.map(async _nodeId => {
      const shape = penpot.currentPage.getShapeById(_nodeId)

      return [
        shape,
        await shape?.export({
          type: 'svg'
        }) ?? null
      ] satisfies SelectionChangeEventPayload
    }
  ))
  sendMessage({
    type: 'selection',
    content: res
  } as SelectionChangeEvent)
})


penpot.on('finish', () => {
  console.log('finished?')
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Open UI on plugin start

penpot.ui.open(
  'Jetpack',
  [
    `?theme=${penpot.getTheme()}`,
    // `&key=value`
  ].join(''),
  {
    width: 400,
    height: 600
  }
)
