import angular from 'angular';

import HomeModule from './home/home';

const ComponentsModule = angular.module('app.pages', [HomeModule.name]);

export default ComponentsModule;
