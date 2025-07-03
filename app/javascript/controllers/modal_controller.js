import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "loginModal", "signupModal" ]

  boundCloseOnEscape = this.closeOnEscape.bind(this)
  boundCloseOnBackdrop = this.closeOnBackdrop.bind(this)

  connect() {
    const modalToOpen = this.element.dataset.modalToOpen
    if (modalToOpen) {
      // Access target directly using Stimulus's generated properties
      const modal = this[modalToOpen + 'Target']
      if (modal) {
        this._showModal(modal)
      }
    }
  }

  open(event) {
    event.preventDefault()
    const modalId = this.getModalId(event.currentTarget)
    const modal = this[modalId + 'Target'] // Correct way to access Stimulus target
    if (modal) {
      this._showModal(modal)
    }
  }

  close(event) {
    if (event) {
      event.preventDefault()
    }
    const modal = event ? event.currentTarget.closest(".modal") : this.element.querySelector(".modal--open")
    if (modal) {
      this._hideModal(modal)
    }
  }

  switch(event) {
    event.preventDefault()
    const currentModal = event.currentTarget.closest(".modal")
    const targetModalId = event.currentTarget.id.includes("switchToSignup") ? "signupModal" : "loginModal"
    const targetModal = this[targetModalId + 'Target'] // Correct way to access Stimulus target

    if (currentModal && targetModal) {
      this._hideModal(currentModal)
      this._showModal(targetModal)
    }
  }

  _showModal(modalElement) {
    modalElement.classList.add("modal--open")
    document.body.style.overflow = 'hidden'
    document.addEventListener("keydown", this.boundCloseOnEscape)
    modalElement.addEventListener("click", this.boundCloseOnBackdrop)
  }

  _hideModal(modalElement) {
    modalElement.classList.remove("modal--open")
    document.body.style.overflow = 'auto'
    document.removeEventListener("keydown", this.boundCloseOnEscape)
    modalElement.removeEventListener("click", this.boundCloseOnBackdrop)
  }

  closeOnEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  closeOnBackdrop(event) {
    if (event.target === event.currentTarget) {
      this.close()
    }
  }

  getModalId(button) {
    if (button.id.includes("login")) {
      return "loginModal"
    } else if (button.id.includes("signup")) {
      return "signupModal"
    }
    // Fallback for hero button if it doesn't have a specific ID for login/signup
    // This assumes the hero button is always for signup
    return "signupModal"
  }
}