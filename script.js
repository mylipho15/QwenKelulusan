/* ===================================
   JAVASCRIPT - GALERI FOTO SEKOLAH
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // CONFIGURATION - GALLERY DATA
    // ===================================
    const galleryConfig = {
        'sl-mockup': {
            folder: '01_Suntik-Intro',
            start: 1,
            end: 23,
            prefix: '01_Suntik-Intro_'
        },
        'sl-pembukaan': {
            folder: '02_Suntik-Pembukaan',
            start: 1,
            end: 64,
            prefix: '02_Suntik-Pembukaan_'
        },
        'sl-prosesi': {
            folder: '03_Suntik-AngkatSumpah',
            start: 1,
            end: 36,
            prefix: '03_Suntik-AngkatSumpah_'
        },
        'sl-raport': {
            folder: '04_Suntik-PembRaportKalung',
            start: 1,
            end: 98,
            prefix: '04_Suntik-PembRaportKalung_'
        },
        'sl-penutupan': {
            folder: '05_Suntik-Penutup',
            start: 1,
            end: 31,
            prefix: '05_Suntik-Penutup_'
        },
        'sl-foto': {
            folder: '06_Suntik-FotoBersama',
            start: 1,
            end: 16,
            prefix: '06_Suntik-FotoBersama_'
        },
        'sl-penampilan': {
            folder: '07_Suntik-SiswaJurusanTerbaik',
            start: 1,
            end: 18,
            prefix: '07_Suntik-SiswaJurusanTerbaik_'
        },
        'pt-pembukaan': {
            folder: '08_Paturay-Pembukaan',
            start: 1,
            end: 24,
            prefix: '08_Paturay-Pembukaan_'
        },
        'pt-puisi': {
            folder: '09_Paturay-PenPuisi',
            start: 1,
            end: 41,
            prefix: '09_Paturay-PenPuisi_'
        },
        'pt-sungkem': {
            folder: '10_Paturay-Kadedeuh',
            start: 1,
            end: 58,
            prefix: '10_Paturay-Kadedeuh_'
        },
        'pt-purna': {
            folder: '11_Paturay-PurnaTugas',
            start: 1,
            end: 104,
            prefix: '11_Paturay-PurnaTugas_'
        },
        'pt-penghargaan': {
            folder: '12_Paturay-PenghargaanSiswa',
            start: 1,
            end: 30,
            prefix: '12_Paturay-PenghargaanSiswa_'
        },
        'pt-pelepasan': {
            folder: '13_Paturay-Pelepasan',
            start: 1,
            end: 61,
            prefix: '13_Paturay-Pelepasan_'
        },
        'pt-kelas-x': {
            folder: '14_Paturay-PenampilanX',
            start: 1,
            end: 50,
            prefix: '14_Paturay-PenampilanX_'
        },
        'pt-penutupan': {
            folder: '15_Paturay-Penutupan',
            start: 1,
            end: 33,
            prefix: '15_Paturay-Penutupan_'
        }
    };

    // ===================================
    // NAVIGATION FUNCTIONALITY
    // ===================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Active navigation highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // LIGHTBOX FUNCTIONALITY
    // ===================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        if (currentImages.length > 0) {
            lightboxImage.src = currentImages[currentIndex].src;
            lightboxCaption.textContent = currentImages[currentIndex].caption || `Foto ${currentIndex + 1}`;
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        }
    }

    function showPrevious() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    }

    function showNext() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevious);
    lightboxNext.addEventListener('click', showNext);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevious();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    // ===================================
    // LOAD GALLERY IMAGES
    // ===================================
    function loadGalleryImages() {
        Object.keys(galleryConfig).forEach(category => {
            const grid = document.querySelector(`[data-category="${category}"]`);
            if (!grid) return;

            const config = galleryConfig[category];
            const placeholder = grid.querySelector('.placeholder-message');
            
            // Clear placeholder if exists
            if (placeholder) {
                placeholder.remove();
            }

            // Generate image elements
            for (let i = config.start; i <= config.end; i++) {
                const paddedNumber = String(i).padStart(2, '0');
                const imageName = `${config.prefix}${paddedNumber}.jpg`;
                const imagePath = `./images/${config.folder}/${imageName}`;

                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item fade-in';
                galleryItem.style.animationDelay = `${(i - config.start) * 0.05}s`;

                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Foto ${i}`;
                img.loading = 'lazy';
                
                // Handle image load error
                img.onerror = function() {
                    this.parentElement.style.display = 'none';
                };

                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.innerHTML = `<p>Foto ${i}</p>`;

                galleryItem.appendChild(img);
                galleryItem.appendChild(overlay);
                grid.appendChild(galleryItem);

                // Add click event for lightbox
                galleryItem.addEventListener('click', function() {
                    const images = Array.from(grid.querySelectorAll('.gallery-item img'))
                        .map(img => ({
                            src: img.src,
                            caption: img.alt
                        }));
                    const index = Array.from(grid.querySelectorAll('.gallery-item')).indexOf(galleryItem);
                    openLightbox(images, index);
                });
            }
        });
    }

    // Load gallery images on page load
    loadGalleryImages();

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        observer.observe(section);
    });

    // ===================================
    // PARALLAX EFFECT FOR BACKGROUND
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.bg-animation .circle');
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.05;
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // LAZY LOADING OPTIMIZATION
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // PRELOADER (Optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add animation to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    });

    // ===================================
    // TOUCH SWIPE SUPPORT FOR LIGHTBOX
    // ===================================
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                showNext();
            } else {
                // Swipe right - previous image
                showPrevious();
            }
        }
    }

    // ===================================
    // CONSOLE LOG FOR DEBUGGING
    // ===================================
    console.log('%c🎓 SMKS Kesehatan SDM Sumedang - Galeri Foto', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cGaleri foto interaktif dengan tema Glassmorphism', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cTotal kategori galeri:', 'color: #ec4899;', Object.keys(galleryConfig).length);
    console.log('%cSilakan tambahkan file foto ke folder ./images/', 'color: #4facfe; font-style: italic;');

});
