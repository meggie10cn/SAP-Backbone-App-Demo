(function(){
  'use strict';

  App.views.NotFoundView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.notfound,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());