const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'fbcd28263b2f4e15b137612744cb2514'
const redirectUri = 'http://localhost:3000/callback'
const scopes = ['user-library-read', 'playlist-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state'].join(" ");

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=code&show_dialog=true`