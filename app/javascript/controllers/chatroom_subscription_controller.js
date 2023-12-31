import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number, currentUserId: Number}
  static targets = ["messages"]

  connect() {
    console.log(this.chatroomIdValue)
    console.log(this.currentUserIdValue)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => {
          console.log(data);
          this.#insertMessageAndScrollDown(data);
         }
      }
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
  #insertMessageAndScrollDown(data) {
    // called when browser get a ping from chatroomChannel
    // check if sender === current user
    console.log(this.currentUserIdValue)
    console.log(data.sender_id)
    const currentUserIsSender = this.currentUserIdValue === data.sender_id
    // build the message element
    const messageElement = this.#buildMessageElement(currentUserIsSender, data.message)
    this.messagesTarget.insertAdjacentHTML("beforeend", messageElement)
    // scrollTo(X, Y)
    // scroll to the bottom of .messages
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

  // function to build right style message element
  // just a translation from .html.erb -> js
  #buildMessageElement(currentUserIsSender, message) {
    return `
      <div class="message-row d-flex ${this.#justifyClass(currentUserIsSender)}">
        <div class="${this.#userStyleClass(currentUserIsSender)}">
          ${message}
        </div>
      </div>
    `
  }

  #justifyClass(currentUserIsSender) {
    return currentUserIsSender ? "justify-content-end" : "justify-content-start"
  }

  #userStyleClass(currentUserIsSender) {
    return currentUserIsSender ? "sender-style" : "receiver-style"
  }
}
