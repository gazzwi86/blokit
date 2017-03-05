'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
  var redirectSite = 'https://www.facebook.com/stopfundinghate/';
  var delay = 5000;
  var urls;
  var features;
  var featureSettings = { fb: true, google: true, redirect: true, warnings: true };
  var settings = { features: featureSettings, urls: [] };

  // get the enabled features and run accordingly
  chrome.storage.sync.get(settings, function (items) {
    urls = items.urls;
    features = items.features;

    if (features.fb) {
      setTimeout(function () {
        facebook();
      }, delay);
    }

    if (features.google) {
      setTimeout(function () {
        google();
      }, delay);
    }

    if (features.redirect) {
      redirect();
    }

    if (features.warnings) {
      warnings();
    }
  });

  function facebook() {
    var host = location.href;

    if (host.match('http://facebook.') || host.match('https://facebook.') || host.match('http://www.facebook.') || host.match('https://www.facebook.')) {
      // get all the regular links
      var elms = document.querySelectorAll('.fbUserContent');

      // loop all the elements
      Array.prototype.forEach.call(elms, function (elm) {
        var linkElms = elm.querySelectorAll('a');

        for (var i = 0, len = linkElms.length; i < len; i++) {
          for (var k = 0, lenk = urls.length; k < lenk; k++) {
            var potential_match = getParams(linkElms[i].href.split('?')[1]).u;
            if (potential_match && potential_match.match(urls[k]) && elm.parentNode || linkElms[i] && elm && urls[k] && linkElms[i].href.match(urls[k]) && elm.parentNode) {
              elm.parentNode.removeChild(elm);
            }
          }
        }
      });
    }
  }

  // remove links from google results
  function google() {
    var host = location.href;

    if (host.match('http://google.') || host.match('https://google.') || host.match('http://www.google.') || host.match('https://www.google.')) {
      // get all the regular links
      var els = document.querySelectorAll('div.g');

      // loop all the elements
      Array.prototype.forEach.call(els, function (el) {
        var link = el.querySelector('.r > a');

        // loop all the urls we block and remove from results
        for (var i = 0, len = urls.length; i < len; i++) {
          if (link && el && urls[i] && link.href.match(urls[i])) {
            el.parentNode.removeChild(el);
          }
        }
      });

      // get all the card links
      var par = document.getElementById('rso');
      if (par) {
        var els = par.querySelectorAll('ul > li');

        // loop all the elements
        Array.prototype.forEach.call(els, function (el) {
          var link = el.querySelector('a');

          // loop all the urls we block and remove from results
          for (var i = 0, len = urls.length; i < len; i++) {
            if (link && el && urls[i] && link.href.match(urls[i]) && el.parentNode) {
              el.parentNode.removeChild(el);
            }
          }
        });
      }
    }
  }

  // redirect away from sites
  function redirect() {
    var reg_exp;
    var host = location.href;

    for (var i = 0, len = urls.length; i < len; i++) {
      reg_exp = '^.*' + urls[i] + '.*$';

      if (host.match(reg_exp)) {
        window.location = redirectSite;
        break;
      }
    }
  }

  // fire a warning if you are going to a banned site
  function warnings() {
    var body = document.body;
    var links = body.querySelectorAll('a');

    Array.prototype.forEach.call(links, function (link) {
      // loop all the urls we block and remove from results
      var len = urls.length;
      for (var i = 0; i < len; i++) {
        if (link && body && urls[i] && link.href.match(urls[i])) {
          link.href = redirectSite;
        }
      }
    });
  }

  function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {}
    return el;
  }

  var getParams = function getParams(query) {
    if (!query) {
      return {};
    }

    return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
      var _param$split = param.split('='),
          _param$split2 = _slicedToArray(_param$split, 2),
          key = _param$split2[0],
          value = _param$split2[1];

      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
  };

  // replace images of donald trump
  // var imgs = document.querySelectorAll('img');
  // if () {

  // }

  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'http://www.google.com/searchbyimage?hl=en&image_url=http://www.calbuzz.com/wp-content/uploads/donaldtrump61815.jpg');
  // xhr.onload = function() {
  //   if (xhr.status === 200) {
  //       var text = xhr.responseText.match(/Best guess for this image:[^<]+<a[^>]+>([^<]+)/);
  //       var div = document.createElement('div');
  //       div.innerHTML = text;
  //       var elms = div.childNodes;
  //       if (elms[1].innerText.match('trump')) {

  //       }
  //   } else {
  //       alert('Request failed.  Returned status of ' + xhr.status);
  //   }
  // };
  // xhr.send();
})();