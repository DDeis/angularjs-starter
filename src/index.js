/* eslint-disable import/default */
import angular from 'angular';

const myApp = angular.module('myApp', []);

myApp.controller('AppController', $scope => {
  $scope.name = 'World!';
});
