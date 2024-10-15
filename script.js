const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

function firstPageAnim() {
    var t1 = gsap.timeline();

    t1.from("#nav-bar", {
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
        // Animate the heading elements
        .from("#home-me-right h1", {
            y: '50',
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
            stagger: 0.3
        })
        .from("#home-me-right h5", {
            y: '50',
            opacity: 0,
            duration: 1,
            ease: Expo.easeInOut,
            stagger: 0.3
        });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(
            "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

function circleChaptaKaro() {
    // Define default scale value
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    var timeout; // Declare the timeout variable

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector(
                "#minicircle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

circleChaptaKaro();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-10, 10, diffrot * 0.5),
        });
    });
});