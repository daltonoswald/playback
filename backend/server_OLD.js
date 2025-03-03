const express = require('express')
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const app = express();
require('dotenv').config();

const path = require('node:path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client_id = process.env.CLIENT_ID || CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET || CLIENT_SECRET;
const redirect_uri = 'https://localhost:3000/callback';
// const redirect_uri = `https://statsify-production.up.railway.app/callback`

app.use(cors({
    origin: [
        `http://localhost:5173`,
        `https://daltonoswald-statsify.netlify.app`,
        '*'
    ],
    methods: [`GET`, `PUT`, `POST`, `DELETE`],
    optionsSuccessStatus: 204,
}));


app.get('/login', (req, res) => {
    console.log('in login');
    const scope = 'user-top-read user-read-playback-state user-modify-playback-state';
    const auth_query_parameters = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
    })

    res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters}`);
})

app.get('/callback', async (req, res) => {
    console.log('in callback')
    const code = req.query.code || null;
    console.log(code);
    console.log(redirect_uri)
    console.log(client_id)
    console.log(client_secret);

    try {
        // console.log('in try');
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                // response_type: 'code',
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(response);

        const { access_token, refresh_token } = response.data
        res.redirect(`http://localhost:5173/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
        // res.redirect(`https://daltonoswald-statsify.netlify.app/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.static('./public'));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT || PORT}`)
})