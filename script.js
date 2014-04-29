angular.module('ionicApp', ['ionic'] )

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
    })
     .state('details', {
      url: "/details",
      templateUrl: "details.html",
      controller: 'MenuCtrl'
    });

  $urlRouterProvider.otherwise("/sign-in");   

})

.controller('SignInCtrl', function($scope, $state) {
  $scope.user = {};
  $scope.signIn = function(user) {
    
    if (user.username && user.password){
      console.log('Sign-In', user);
      $scope.user = user;
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

.controller('MenuCtrl', function($scope, $state, $http) {
  
  // Instantiate an object to store your scope data in (Best Practices)
  $scope.data = {};

  console.log('MenuCtrl');

  $http.get('http://192.168.1.33:8080/com.smartwaiter/rest/webservice/getplatosalternativa/1/10')
  .success(function(data, status) {
    console.log('Success');
    $scope.data = data;
    $scope.items = data.platos;
  })
  .error(function(data, status) {
    console.log('Error');
  });

  $scope.itemButtons = [
    {
      text: 'Rate',
      type: 'button-assertive',
      onTap: function (item) {
        alert('Rate Item: ' + item.nombre);
      }
    },
    {
      text: 'Share',
      type: 'button-calm',
      onTap: function (item) {
        alert('Share Item: ' + item.id);
      }
    }
  ];

  $scope.details = function(id) {
      console.log('Item-clicked', id);
      $state.go('details');
  };

  




});