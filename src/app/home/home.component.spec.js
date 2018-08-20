import angular from 'angular';

import homeModule from './home';

beforeEach(angular.mock.module(homeModule.name));

let componentController;

beforeEach(
  angular.mock.inject(($rootScope, $componentController) => {
    const $scope = $rootScope.$new();
    componentController = $componentController('home', { $scope });
    componentController.$onInit();
  }),
);

describe('home component', () => {
  it('should be defined', () => {
    expect(componentController).toBeDefined();
  });

  it('should default name to World!', () => {
    expect(componentController.name).toBe('World!');
  });
});
