import angular from 'angular';

import homeComponent from './home.component';

const BookmarksModule = angular
  .module('homeModule', [])
  .component('home', homeComponent);

export default BookmarksModule;
