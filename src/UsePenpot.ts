import { onMounted, reactive, readonly, ref } from "vue"
import { FromPluginMessageEvent, PokeUIEvent, RequestLibraryColorsUIEvent, SelectionChangeEventPayload } from "./model"
import { match } from "ts-pattern"
import { PenpotLibraryColor, PenpotShape } from "@penpot/plugin-types"


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

type PPTheme =
  | 'light'
  | 'dark'
  | null


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


const isLoading       = ref(false)
const theme           = ref<PPTheme>(null)
const initialized     = ref(false)
const localColors     = ref<PenpotLibraryColor[]>([])
const selectedContent = ref<SelectionChangeEventPayload[]>([])
type SvgString = string
const contentRawSvg   = ref<SvgString[]>([])

const config = reactive({
  multipass: true,
  prettify: true,
  defineLibColors: false
})


export const usePenpot = () => {

  onMounted(() => {
    if (initialized.value) return


    // Initial values
    //

    // Get instantly available initial values from URL params
    const url = new URL(window.location.href)
    const initialTheme = url.searchParams.get('theme') as PPTheme
    theme.value = initialTheme


    // Ask for library colors right after mounting
    //

    parent.postMessage({
      'type': 'request-library-colors'
    } as RequestLibraryColorsUIEvent, '*')


    // Event hooks
    //

    window.addEventListener('message', (e: MessageEvent<FromPluginMessageEvent>) => {
      console.log('UsePenpot/Got message from Plugin', e)

      match(e.data)
      .with({ type: 'theme' }, ({ content }) => {
        theme.value = content
      })
      .with({ type: 'selection' }, ({ content }) => {
        isLoading.value = true
        selectedContent.value = content

        // TODO: move to web worker thingy
        contentRawSvg.value = content
          .map(([, rawSvg]) =>
            rawSvg?.reduce((acc, n) => acc + String.fromCharCode(n), '') ?? ''
        )
        console.log('value is now', contentRawSvg.value)

        isLoading.value = false
      })
      .with({ type: 'send-library-colors'}, ({ content }) => {
        console.log(content)
        localColors.value = content
      })
      .otherwise(v => console.log('UsePenpot/Unexpected message', v))
    })


    // parent.postMessage({
    //   type: 'poke',
    //   content: 'This is the poke from UsePenpot/onMounted!'
    // } as PokeUIEvent, '*')


    initialized.value = true
  })


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // Postprocessing whatevers

  const exportCurrentSvgs = () => {
    // contentRawSvg.value.map(svg => svgOpt)
  }


  return {
    isLoading:       readonly(isLoading),
    theme:           readonly(theme),
    colors:          readonly(localColors),
    selectedContent: readonly(selectedContent),
    contentRawSvg:   readonly(contentRawSvg),
    exportCurrentSvgs,
    config
  }
}
