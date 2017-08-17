const sendGrid = require('sendgrid');
const helper = sendGrid.mail;

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();

        this.sgApi = sendGrid(process.env.SEND_GRID_KEY);
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => new helper.Email(email));
	}

	addClickTracking() {
	    const trackingSettings = new helper.TrackingSettings();
	    const clickTracking = new helper.ClickTracking(true, true);

	    trackingSettings.setClickTracking(clickTracking);
	    this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
	    const personalize = new helper.Personalization();

	    this.recipients.forEach(recipient => {
	        personalize.addTo(recipient);
        });

	    this.addPersonalization(personalize);
    }
}

module.exports = Mailer;
