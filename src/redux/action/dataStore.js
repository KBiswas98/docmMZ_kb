const RESET_DATASTORE = 'RESET_DATASTORE'
const STORE = 'STORE'

export const addDataToRedux = (data, isSearch = false) => {
    return {
      type: STORE,
      data: data,
      isSearch: isSearch
    };
  };

export const resetDataStore = () => {
    return {
        type: RESET_DATASTORE
    }
}