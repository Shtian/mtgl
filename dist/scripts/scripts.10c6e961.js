"use strict";angular.module("alexandriaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]).constant("_",window._).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/collection/:collectionId",{templateUrl:"views/collection.html",controller:"CollectionCtrl",controllerAs:"collection"}).otherwise({redirectTo:"/"})}]),angular.module("alexandriaApp").controller("MainCtrl",["$scope","$firebaseArray","_",function(a,b,c){var d=new Firebase("https://mtgl.firebase.io");a.collections=b(d),a.createCollection=function(){a.collections.$add({name:a.collectionName})},a.isNameUnique=function(){var b=a.collectionName;return b&&a.collection&&a.collection.length?!c.some(a.collection,{name:a.collectionName}):!1}}]),angular.module("alexandriaApp").controller("CollectionCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("alexandriaApp").run(["$templateCache",function(a){a.put("views/collection.html","<p>This is the collection view.</p> <p>CollectionId: {{collectionId}}</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>Create a collection</h1> <p class="lead"> Start typing a unique collection name for which to bind your magic card collection to: </p> <p><input type="text" class="username" ng-model="collectionName"></p> <p><button class="btn btn-lg btn-success" ng-disabled="isNameUnique()">Create!<span class="glyphicon glyphicon-ok"></span></button></p> </div>')}]);