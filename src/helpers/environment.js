
let APIURL = '';

switch (window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3069';
        break;
    case 'gamestashapp-client.herokuapp.com':
        APIURL = 'https://gamestash-app.herokuapp.com'
}

export default APIURL;