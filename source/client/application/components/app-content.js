const appContent = function () {
  return {
    replace: true,
    template: `
      <main class="content" data-ng-init="init()">

        <div class="content-error" ng-if="error">
          <span class="content-error-card">{{error}}</span>
        </div>

        <div class="content-stack" ng-if="data">
          <div class="content-stack-column">
            <div ng-repeat="row in data.rows track by ('row-micro-' + $index)" class="content-stack-column-card">
              <span ng-repeat="value in row track by ('value-micro-' + $index)">
                <div ng-if="data.headings[$index].type === 'micro'">
                  <span class="content-stack-column-card-label">{{data.headings[$index].name}}:</span>
                  <span class="content-stack-column-card-value">{{value}}</span>
                </div>
              </span>
            </div>
          </div>
          <div class="content-stack-column small">
            <div ng-repeat="row in data.rows track by ('row-small-' + $index)" class="content-stack-column-card">
              <span ng-repeat="value in row track by ('value-small-' + $index)">
                <div ng-if="data.headings[$index].type === 'small'">
                  <span class="content-stack-column-card-label">{{data.headings[$index].name}}:</span>
                  <span class="content-stack-column-card-value">{{value}}</span>
                </div>
              </span>
            </div>
          </div>
        </div>

        <div class="content-table" ng-if="data">
          <div ng-repeat="column in data.cols track by ('column-' + $index)" class="content-table-column {{data.headings[$index].type}}">
            <div class="content-table-column-name">
              {{data.headings[$index].name}}
            </div>
            <div ng-repeat="value in column track by ('value-' + $index)" class="content-table-column-cell">
              {{value}}
            </div>
          </div>
        </div>

      </main>
    `,
    controller: ['$scope', '$http', function ($scope, $http) {
      $scope.init = () => {
        const endpoint = '/api/content'
        const onSuccess = data =>
          $scope.data = data.data
        const onFailure = data =>
          $scope.error = data.data.error
        $http.get(endpoint)
          .then(onSuccess)
          .catch(onFailure)
      }
    }]
  }
}

export default appContent