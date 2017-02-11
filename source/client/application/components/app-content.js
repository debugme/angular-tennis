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
            <div class="content-grid-cell" ng-repeat="name in data.names">{{name}}</div>
          </div>
          <div class="content-grid-row" ng-repeat="row in data.rows track by ($index)">
            <div class="content-grid-cell" ng-repeat="value in row track by ($parent.$index + $index)">{{value}}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th ng-repeat="name in data.names">{{name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="row in data.rows track by ($index)">
              <td ng-repeat="value in row track by ($parent.$index + $index)">{{value}}</td>
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