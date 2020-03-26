export const addUserToRedux = (_user) => {
    return {
      type: "AUTHENTICATED",
      email: _user.email,
      phoneNo: _user.phoneNo,
      name: _user.name,
      password: _user.password
    };
  };