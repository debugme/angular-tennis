const formatData = table => {
  return table
}



const appContent = function(){
  return {
    replace: true,
    template: `
      <main class="content" data-ng-init="init()">

        <div class="content-stack">
          <div class="content-stack-column">
            <div ng-repeat="row in data.rows track by ('row-micro-' + $index)" class="content-stack-column-card">
              <span ng-repeat="value in row track by ('value-micro-' + $index)">
                <span ng-if="data.headings[$index].type === 'micro'">
                {{value}}
                </span>
              </span>
            </div>
          </div>
          <div class="content-stack-column small">
            <div ng-repeat="row in data.rows track by ('row-small-' + $index)" class="content-stack-column-card">
              <span ng-repeat="value in row track by ('value-small-' + $index)">
                <span ng-if="data.headings[$index].type === 'small'">
                {{value}}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="content-table">
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
    controller: function($scope, $http) {
      $scope.init = () => {
        const endpoint = '/api/content'
        const onSuccess = data => {
          $scope.data = data.data
        }
        const onFailure = data => {
          $scope.data = `Error: ${data.data}`
        }
        $http.get(endpoint)
          .then(onSuccess)
          .catch(onFailure)
      }
    },

  }
}

export default appContent