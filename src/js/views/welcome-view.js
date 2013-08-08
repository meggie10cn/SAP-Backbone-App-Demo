(function(){
  'use strict';

  App.views.WelcomeView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.welcome,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());