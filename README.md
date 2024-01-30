[![Build Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml)
[![Build Documentation](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-documentation.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-documentation.yml)
[![Publish Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml)
[![npm](https://img.shields.io/npm/v/@dolbyio/dolbyio-rest-apis-client)](https://www.npmjs.com/package/@dolbyio/dolbyio-rest-apis-client)
[![License](https://img.shields.io/github/license/DolbyIO/dolbyio-rest-apis-client-node)](LICENSE)

Dolby.io REST APIs Client for Node.JS is wrapper for the dolby.io [Real-time Streaming](https://docs.dolby.io/streaming-apis/reference), [Media](https://docs.dolby.io/media-processing/reference/media-enhance-overview) and [Communications](https://docs.dolby.io/communications-apis/reference/authentication-api) REST APIs.

# Install this project

Run the npm command to install the package `@dolbyio/dolbyio-rest-apis-client` into your Node project:

```bash
npm install @dolbyio/dolbyio-rest-apis-client --save
```

# Real-time Streaming Examples

## Create a publish token

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

## Create a subscribe token

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

# Media Examples

Here is an example on how to upload a file to the Dolby.io temporary cloud storage, enhance that file and download the result.

## Get an API token

Get the App Key and Secret from the Dolby.io dashboard and use the following code in your python script.

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

// Request an Access Token
const jwt = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET);
console.log('Access token', jwt);
```

## Upload a file for processing

Upload a media file to the Dolby.io temporary cloud storage for processing:

```javascript
// Temporary storage URL that will be used as reference for the job processing
const inputUrl = 'dlb://in/file.mp4';
// Local path of the file to upload
const originalFilePath = '/path/to/original_file.mp4';

await dolbyio.media.io.uploadFile(jwt, inputUrl, originalFilePath);
```

## Start an enhance job

Generate a job description and send it to Dolby.io.

```javascript
// Temporary storage URL that will be used as reference for the job processing
const outputUrl = 'dlb://out/file.mp4';

const jobDescription = JSON.stringify({
    content: { type: 'podcast' },
    input: inputUrl,
    output: outputUrl,
});

const jobId = await dolbyio.media.enhance.start(jwt, jobDescription);
console.log(`Job ID: ${jobId}`);
```

## Wait for the job to complete

Get the job status and wait until it is completed.

```javascript
const sleep = (delay) => new Promise((r) => setTimeout(r, delay));

let result = await dolbyio.media.enhance.getResults(jwt, jobId);
while (result.status === 'Pending' || result.status === 'Running') {
    console.log(`Job status is ${result.status}, taking a 5 second break...`);
    await sleep(5000);

    result = await dolbyio.media.enhance.getResults(jwt, jobId);
}

if (result.status !== 'Success') {
    console.error('There was a problem with processing the file', result);
    return;
}
```

## Download a processed file

At this stage, the file has been processed and written to the temporary storage so we can download it.

```javascript
// Local path where to download the file to
const enhancedFilePath = '/path/to/enhanced_file.mp4';

await dolbyio.media.io.downloadFile(jwt, outputUrl, enhancedFilePath);
```

# Communications Examples

## Authenticate

To get an access token that will be used by the client SDK for an end user to open a session against dolby.io, use the following code:

```javascript
const dolbyio = require('@dolbyio/dolbyio-rest-apis-client');

const APP_KEY = 'YOUR_APP_KEY';
const APP_SECRET = 'YOUR_APP_SECRET';

// Request an API Token
const api_token = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET, 3600, ['comms:client_access_token:create']);

// Request the Client Access Token
const cat = await dolbyio.communications.authentication.getClientAccessTokenV2({
    accessToken: api_token,
    sessionScope: ['*'],
});

console.log(`Client Access Token: ${cat.access_token}`);
```

## Create a conference

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

// Request an API Token
const jwt = await dolbyio.authentication.getApiAccessToken(APP_KEY, APP_SECRET, 3600, ['comms:conf:create']);

// Create the conference
const conference = await dolbyio.communications.conference.createConference(jwt, options);

console.log(`Conference created: ${conference.conferenceId}`);
```

# How to

To build the `dist` folder, run the command:

```bash
npm run build
```

The documentation is built on [TypeDoc](https://typedoc.org), to generate the doc, run the following command. You will find the HTML files in the `docs` folder.

```bash
npm run docs
```
