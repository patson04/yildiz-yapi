/* =========================
   SAYFA DEĞİŞTİRME
========================= */

function sayfaGoster(sayfaId) {

    const sayfalar =
        document.querySelectorAll(".page");


    sayfalar.forEach(function(sayfa) {

        sayfa.classList.remove("active");

    });


    const secilenSayfa =
        document.getElementById(sayfaId);


    if (!secilenSayfa) {
        return;
    }


    secilenSayfa.classList.add("active");


    menuKapat();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Yeni açılan sayfadaki animasyonları tekrar başlat */

    setTimeout(function() {

        const yeniAnimasyonlar =
            secilenSayfa.querySelectorAll(".reveal");


        yeniAnimasyonlar.forEach(function(element, index) {

            setTimeout(function() {

                element.classList.add("show");

            }, index * 70);

        });

    }, 100);

}


/* =========================
   HAMBURGER MENÜ
========================= */

function menuAcKapat() {

    const menu =
        document.getElementById("menu");

    const menuBtn =
        document.querySelector(".menu-btn");


    if (!menu || !menuBtn) {
        return;
    }


    menu.classList.toggle("active");


    const acikMi =
        menu.classList.contains("active");


    menuBtn.setAttribute(
        "aria-expanded",
        acikMi ? "true" : "false"
    );

}


/* =========================
   MENÜ KAPAT
========================= */

function menuKapat() {

    const menu =
        document.getElementById("menu");

    const menuBtn =
        document.querySelector(".menu-btn");


    if (!menu || !menuBtn) {
        return;
    }


    menu.classList.remove("active");


    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================
   FOTOĞRAFLARI BÜYÜT
   PROJE + HAKKIMIZDA
========================= */

function fotografModalAc(fotograf) {

    const imageModal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");


    if (!fotograf || !imageModal || !modalImage) {
        return;
    }


    modalImage.src = fotograf.currentSrc || fotograf.src;

    modalImage.alt =
        fotograf.alt || "Büyük görsel";


    imageModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================
   FOTOĞRAF TIKLAMA
========================= */

document.addEventListener("click", function(event) {

    const proje =
        event.target.closest(".project");


    const hakkimizda =
        event.target.closest(".about-image");


    if (proje) {

        const fotograf =
            proje.querySelector("img");


        if (fotograf) {

            fotografModalAc(fotograf);

        }


        return;

    }


    if (hakkimizda) {

        const fotograf =
            hakkimizda.querySelector("img");


        if (fotograf) {

            fotografModalAc(fotograf);

        }

    }

});


/* =========================
   MODAL KAPAT
========================= */

function modalKapat() {

    const imageModal =
        document.getElementById("imageModal");


    if (!imageModal) {
        return;
    }


    imageModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   FOTOĞRAF DIŞINA TIKLAMA
========================= */

document.addEventListener("click", function(event) {

    const imageModal =
        document.getElementById("imageModal");


    if (!imageModal) {
        return;
    }


    if (event.target === imageModal) {

        modalKapat();

    }

});


/* =========================
   ESC TUŞU
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        modalKapat();

    }

});


/* =========================
   MOUSE IŞIĞI
========================= */

function mouseGlowEkle() {

    const kartlar =
        document.querySelectorAll(
            ".service-card, .project, .contact-card"
        );


    kartlar.forEach(function(kart) {

        kart.addEventListener(
            "mousemove",
            function(event) {

                if (window.innerWidth <= 900) {
                    return;
                }


                const rect =
                    kart.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                kart.style.setProperty(
                    "--mouse-x",
                    x + "px"
                );

                kart.style.setProperty(
                    "--mouse-y",
                    y + "px"
                );

            }
        );

    });

}


/* =========================
   3D TILT
========================= */

function tiltEfektiEkle() {

    const kartlar =
        document.querySelectorAll(".tilt-card");


    kartlar.forEach(function(kart) {

        kart.addEventListener(
            "mousemove",
            function(event) {

                if (window.innerWidth <= 900) {
                    return;
                }


                const rect =
                    kart.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -5;


                const rotateY =
                    ((x - centerX) / centerX) * 5;


                kart.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-3px)`;

            }
        );


        kart.addEventListener(
            "mouseleave",
            function() {

                kart.style.transform = "";

            }
        );

    });

}


/* =========================
   HAKKIMIZDA FOTOĞRAF
   3D HAREKET
========================= */

function aboutFotoEfekti() {

    const fotoAlan =
        document.querySelector(".about-images");


    if (!fotoAlan) {
        return;
    }


    fotoAlan.addEventListener(
        "mousemove",
        function(event) {

            if (window.innerWidth <= 900) {
                return;
            }


            const rect =
                fotoAlan.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            const birinci =
                fotoAlan.querySelector(".image-one");

            const ikinci =
                fotoAlan.querySelector(".image-two");


            if (!birinci || !ikinci) {
                return;
            }


            birinci.style.transform =
                `translate(${x * 12}px, ${y * 12}px)
                 rotateY(${x * 4}deg)`;


            ikinci.style.transform =
                `translate(${x * -10}px, ${y * -10}px)
                 rotateY(${x * -4}deg)`;

        }
    );


    fotoAlan.addEventListener(
        "mouseleave",
        function() {

            const birinci =
                fotoAlan.querySelector(".image-one");

            const ikinci =
                fotoAlan.querySelector(".image-two");


            if (birinci) {
                birinci.style.transform = "";
            }


            if (ikinci) {
                ikinci.style.transform = "";
            }

        }
    );

}


/* =========================
   HERO PARALLAX
========================= */

function heroParallax() {

    const hero =
        document.querySelector(".hero");


    if (!hero) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        function(event) {

            if (window.innerWidth <= 900) {
                return;
            }


            const rect =
                hero.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            const decorationOne =
                document.querySelector(".decoration-one");

            const decorationTwo =
                document.querySelector(".decoration-two");

            const decorationThree =
                document.querySelector(".decoration-three");


            if (
                !decorationOne ||
                !decorationTwo ||
                !decorationThree
            ) {
                return;
            }


            decorationOne.style.transform =
                `translate(${x * 18}px, ${y * 18}px)
                 rotate(45deg)`;


            decorationTwo.style.transform =
                `translate(${x * -12}px, ${y * -12}px)
                 rotate(45deg)`;


            decorationThree.style.transform =
                `translate(${x * 25}px, ${y * 25}px)
                 rotate(45deg)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        function() {

            const decorationOne =
                document.querySelector(".decoration-one");

            const decorationTwo =
                document.querySelector(".decoration-two");

            const decorationThree =
                document.querySelector(".decoration-three");


            if (decorationOne) {
                decorationOne.style.transform =
                    "rotate(45deg)";
            }


            if (decorationTwo) {
                decorationTwo.style.transform =
                    "rotate(45deg)";
            }


            if (decorationThree) {
                decorationThree.style.transform =
                    "rotate(45deg)";
            }

        }
    );

}


/* =========================
   SCROLL REVEAL
========================= */

function scrollAnimasyonlariniBaslat() {

    const elemanlar =
        document.querySelectorAll(".reveal");


    if (!("IntersectionObserver" in window)) {

        elemanlar.forEach(function(element) {

            element.classList.add("show");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            function(entries, observer) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elemanlar.forEach(function(element) {

        observer.observe(element);

    });

}


/* =========================
   NAVBAR SCROLL
========================= */

function navbarScrollEfekti() {

    const navbar =
        document.getElementById("navbar");


    if (!navbar) {
        return;
    }


    window.addEventListener(
        "scroll",
        function() {

            if (window.scrollY > 40) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        }
    );

}


/* =========================
   PENCERE BOYUTU
========================= */

window.addEventListener(
    "resize",
    function() {

        if (window.innerWidth > 900) {

            menuKapat();

        }

    }
);


/* =========================
   SAYFA İLK AÇILIŞ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        sayfaGoster("anasayfa");

        mouseGlowEkle();

        tiltEfektiEkle();

        aboutFotoEfekti();

        heroParallax();

        scrollAnimasyonlariniBaslat();

        navbarScrollEfekti();

    }
);