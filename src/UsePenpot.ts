import { onMounted, readonly, ref } from "vue"
import { FromPluginMessageEvent, PokeUIEvent } from "./model"
import { match } from "ts-pattern"


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

type PPTheme =
  | 'light'
  | 'dark'
  | null


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


const theme = ref<PPTheme>(null)
const initialized = ref(false)


export const usePenpot = () => {

  onMounted(() => {
    if (initialized.value) return


    // Theme
    //

    // Get current theme from URL params
    const url = new URL(window.location.href)
    const initialTheme = url.searchParams.get('theme') as PPTheme
    theme.value = initialTheme


    // Event hooks
    //

    window.addEventListener('message', (e: MessageEvent<FromPluginMessageEvent>) => {
      console.log('sup!')
      console.log(e)

      match(e.data)
      .with({ type: 'theme' }, (v) => {
        theme.value = v.content
      })
      .with({ type: 'selection' }, (v) => {
        console.log(v.content)
      })
      .exhaustive()
    })


    parent.postMessage({
      type: 'poke',
      content: 'This is the poke from UsePenpot/onMounted!'
    } as PokeUIEvent, '*')


    initialized.value = true
  })



  return {
    theme: readonly(theme)
  }
}
