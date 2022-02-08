const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('./common/utils/logger');

const router = require('./app/router');

const app = express();

app.use(router);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const originWhiteList = process.env.ALLOWED_ORIGIN.split(',').map(v => v.trim());
app.use(cors({
	origin: (origin, callback) => {
		if (originWhiteList.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
	optionsSuccessStatus: 204,
  preflightContinue: false,
}))

app.listen(3000, () => {
    logger.info('Server is listening at port 3000');
})