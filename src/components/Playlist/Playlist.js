import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input
        id='playListName'
        onChange={this.handleNameChange}
        value={this.props.playListName}/>
        <TrackList
        isRemoval={true}
        onRemove={this.props.onRemove}
        tracks={this.props.playListTracks}/>
        <a
        onClick={this.props.onSave}
        className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
