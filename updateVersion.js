const fs = require('fs');

const filename = 'package.json';

fs.readFile(filename, function (err, data) {
    if (err) throw err;

    const jsonFile = JSON.parse(data);

    const version = jsonFile['version'];
    console.log(`Current version: ${version}`);

    const split = version.split('.');
    split[split.length - 1] = process.env.CI_JOB_ID;
    const newVersion = split.join('.');
    console.log(`New version: ${newVersion}`);

    jsonFile['version'] = newVersion;

    const newContent = JSON.stringify(jsonFile, null, '    ');
    fs.writeFile(filename, newContent, function (err) {
        if (err) throw err;
    });
});
