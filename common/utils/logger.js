const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        // the simple format output
        format.simple(),
        // support interpolation
        // logger.info('Found %s at %s', 'error', new Date());
        format.splat(),
        // Custom timestamp
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console()],
    exitOnError: false
})

module.exports = logger;
