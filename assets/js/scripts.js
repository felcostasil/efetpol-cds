
window.currentPage = 1
window.nameSearch = ""
import { clickRow, formNum, search, selectChangeHandler, nextPage, backPage } from "./events.js"

const select = document.querySelector("select")

/** Event Listener for <select> */
select.addEventListener("input", selectChangeHandler)
window.search = search
window.clickRow = clickRow
window.nextPage = nextPage
window.backPage = backPage
window.formNum = formNum

