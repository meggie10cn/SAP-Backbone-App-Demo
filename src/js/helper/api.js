(function(){
  'use strict';

  // ## Global API settings
  App.api = {
  
    // Default parameters
    defaultParams: {
      'sap-client': '100'
    },
  
    // Resource paths
    auth: function() {
      return '/sapdemo/auth?' + $.param(_.defaults(this.defaultParams));
    },

    user: function() {
      return '/sapdemo/user?' + $.param(_.defaults(this.defaultParams));
    }
    
  };

}());