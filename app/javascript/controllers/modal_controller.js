import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "loginModal", "signupModal" ]

  connect() {
    this.boundCloseOnEscape = this.closeOnEscape.bind(this)
    this.boundCloseOnBackdrop = this.closeOnBackdrop.bind(this)
  }

  open(event) {
    event.preventDefault()
    const modalId = this.getModalId(event.currentTarget)
    const modal = this.targets.find(modalId)
    if (modal) {
      modal.classList.add("modal--open")
      document.body.style.overflow = 'hidden'
      document.addEventListener("keydown", this.boundCloseOnEscape)
      modal.addEventListener("click", this.boundCloseOnBackdrop)
    }
  }

  close(event) {
    if (event) {
      event.preventDefault()
    }
    const modal = event ? event.currentTarget.closest(".modal") : this.element.querySelector(".modal--open")
    if (modal) {
      modal.classList.remove("modal--open")
      document.body.style.overflow = 'auto'
      document.removeEventListener("keydown", this.boundCloseOnEscape)
      modal.removeEventListener("click", this.boundCloseOnBackdrop)
    }
  }

  switch(event) {
    event.preventDefault()
    const currentModal = event.currentTarget.closest(".modal")
    const targetModalId = event.currentTarget.id.includes("switchToSignup") ? "signupModal" : "loginModal"
    const targetModal = this.targets.find(targetModalId)

    if (currentModal && targetModal) {
      currentModal.classList.remove("modal--open")
      targetModal.classList.add("modal--open")
      currentModal.removeEventListener("click", this.boundCloseOnBackdrop)
      targetModal.addEventListener("click", this.boundCloseOnBackdrop)
    }
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
  }
}