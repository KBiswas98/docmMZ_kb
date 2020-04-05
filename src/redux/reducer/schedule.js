const initialState = {
    data: [],
  };
  
  const ScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SCHEDULE_STORE':
        return {
          ...state,
          data: action.data
        };
      default:
        return state;
    }
  };
  
  export default ScheduleReducer;
  