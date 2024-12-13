const express = require('express')
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const app = express();
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback';

app.use(cors());

app.get('/login', (req, res) => {
    const scope = 'user-library-read playlist-read-private user-top-read user-read-playback-state user-modify-playback-state';
    const auth_query_parameters = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
    })

    res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters}`);
})

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const { access_token, refresh_token } = response.data
        res.redirect(`http://localhost:5173?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
        res.send(error);
    }
})

app.listen('3000', () => {
    console.log(`Server running on port 3000`)
})