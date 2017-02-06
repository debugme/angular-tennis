import angular from 'angular'

import appHeader from 'AppHeader'
import appContent from 'AppContent'
import appFooter from 'AppFooter'

import 'GeneralStyle'
import 'LayoutStyle'
import 'ResponsiveStyle'

var application = angular.module('application', []);

application.directive('appHeader', appHeader)
application.directive('appContent', appContent)
application.directive('appFooter', appFooter)
