// Global variables
const SESSION_TIME = 25 * 60
const BREAK_TIME = 5 * 60

let intervalID

const Timer = {
  status: 'session',
  time: SESSION_TIME,
  screen: document.querySelector('#timer-screen'),
  startButton: document.querySelector('#start'),
  resetButton: document.querySelector('#reset'),
  isActive: false,
  start() {
    this.isActive = true
    this.startButton.setAttribute('disabled', 'true')
    this.resetButton.removeAttribute('disabled')

    this.update()
  },
  listen() {
    // Listen when the time ends
    if (this.time === 0) {
      this.status = this.status === 'session' ? 'break' : 'session'
      this.isActive = false
      // Send feedback to user
      if (this.status === 'break') {
        this.time = BREAK_TIME
        window.alert('Nice job! Now you can take a break')
      }
      else if (this.status === 'session') {
        this.time = SESSION_TIME
        window.alert('The break is over, keep yourself focused for one more session')
      }
      this.reset(intervalID)
    }
  },

  reset() {
    clearInterval(intervalID)

    this.isActive = false
    this.time = this.status === 'session' ? SESSION_TIME : BREAK_TIME
    this.init()
  },

  update() {
    intervalID = setInterval(() => {
      this.time -= 1

      this.screen.textContent = Utils.getFormattedTime(this.time)
      this.listen(intervalID)
    }, 1000)
  },

  init() {
    // Setup the timer title
    const timerTitle = document.querySelector('#timer-title')
    timerTitle.textContent = this.status === 'session' ? 'Work Session' : 'Break Time'

    // Setup the screen timer
    this.screen.textContent = Utils.getFormattedTime(this.time)

    // Setup button status
    this.startButton.removeAttribute('disabled')
    this.resetButton.setAttribute('disabled', 'true')
  }
}

const Utils = {
  getFormattedTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    let minutesFormatted = String(minutes).padStart(2, '0')
    let secondsFormatted = String(seconds).padStart(2, '0')

    return `${minutesFormatted}:${secondsFormatted}`
  }
}

Timer.init()
