const initialState = {
  data: [],
};

const DataStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE':
      console.log('Store reducer.');
      console.log(action);
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default DataStoreReducer;
