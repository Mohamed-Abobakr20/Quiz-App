import { Quiz } from "./quiz.js";
import { Question } from "./question.js";
// Get HTML Elements
// -----------------------------------
const category = document.querySelector("#categoryMenu");
const type = document.querySelector("#typeMenu");
const difficulty = document.querySelector("#difficultyOptions");
const questionsNumber = document.querySelector("#questionsNumber");
const startQuiz = document.querySelector("#startQuiz");
const quizForm = document.querySelector("#quizOptions");
export const questionsContainer = document.querySelector(
  ".questions-container"
);
// Declaring variables
// -----------------------------------
export let quiz;
export let questions;
// Start Quiz
// -----------------------------------
startQuiz.addEventListener("click", async function (e) {
  e.preventDefault();
  if (questionsNumber.value != "" && questionsNumber.value != 0) {
    // create quiz object
    quiz = new Quiz(
      category.value,
      type.value,
      difficulty.value,
      questionsNumber.value
    );

    // get questions, score and length of the quiz
    questions = await quiz.getQuestions();

    //create question object
    let question1 = new Question(0);

    // hide form
    quizForm.classList.replace("d-flex", "d-none");

    // show question
    question1.displayQuestion();
  }
});
