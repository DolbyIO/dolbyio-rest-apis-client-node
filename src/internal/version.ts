import path from 'path';

const searchPackageJson = (directory: string) => {
    try {
        const contents = require(path.join(directory, '/package.json'));
        return contents.version;
    } catch (error) {
        // Look for the parent directory
        const parentDir = path.resolve(directory, '..');
        if (directory === parentDir) {
            // We've reached the root folder
            return '0.0.0';
        }
        return searchPackageJson(parentDir);
    }
};

const getVersion = (): string => {
    const currentDir = path.resolve(__dirname);
    return searchPackageJson(currentDir);
};

/**
 * Gets the version of this package.
 */
const version: string = getVersion();

export default version;
