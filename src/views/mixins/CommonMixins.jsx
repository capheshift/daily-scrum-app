'use strict';

module.exports = {
  onChange: function(e) {
    var model = this.state.model;
    model[e.target.name] = e.target.value;

    this.setState({
      model: model
    });
  },

  getModel: function() {
    return this.state.model;
  }
};
