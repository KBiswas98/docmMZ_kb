const initialState = {
  email: '',
  phoneNo: '',
  name: '',
  password: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
      console.log('Authenticated.');
      console.log(action);
      return {
        ...state,
        email: action.email,
        phoneNo: action.phone,
        name: action.name,
        password: action.password,
      };
    default:
      return state;
  }
};

export default AuthReducer;
