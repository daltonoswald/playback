const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'de7f9b456fd9488ca35962b64d84f61e'
const redirectUri = 'http://localhost:3000/callback'
const scopes = ['user-library-read', 'playlist-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state'].join(" ");

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=code&show_dialog=true`