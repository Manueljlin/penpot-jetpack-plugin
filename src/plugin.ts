import type { FromPluginMessageEvent, FromUiMessageEvent } from './model'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// UI -> Penpot message

penpot.ui.onMessage<FromUiMessageEvent>(m => {
  console.log('Received event from the UI!')

  if (m.type == 'poke')
    console.log(m.content)
})





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Penpot -> UI message

//penpot.ui.sendMessage(...)

const sendMessage = (m: FromPluginMessageEvent) =>
  penpot.ui.sendMessage(m)

penpot.on('themechange', theme => {
  console.log(theme)
  sendMessage
})



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Open UI on plugin start

penpot.ui.open('Jetpack', `?theme=${penpot.getTheme()}`, {
  width: 400,
  height: 400
})
