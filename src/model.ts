import type {
  PenpotLibraryColor,
  PenpotShape
} from '@penpot/plugin-types'


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for Plugin (Penpot bridge) -> UI events

export type ThemeChangeEvent = {
  type: 'theme'
  content: 'light' | 'dark'
}


type EncodedSvg = Uint8Array
export type SelectionChangeEventPayload = [
  shape: PenpotShape | null,
  svg: EncodedSvg | null
]
export type SelectionChangeEvent = {
  type: 'selection'
  content: SelectionChangeEventPayload[]
}


export type LibraryColorsSyncEvent = {
  type: 'send-library-colors'
  content: PenpotLibraryColor[]
}


export type FromPluginMessageEvent =
  | ThemeChangeEvent
  | SelectionChangeEvent
  | LibraryColorsSyncEvent



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Type declarations for UI -> Plugin (Penpot bridge) events

export type PokeUIEvent = {
  type: 'poke'
  content: string
}


export type RequestLibraryColorsUIEvent = {
  type: 'request-library-colors'
}


export type FromUiMessageEvent =
  | PokeUIEvent
  | RequestLibraryColorsUIEvent
