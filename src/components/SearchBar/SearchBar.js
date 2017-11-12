import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
  //  this.state ={
  //    term: ''
  //  }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTermChange(event){
    this.setState({
      term: event.target.value
    });
    event.preventDefault();
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleKeyPress(event){
    const keyName = event.charCode;
    if(keyName === 13){
      event.preventDefault();
      this.search();
    }
  }

  render() {
    return (
      <form onKeyPress={this.handleKeyPress}>
        <div className="SearchBar">
          <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist and Press Enter" />
          <a onClick={this.search}>SEARCH</a>
        </div>
      </form>
    );
  }
}

export default SearchBar;
