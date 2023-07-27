import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal-form"
export default class extends Controller {
  static targets=['list-chatrooms', 'modal-body']

  connect() {
    console.log("hello :)")
  }

  inputError(event) {
    event.preventDefault()
    console.log("you submit ;)")
  }
}
