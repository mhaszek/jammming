import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'mojalista',
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);

  }

addTrack(track){
  let updatedPlayListTracks = this.state.playListTracks.map(trackone => {
    return trackone;
  });
  let i = 0;
  let check = true;
  for(i = 0; i < updatedPlayListTracks.length; i++){
    if(track.id === updatedPlayListTracks[i].id){
      check = false;
    }
  }
  if(check === true){
    updatedPlayListTracks.push(track);
    this.setState({
      playListTracks: updatedPlayListTracks
    });
  };

  /*
  console.log(check);
  console.log(updatedPlayListTracks);
  console.log(this.state.playListTracks);
*/
  }

  removeTrack(track){
    let updatedPlayListTracks = this.state.playListTracks.map(trackone => {
      return trackone;
    }).filter(trackone => trackone.id !== track.id);

    this.setState({
      playListTracks: updatedPlayListTracks
    });
  }

  updatePlayListName(name){
    this.setState({
      playListName: name
    });
  }

  savePlayList(){
    let trackURIs =this.state.playListTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      });
    });
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
            onAdd={this.addTrack}
            searchResults={this.state.searchResults}/>
            <Playlist
            onSave={this.savePlayList}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlayListName}
            playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
