window.$ = window.jQuery = require('jquery');

require('jquery-form/jquery.form.js');
require('bootstrap');
require('jquery-datetimepicker');

require('../admin/plugins/lightbox/lightbox.min.js');
require('../admin/plugins/chosen/chosen.jquery.min.js');
require('../admin/plugins/chosen-order/chosen.order.jquery.min.js');
require('../admin/dist/js/main.js');
require('./main.js');

window._ = require('lodash');
window.moment = require('moment');
window.md5 = require('js-md5');