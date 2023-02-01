[![Build Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml)
[![Publish Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml)
![npm](https://img.shields.io/npm/v/@dolbyio/dolbyio-rest-apis-client)
[![License](https://img.shields.io/github/license/DolbyIO/dolbyio-rest-apis-client-node)](LICENSE)

# Dolby.io REST APIs Client for Node.JS

Node.JS wrapper for the dolby.io REST [Communications](https://docs.dolby.io/communications-apis/reference/authentication-api), [Streaming](https://docs.dolby.io/streaming-apis/reference) and [Media](https://docs.dolby.io/media-processing/reference/media-enhance-overview) APIs.

## Install this project

Run the npm command to install the package `@dolbyio/dolbyio-rest-apis-client` into your Node project:

```bash
npm install @dolbyio/dolbyio-rest-apis-client --save
```

## Authentication

To get an access token that will be used by your server to perform backend operations like creating a conference, use the following code.

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

const jwt = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET);

console.log(`Access Token: ${jwt.access_token}`);
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
const jwt = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET);

// Create the conference
const conference = await dolbyio.communications.conference.createConference(jwt, options);

console.log(`Conference created: ${conference.conferenceId}`);
```

## Real-time Streaming Examples

### Create a publish token

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const publishToken = await dolbyio.streaming.publishToken.create('api_secret', {
    label: 'My token',
    streams: [
        {
            streamName: 'feedA',
        },
    ],
});
console.log(publishToken);
```

### Create a subscribe token

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const subscribeToken = await dolbyio.streaming.subscribeToken.create('api_secret', {
    label: 'My token',
    streams: [
        {
            streamName: 'feedA',
        },
    ],
});
console.log(subscribeToken);
```

## Media Examples

### Start an enhance job

To start an enhance job, use the following code:

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

// Request an Access Token
const jwt = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET);

const jobDescription = JSON.stringify({
    content: { type: 'podcast' },
    input: 'dlb://in/file.mp4',
    output: 'dlb://out/file.mp4',
});

const jobId = await dolbyio.media.enhance.start(jwt, jobDescription);

console.log(`Job ID: ${jobId}`);
```

## Build this project

To build the `dist` folder, run the command:

```bash
npm run build
```
