const clientId = '2051f972471441cd8229bb9ee5ef67e6';
//const clientSecret = '0fc7359381c44707b505cb87f5efe40a';
//const redirectURI = 'http://localhost:3000';
const redirectURI = 'https://nana-jammming.surge.sh/';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken(){
    if (!accessToken) {
      let url = window.location.href;
      const accessTokenFromURL = url.match(/access_token=([^&]*)/);
      const expirationTimeFromURL = url.match(/expires_in=([^&]*)/);
       if(accessTokenFromURL && expirationTimeFromURL){
         accessToken = accessTokenFromURL[1];
         expiresIn = expirationTimeFromURL[1];
         window.setTimeout(() => accessToken = '', expiresIn * 1000);
         window.history.pushState('Access Token', null, '/');
         return accessToken;
       } else {
         const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
         window.location = accessUrl;
    }}
   return accessToken;
 },

 search(term) {
  const newAccessToken = this.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${newAccessToken}`
        }
      }).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');},
        networkError => console.log(networkError.message)).then(
      jsonResponse => {
        if(jsonResponse.tracks){
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }))
       } else {
         return [];
       }
       });
  },

  savePlayList(playListName, trackURIs){
    if (!playListName || !trackURIs.length) {
      return;
    }
    const newAccessToken = this.getAccessToken();
    let userId;
    let playListId;
    const header = {
       Authorization: `Bearer ${newAccessToken}`
     };

    return fetch('https://api.spotify.com/v1/me', {
      headers: header
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error - User ID Obtain Failed!');
    },
    networkError => console.log(networkError.message)).then(jsonResponse => {
        userId = jsonResponse.id;
    }).then(() => {
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({name: playListName})
      })}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error - Playlist ID Obtain Failed!');
      },
      networkError => console.log(networkError.message)).then(jsonResponse => {
          playListId = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`, {
          method: 'POST',
          headers: header,
          body: JSON.stringify({uris: trackURIs})
        })}).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        },
        networkError => console.log(networkError.message)).then(jsonResponse => {
          console.log(jsonResponse);
        });
  }
};

export default Spotify;
