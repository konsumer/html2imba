import { App } from './tags/App'

Imba.mount <App>

module:hot.dispose do
  document:body:innerHTML = ''