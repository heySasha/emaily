const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        try {
            await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            });

            req.user.credits += 5;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(500).send();
        }
    });
};