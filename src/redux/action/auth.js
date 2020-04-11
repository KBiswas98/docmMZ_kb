export const addUserToRedux = (data) => {
    return {
      type: "AUTHENTICATED",
      data: data
    };
  };

  export const addUserFullData= (data) => {
    return {
      type: "FULLDATA",
      data: data
    };
  };