import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchWords: '',
    }
  }

  search = (e) => {
    this.setState({searchWords: e});
  }

  filterResults = () => {
    const {filterResultsFn} = this.props;

    filterResultsFn(this.state.searchWords);
    this.setState({searchWords: ''})
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e) => this.search(e.target.value)} />

          <SearchIcon id="Search__icon" onClick={() => this.filterResults()} />
        </div>
        
      </section>
    )
  }
}