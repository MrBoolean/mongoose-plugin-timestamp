function Mock() {
  this.options = {
    added: [],
    pre: null
  };
}

Mock.prototype.add = function add(options) {
  this.options.added.push(options);
};

Mock.prototype.pre = function pre(name, callback) {
  this.options.pre = {
    name: name,
    callback: callback
  };
};

Mock.prototype.save = function save(callback) {
  if (this.options.pre) {
    this.options.pre.callback.call(this, callback);
  }
};

module.exports = Mock;
