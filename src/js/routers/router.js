(function(){
  'use strict';

  // ## Main Backbone.js Router class
  // This is the only router. It handles navigation for the entire application.
  // The router automatically evaluates any changes in the URL and changes the views accordingly.
  App.routers.Router = Backbone.Router.extend({
  
    initialize: function() {
      // Define routes
      this.route('*other', 'showNotFound');
      this.route('', 'showDefaultView');
      this.route('login', 'showLoginView');
      this.route('logout', 'showLogoutView');
      this.route('autologout', 'showAutoLogoutView');
      this.route('link1', 'showLink1View');
      this.route('link2', 'showLink2View');
      // Setup autologout
      this.scheduleAutoLogout();
      // Monitor activity, resetting autologout timer
      $(document).on('mousemove keydown click', _.bind(this.scheduleAutoLogout, this));
    },
  
    showDefaultView: function() {
      this.showWelcomeView();
    },
    
    showLoginView: function() {
      var loginView = new App.views.LoginView();
      loginView.render();
      App.appView.$content.html(loginView.$el);
      this.switchView(loginView);
    },
  
    showLogoutView: function() {
      // Clear the auth model on logout
      App.authModel.clear();
      // Show logout view
      var logoutView = new App.views.LogoutView();
      logoutView.render();
      App.appView.$content.html(logoutView.$el);
      this.switchView(logoutView);
    },
  
    showAutoLogoutView: function() {
      // Clear the auth model on autologout
      App.authModel.clear();
      // Show autologout view
      var autoLogoutView = new App.views.AutoLogoutView();
      autoLogoutView.render();
      App.appView.$content.html(autoLogoutView.$el);
      this.switchView(autoLogoutView);
    },
  
    showWelcomeView: function() {
      if (this.checkLoggedIn()) {
        var welcomeView = new App.views.WelcomeView();
        welcomeView.render();
        App.appView.$content.html(welcomeView.$el);
        this.switchView(welcomeView);
      }
    },
  
    showLink1View: function() {
      if (this.checkLoggedIn()) {
        var link1View = new App.views.Link1View();
        link1View.render();
        App.appView.$content.html(link1View.$el);
        this.switchView(link1View);
      }
    },
  
    showLink2View: function() {
      if (this.checkLoggedIn()) {
        var link2View = new App.views.Link2View();
        link2View.render();
        App.appView.$content.html(link2View.$el);
        this.switchView(link2View);
      }
    },
  
    showNotFound: function() {
      if (this.checkLoggedIn()) {
        var notFoundView = new App.views.NotFoundView();
        notFoundView.render();
        App.appView.$content.html(notFoundView.$el);
        this.switchView(notFoundView);
      }
    },
    
    showFatalError: function() {
      // Clear the auth model on a fatal error
      App.authModel.clear();
      // Show fatal error view
      var errorView = new App.views.ErrorView();
      errorView.render();
      App.appView.$content.html(errorView.$el);
      this.switchView(errorView);
    },
    
    checkLoggedIn: function() {
      if (!App.authModel.get('isLoggedIn')) {
        // Not logged in, redirect to login page
        this.navigate('login', {trigger: true, replace: true});
        return false;
      }
      return true;
    },
    
    // Used to keep a reference to the currently displayed view inside the static content DOM element.  
    // This is called each time the content view changes, to make sure previous views are properly closed.
    switchView: function(view) {
      // Reset autologout timer
      this.scheduleAutoLogout();
      // Close the currently displayed view.
      if (this.currentContentView) {
        this.currentContentView.remove();
      }
      // Keep a reference to the new view which is being displayed, so it can be closed later.
      this.currentContentView = view;
    },
    
    scheduleAutoLogout: function() {
      // Only schedule if logged in
      if (App.authModel.get('isLoggedIn')) {
        clearTimeout(this.autoLogoutTimeout);
        this.autoLogoutTimeout = setTimeout(_.bind(this.autoLogout, this), 10*60*1000); // 10 minutes
      }
    },
    
    autoLogout: function() {
      this.navigate('autologout', {trigger: true, replace: true});
    }
  
  });

}());