(function(){
  'use strict';

  App.views.AutoLogoutView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.autologout,
    
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());