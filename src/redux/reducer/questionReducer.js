const initialState = {
  isQuestionLoading: true,
  questions: [],
  error: [],
  answer: [],
  done: false,
};

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_QUESTION':
      return {
        ...state,
        questions: action.payload,
        error: [],
        isQuestionLoading: false,
      };
    case 'STORE_ANSWER':
      return {
        ...state,
        answer: [...state.answer, {...action.payload}],
      };
    case 'QUESTION_LOADING':
      return {
        ...state,
        isQuestionLoading: true,
      };
    case 'HAVEING_QUESTION_ERROR':
      return {
        ...state,
        error: action.error,
        isQuestionLoading: false,
      };
    case 'RESET_QUESTIONS':
      return {
        ...state,
        isQuestionLoading: false,
        questions: [],
        error: [],
        answer: [],
        done: false
      };
    case 'DONE':
      return {
        ...state,
        done: true,
      };
    default:
      return state;
  }
};

export default QuestionReducer;
