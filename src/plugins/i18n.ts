import { createI18n } from 'vue-i18n'
import zhTw from '../assets/languages/zh-tw.json'
import en from '../assets/languages/zh-en.json'

import element_zh_tw from 'element-plus/lib/locale/lang/zh-tw'
import element_en from 'element-plus/lib/locale/lang/en'

import { LangType } from '../utils/lang-type';
const messages = {
     'en': {
          ...en,
          ...element_en
     },
     'zh-tw': {
          ...zhTw,
          ...element_zh_tw
     }
}
type MessageSchema = typeof zhTw

const i18n = createI18n<[MessageSchema], LangType.ZH | LangType.EN>({
     legacy: false,
     locale: LangType.EN,
     fallbackLocale: LangType.EN,
     globalInjection: true,
     messages: messages
})

export default i18n

