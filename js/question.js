import { questions, quiz, questionsContainer } from "./index.js";
// ---------------------------------------------------
// ---------------------------------------------------

export class Question {
  // ---------------------------------------------------
  // ---------------------------------------------------
  constructor(index) {
    this.index = index;
    this.question = questions[index].question;
    this.answer = questions[index].correct_answer;
    this.wrongAnswers = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.allAnswers = [...this.wrongAnswers, this.answer].sort();
    this.answered = false;
  }
  // ---------------------------------------------------
  // ---------------------------------------------------
  displayQuestion() {
    const questionMarkUp = `
        <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex flex-wrap justify-content-between">
            <span class="btn btn-category mb-1">${this.category}</span>
            <span class="fs-6 btn btn-questions mb-1">${this.index + 1} of ${
      questions.length
    } Questions</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>
          <ul class="choices w-100 list-unstyled m-0 text-center">
          ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
          </ul>
          <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${
            quiz.score
          } / ${questions.length} </h2>
        </div>
      `;

    questionsContainer.innerHTML = questionMarkUp;

    const allChoices = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].addEventListener("click", (e) => {
        this.checkAnswer(e, allChoices);
      });
    }
  }
  // ---------------------------------------------------
  // ---------------------------------------------------
  checkAnswer(e, choices) {
    if (this.answered === false) {
      this.answered = true;
      if (this.answer == e.target.innerHTML) {
        e.target.classList.add("correct");
        quiz.score += 1;
        console.log(quiz.score);
      } else {
        e.target.classList.add("wrong");
        for (let i = 0; i < choices.length; i++) {
          if (choices[i].innerHTML == this.answer) {
            choices[i].classList.add("correct");
          }
        }
      }
    }

    this.animateQuestion(e.target);
  }
  // ---------------------------------------------------
  // ---------------------------------------------------
  animateQuestion(question) {
    setTimeout(() => {
      question
        .closest(".question")
        .classList.replace("animate__bounceIn", "animate__backOutLeft");
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }, 2000);
  }
  // ---------------------------------------------------
  // ---------------------------------------------------
  nextQuestion() {
    if (this.index < questions.length - 1) {
      this.index += 1;
      const newQuestion = new Question(this.index);
      newQuestion.displayQuestion();
    } else {
      questionsContainer.innerHTML = quiz.getResult();
      let tryAgain = document.querySelector(".again");
      tryAgain.addEventListener("click", () => {
        location.replace(location.href);
      });
    }
  }
}
