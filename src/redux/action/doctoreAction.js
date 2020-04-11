import axios from 'axios'

const GET_DOCTORS = 'GET_DOCTORS'
const GETTING_DOCTORS = 'GETTING_DOCTORS'
const ERROR = 'ERROR'


const setDoctors = (doctors) => {
    return {
        type: GET_DOCTORS,
        payload: doctors
    }
}

const gettingDoctors = () => {
    return {
        type: GETTING_DOCTORS,
    }
}

const haveingError = (error) => {
    return {
        type: ERROR,
        error: error
    }
}

export const fetchDoctors = () => {
    return async (dispatch) => {
        await dispatch(gettingDoctors())
        await axios.get('https://jsonplaceholder.typicode.com/comments')
        .then( response => {
            console.log(response)
            dispatch(setDoctors(response.data))
        })
        .catch(err => {
            dispatch(haveingError(err))
        })
    }
}















// export const fetchDoctors = () => {
//     return async (dispatch) => {
//         try {
//             await dispatch(gettingDoctors())
//             const response = await axios.get('https://jsonplacehlder.typicode.com/todos/2');
            
//             console.log(response)
//             await dispatch(setDoctors(response.data))
//         }
//         catch( err ) {
//             console.error(err)
//         }
//     }
// }