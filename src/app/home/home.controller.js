class HomeController {
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;
  }

  $onInit() {
    this.name = 'World!';
  }
}

export default HomeController;
