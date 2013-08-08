(function(){
  'use strict';

  App.models.User = Backbone.Model.extend({
  
    // Using urlRoot to define the resource location, since there's no collection defined for this model.
    urlRoot: App.api.user()
  
  });

}());