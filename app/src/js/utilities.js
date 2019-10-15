'use strict';
// Fonction pour récupérer le nom du fichier de l'URL en cours (sans l'extension)
// Ce qui va permettre de mettre en évidence l'onglet actif lors de la navigation
function activeTab() {
    const URL = document.location.href;
    return URL.substring(URL.lastIndexOf('/') + 1, URL.lastIndexOf('.'));
}

/************************************************************/
// equivalent of PHP functions mb_strwidth and mb_strimwidth
(function (ns) {
    /**
     * mb_strwidth
     * @param String
     * @return int
     * @see http://php.net/manual/ja/function.mb-strwidth.php
     */
    var mb_strwidth = function (str) {
        var i = 0, l = str.length, c = '', length = 0;
        for (; i < l; i++) {
            c = str.charCodeAt(i);
            if (0x0000 <= c && c <= 0x0019) {
                length += 0;
            } else if (0x0020 <= c && c <= 0x1FFF) {
                length += 1;
            } else if (0x2000 <= c && c <= 0xFF60) {
                length += 2;
            } else if (0xFF61 <= c && c <= 0xFF9F) {
                length += 1;
            } else if (0xFFA0 <= c) {
                length += 2;
            }
        }
        return length;
    };

    /**
     * mb_strimwidth
     * @param String
     * @param int
     * @param int
     * @param String
     * @return String
     * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
     */
    var mb_strimwidth = function (str, start, width, trimmarker) {
        if (typeof trimmarker === 'undefined') trimmarker = '';
        var trimmakerWidth = mb_strwidth(trimmarker), i = start, l = str.length, trimmedLength = 0, trimmedStr = '';
        for (; i < l; i++) {
            var charCode = str.charCodeAt(i), c = str.charAt(i), charWidth = mb_strwidth(c), next = str.charAt(i + 1),
                nextWidth = mb_strwidth(next);
            trimmedLength += charWidth;
            trimmedStr += c;
            if (trimmedLength + trimmakerWidth + nextWidth > width) {
                trimmedStr += trimmarker;
                break;
            }
        }
        return trimmedStr;
    };
    ns.mb_strwidth = mb_strwidth;
    ns.mb_strimwidth = mb_strimwidth;
})(window);


/************************************************************/
// Smooth Scroll

var html, body, scrollToTopButton;
window.onload = function () {
    html = document.documentElement;
    body = document.body;
    scrollToTopButton = document.getElementById("scroll-to-top-button");
};

function scrollToTop(totalTime, easingPower) {
    var timeInterval = 1; //in ms
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);
    var timeLeft = totalTime;
    var scrollByPixel = setInterval(function () {
        var percentSpent = (totalTime - timeLeft) / totalTime;
        if (timeLeft >= 0) {
            var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
            body.scrollTop = newScrollTop;
            html.scrollTop = newScrollTop;
            //console.log(easeInOut(percentSpent,easingPower));
            timeLeft--;
        } else {
            clearInterval(scrollByPixel);
            //Add hash to the url after scrolling
            //window.location.hash = hash;
        }
    }, timeInterval);
}

function easeInOut(t, power) {
    if (t < 0.5) {
        return 0.5 * Math.pow(2 * t, power);
    } else {
        return 0.5 * (2 - Math.pow(2 * (1 - t), power));
    }
}

window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
    var windowInnerHeight = window.innerHeight;
    if (
        body.scrollTop > windowInnerHeight ||
        html.scrollTop > windowInnerHeight
    ) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}


/************************************************************/

// Fonction qui ecoute le scroll et agit selon qu'il monte ou descende
/*
function onScroll() {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            // downscroll code

        } else {
            // upscroll code
            console.log('ok2');
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}
*/