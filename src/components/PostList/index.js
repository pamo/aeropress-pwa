import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UIActionsCreators from '../../redux/actions/ui.js';

import LoadingState from './LoadingState.js';

function mapStateToProps({ post, ui }) {
  return {
    searchQuery: ui.searchQuery,
    items: post.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    UIActions: bindActionCreators(UIActionsCreators, dispatch)
  }
}

class PostList extends React.Component {

  render () {
    let { items } = this.props
    let { filteredPost } = this

    return(
      <div className="PostList">
        <div className="container">

          { items.length === 0 ? [1,2,3].map((i) => {
              return <LoadingState key={ i } />
            })
          : null }

          { items.length > 0 ? filteredPost.call(this).map((item, i) => {
              return(
                <div className="PostList-item" key={ i } >
                  <div className="PostList-item_thumbnail">
                    <img alt={ item.title } src={ item.cover } />
                    <a className="PostList-item_label" onClick={ this.filterPost.bind(this,item.category) } >{ item.category }</a>
                  </div>
                  <div className="PostList-item_body">
                    <h2 className="PostList-item_title">
                      <a href={ '#/post/' + item.id }>{ item.title }</a>
                    </h2>
                  </div>
                </div>
              )
            })
          : null }

        </div>
      </div>
    )
  }

  filterPost(category, e) {
    e.preventDefault()
    let { UIActions } = this.props
    UIActions.updateQuery(category)
  }

  filteredPost() {
    const { items, searchQuery } = this.props
    let filteredPosts = [];
    items.find((item) => {
      const keys = Object.keys(item)
      let found;

      keys.forEach((key) => {
        const valueToCheck = item[key].toString()
        const checking = valueToCheck.search(new RegExp(searchQuery,'ig'))
        if(checking !== -1) found = true;
      })
      if (found) filteredPosts.push(item)
    })
    return filteredPosts;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
