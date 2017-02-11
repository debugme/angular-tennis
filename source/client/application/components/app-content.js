const formatData = table => {
  return table
}

const appContent = function(){
  return {
    replace: true,
    template: `
      <main class="content" data-ng-init="init()">

        <div class="content-grid">
          <div class="content-grid-row">
            <div class="content-grid-cell" ng-repeat="value in data[0]">{{value}}</div>
          </div>
          <div class="content-grid-row" ng-repeat="row in data.slice(1) track by ($index)">
            <div class="content-grid-cell" ng-repeat="value in row track by ($parent.$index + $index)">{{value}}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th ng-repeat="header in data[0]">{{header}}</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="row in data.slice(1) track by ($index)">
              <td ng-repeat="cell in row track by ($parent.$index + $index)">{{cell}}</td>
            </tr>
          </tbody>
        </table>
      </main>
    `,
    controller: function($scope, $http) {
      $scope.init = function() {
        const endpoint = '/api/content'
        const onSuccess = data => $scope.data = data.data
        const onFailure = data => $scope.data = `Error: ${data.data}`
        $http.get(endpoint)
          .then(onSuccess)
          .catch(onFailure)
      }
    },

  }
}

export default appContent