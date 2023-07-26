import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal-form"
export default class extends Controller {
  connect() {
    console.log("hello :)")
  }
}
