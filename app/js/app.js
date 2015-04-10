/*!
 * Webogram v0.4.2 - messaging web application for MTProto
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'mediaPlayer',
  'izhukov.utils',
  'izhukov.mtproto',
  'izhukov.mtproto.wrapper',
  'myApp.filters',
  'myApp.services',
  /*PRODUCTION_ONLY_BEGIN
  'myApp.templates',
  PRODUCTION_ONLY_END*/
  'myApp.directives',
  'myApp.controllers', 
  'hc.marked'
]).
config(['$locationProvider', '$routeProvider', '$compileProvider', 'StorageProvider', 'markedProvider', function($locationProvider, $routeProvider, $compileProvider, StorageProvider, markedProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|filesystem|chrome-extension|app):|data:image\//);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|mailto|blob|filesystem|chrome-extension|app):|data:/);

  if (Config.Modes.test) {
    StorageProvider.setPrefix('t_');
  }

  $routeProvider.when('/', {templateUrl: templateUrl('welcome'), controller: 'AppWelcomeController'});
  $routeProvider.when('/login', {templateUrl: templateUrl('login'), controller: 'AppLoginController'});
  $routeProvider.when('/im', {templateUrl: templateUrl('im'), controller: 'AppIMController', reloadOnSearch: false});
  $routeProvider.otherwise({redirectTo: '/'});

  // Fixing the enclosing <p> issue 
  // https://github.com/chjj/marked/issues/576
  var markedRenderer = new marked.Renderer() ;
  markedRenderer.paragraph = function(text) {
    return text + '\n';
  };
  markedRenderer.link = function(href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (e) {
        return '';
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        return '';
      }
    }
    var out = '<a href="' + href + '" target="_blank"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };


  markedProvider.setOptions({
    renderer: markedRenderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
  });
}]);
