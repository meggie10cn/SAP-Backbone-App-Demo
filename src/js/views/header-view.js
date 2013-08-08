(function(){
  'use strict';

  App.views.HeaderView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: '',
  
    template: JST.header,
  
    events: {
      'click #nav-button-logout': 'onClickLogout'
    },
    
    initialize: function() {
      // Create the user model (don't fetch yet, this should only be done after user logged in)
      this.userModel = new App.models.User();
      this.listenTo(this.userModel, 'sync', this.render);
      this.listenTo(this.userModel, 'change', this.render);
      this.listenTo(this.userModel, 'error', App.router.showFatalError);
      // Listen to router events
      this.listenTo(App.router, 'route', this.onRoute);
      // Observe the global Auth model to watch whether the user is logged in or not
      this.listenTo(App.authModel, 'change', this.onAuthModelChanged);
    },
  
    render: function() {
      var html;
      if (App.authModel.get('isLoggedIn')) {
        html = this.template({ user: this.userModel.toJSON() });
        this.$el.html(html);
        this.$('#nav-button-logout').removeClass('hide');
      } else {
        html = this.template({ });
        this.$el.html(html);
        this.$('#nav-button-logout').addClass('hide');
      }
      return this;
    },
    
    onRoute: function(route) {
      this.clearActiveLinks();
      // Only toggle active links when user is logged in
      if (App.authModel.get('isLoggedIn')) {
        switch (route) {
          case 'showLink1View':
            this.$('#nav-link1').addClass('active');
            break;
          case 'showLink2View':
            this.$('#nav-link2').addClass('active');
            break;
          default:
            break;
        }
      }
    },
    
    clearActiveLinks: function() {
      this.$('#nav-link1').removeClass('active');
      this.$('#nav-link2').removeClass('active');
    },
    
    onAuthModelChanged: function() {
      this.render();
      if (App.authModel.get('isLoggedIn')) {
        // Logged in, fetch user
        this.userModel.fetch({
          headers: { 'sap-user': App.authModel.get('username'), 'sap-password': App.authModel.get('password') }
        });
      } else {
        // Logged out, clear user
        this.userModel.clear();
      }
    },
    
    onClickLogout: function() {
      App.router.navigate('logout', {trigger: true, replace: true});
    }
    
  });

}());