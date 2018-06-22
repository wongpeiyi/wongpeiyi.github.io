'use strict';
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
  return Array.from(e);
}
!(function () {
  function o() {
    var e;
    (e = window.mixpanel).track.apply(e, arguments);
  }
  var e,
    r = {
      mfgfm: { template: 'mfgfm' },
      playinc: { template: 'video' },
      ticketmobile: { template: 'video' },
      nbe: { template: 'video' }
    },
    i = {
      video: function (e) {
        return '\n      <video src="vid/' + e.selector + '.mp4" controls></video>\n    ';
      },
      mfgfm: function () {
        return '\n      <iframe src="mfgfm/index.html"></iframe>\n      <div class="lds-dual-ring"></div>\n    ';
      }
    },
    c = !1,
    n = ['mfgfm', 'playinc', 'ticketmobile', 'nbe'];
  function a() {
    var t = document.querySelector('.modal');
    (c = !1),
      t.classList.remove('modal_show'),
      setTimeout(function () {
        var e;
        c ||
          ((document.querySelector('.modal__body').innerHTML = ''),
          (e = t.classList).remove.apply(
            e,
            _toConsumableArray(
              n.map(function (e) {
                return 'modal_' + e;
              })
            )
          ));
      }, 150);
  }
  function t() {
    n.forEach(function (e) {
      return document.querySelector('.' + e + ' .btn').addEventListener('click', function () {
        return (function (e) {
          var t = r[e].template;
          if (
            ((document.querySelector('.modal__body').innerHTML = i[t]({ selector: e })),
            document.querySelector('.modal').classList.add('modal_show', 'modal_' + e),
            'video' === t)
          ) {
            var n = document.querySelector('.modal__body video');
            n.addEventListener('webkitendfullscreen', function () {
              document.fullScreenElement ||
                1 == document.webkitIsFullScreen ||
                document.mozFullScreen ||
                document.msFullscreenElement ||
                a();
            }),
              setTimeout(function () {
                n && n.play();
              }, 1e3);
          }
          (c = !0), o('Opened modal: ' + e);
        })(e);
      });
    });
  }
  (e = function () {
    !(function () {
      var e = document.querySelector('#email');
      e.insertAdjacentHTML('beforebegin', ' at '),
        (e.href = 'mailto://wongpeiyi@gmail.com'),
        (e.innerText = 'wongpeiyi@gmail.com');
    })(),
      (function () {
        var e = document.querySelector('.prosper-inner img:last-child');
        if (e) {
          var t = !1;
          setInterval(function () {
            (t = !t) ? e.classList.add('toggled') : e.classList.remove('toggled');
          }, 5500);
        }
      })(),
      (function () {
        var e = document.querySelector('.novi-admin');
        if (e) {
          var t = !1;
          setInterval(function () {
            if (e.classList.contains('novi-admin_3')) {
              e.classList.remove('novi-admin_3');
            } else if (e.classList.contains('novi-admin_2')) {
              e.classList.remove('novi-admin_2');
              e.classList.add('novi-admin_3');
            } else {
              e.classList.add('novi-admin_2');
            }
          }, 5500);
        }
      })(),
      document.querySelector('.modal__overlay').addEventListener('click', function () {
        return a();
      }),
      t(),
      o('Visited');
  }),
    (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState)
      ? e()
      : document.addEventListener('DOMContentLoaded', e);
})();
