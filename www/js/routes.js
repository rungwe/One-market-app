angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.ads', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/ads.html',
        controller: 'adsCtrl'
      }
    }
  })

  .state('tabsController.broadcasts', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/broadcasts.html',
        controller: 'broadcastCtrl'
      }
    }
  })

  .state('tabsController.shop', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/shop.html',
        controller: 'shopCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/page3')

  

});