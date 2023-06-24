const createLogger = (title) => {
    const logger = (message) => {
        console.log(`[${title}] : ${message}`);
        console.log();
    }
    return logger
}

const createLoggerTitle = (title) => {
    const logger = (message) => {
        console.log(`_______________${title} : ${message}_______________`);
        console.log();
    }
    return logger
}


module.exports = {createLogger, createLoggerTitle}