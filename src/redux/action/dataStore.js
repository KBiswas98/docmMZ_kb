export const addDataToRedux = (data, isSearch = false) => {
    return {
      type: "STORE",
      data: data,
      isSearch: isSearch
    };
  };