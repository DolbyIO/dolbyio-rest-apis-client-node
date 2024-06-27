[![Build Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-package.yml)
[![Build Documentation](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-documentation.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/build-documentation.yml)
[![Publish Package](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml/badge.svg)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node/actions/workflows/publish-package.yml)
[![npm](https://img.shields.io/npm/v/@dolbyio/dolbyio-rest-apis-client)](https://www.npmjs.com/package/@dolbyio/dolbyio-rest-apis-client)
[![License](https://img.shields.io/github/license/DolbyIO/dolbyio-rest-apis-client-node)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-_?logo=GitHub&labelColor=black&color=blue)](https://github.com/DolbyIO/dolbyio-rest-apis-client-node)
[![Documentation](https://img.shields.io/badge/Documentation-_?logo=readthedocs&labelColor=black&color=blue)](https://api-references.dolby.io/dolbyio-rest-apis-client-node/)

Dolby.io REST APIs Client for Node.JS is wrapper for the [Dolby Millicast](https://docs.dolby.io/streaming-apis/reference) and [Dolby.io Media](https://docs.dolby.io/media-processing/reference/media-enhance-overview) REST APIs.

# Install this project

Run the npm command to install the package `@dolbyio/dolbyio-rest-apis-client` into your Node project:

```bash
npm install @dolbyio/dolbyio-rest-apis-client
```

# Dolby Millicast Examples

## Create a publish token

```ts
import { streaming } from '@dolbyio/dolbyio-rest-apis-client';

const API_SECRET = process.env.DOLBYIO_API_SECRET;

const publishToken = await streaming.publishToken.create(API_SECRET, {
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

```ts
import { streaming } from '@dolbyio/dolbyio-rest-apis-client';

const API_SECRET = process.env.DOLBYIO_API_SECRET;

const subscribeToken = await streaming.subscribeToken.create(API_SECRET, {
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

```ts
import { media } from '@dolbyio/dolbyio-rest-apis-client';

const APP_KEY = process.env.DOLBYIO_APP_KEY;
const APP_SECRET = process.env.DOLBYIO_APP_SECRET;

// Request an Access Token
const jwt = await media.authentication.getApiAccessToken(APP_KEY, APP_SECRET);
console.log('Access token', jwt);
```

## Upload a file for processing

Upload a media file to the Dolby.io temporary cloud storage for processing:

```ts
// Temporary storage URL that will be used as reference for the job processing
const inputUrl = 'dlb://in/file.mp4';
// Local path of the file to upload
const originalFilePath = '/path/to/original_file.mp4';

await media.io.uploadFile(jwt, inputUrl, originalFilePath);
```

## Start an enhance job

Generate a job description and send it to Dolby.io.

```ts
// Temporary storage URL that will be used as reference for the job processing
const outputUrl = 'dlb://out/file.mp4';

const jobDescription = JSON.stringify({
    content: { type: 'podcast' },
    input: inputUrl,
    output: outputUrl,
});

const jobId = await media.enhance.start(jwt, jobDescription);
console.log(`Job ID: ${jobId}`);
```

## Wait for the job to complete

Get the job status and wait until it is completed.

```javascript
const sleep = (delay) => new Promise((r) => setTimeout(r, delay));

let result = await media.enhance.getResults(jwt, jobId);
while (result.status === 'Pending' || result.status === 'Running') {
    console.log(`Job status is ${result.status}, taking a 5 second break...`);
    await sleep(5000);

    result = await media.enhance.getResults(jwt, jobId);
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

await media.io.downloadFile(jwt, outputUrl, enhancedFilePath);
```

# Logs

You can also print the logs in the console and select the log level by using the following code.

```ts
import { Logger } from '@dolbyio/dolbyio-rest-apis-client';

Logger.useDefaults({
    defaultLevel: Logger.TRACE,
});
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

# Related Projects

-   [TypeDoc](https://typedoc.org)
-   [js-logger](https://github.com/jonnyreeves/js-logger)
