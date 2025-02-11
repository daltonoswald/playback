# statsify

A web app using Spotify API

This will be a simple app that uses Spotify API to retrieve stats, search the catalog, and control playback.

https://daltonoswald-statsify.netlify.app/

Logging in through Spotify using their Authorization Code Flow, which redirects the user from the frontend app (React) to the backend (Express).
https://developer.spotify.com/documentation/web-api/tutorials/code-flow

The following scopes are used:
user-read-private
user-read-email
user-top-read
user-read-playback-state
user-modify-playback-state

Logging in uses Spotify OAuth 2.0 to get an Access Token and a Refresh Token and any data retrieved from the Spotify Data is through the Access Token.
