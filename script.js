document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });

        // Close nav when a link is clicked (for smooth scrolling)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // 2. Hero Section Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = document.querySelectorAll('.hero-carousel .carousel-track img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentIndex = 0;
    const totalImages = carouselImages.length;

    if (carouselTrack && prevBtn && nextBtn && totalImages > 0) {
        // Adjust track width for the number of images
        carouselTrack.style.width = `${totalImages * 100}%`;

        const updateCarousel = () => {
            const offset = -currentIndex * (100 / totalImages);
            carouselTrack.style.transform = `translateX(${offset}%)`;
            // Optional: Add active class to current image for specific styling
            carouselImages.forEach((img, index) => {
                if (index === currentIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Auto-advance carousel
        let autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000); // Change image every 5 seconds

        // Pause auto-slide on hover
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            heroCarousel.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
                    updateCarousel();
                }, 5000);
            });
        }

        updateCarousel(); // Initialize carousel position
    }

    // 3. Active Navigation Link on Scroll (Optional but good for UX)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    const setActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for fixed header
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set active link on initial load

    // 4. Smooth Scrolling for Anchor Links (modern browsers handle this natively with scroll-behavior: smooth;)
    // If you need more control or older browser support, you can uncomment a JS smooth scroll solution here.
    // For now, relying on CSS scroll-behavior: smooth;
});