// script.js

// 1. Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// 2. Project Filter & Load More Logic (Combined)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const itemsPerPage = 6; // প্রথমে কয়টি প্রজেক্ট দেখাবে
let currentFilter = 'all';
let visibleCount = itemsPerPage;

// মূল ফাংশন যা ফিল্টার এবং লোড মোর দুটোই কন্ট্রোল করবে
function updateProjects() {
    let visibleItems = 0;
    let totalMatchingItems = 0;

    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        // চেক করা হচ্ছে কার্ডটি বর্তমান ফিল্টারের সাথে ম্যাচ করে কিনা
        const isMatch = currentFilter === 'all' || categories.includes(currentFilter);

        if (isMatch) {
            totalMatchingItems++;
            // যদি দেখানোর লিমিটের মধ্যে থাকে, তবে দেখাবে
            if (visibleItems < visibleCount) {
                card.style.display = 'block';
                visibleItems++;
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });

    // Load More বাটন দেখাবে নাকি লুকাবে তা ঠিক করা
    if (loadMoreBtn) {
        if (visibleCount >= totalMatchingItems) {
            loadMoreBtn.style.display = 'none'; // সব দেখানো শেষ হলে বাটন লুকিয়ে ফেলা
        } else {
            loadMoreBtn.style.display = 'block'; // বাকি থাকলে বাটন দেখানো
        }
    }
}

// Filter বাটনে ক্লিক করলে কী হবে
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-filter');
            visibleCount = itemsPerPage; // ফিল্টার চেঞ্জ করলে আবার প্রথম ৬টি দেখাবে
            
            updateProjects();
        });
    });
}

// Load More বাটনে ক্লিক করলে কী হবে
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleCount += itemsPerPage; // আরও ৬টি যুক্ত করা
        updateProjects();
    });
}

// পেজ লোড হওয়ার সাথে সাথে ফাংশনটি রান করবে
updateProjects();