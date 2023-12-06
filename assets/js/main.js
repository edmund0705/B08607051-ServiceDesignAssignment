/*
    Dimension by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

    var $window = window,
        $body = document.body,
        $wrapper = document.getElementById('wrapper'),
        $header = document.getElementById('header'),
        $footer = document.getElementById('footer'),
        $main = document.getElementById('main'),
        $main_articles = Array.from($main.children);

    // Play initial animations on page load.
    $window.addEventListener('load', function() {
        window.setTimeout(function() {
            $body.classList.remove('is-preload');
        }, 100);
    });

    // Nav.
    var $nav = $header.querySelector('nav'),
        $nav_li = Array.from($nav.querySelectorAll('li'));

    // Add "middle" alignment classes if we're dealing with an even number of items.
    if ($nav_li.length % 2 == 0) {
        $nav.classList.add('use-middle');
        $nav_li[Math.floor($nav_li.length / 2)].classList.add('is-middle');
    }

    // Main.
    var delay = 325,
        locked = false;

    // Methods.
    $main._show = function(id, initial) {
        var $article = $main_articles.filter(function(article) {
            return article.id === id;
        })[0];

        // No such article? Bail.
        if (!$article)
            return;

        // Handle lock.
        if (locked || (typeof initial !== 'undefined' && initial === true)) {
            // (Original locked code here)
            return;
        }

        // Lock.
        locked = true;

        // Article already visible? Just swap articles.
        if ($body.classList.contains('is-article-visible')) {
            // (Original swap code here)
        }
        // Otherwise, handle as normal.
        else {
            // Mark as visible.
            $body.classList.add('is-article-visible');

            // Show article.
            setTimeout(function() {
                // Hide header, footer.
                $header.style.display = 'none';
                $footer.style.display = 'none';

                // Show main, article.
                $main.style.display = 'block';
                $article.style.display = 'block';

                // Activate article.
                setTimeout(function() {
                    $article.classList.add('active');

                    // Window stuff.
                    $window.scrollTo(0, 0);

                    // Unlock.
                    setTimeout(function() {
                        locked = false;
                    }, delay);
                }, 25);
            }, delay);
        }

        // Set current article ID in sessionStorage
        sessionStorage.setItem('currentArticleId', id);
    };

    $main._hide = function(addState) {
        var $article = $main_articles.filter(function(article) {
            return article.classList.contains('active');
        })[0];

        // Article not visible? Bail.
        if (!$body.classList.contains('is-article-visible'))
            return;

        // Add state?
        if (typeof addState !== 'undefined' && addState === true)
            history.pushState(null, null, '#');

        // Handle lock.
        if (locked) {
            // (Original locked code here)
            return;
        }

        // Lock.
        locked = true;

        // Deactivate article.
        $article.classList.remove('active');

        // Hide article.
        setTimeout(function() {
            // Hide article, main.
            $article.style.display = 'none';
            $main.style.display = 'none';

            // Show footer, header.
            $footer.style.display = 'flex';
            $header.style.display = 'flex';

            // Mark as hidden.
            $body.classList.remove('is-article-visible');

            // Unlock.
            setTimeout(function() {
                locked = false;
            }, delay);
        }, delay);

        // 在 $main._hide 方法中，隱藏文章之前，刪除 sessionStorage 存儲的文章 ID
        sessionStorage.removeItem('currentArticleId');
    };

    // Articles.
    $main_articles.forEach(function(article) {

        // Close.
        var closeDiv = document.createElement('div');
        closeDiv.className = 'close';
        closeDiv.textContent = 'Close';
        closeDiv.addEventListener('click', function() {
            location.hash = '';
        });
        article.appendChild(closeDiv);

        // Prevent clicks from inside article from bubbling.
        article.addEventListener('click', function(event) {
            event.stopPropagation();
        });

    });

    // Events.
    $body.addEventListener('click', function(event) {
        // Article visible? Hide.
        if ($body.classList.contains('is-article-visible'))
            $main._hide(true);
    });

    $window.addEventListener('keyup', function(event) {
        switch (event.keyCode) {
            case 27: // Escape key
                // Article visible? Hide.
                if ($body.classList.contains('is-article-visible'))
                    $main._hide();
                break;

            default:
                break;
        }
    });
  


    $window.addEventListener('hashchange', function(event) {
        // Empty hash?
        if (location.hash == '' || location.hash == '#') {
            // Prevent default.
            event.preventDefault();
            event.stopPropagation();

            // Hide.
            if ($body.classList.contains('is-article-visible'))
                $main._hide();
        }
        // Otherwise, check for a matching article.
        else if ($main_articles.filter(function(article) {
                return article.id === location.hash.substr(1);
            }).length > 0) {
            // Prevent default.
            event.preventDefault();
            event.stopPropagation();

            // Show article.
            $main._show(location.hash.substr(1));
        }
    });

    // Initialize.

    // Hide main, articles.
    $main.style.display = 'none';
    $main_articles.forEach(function(article) {
        article.style.display = 'none';
    });

    // Get current article ID from sessionStorage
    function getCurrentArticleIdFromSessionStorage() {
        return sessionStorage.getItem('currentArticleId');
    }

    // Initial article.
    var initialArticleId = getCurrentArticleIdFromSessionStorage();
    if (initialArticleId) {
        $window.addEventListener('load', function() {
            $main._show(initialArticleId, true);
        });
    } else if (location.hash != '' && location.hash != '#') {
        $window.addEventListener('load', function() {
            $main._show(location.hash.substr(1), true);
        });
    }
    // if (location.hash != '' && location.hash != '#') {
    //     $window.addEventListener('load', function() {
    //         $main._show(location.hash.substr(1), true);
    //     });
    // }

    
})();



document.addEventListener("DOMContentLoaded", function () {
    // 其他初始化代碼...
  
    // 選擇表單元素
    var contactForm = document.getElementById("contact-form");
  
    // 添加表單提交事件監聽器
    contactForm.addEventListener("submit", function (event) {
      // 檢查表單字段是否已填寫
      var nameInput = contactForm.elements["name"];
      var emailInput = contactForm.elements["email"];
      var messageInput = contactForm.elements["message"];
  
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        event.preventDefault(); // 防止表單默認提交行為
        alert("需把格子填完");
        return;
      }
  
      event.preventDefault(); // 防止表單默認提交行為
  
      // 在這裡執行您的表單提交邏輯，例如使用 AJAX 提交表單數據
  
      // 重置表單（可選）
      contactForm.reset();
  
      // 顯示成功消息（可選）
      alert("Your message has been sent!");
    });
  
    // 其他初始化代碼...

});

  