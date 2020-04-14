const initialState = {
    client: []
}



const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER':

            return {
                ...state,
                client: action.payload
            }
        default: 
            return {...state}
    }
}

export default ClientReducer