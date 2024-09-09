import { PenpotShape } from '@penpot/plugin-types'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for Plugin (Penpot bridge) -> UI events

export type ThemeChangeEvent = {
  type: 'theme'
  content: 'light' | 'dark'
}

export type SelectionChangeEvent = {
  type: 'selection',
  content: PenpotShape[] | null
}

export type FromPluginMessageEvent =
  | ThemeChangeEvent
  | SelectionChangeEvent



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for UI -> Plugin (Penpot bridge) events

export type PokeUIEvent = {
  type: 'poke'
  content: string
}

export type FromUiMessageEvent =
  | PokeUIEvent
