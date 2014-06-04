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
      url: "/details/:id",
      templateUrl: "details.html",
      controller: 'MenuCtrl', 
    });

  $urlRouterProvider.otherwise("/sign-in");   

})


.controller('SignInCtrl', function($scope, $state, SessionService) {
  
  $scope.signIn = function(user) {
    if (user.username && user.password){
      console.log('Sign-In', user);
      //Save user in session
      SessionService.setuser(user);
      $state.go('actions');
    }
  };
})

.controller('ScannerCtrl', function($scope, $state, SessionService) {
  
  console.log('ScannerCtrl');
  $scope.user = SessionService.getuser();
  
  $scope.scan = function() {
      console.log('Url-scanned');
      $state.go('menu');
  };
})


.controller('MenuCtrl', function($scope, $stateParams, $state, $http, $ionicPopup, $ionicModal, SessionService, MenuService, PedidoService) {
  
  // Set loading bar
  $scope.loading = true;
  // Instantiate an object to store your scope data in (Best Practices)
  $scope.restaurante = null;
  // Img thumbnail
  $scope.img = 'img/thumbnail.png';
  // Set cantidad de items en el pedido
  $scope.cantidad = PedidoService.countplatos();
  
  console.log('MenuCtrl');
  
  $http.get('http://192.168.1.33:8080/com.smartwaiter/rest/webservice/getplatosalternativa/1/10')
  .success(function(data, status) {
    $scope.restaurante = data;
    MenuService.setplatos($scope.restaurante.platos);
    if ($stateParams.id){
      $scope.clicked = MenuService.getplato(parseInt($stateParams.id));
    }
    $scope.loading = false;
  })
  .error(function(data, status) {
    $scope.error="Error getting data from server";
    $scope.loading = false;
    $scope.showAlert();
  });

  
  // Modal Pedido
  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });

  // Alert dialog
  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Error getting data from server!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       $state.go('actions');
     });
  };

})

.controller('ModalCtrl', function ($scope, SessionService, PedidoService, MenuService, $state, $ionicPopup) {

  console.log("ModalCtrl");
  $scope.user = SessionService.getuser();
  $scope.pedido = PedidoService.getplatos();
  $scope.img = 'img/thumbnail.png';
  $scope.cantidad = PedidoService.countplatos();
  console.log($scope.cantidad);

  $scope.addPlato = function (item) {
   PedidoService.addplato(item);
   $scope.showAlert();
  };

  $scope.onItemDelete = function (item) {
    $scope.pedido.splice($scope.pedido.indexOf(item.id), 1);
    $scope.showAlert2();
  };

  // Alert dialog
  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Agregado al pedido!',
       template: ''
     });
     alertPopup.then(function(res) {
       $state.go('menu');
     });
  };

  // Alert dialog
  $scope.showAlert2 = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Eliminado del pedido!',
       template: ''
     });
  };

})



//SessionService
.service('SessionService', function() {
    this.setuser = function(user) {
        this.user = user;
    };
    this.getuser = function() {
        return this.user;
    };
})

//PedidoService
.service('PedidoService', function() {
    this.pedido = [];

    this.addplato = function(item) {
        this.pedido.push(item);
    };
    this.getplatos = function() {
        return this.pedido;
    };
    this.countplatos = function(){
        return this.pedido.length;
    };
})

//MenuService
.service('MenuService', function() {
    this.platos = [];
    this.setplatos = function(platos){
      this.platos = platos;
    }
    this.getplato = function(id) {
        for(var i = 0; i < this.platos.length; i += 1){
          var result = this.platos[i];
        if(result.id === id){
            return result;
        }
      }
    };

});


