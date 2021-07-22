// Dynamic generation elements
const timerRoot = document.querySelector('.timer-root')
const timerDynamicHTML = document.createElement('div')

// Global variables
let intervalID = ''

const Timer = {
  isBreak: false,
  currentTime: 6,
  
  isActive: false,

  startCountdown () {
    Timer.isActive = true

    intervalID = setInterval(() => {
      Timer.currentTime -= 1
      Timer.renderTimer(Timer.isActive)

      if (Timer.currentTime === 0) {
        Timer.isBreak = Timer.isBreak ? false : true
        Timer.isActive = false

        if (Timer.isBreak) {
          Timer.currentTime = 3
          window.alert('Nice job! Now you can take a break')
        }
        else {
          Timer.currentTime = 6
          window.alert('The break is over, keep yourself focused for one more session')
        }
        
        clearInterval(intervalID)
        Timer.renderTimer(Timer.isActive)
      }
    }, 1000)
  },

  resetCountdown () {
    clearInterval(intervalID)
    Timer.isActive = false
    Timer.currentTime = Timer.isBreak ? 3 : 6
    Timer.renderTimer(Timer.isActive)
  },

  renderTimer (isActive) {
    let minutes = Math.floor(Timer.currentTime / 60)
    let seconds = Timer.currentTime % 60

    let minutesFormatted = String(minutes).padStart(2, '0')
    let secondsFormatted = String(seconds).padStart(2, '0')

    timerDynamicHTML.innerHTML = `
    <section class="pomodoro-timer-container">
      <h1>${Timer.isBreak ? 'Break Time' : 'Work Session'}</h1>
      <div class="time">
        ${minutesFormatted}:${secondsFormatted}
      </div>
      <div class="actions">

        <button type="button" class="btn btn-danger" onclick="Timer.startCountdown()" ${isActive ? 'disabled' : ''}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="fa fa-play" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
          Start
        </button>

        <button type="button" class="btn btn-dark" onclick="Timer.resetCountdown()" ${!isActive ? 'disabled' : ''}>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="fa fa-sync-alt" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>
        Reset
        </button>

      </div>
    </section>`
    timerRoot.appendChild(timerDynamicHTML)
  }

}

Timer.renderTimer(Timer.isActive)

