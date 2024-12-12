import { renderApp } from './render-app-11'
import { apiDefaults } from './setup/Api'
// import { renderApp } from './render-app-10'
// import { renderApp } from './render-app-9'
// import { renderApp } from './render-app-8'

const selectElement = document.getElementById("app-renderer")
if (!(selectElement instanceof HTMLSelectElement)) throw new Error("mmh…")


// let’s enforce a default value for testing
selectElement.value = "vue"
selectElement.addEventListener("change", () => {
  void renderApp(selectElement.value)
})

const apiDelaySelect = document.getElementById('api-delay') as HTMLSelectElement
apiDelaySelect.value = String(apiDefaults.preflightDelayInMs)
apiDelaySelect.addEventListener('change', () => {
  apiDefaults.preflightDelayInMs = parseInt(apiDelaySelect.value)
})

void renderApp(selectElement.value)

