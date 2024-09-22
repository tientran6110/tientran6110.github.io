var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
//   let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
//   let parent = _____WB$wombat$assign$function_____("parent");
//   let frames = _____WB$wombat$assign$function_____("frames");
//   let opener = _____WB$wombat$assign$function_____("opener");

"use strict";

// document is loaded and DOM is ready
document.addEventListener('DOMContentLoaded', function(){
    fetch('editor.txt')
    .then(r => r.text())
    .then(data => {
        let codeBlock = document.querySelector("#entrance-background code");
        codeBlock.textContent = data;
        hljs.highlightElement(codeBlock);
    });

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        try {
            if (!'IntersectionObserver' in window &&
            !'IntersectionObserverEntry' in window &&
            !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
                const script = document.createElement('script');
                script.defer = true;
                script.src = 'js/intersection-observer.js';
                document.head.appendChild(script);
            }
            const script = document.createElement('script');
            script.defer = true;
            script.src = 'js/lazyload.iife.min.js';
            document.head.appendChild(script);
            window.lazyLoadOptions = {
                use_native: true,
                elements_selector: 'img[loading="lazy"]'
            }
        } catch(err) {
            console.log(err);
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    $("body").scrollspy({ target: "#tientran-navbar" });
    /*
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#tientran-navbar'
    })
    */

    document.querySelectorAll('a.email-replace').forEach(elem => {
        elem.href = "mailto:me" + "@" + "tientran.com";
        elem.target = "_blank";
    });

    document.getElementById('entrance-scroll').addEventListener("click", function(event) {
        event = event || window.event;
        event.preventDefault();
        document.getElementById("work").scrollIntoView();
    });

    let dinoClicked = false;
    document.getElementById('dino').addEventListener("click", function(event) {
        event = event || window.event;
        event.preventDefault();

        if (!dinoClicked) {
            dinoClicked = true;
            document.getElementById("dino").style.pointerEvents = "none";
            document.getElementById("dino-tooltip").style.display = "none";
            document.querySelector("#dino > svg").style.fill = "#757575";

            var user_name = '';

            const images = document.querySelectorAll('.dino-lazy');
            images.forEach(img => {
                img.src = img.dataset.src;
            });

            document.body.classList.add("offline");
            document.body.classList.add("main-page");
            document.body.id = "t";

            if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
                document.getElementById('dino-text').textContent = "Tap the dino to begin";
            } else {
                document.getElementById('dino-text').textContent = "Press space to begin";
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/game.css';
            link.media = 'screen';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.defer = true;
            script.src = 'js/game.js';
            document.head.appendChild(script);

            if(self != top) {
                setTimeout(function(){top.location=document.location;}, 30000)
            }

            // Prevent space and up/down arrow keys from scrolling
            window.addEventListener("keydown", function(e) {
                if ((e.key !== undefined && ["ArrowUp", "ArrowDown", "Space"].indexOf(e.code) > -1)
                    || (e.keyCode !== undefined && [32, 38, 40].indexOf(e.keyCode || e.which) > -1)) {
                    e.preventDefault();
                }
            }, false);
        }
    });
});

// page is fully loaded, including all frames, objects and images
window.addEventListener("load", function() {
    const entranceBackground = document.getElementById("entrance-background");
    let codeScroll = 0;
    function ScrollCode() {
        entranceBackground.style.top = codeScroll.toString() + "px";
        if (codeScroll < -10450) {
            codeScroll = window.innerHeight;
        }
        codeScroll -= 1;
    }

    // Intersection observer should've been made available earlier for lazy-loading images
    // window.setInterval(ScrollCode, 25);
    let scrollInterval;
    let observer = new IntersectionObserver((entries, _observer) => {
        if (entries[0].isIntersecting) {
            scrollInterval = window.setInterval(ScrollCode, 25);
        } else {
            window.clearInterval(scrollInterval);
        }
    }, {threshold: 0.1});
    
    if (window.matchMedia('(prefers-reduced-motion: no-preference)')) {
        observer.observe(document.getElementById("entrance"));   
    }

    if (window.location.href.includes("tientran.com")) {
        document.querySelector('#footer-copyright').textContent = `© ${new Date().getFullYear()} tientran tientran`;
    } else {
        document.querySelector('#footer-copyright').textContent = `© ${new Date().getFullYear()} Tien Tran`;
    }

    const ignore_locations = ["127.0.0.1", "localhost", "file:///", ".onion"];
    if (!ignore_locations.some(el => window.location.href.includes(el))) {
        // Plausible
        const script = document.createElement('script');
        script.defer = true;
        if (window.location.hostname.includes("tientran.com")) {
            script.setAttribute('data-domain', 'tientran.com');
        } else {
            script.setAttribute('data-domain', 'tientran.com');
        }
        document.head.appendChild(script);
    }

    oneko();
    let onekoEl = document.getElementById("oneko")
    const onekoToggle = this.document.getElementById("oneko-toggle");
    onekoToggle.onclick = function(event) {
        event.preventDefault();
        if (onekoEl) {
            onekoEl.style.opacity = 0;
            // onekoToggle.style.fill = "rgb(128, 128, 128)";
            setTimeout(function() {
                if (onekoEl) {
                    onekoEl.remove();
                    onekoEl = null;
                }
            }, 700)
        } else {
            oneko();
            onekoEl = document.getElementById("oneko")
            // onekoToggle.style.fill = "rgba(255, 255, 255, 0.75)";
        }
    };
});

// General functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// https://github.com/adryd325/oneko.js
function oneko() {
    const nekoEl = document.createElement("div");
    nekoEl.style.opacity = 0;
    /*
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    */
    // let nekoPosX = 32;
    let nekoPosX = window.innerWidth - 32;
    let nekoPosY = 92;
    // let mousePosX = 0;
    let mousePosX = window.innerWidth;
    let mousePosY = 60;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 13;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };
    function create() {
        nekoEl.id = "oneko";
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "fixed";
        nekoEl.style.backgroundImage = "url('images/oneko.gif')";
        nekoEl.style.imageRendering = "pixelated";
        // nekoEl.style.left = "16px";
        nekoEl.style.left = window.innerWidth - 48 + "px";
        nekoEl.style.top = "76px";

        document.body.appendChild(nekoEl);
        setTimeout(function() {
            nekoEl.style.opacity = 1;
        }, 100)

        document.onmousemove = (event) => {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
        };

        window.onekoInterval = setInterval(frame, 100);
    }

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
            sprite[1] * 32
        }px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            idleAnimation = ["sleeping", "scratch"][
                Math.floor(Math.random() * 2)
            ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratch":
                setSprite("scratch", idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        let direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    create();
}
}