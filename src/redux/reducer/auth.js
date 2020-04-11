const initialState = {
  data: [],
  fullData: []
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
      console.log('Authenticated.');
      console.log(action);
      return {
        ...state,
        data: action.data,
      };

    case 'FULLDATA':
      console.log('Authenticated.vvvvv');
      console.log(action);
      return {
        ...state,
        fullData: action.data,
      };
    default:
      return state;
  }
};

export default AuthReducer;
