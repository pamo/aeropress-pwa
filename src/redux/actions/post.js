import request from 'request';

export function fetchList(arg) {
  return (dispatch, getState) => {

    const url = `${window.location.origin}/API/lists.json`;
    if ('caches' in window) {
      caches.match(url).then((res) => {
        if (res) {
          console.log('THERE\'S CACHES!');
          res.json().then(function(json) {
            dispatch({
              type: 'POST_LIST_UPDATE_ALL',
              posts: json
            })
            dispatch({
              type: 'POST_GROUPING_CATEGORIES'
            })
          })
        }
      })
    }

    request(url, (res) => {

      dispatch({
        type: 'POST_LIST_UPDATE_ALL',
        posts: res
      });

      dispatch({
        type: 'POST_GROUPING_CATEGORIES'
      });
    })

  }
};
