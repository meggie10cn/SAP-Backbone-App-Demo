(function(){
  'use strict';

  App.views.ErrorView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.error,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());