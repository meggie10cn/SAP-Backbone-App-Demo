(function(){
  'use strict';

  App.views.FooterView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.footer,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());