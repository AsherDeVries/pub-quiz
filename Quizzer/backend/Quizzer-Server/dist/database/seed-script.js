'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _categories = require('../assets/categories');

var _categories2 = _interopRequireDefault(_categories);

var _questions = require('../assets/questions');

var _questions2 = _interopRequireDefault(_questions);

var _Question = require('../models/Question');

var _Question2 = _interopRequireDefault(_Question);

var _Category = require('../models/Category');

var _Category2 = _interopRequireDefault(_Category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log('Executing seed script...');

  var categoryProm = _Category2.default.count().then(function (result) {
    if (result < 1) {
      console.log("Inserting categories..");
      var cats = _categories2.default.map(function (cat) {
        return new _Category2.default(cat);
      });
      cats.forEach(function (cat) {
        cat.save();
      });
    } else {
      console.log("SKIP: Inserting categories (already exists)");
    }
  }).catch(function (err) {
    console.log('ERROR: Could not count categories collection. ' + err);
  });

  var questionProm = _Question2.default.count().then(function (result) {
    if (result < 1) {
      console.log("Inserting questions...");
      var questionModels = _questions2.default.map(function (question) {
        return new _Question2.default(question);
      });
      questionModels.forEach(function (model) {
        model.save().catch(function (err) {
          console.log('Could not insert ' + model._id + ': ' + err);
        });
      });
    } else {
      console.log("SKIP: Inserting questions (already exists)");
    }
  }).catch(function (err) {
    console.log('ERROR: Could not count questions collection. ' + err);
  });

  Promise.all([categoryProm, questionProm]).then(function () {
    console.log("Seed script finished");
  });
};
//# sourceMappingURL=seed-script.js.map