import axios from 'axios';
import {
    Host
} from '../../config/settings/Connection';

const STORE_QUESTION = 'STORE_QUESTION';
const STORE_ANSWER = 'STORE_ANSWER';
const QUESTION_LOADING = 'QUESTION_LOADING';
const HAVEING_QUESTION_ERROR = 'HAVEING_QUESTION_ERROR';
const RESET_QUESTION = 'RESET_QUESTIONS'

const saveQuestion = (question) => {
    return {
        type: STORE_QUESTION,
        payload: question
    }
}

const saveAnswer = (answer) => {
    return {
        type: STORE_ANSWER,
        payload: answer
    }
}

const questionLoading = () => {
    return {
        type: QUESTION_LOADING
    }
}

const haveingQuestionError = (error) => {
    return {
        type: HAVEING_QUESTION_ERROR,
        error: error
    }
}

export const resetQuestion = () => {
    return {
        type: RESET_QUESTION
    }
}

export const gettingQuestion = () => {

    return async dispatch => { 
        dispatch(questionLoading())
        const _body = {
            id: '5dad6ba6f4ab551864e63f00'
        }
        await axios.post(`${Host}/questionnaire/get`,_body)
        .then ( result => {
            if(result.data.status) {
                console.log(result.data)
                dispatch(saveQuestion(result.data.question))
            } else {
                console.log(result.message)
            }
        })
        .catch(err => {
            dispatch(haveingQuestionError(err))
        })
    }

}