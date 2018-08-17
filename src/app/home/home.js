import angular from 'angular';

import homeComponent from './home.component';

// eslint-disable-next-line angular/file-name, angular/module-setter
const HomeModule = angular
  .module('homeModule', [])
  .component('home', homeComponent);

export default HomeModule;
