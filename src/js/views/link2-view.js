(function(){
  'use strict';

  App.views.Link2View = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.link2,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());