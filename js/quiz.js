export class Quiz {
  // ---------------------------------------------------
  // ---------------------------------------------------
  constructor(category, type, difficulty, questionsNumber) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.questionsNumber = questionsNumber;
    this.score = 0;
  }

  // ---------------------------------------------------
  // ---------------------------------------------------
  async getQuestions() {
    let questions = await fetch(
      `https://opentdb.com/api.php?amount=${this.questionsNumber}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`
    );

    questions = await questions.json();
    console.log(questions);
    return questions.results;
  }

  // ---------------------------------------------------
  // ---------------------------------------------------
  getResult() {
    return `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <h2 class="mb-0">
      ${
        this.score == this.questionsNumber
          ? `Congratulations 🎉 Your score is  ${this.score} / ${this.questionsNumber}`
          : `Your score is  ${this.score} / ${this.questionsNumber}`
      }      
      </h2>
      <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div>
  `;
  }
}
