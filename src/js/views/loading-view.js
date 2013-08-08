(function(){
  'use strict';

  App.views.LoadingView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.loading,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
      return this;
    }
  
  });

}());