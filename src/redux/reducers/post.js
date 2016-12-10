
const initialState = {
  list: [],
  categories: []
}

const post = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case 'POST_LIST_UPDATE_ALL':
      return {...state, list: action.posts}
      break;

    case 'POST_GROUPING_CATEGORIES':
      let categories = [];
      state.list.forEach((item) => {
        let duplicated = categories.indexOf(item.category)
        if(duplicated === -1) categories.push(item.category)
      })
      return {...state, categories }
      break;

    default:
    return state

  }

}

export default post;
