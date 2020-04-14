const initialState = {
    doctors : [],
    loading : false,
    error: [],
    tmp: null,
    tmpLoading: true,
}

const DoctorReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_DOCTORS': 
            console.log(action)
            return {
                ...state,
                loading: false,
                doctors: action.isSearching ? [...action.payload] : [...state.doctors, ...action.payload],
                error: []
            }
        case 'GETTING_DOCTORS': 
            return {
                ...state,
                loading : true,
                tmpLoading: true
            }
        case 'ERROR': 
            return {
                ...state,
                error : action.error,
                loading : false
            }
        case 'TMP_DOC_STORE': 
            return {
                ...state,
                tmp: action.payload,
                tmpLoading: false
            }
        case 'RESET_DOCTOR':
            return {
                ...state,
                error: [],
                loading: false,
                doctors: [],
                tmp: null,
                tmpLoading: false
            }
        default: 
            return state
    }
}


export default DoctorReducer