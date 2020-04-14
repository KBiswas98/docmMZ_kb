const initialState = {
  data: [],
};

const DataStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE':
      return {
        ...state,
        data: action.isSearch ? action.data :  [...state.data, ...action.data]
      };
    case 'RESET_DATASTORE' :
        return {
            ...state,
            data: []
        }
    default:
      return state;
  }
};

export default DataStoreReducer;
