const initialState = {
    // age: 20,
    bookmarks: []
  };
  
  const reducer = (state = initialState, action) => {
    const newState = { ...state };
  
    switch (action.type) {
      case "BOOKMARK":
        return {
          ...state,
        //   age: state.age + action.value,
        bookmarks: state.bookmarks.concat(action.value)
        };
        break;
  
      case "CHECK":
        return state.bookmarks.includes(action.value);
        break;
      case "REMOVE":
        return {
          ...state,
          bookmarks: newState.bookmarks.filter((id)=> id !== action.value )
        }
        break;
    }
    return newState;
  };

  
  
  export default reducer;