(function(){
  'use strict';

  App.views.LoginView = Backbone.View.extend({
  
    tagName: 'div',
  
    className: 'container',
  
    template: JST.login,
    
    events: {
      'submit': 'onSubmit'
    },
  
    initialize: function() {
      // Observe auth model
      this.listenTo(App.authModel, 'sync', this.authModelFetchSuccess);
      this.listenTo(App.authModel, 'error', this.authModelFetchError);
    },
  
    render: function() {
      var html, username;
  
      html = this.template();
      this.$el.html(html);
      
      // Try to read username from cookie
      username = $.cookie('demoUsername');
      if (!_.isUndefined(username)) {
        this.$('#inputUsername').val(username);
        this.$('#saveUsername').prop('checked', true);
        _.defer(function(context) { // focus() will not work immediately so the call is deferred
          context.$('#inputPassword').focus();
        }, this);
      } else {
        _.defer(function(context) { // focus() will not work immediately so the call is deferred
          context.$('#inputUsername').focus();
        }, this);
      }
      
      return this;
    },
    
    onSubmit: function(event) {
      event.preventDefault(); // Prevent default submit event
      // Hide any visible error messages
      this.$('#login-error-credentials').addClass('hide');
      this.$('#login-error-unreachable').addClass('hide');
      this.$('#login-error-other').addClass('hide');
      // Show logging in message and hide the form
      this.$('#login-form').addClass('hide');
      this.$('#login-wait').removeClass('hide');
      // Fetch the auth model with supplied credentials
      App.authModel.fetch({
        headers: { 'sap-user': this.$('#inputUsername').val(), 'sap-password': this.$('#inputPassword').val() }
      });
    },
    
    authModelFetchSuccess: function(model, response, options) {
      // Store username in cookie, if requested
      if (this.$('#saveUsername').prop('checked')) {
        $.cookie('demoUsername', this.$('#inputUsername').val(), { expires: 7 });
      } else {
        $.removeCookie('demoUsername');
      }
      // Store supplied username and password in Auth model
      App.authModel.set({ username: this.$('#inputUsername').val(), password: this.$('#inputPassword').val(), isLoggedIn: true });
      // Navigate to root view after logging in
      App.router.navigate('', {trigger: true, replace: true});
    },
    
    authModelFetchError: function(model, response, options) {
      // Hide logging in message
      this.$('#login-wait').addClass('hide');
      // Clear the auth model
      App.authModel.clear();
      // Check response code
      if (response.status === 401) {
        // Login failed due to wrong user or password
        this.$('#login-error-credentials').removeClass('hide');
      } else if (response.status === 0) {
        // Login failed due to unreachable SAP system
        this.$('#login-error-unreachable').removeClass('hide');
      } else {
        // Login failed due to another error
        this.$('#login-error-other').removeClass('hide');
      }
      // Display the login form again with a cleared password field and the focus on the username field with the typed username selected
      this.$('#login-form').removeClass('hide');
      this.$('#inputPassword').val('');
      this.$('#inputUsername').focus();
      this.$('#inputUsername').select();
    }
  
  });

}());