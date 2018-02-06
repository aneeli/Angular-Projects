var app = angular.module('groceryList',["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: "views/groceryList.html",
            controller: "HomeController"
        })
        .when('/addItem',{
            templateUrl: "views/addItem.html",
            controller: "ItemsController"
        })
        .when('/addItem',{
            templateUrl: "views/addItem.html",
            controller: "ItemsController"
        })
        .when('/addItem/edit/:id/',{
            templateUrl: "views/addItem.html",
            controller: "ItemsController"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service("GroceryItemService",function($http){
 var groceryItemService ={};
 groceryItemService.items =[];

 $http({
    method: 'GET',
    url: 'data/server_data.json'
 })
 .then(function (response){
        var data = response.data;
        groceryItemService.items =data;
        for(var item in groceryItemService.items){
            groceryItemService.items[item].date = new Date(groceryItemService.items[item].date);
        }

 },
 function (error){
      alert("Things went wrong");
 });

//  $http.get("")
// .success(function(data){
//     groceryItemService.items =data;
//     for(var item in groceryItemService.items){
//         groceryItemService.items[item].date = new Date(groceryItemService.items[item].date);
//     }

// })
// .error(function(data,status){

// })
groceryItemService.findById = function(id){
    for(var item in groceryItemService.items){
        if(groceryItemService.items[item].id ===id)
        return groceryItemService.items[item];
    }
};

groceryItemService.getNewId = function(){
    if(groceryItemService.newId) {
        groceryItemService.newId++;
        return groceryItemService.newId;
    }
    else {
        var maxId = _.max(groceryItemService.items, function(entry){ return entry.id;})
        groceryItemService.newId = maxId.id + 1;
        return groceryItemService.newId;
    }
}
groceryItemService.checkComplete = function(entry){
    entry.completed = !entry.completed;
}
groceryItemService.removeItem = function(entry){
    $http.post("data/item_delete.json",{id:entry.id})
     .then(function(response){
        var data = response.data;
        if(data.status){
        var ind = groceryItemService.items.indexOf(entry);
        groceryItemService.items.splice(ind,1);
        }
     },
    function(error){

    });

}
groceryItemService.save = function(entry){
    var updatedItem = groceryItemService.findById(entry.id);
    
            if(updatedItem){
                $http.post("data/update_item.json",entry)
                .then(function(response){
                    var data=response.data;
                    if(data.status==1){
                    updatedItem.completed = entry.completed;
                    updatedItem.itemName = entry.itemName;
                    updatedItem.date = entry.date;
                    }
                },
            function(error){

            });
               
    
            }else {
                $http.post("data/addItem.json",entry)
                .then(function(response){
                    var data = response.data;
                    entry.id = data.newId;
                },
                function (error){
                     
                });
                entry.id = groceryItemService.getNewId();
                groceryItemService.items.push(entry);
            }
};
return groceryItemService;
});

app.controller("HomeController",["$scope","GroceryItemService", function($scope,GroceryItemService){
    $scope.items = GroceryItemService.items;
    $scope.removeItem = function(entry){
        GroceryItemService.removeItem(entry);
    };

    $scope.checkComplete = function(entry){
        GroceryItemService.checkComplete(entry);
    };

    $scope.$watch(function(){return GroceryItemService.items;},function(items){
        $scope.items= items;
    })
}]);

app.controller("ItemsController", ["$scope", "$routeParams", "$location", "GroceryItemService", function($scope, $routeParams, $location, GroceryItemService){
    
        
        if(!$routeParams.id){
            $scope.groceryItem = { id:0, completed:false, itemName: "", date: new Date() }
        }else{
            $scope.groceryItem = _.clone(GroceryItemService.findById(parseInt($routeParams.id)));
        }
        
    
        $scope.save = function(){
            GroceryItemService.save( $scope.groceryItem );
            $location.path("/");
        }
    }]);

    app.directive("tbGroceryItem", function(){
        return{
            restrict: "E",
            templateUrl: "views/items.html"
        }
    });
