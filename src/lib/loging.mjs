/**
 * @param {number} colorCode - The color code to use.
 * @param {string} text - The text to color.
 * @returns {string} The colored text.
 * @example
 * textColor(32, 'Hello World!'); // => '\x1b[32mHello World!\x1b[0m'
 */
export const textColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

/**
 * @param {string} message - The message to log.
*/
function info (message) {
	console.warn(`${textColor(32, '[INFO]:')} ${message}`);
}

/**
 * @param {string} message - The message to log.
*/
function error (message) {
	console.warn(`${textColor(31, '[ERROR]:')} ${message}`);
}

/**
 * @param {string} message - The message to log.
*/
function warn (message) {
	console.warn(`${textColor(33, '[WARNING]:')} ${message}`);
}

/**
 * @param {string} message - The message to log.
*/
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
