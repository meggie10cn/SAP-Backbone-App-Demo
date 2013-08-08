(function(){
  'use strict';

  App.views.LogoutView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.logout,
    
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());