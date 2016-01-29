var merge = require('lodash.merge');

module.exports = function timestampPlugin(schema, options) {
  options = merge({
    declaration: {
      created: {
        key: 'created',
        config: {
          type: Date
        }
      },
      updated: {
        key: 'updated',
        config: {
          type: Date
        }
      }
    }
  }, options);

  if (!options.declaration.created && !options.declaration.updated) {
    throw new Error('"created" and "updated" are disabled');
  }

  ['created', 'updated'].forEach(function eachKey(key) {
    var declaration;
    var config = {};

    if (!options.declaration[key]) {
      return;
    }

    declaration = options.declaration[key];
    config[declaration.key] = declaration.config;

    schema.add(config);
  });

  schema.pre('save', function handlePreSave(next) {
    if (options.declaration.updated) {
      this[options.declaration.updated.key] = Date.now();
    }

    if (options.declaration.created && !this[options.declaration.created.key]) {
      this[options.declaration.created.key] = this[options.declaration.updated.key] || Date.now();
    }

    next();
  });
};
