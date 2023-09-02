const textColor = (colorCode: number, text: string): string => `\x1b[${colorCode}m${text}\x1b[0m`;

function info(message: string): void {

    console.warn(`${textColor(32, '[INFO]:')} ${message}`);

}

function error(message: string): void {

    console.warn(`${textColor(31, '[ERROR]:')} ${message}`);

}

function warn(message: string): void {

    console.warn(`${textColor(33, '[WARNING]:')} ${message}`);

}

function debug(message: string): void {

    console.warn(`${textColor(34, '[DEBUG]:')} ${message}`);

}

export {
    info,
    error,
    warn,
    debug,
    textColor
};
