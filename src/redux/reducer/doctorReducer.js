const initialState = {
    doctors : [],
    loading : false,
    error: []
}

const DoctorReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_DOCTORS': 
            console.log(action)
            return {
                ...state,
                loading: false,
                doctors : action.payload,
                error: []
            }
        case 'GETTING_DOCTORS': 
            return {
                ...state,
                loading : true
            }
        case 'ERROR': 
            return {
                ...state,
                error : action.error,
                loading : false
            }
        default: 
            return state
    }
}

export default DoctorReducer