import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // No static targets needed for generic modals

  boundCloseOnEscape = this.closeOnEscape.bind(this)
  boundCloseOnBackdrop = this.closeOnBackdrop.bind(this)

  connect() {
    // If a modal is meant to be opened automatically on page load (e.g., for server-side errors)
    // the body or a parent element can have data-modal-to-open="modalId"
    const modalToOpenId = this.element.dataset.modalToOpen
    if (modalToOpenId) {
      const modal = this.element.querySelector(`#${modalToOpenId}`)
      if (modal) {
        this._showModal(modal)
      }
    }
  }

  // Action to open a specific modal
  // The button triggering this action should have data-action="click->modal#open"
  // and data-modal-id="yourModalId"
  open(event) {
    event.preventDefault()
    const modalId = event.currentTarget.dataset.modalId
    const modal = this.element.querySelector(`#${modalId}`)
    if (modal) {
      this._showModal(modal)
    }
  }

  // Action to close the currently open modal or a specific one
  // Can be triggered by data-action="click->modal#close" on a close button
  // or called internally.
  close(event) {
    if (event) {
      event.preventDefault()
    }
    // Find the modal to close: either the one associated with the event, or the currently open one
    const modalToClose = event ? event.currentTarget.closest(".modal") : this.element.querySelector(".modal--open")
    if (modalToClose) {
      this._hideModal(modalToClose)
    }
  }

  // Action to switch between two modals
  // The button triggering this action should have data-action="click->modal#switch"
  // and data-switch-target="targetModalId"
  switch(event) {
    event.preventDefault()
    const currentModal = event.currentTarget.closest(".modal")
    const targetModalId = event.currentTarget.dataset.switchTarget
    const targetModal = this.element.querySelector(`#${targetModalId}`)

    if (currentModal && targetModal) {
      this._hideModal(currentModal)
      this._showModal(targetModal)
    }
  }

  // Private helper to show a modal and manage associated side effects
  _showModal(modalElement) {
    modalElement.classList.add("modal--open")
    document.body.style.overflow = 'hidden' // Prevent body scrolling when modal is open
    document.addEventListener("keydown", this.boundCloseOnEscape)
    modalElement.addEventListener("click", this.boundCloseOnBackdrop)
  }

  // Private helper to hide a modal and manage associated side effects
  _hideModal(modalElement) {
    modalElement.classList.remove("modal--open")
    document.body.style.overflow = 'auto' // Restore body scrolling
    document.removeEventListener("keydown", this.boundCloseOnEscape)
    modalElement.removeEventListener("click", this.boundCloseOnBackdrop)
  }

  // Event handler for closing modal with Escape key
  closeOnEscape(event) {
    if (event.key === "Escape") {
      this.close() // Call the public close method
    }
  }

  // Event handler for closing modal by clicking on backdrop
  closeOnBackdrop(event) {
    if (event.target === event.currentTarget) {
      this.close() // Call the public close method
    }
  }
}
