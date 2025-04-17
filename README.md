# playback // statsify

A web app using Spotify API

This will be a simple app that uses Spotify API to retrieve stats, search the catalog, and control playback.

https://daltonoswald-playback.netlify.app/

Playback was recently granted extended quota mode!
https://developer.spotify.com/documentation/web-api/concepts/quota-modes

Users no longer need to be added to an allowlist, any and all users may now freely use the site!

Logging in through Spotify using their Authorization Code Flow, which redirects the user from the frontend app (React) to the backend (Express).
https://developer.spotify.com/documentation/web-api/tutorials/code-flow

The following scopes are used:
user-read-private
user-read-email
user-top-read
user-read-playback-state
user-modify-playback-state

Logging in uses Spotify OAuth 2.0 to get an Access Token and a Refresh Token and any data retrieved from the Spotify Data is through the Access Token.
