new Vue({
  el: '#app',
  data: {
    number: '',
    showNumber: false
  },
  methods: {
    displayNumber(event) {
      const key = event.key;
      const keyCode = event.keyCode || event.which;
      if (keyCode >= 48 && keyCode <= 57 && !this.showNumber) {
        this.number = key;
        this.showNumber = true;
        playBuzzer();
      } else if (key === 'o') {
        document.body.classList.add('red');
        playCorrect();
        setTimeout(() => {
          document.body.classList.remove('red');
          this.showNumber = false;
          this.number = '';
        }, 1000);
      } else if (key === 'x') {
        document.body.classList.add('blue');
        playWrong();
        setTimeout(() => {
          document.body.classList.remove('blue');
          this.showNumber = false;
          this.number = '';
        }, 500);
      } else if (key === 's') {
          playQuestion();
      }
    }
  },
  created() {
    window.addEventListener('keydown', this.displayNumber);
  },
  destroyed() {
    window.removeEventListener('keydown', this.displayNumber);
  }
});

function playBuzzer(){
  const audio = new Audio('sounds/Quiz-Buzzer.mp3');
  audio.play();
}

function playCorrect(){
  const audio = new Audio('sounds/Quiz-Correct.mp3');
  audio.play();
}

function playQuestion(){
  const audio = new Audio('sounds/Quiz-Question.mp3');
  audio.play();
}

function playWrong(){
  const audio = new Audio('sounds/Quiz-Wrong.mp3');
  audio.play();
}