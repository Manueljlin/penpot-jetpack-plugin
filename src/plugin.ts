// import { match } from 'ts-pattern'
import type { FromPluginMessageEvent, FromUiMessageEvent, SelectionChangeEvent, ThemeChangeEvent } from './model'
import type { PenpotFrame } from '@penpot/plugin-types'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// UI -> Penpot message

penpot.ui.onMessage<FromUiMessageEvent>(m => {
  console.log('Received event from the UI!')

  // match(m)
  // .with({ type: 'poke' }, () => {
  //   console.log(m.content)
  // })
  // .exhaustive()
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


penpot.on('selectionchange', payload => {
  console.log('selection change')

  sendMessage({
    type: 'selection',
    content: payload.reduce<PenpotFrame[]>((acc, _nodeId) => {
      const shape = penpot.currentPage.getShapeById(_nodeId)

      if (shape?.type == 'frame')
        acc.push(shape)

      return acc
    }, [])
  } as SelectionChangeEvent)
})


penpot.on('finish', () => {
  console.log('finished?')
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Open UI on plugin start

penpot.ui.open('Jetpack', `?theme=${penpot.getTheme()}`, {
  width: 400,
  height: 600
})
