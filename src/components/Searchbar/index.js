import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UIActionsCreator from '../../redux/actions/ui.js';

const mapStateToProps = ({ ui }) => ({
  searchbarOpen: ui.searchbarOpen 
});

const mapDispatchToProps = (dispatch) => ({
  UIActions: bindActionCreators(UIActionsCreator, dispatch)
});

class Searchbar extends React.Component {

  render () {
    let { updateSearchQuery } = this
    let { searchbarOpen } = this.props

    return(
      <div className={ "Searchbar u-shadow " + ( searchbarOpen ? 'Searchbar--open' : '' ) }>
        <input type="text" placeholder="Filter The Posts..." className="Searchbar-input" onInput={ updateSearchQuery.bind(this) } />
      </div>
    )
  }

  updateSearchQuery(e) {
    this.props.UIActions.updateQuery(e.target.value)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
