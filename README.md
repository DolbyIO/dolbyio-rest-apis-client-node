# Dolby.io REST APIs

Node.JS wrapper for the dolby.io REST [Communications](https://docs.dolby.io/communications-apis/reference/authentication-api) and [Media](https://docs.dolby.io/media-processing/reference/media-enhance-overview) APIs.

## Install this project

Run the npm command to install the package `@dolbyio/dolbyio-rest-apis-client` into your Node project:

```bash
npm install @dolbyio/dolbyio-rest-apis-client --save
```

## Communications Examples

### Authenticate

To get an access token that will be used by the client SDK for an end user to open a session against dolby.io, use the following code:

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

const at = await dolbyio.communications.authentication.getClientAccessToken(APP_KEY, APP_SECRET);

console.log(`Access Token: ${at.access_token}`);
```

To get an access token that will be used by your server to perform backend operations like creating a conference, use the following code.

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

const jwt = await dolbyio.communications.authentication.getApiAccessToken(APP_KEY, APP_SECRET);

console.log(`Access Token: ${jwt.access_token}`);
```

### Create a conference

To create a Dolby Voice conference, you first must retrieve an API Access Token, then use the following code to create the conference.

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

const ownerExternalId = ''; // Identifier of the owner of the conference
const alias = ''; // Conference alias

const options = {
    ownerExternalId: ownerExternalId,
    alias: alias,
    dolbyVoice: true,
    liveRecording: false,
    participants: [
        { externalId: 'hostA', permissions: ['JOIN', 'SEND_AUDIO', 'SEND_VIDEO'], notify: true },
        { externalId: 'listener1', permissions: ['JOIN'], notify: false },
    ],
};

// Request an Access Token
const jwt = await dolbyio.communications.authentication.getApiAccessToken(APP_KEY, APP_SECRET);

// Create the conference
const conference = await dolbyio.communications.conference.createConference(jwt, options);

console.log(`Conference created: ${conference.conferenceId}`);
```

## Media Examples

### Authenticate

To get an access token, use the following code:

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

const at = await dolbyio.media.platform.getApiAccessToken(API_KEY, API_SECRET);

console.log(`Access Token: ${at.access_token}`);
```

## Build this project

To build the `dist` folder, run the command:

```bash
npm run build
```
