(function(app) {
  app.appComponent =
    ng.core.Component({
      selector: 'my-app',
      template: '<h1>My First Angular 2 App</h1>'
    })
    .class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
