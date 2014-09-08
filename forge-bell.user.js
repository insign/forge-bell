// ==UserScript==
// @name       Forge Bell
// @namespace  https://github.com/insign/forge-bell
// @version    0.1
// @description  Ring a bell when the deployment process of the laravel forge when ready
// @match      https://forge.laravel.com/*
// @require      https://cdn.jsdelivr.net/audio5js/0.1.7/audio5.min.js
// @copyright  Hélio <insign@gmail.com> (Mozilla License 2)
// @grant unsafeWindow
// ==/UserScript==

var uW = unsafeWindow;

var
    fb_dbutton,
    fb_dtimer,
    fb_dstatus = 'waiting',
    $          = jQuery
    ;



uW.fb_on = new Audio5js({
  ready: function () {
    this.load('https://insign.github.io/forge-bell/sounds/on.wav');
  }
});

uW.fb_off = new Audio5js({
  ready: function () {
    this.load('https://insign.github.io/forge-bell/sounds/off.wav');
  }
});
console.info(unsafeWindow.fb_on);
$(document).ready(function ($) {
  console.info('Forge Bell - STARTED');

  fb_dtimer = setInterval(function () {
    fg_check()
  }, 200);
  
  uW.fb_on();
  uW.fb_off();
});

function fg_check() {
  fb_dbutton = $('[ng-click="deploySite()"]');

  if (fb_dstatus != 'waiting' && fb_dbutton.is(':contains("Deploy Now")')) {
    if (fb_dstatus == 'deploying') {
      uW.fb_off.play();
    }
    
    fb_dstatus = 'waiting';
    console.info('Forge Bell - Just waiting');
  }
  else if (fb_dstatus != 'queued' && fb_dbutton.is(':contains("Queued")')) {
    fb_dstatus = 'queued';
    console.info('Forge Bell - Preparing for deployment');
    
    uW.fb_on.play();
  }
  else if (fb_dstatus != 'deploying' && fb_dbutton.is(':contains("Deploying")')) {
    fb_dstatus = 'deploying';
    console.info('Forge Bell - Deploying now!');
  }
}