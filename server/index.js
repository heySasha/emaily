require('./config');
require('./db/mongoose');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

app.use(require('body-parser').json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(
			require('path').resolve(__dirname, 'client', 'build', 'index.html')
		);
	});
}

app.listen(process.env.PORT, () => {
	console.log(`Server run on ${process.env.PORT}`);
});
