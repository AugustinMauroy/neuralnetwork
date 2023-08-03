export const textColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

function info (message) {
    console.warn(`${textColor(32, '[INFO]:')} ${message}`);
}

function error (message) {
    console.warn(`${textColor(31, '[ERROR]:')} ${message}`);
}

function warn (message) {
    console.warn(`${textColor(33, '[WARNING]:')} ${message}`);
}

function debug (message) {
    console.warn(`${textColor(34, '[DEBUG]:')} ${message}`);
}

const log = {
    info,
    error,
    warn,
    debug
};

export { log };