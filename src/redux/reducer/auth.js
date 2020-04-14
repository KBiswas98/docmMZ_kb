const initialState = {
    isLoading: false,
    isLogedin: false,
    isDoctor: false,
    data: [],
    error: [],
    appointment: []
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER':
            console.log('SAVE_USER')
            console.log(action.userData)
            return {
                ...state,
                isDoctor: action.userType,
                data: action.userData,
                isLogedin: true,
                isLoading: false,
                error: []
            }
        case 'HAVEING_ERROR':
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'REMOVE_USER': 
            return {
                ...state,
                isDoctor: false,
                isLoading: false,
                isLogedin: false,
                data: [],
                error: [],
                appointment: []
            }
        case 'SAVE_APPOINTMENT':
            return {
                ...state,
                appointment: action.payload,
                isLoading: false
            }
        case 'REMOVE_APPOINTMENT':
            console.log(appointment[0])
            return {
                ...state,
                appointment: state.appointment.filter(xappointment => !xappointment.cancelledByPatient)
            }
        default: 
            return state
        
    }
}


export default AuthReducer;



















// const initialState = {
//   data: [],
//   fullData: []
// };

// const AuthReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'AUTHENTICATED':
//       console.log('Authenticated.');
//       console.log(action);
//       return {
//         ...state,
//         data: action.data,
//       };

//     case 'FULLDATA':
//       console.log('Authenticated.vvvvv');
//       console.log(action);
//       return {
//         ...state,
//         fullData: action.data,
//       };
//     default:
//       return state;
//   }
// };

// export default AuthReducer;