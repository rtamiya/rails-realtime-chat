import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number}
  static targets = ["messages"]

  connect() {
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => { this.#insertMessage(data) } }
    )
  }

  disconnect() {
    console.log("disconnecting...")
    this.channel.unsubscribe()
  }

  resetForm(event) {
    const form = event.target
    form.reset()
  }

  //private
  #insertMessage(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    // scrollTo(X, Y)
    // scroll to the bottom of .messages
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }
}
