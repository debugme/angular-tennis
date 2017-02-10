const appContent = function(){
  return {
    replace: true,
    template: `
      <main class="content" data-ng-init="init()">
        <div>{{data}}</div>
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