var Mock = require('./mock');
var plugin = require('../');

describe('mongoose-plugin-timestamp', function testSutie() {
  var model;

  beforeEach(function handleBeforeEach() {
    model = new Mock();
  });

  afterEach(function handleAfterEach() {
    model = null;
  });

  it('throws an error if both declarations are disabled', function disabledTest() {
    (function shouldThrow() {
      plugin(model, {
        declaration: {
          created: false,
          updated: false
        }
      });
    }).should.throw();
  });

  it('adds the declared fields', function fieldTest() {
    plugin(model);

    model.options.added.should.containEql({
      created: { type: Date }
    });
    model.options.added.should.containEql({
      updated: { type: Date }
    });
  });

  it('stores the pre save method', function preSaveTest() {
    plugin(model);
    model.options.pre.should.have.property('callback').which.is.a.Function();
  });

  it('ignores unnecessary declarations', function unnecessaryTest() {
    plugin(model, {
      declaration: {
        a: true
      }
    });

    model.options.added.should.not.containEql({
      a: true
    });
  });

  it('ignores disabled stuff', function disabledTest() {
    plugin(model, {
      declaration: {
        updated: false
      }
    });

    model.options.added.should.not.containEql({
      updated: {
        type: Date
      }
    });
  });

  it('it is possibile to overwrite the declaration', function overwriteTest() {
    plugin(model, {
      declaration: {
        created: {
          key: 'createdAt',
          config: {
            type: Date,
            default: null
          }
        },
        updated: {
          key: 'updatedAt',
          config: {
            type: Date,
            default: null
          }
        }
      }
    });

    model.options.added.should.containEql({
      createdAt: {
        type: Date,
        default: null
      }
    });

    model.options.added.should.containEql({
      updatedAt: {
        type: Date,
        default: null
      }
    });
  });

  describe('#pre', function preTest() {
    it('overwrites created if it is empty', function overwriteCreatedTest(done) {
      plugin(model);

      model.save(function handleComplete() {
        model.created.should.be.a.Number();
        model.created.should.equal(model.updated);

        done();
      });
    });

    it('ignores created if not empty', function definedCreatedTest(done) {
      var created = Date.now();

      plugin(model);
      model.created = created;

      setTimeout(function wait() {
        model.save(function handleComplete() {
          model.created.should.equal(created);
          model.updated.should.not.equal(created);

          done();
        });
      }, 50);
    });

    it('uses the current timestamp if updated is disabled', function definedCreatedTest(done) {
      plugin(model, {
        declaration: {
          updated: false
        }
      });

      setTimeout(function wait() {
        model.save(function handleComplete() {
          model.should.not.have.property('updated');
          model.created.should.be.a.Number();

          done();
        });
      }, 50);
    });
  });
});
