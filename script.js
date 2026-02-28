document.addEventListener('DOMContentLoaded', () => {
    // Spotlight effect for cards
    const cards = document.querySelectorAll('.card');

    document.body.addEventListener('mousemove', (e) => {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // Intersection Observer for Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active to current
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav ul li a[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Force highlight "About" on load if we are at the top
    window.addEventListener('scroll', () => {
        // Highlight About at the very top
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const aboutLink = document.querySelector('nav ul li a[href="#about"]');
            if (aboutLink) aboutLink.classList.add('active');
        }

        // Highlight the last section if we're at the very bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const lastLink = navLinks[navLinks.length - 1];
            if (lastLink) lastLink.classList.add('active');
        }
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('.card, .section-title, .text-body');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });
});
