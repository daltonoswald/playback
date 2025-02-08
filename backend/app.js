const express = require('express')
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const app = express();
require('dotenv').config();

const client_id = process.env.CLIENT_ID || CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET || CLIENT_SECRET;
const redirect_uri = 'https://localhost:3000/callback';
// const redirect_uri = `https://statsify-production.up.railway.app/callback`

app.use(cors({
    origin: [
        `https://localhost:5173`,
        `https://daltonoswald-statsify.netlify.app`,
        "*"
    ],
    methods: [`GET`, `PUT`, `POST`, `DELETE`],
    optionsSuccessStatus: 204,
}));

// app.get('/login', (req, res) => {
//     console.log('in login');
//     const scope = 'user-top-read user-read-playback-state user-modify-playback-state';
//     const auth_query_parameters = querystring.stringify({
//         response_type: 'code',
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//     })

//     res.redirect(`https://accounts.spotify.com/authorize?${auth_query_parameters}`);
// })

// app.get('/callback', async (req, res) => {
//     console.log('in callback')
//     const code = req.query.code || null;
//     console.log(code);
//     console.log(redirect_uri)
//     console.log(client_id)
//     console.log(client_secret);

//     try {
//         // console.log('in try');
//         const response = await axios({
//             method: 'post',
//             url: 'https://accounts.spotify.com/api/token',
//             data: querystring.stringify({
//                 grant_type: 'authorization_code',
//                 code: code,
//                 // response_type: 'code',
//                 redirect_uri: redirect_uri,
//                 client_id: client_id,
//                 client_secret: client_secret
//             }),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         })
//         console.log(response);

//         const { access_token, refresh_token } = response.data
//         res.redirect(`http://localhost:5173/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
//         // res.redirect(`https://daltonoswald-statsify.netlify.app/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// })

app.get('/login', function(req, res) {
    let state = generateRandomString(16);
    let scope = 'user-top-read user-read-playback-state user-modify-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
})

app.get('/callback', function(req, res) {
    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' + 
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        }
    }
})

app.post('/test', (req, res) => {
    console.log('test');
    res.json('req')
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT || PORT}`)
})
