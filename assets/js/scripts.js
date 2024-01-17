
import { clickRow, search, selectChangeHandler } from "./events.js"

const select = document.querySelector("select")

/** Event Listener for <select> */
select.addEventListener("input", selectChangeHandler)
window.search = search
window.clickRow = clickRow