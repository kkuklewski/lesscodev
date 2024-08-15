document.addEventListener('DOMContentLoaded', function () {
    let lottieContainer = document.querySelectorAll('.animation');

    if (lottieContainer) {
        LottieScrollTrigger({
            trigger: '.animation',
            start: 'top center',
            endTrigger: '.end-lottie',
            end: `bottom center+=${document.querySelector('.animation').offsetHeight
                }`,
            renderer: 'svg',
            target: '.animation',
            path: './hero-lottie.json',
            scrub: 2,
        });
    }
});

function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 };
    target = gsap.utils.toArray(vars.target)[0];
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" };
    st = {
        trigger: ".trigger", // Assuming you have an element with class 'trigger'
        end: speeds[vars.speed] || "+=1000", // Default to 'medium' speed if not provided
        scrub: 1,
        markers: false,
    };

    ctx = gsap.context && gsap.context();
    animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg", // Default to 'svg' renderer 
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || {
            preserveAspectRatio: 'xMiDYMid slice',
        },
    });

    for (let p in vars) {
        st[p] = vars[p]
    }

    animation.addEventListener("DOMLoaded", function () {
        let createTween = function () {
            animation.frameTween = gsap.to(playhead, {
                frame: animation.totalFrames - 1,
                ease: "none",
                onUpdate: () => animation.goToAndStop(playhead.frame, true),
                scrollTrigger: st,
            });
            return () => animation.destroy && animation.destroy();
        };

        ctx && ctx.add ? ctx.add(createTween) : createTween();
    });

    return animation;

    // ... rest of your code that uses animation, ctx, etc. 
}

// smooth scroll

const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)