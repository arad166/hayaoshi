new Vue({
  el: '#app',
  data: {
    number: '',
    number2: '',
    showNumber: false,
    showNumber2: false
  },
  methods: {
    displayNumber(event) {
      const key = event.key;
      const keyCode = event.keyCode || event.which;
      const firstRespondent = document.getElementsByClassName("first-respondent")[0];
      const secondRespondent = document.getElementsByClassName("second-respondent")[0];
      if (keyCode >= 48 && keyCode <= 57 && !this.showNumber) {
        this.number = key;
        this.showNumber = true;
        playBuzzer();
      } else if (keyCode >= 48 && keyCode <= 57 && this.showNumber && !this.showNumber2 && key != this.number){
        this.number2 = key;
        this.showNumber2 = true;
      } else if (key === 'o') {
        document.body.classList.add('red');
        firstRespondent.classList.add('white');
        secondRespondent.classList.add('white');
        playCorrect();
        setTimeout(() => {
          document.body.classList.remove('red');
          firstRespondent.classList.remove('white');
          secondRespondent.classList.remove('white');
          this.showNumber = false;
          this.showNumber2 = false;
          this.number = '';
          this.number2 = '';
        }, 1000);
      } else if (key === 'x') {
        document.body.classList.add('blue');
        firstRespondent.classList.add('white');
        secondRespondent.classList.add('white');
        playWrong();
        setTimeout(() => {
          document.body.classList.remove('blue');
          firstRespondent.classList.remove('white');
          secondRespondent.classList.remove('white');
          if(this.showNumber2){
            playBuzzer();
            this.number = this.number2;
            this.number2 = '';
            this.showNumber2 = false;
          } else {
            this.number = '';
            this.showNumber = false;
          }
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