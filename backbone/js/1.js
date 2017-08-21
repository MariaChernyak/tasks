(function () {
  const app = angular.module('app', []);

  app.controller('appController', function () {
    this.tabs = [
      { title: 'Tab 1', content: 'Hello Tab 1' },
      { title: 'Tab 2', content: 'Hello Tab 2' },
      { title: 'Tab 3', content: 'Hello Tab 3' },
      { title: 'tab 4', content: 'Hello Tab 4' }
    ];
  });

  app.directive('tabs', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: ["$scope", function ($scope) {
        var panes = $scope.panes = [];

        $scope.select = function (pane) {
          angular.forEach(panes, function (pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }

        this.addPane = function (pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      }],
      templateUrl: 'tabs.html',
      replace: true
    };
  });

  app.directive('pane', function () {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function (scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      templateUrl: 'pane.html',
      replace: true
    };
  })

})();






<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>
<div class="tabbable">
  <ul class="nav nav-tabs">
    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
      <a href="" ng-click="select(pane)">{{pane.title}}</a>
    </li>
  </ul>
  <div class="tab-content" ng-transclude></div>
</div>

<body ng-controller="appController as ctrl">
    <h3>Tab Component</h3>
    <tabs>
        <pane ng-repeat="tab in ctrl.tabs" title="{{tab.title}}">
            <div>{{tab.content}}</div>
        </pane>
    </tabs>
</body>





