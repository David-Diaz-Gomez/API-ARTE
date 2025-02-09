const EventEmitter = require('events');

class PersonalizationObserver extends EventEmitter {}

const personalizationObserver = new PersonalizationObserver();

module.exports = personalizationObserver;
