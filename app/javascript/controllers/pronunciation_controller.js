import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "word", "recordButton", "recordText", "waveform", "playbackSection", "evalButton", "nextButton", "currentWord", "phaseIndicator", "instruction" ]

  connect() {
    this.currentStep = 1
    this.isRecording = false
    this.evaluation = null
  }

  playWord(event) {
    this.wordTargets.forEach(el => el.classList.remove('pronunciation-practice__word--playing'))
    event.currentTarget.classList.add('pronunciation-practice__word--playing')

    // Simulate audio playback
    setTimeout(() => {
      event.currentTarget.classList.remove('pronunciation-practice__word--playing')
    }, 1500)
  }

  toggleRecording() {
    if (!this.isRecording) {
      // Start recording
      this.isRecording = true
      this.recordButtonTarget.classList.add('pronunciation-practice__record-button--recording')
      this.recordTextTarget.textContent = 'STOP'
      this.waveformTarget.classList.add('pronunciation-practice__waveform--active')
      this.waveformTarget.textContent = '🎤 Recording...'
    } else {
      // Stop recording
      this.isRecording = false
      this.recordButtonTarget.classList.remove('pronunciation-practice__record-button--recording')
      this.recordButtonTarget.classList.add('pronunciation-practice__record-button--recorded')
      this.recordTextTarget.textContent = '✓ RECORDED'
      this.waveformTarget.classList.remove('pronunciation-practice__waveform--active')
      this.waveformTarget.textContent = '✓ Recording saved'

      // Show playback section
      this.playbackSectionTarget.classList.add('pronunciation-practice__playback-section--active')
    }
  }

  playComparison(event) {
    this.playbackItemTargets.forEach(item => item.classList.remove('pronunciation-practice__playback-item--playing'))
    event.currentTarget.classList.add('pronunciation-practice__playback-item--playing')

    setTimeout(() => {
      event.currentTarget.classList.remove('pronunciation-practice__playback-item--playing')
    }, 1000)
  }

  evaluate(event) {
    this.evaluation = event.currentTarget.dataset.type
    this.evalButtonTargets.forEach(btn => btn.classList.remove('pronunciation-practice__eval-button--selected'))
    event.currentTarget.classList.add('pronunciation-practice__eval-button--selected')

    // Enable next button
    this.nextButtonTarget.classList.add('pronunciation-practice__next-button--active')
  }

  nextStep() {
    if (!this.evaluation) return

    this.currentStep++

    if (this.currentStep === 2) {
      // Move to second word
      this.currentWordTarget.textContent = 'SINK'
      this.phaseIndicatorTarget.textContent = 'Step 2 of 4: Record "SINK"'
      this.nextButtonTarget.textContent = 'Next: Compare Both Words'

      // Reset recording state
      this.resetRecordingState()
    } else if (this.currentStep === 3) {
      // Move to final comparison
      this.phaseIndicatorTarget.textContent = 'Step 3 of 4: Final Comparison'
      this.currentWordTarget.textContent = 'THINK vs SINK'
      this.instructionTarget.textContent = 'Listen to both of your recordings'
      this.nextButtonTarget.textContent = 'Complete Pair'

      this.resetRecordingState()
    } else {
      // Complete the pair
      alert('Great job! Moving to next minimal pair...')
      // Here you would load the next pair
    }
  }

  resetRecordingState() {
    this.recordButtonTarget.classList.remove('pronunciation-practice__record-button--recording', 'pronunciation-practice__record-button--recorded')
    this.recordTextTarget.textContent = 'RECORD'
    this.waveformTarget.classList.remove('pronunciation-practice__waveform--active')
    this.waveformTarget.textContent = '🎤 Ready to record'
    this.playbackSectionTarget.classList.remove('pronunciation-practice__playback-section--active')
    this.nextButtonTarget.classList.remove('pronunciation-practice__next-button--active')

    // Reset evaluation
    this.evaluation = null
    this.evalButtonTargets.forEach(btn => btn.classList.remove('pronunciation-practice__eval-button--selected'))
  }
}
