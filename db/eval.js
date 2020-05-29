const mongoose = require('mongoose');
const evaluate = function(object) {
    if (object && object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
            object[i] = evaluate(object[i]);
        }
    } else if (object && typeof object == 'object' && Object.keys(object).length > 0) {
        if (Object.keys(object).indexOf('_eval') < 0) {
            for (var key in object) {
                object[key] = evaluate(object[key]);
            }
        } else switch (object['_eval']) {
            case 'Id':
                {
                    object = mongoose.Types.ObjectId(object['value']);
                    break;
                }
			case 'regex':
                {
                    object = new RegExp(object['value'], 'i');
                    break;
                }
			case 'date':
                {
                    object = new Date(object['value']);
                    break;
                }

        }
    }
    return object;
}

module.exports = evaluate;