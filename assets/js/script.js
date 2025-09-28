// Global variables
let allProjects = [];
let currentSlide3 = 0;
let slideInterval3;

// Load projects data from JSON file
async function loadProjectsData() {
    try {
        const response = await fetch('assets/projects.json');
        allProjects = await response.json();
        return allProjects;
    } catch (error) {
        console.error('Error loading projects ', error);
        // Fallback data in case JSON fails to load
        allProjects = [
            {
                title: "Sales Forecasting Model",
                description: "Time series forecasting model using Prophet and ARIMA with 92% accuracy",
                tags: ["Python", "Prophet", "ARIMA", "Pandas"],
                type: "python",
                icon: "fab fa-python"
            },
            {
                title: "Customer Segmentation",
                description: "K-means clustering for customer segmentation based on behavior",
                tags: ["Python", "Scikit-learn", "K-means", "Matplotlib"],
                type: "python",
                icon: "fab fa-python"
            },
            {
                title: "E-commerce Database Design",
                description: "Normalized database schema for e-commerce platform with 15+ tables",
                tags: ["MySQL", "Database Design", "Normalization"],
                type: "sql",
                icon: "fas fa-database"
            }
        ];
        return allProjects;
    }
}

// Contact form submission - NEW FUNCTION
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Your email address
            const toEmail = 'rummanmaidul13@gmail.com';
            
            // Create mailto URL
            const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
        });
    }
}

// 3-item Slider functionality
function createSlider3() {
    const sliderContainer3 = document.getElementById('sliderContainer3');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!sliderContainer3) return;

    sliderContainer3.innerHTML = '';

    // Create all slides
    allProjects.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide-3';
        slide.innerHTML = `
            <div class="slide-img-3 ${project.type}-icon">
                <i class="${project.icon}"></i>
            </div>
            <div class="slide-content-3">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="slide-tags-3">
                    ${project.tags.map(tag => `<span class="slide-tag-3">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        sliderContainer3.appendChild(slide);
    });

    updateSlider3();

    // Event listeners for navigation buttons
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide3);
        prevBtn.addEventListener('click', prevSlide3);
    }

    // Auto slide every 5 seconds
    slideInterval3 = setInterval(nextSlide3, 5000);

    // Pause auto slide when hovering over slider
    const projectsSlider3 = document.querySelector('.projects-slider-3');
    if (projectsSlider3) {
        projectsSlider3.addEventListener('mouseenter', () => {
            clearInterval(slideInterval3);
        });

        projectsSlider3.addEventListener('mouseleave', () => {
            slideInterval3 = setInterval(nextSlide3, 5000);
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlider3();
    });
}

function updateSlider3() {
    const sliderContainer3 = document.getElementById('sliderContainer3');
    if (!sliderContainer3 || sliderContainer3.children.length === 0) return;

    const slideWidth = sliderContainer3.children[0].offsetWidth + 20; // +20 for gap
    const transformValue = -currentSlide3 * slideWidth;
    sliderContainer3.style.transform = `translateX(${transformValue}px)`;
}

function nextSlide3() {
    const totalSlides = allProjects.length;
    const visibleSlides = getVisibleSlides();

    if (currentSlide3 < totalSlides - visibleSlides) {
        currentSlide3++;
    } else {
        currentSlide3 = 0; // Loop back to start
    }
    updateSlider3();
}

function prevSlide3() {
    if (currentSlide3 > 0) {
        currentSlide3--;
    } else {
        const visibleSlides = getVisibleSlides();
        currentSlide3 = Math.max(0, allProjects.length - visibleSlides);
    }
    updateSlider3();
}

function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function () {
    // Load projects data
    await loadProjectsData();

    // Initialize contact form
    initContactForm();

    // Initialize slider if it exists on the page
    const sliderContainer3 = document.getElementById('sliderContainer3');
    if (sliderContainer3) {
        createSlider3();
    }
});