angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: "/sign-in",
      templateUrl: "sign-in.html",
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: "/forgot-password",
      templateUrl: "forgot-password.html"
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "contact.html"
        }
      }
    })
    .state('actions', {
      url: "/action",
      templateUrl: "main-actions.html",
      controller: 'ScannerCtrl'
    })
     .state('menu', {
      url: "/menu",
      templateUrl: "menu.html",
      controller: 'MenuCtrl'
    });

   $urlRouterProvider.otherwise("/sign-in");

})

.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    
    if (user.username && user.password){
      console.log('Sign-In', user);
      $state.go('actions');
    }
  };

})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})

.controller('ScannerCtrl', function($scope, $state) {
  console.log('ScannerCtrl');
  
  $scope.scan = function() {
      console.log('Url-scanned');
      $state.go('menu');
  };
})

.controller('MenuCtrl', function($scope) {
  console.log('MenuCtrl');
});