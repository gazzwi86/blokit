'use strict';

chrome.runtime.onInstalled.addListener(function (e) {
  console.log('previousVersion', e.previousVersion);
});

// chrome.browserAction.setBadgeText({ text: 'Blok It' });