(function(){
  'use strict';

  App.views.Link1View = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.link1,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());