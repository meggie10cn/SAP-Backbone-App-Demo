// ## Starts the application when the DOM is ready
$(function() {
  'use strict';

  // Setup ajax
  // - Shorter timeout
  $.ajaxSetup({
    timeout: 5000
  });
  // - Delete all received cookies (this is done in case SAP has SSO enabled and sends session cookies)
  $(document).ajaxComplete(function( event, xhr, settings ) {
    _.each($.cookie(), function(value, name, list) {
      $.removeCookie(name, { path: '/' });
    });
  });

  // Initialize global Auth model
  App.authModel = new App.models.Auth();

  // Create the router
  App.router = new App.routers.Router();

  // Create the app view
  App.appView = new App.views.AppView();
  App.appView.render();
  
  // Kick things off by starting the Backbone.js dispatcher.
  Backbone.history.start();

});