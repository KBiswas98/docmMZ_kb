export const addDataToRedux = (data) => {
    return {
      type: "STORE",
      data: data
    };
  };