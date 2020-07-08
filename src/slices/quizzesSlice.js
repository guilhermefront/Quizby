import { createSlice } from "@reduxjs/toolkit";
import {
  getMostPlayedQuizzes,
  getCurrentQuiz,
} from "../asyncActions/getQuizzes";

const quizzesSlice = createSlice({
  name: "quizzesReducer",
  initialState: {
    topPlayedQuizzes: [],
    userAnswer: "",
    currentAnswers: [],
    userStats: {
      correctAnswers: 0,
      wrongAnswers: 0,
      totalAnswered: 0,
      toBeAnswered: 0,
    },
    currentQuiz: {
      creator: "",
      name: "",
      questions: [
        {
          question: "",
          answer: "",
          possibleAnswers: [],
        },
      ],
      timesPlayed: 0,
    },
    currentQuestion: 0,
    currentQuestionAnswered: false,
    userAnsweredCorrect: false,
    userAnsweredWrong: false,
    quizFetched: false,
  },
  reducers: {
    setQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    setUserAnswer: (state, action) => {
      state.userAnswer = action.payload;
      const answer = state.currentQuiz.questions[state.currentQuestion].answer;

      if (action.payload === answer) {
        state.userStats.correctAnswers += 1;
        state.userAnsweredCorrect = true;
        console.log("correct");
      } else {
        state.userStats.wrongAnswers += 1;
        state.userAnsweredWrong = true;
        console.log("wrong");
      }
      state.currentQuestionAnswered = true;
    },
    nextQuestion: (state, action) => {
      state.userAnswer = "";
      state.userAnsweredCorrect = false;
      state.userAnsweredWrong = false;
      state.currentQuestionAnswered = false;
      state.currentQuestion += 1;
      if (state.currentQuestion === state.currentQuiz.questions.length) {
        console.log("gameisdone");
        state.currentQuiz = {
          creator: "",
          name: "",
          questions: [
            {
              question: "",
              answer: "",
              possibleAnswers: [],
            },
          ],
          timesPlayed: 0,
        };
        state.currentQuestion = 0;
        state.currentAnswers = [];
      }
    },
  },
  extraReducers: {
    [getMostPlayedQuizzes.fulfilled]: (state, action) => {
      if (action.payload.status === "success")
        state.topPlayedQuizzes = action.payload.sortedQuizzes;
    },
    [getCurrentQuiz.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        const quiz = action.payload.quiz;
        state.currentQuiz = quiz;
        state.quizFetched = true;
        const answer = quiz.questions[state.currentQuestion].answer;
        const possibleAnswers =
          quiz.questions[state.currentQuestion].possibleAnswers;

        let groupAnswers = [...possibleAnswers, answer];
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }

        shuffleArray(groupAnswers);

        state.currentAnswers = groupAnswers;
        state.quizFetched = true;
      }
    },
  },
});

export const { setQuiz, setUserAnswer, nextQuestion } = quizzesSlice.actions;

export default quizzesSlice.reducer;
