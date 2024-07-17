//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for Plugin (Penpot bridge) -> UI events

export type ThemePluginEvent = {
  type: 'theme'
  content: 'light'|'dark'
}

export type FromPluginMessageEvent =
  | ThemePluginEvent



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for UI -> Plugin (Penpot bridge) events

export type PokeUIEvent = {
  type: 'poke'
  content: string
}

export type FromUiMessageEvent =
  | { type: 'test', content: string }
  | PokeUIEvent
