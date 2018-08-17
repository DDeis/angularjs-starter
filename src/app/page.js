import angular from 'angular';

import HomeModule from './home/home';

// eslint-disable-next-line angular/file-name, angular/module-setter
const ComponentsModule = angular.module('app.pages', [HomeModule.name]);

export default ComponentsModule;
