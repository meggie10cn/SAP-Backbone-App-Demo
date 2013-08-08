(function(){
  'use strict';

  App.views.AppView = Backbone.View.extend({
  
    el: $('#app'),
  
    template: JST.app,
  
    render: function() {
      var html = this.template();
      this.$el.html(html);
  
      // Keep a reference to static DOM elements for fast access when changing views.
      this.$header = this.$('#header');
      this.$content = this.$('#content');
      this.$footer = this.$('#footer');
  
      // Insert the header view into the static header DOM element.
      this.headerView = new App.views.HeaderView();
      this.headerView.render();
      this.$header.html(this.headerView.$el);
  
      // Insert the footer view into the static footer DOM element.
      this.footerView = new App.views.FooterView();
      this.footerView.render();
      this.$footer.html(this.footerView.$el);
  
      return this;
    }
  
  });

}());