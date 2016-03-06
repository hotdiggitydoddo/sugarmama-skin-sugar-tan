module.exports = {
    getRandomHexValue: function (length) {
        var crypto = require('crypto');
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return required number of characters
    }
}