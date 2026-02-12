let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

// Initialize
function init() {
    showPage(currentPage);
    createPageDots();
    updateNavigation();
}

// Show specific page
function showPage(pageIndex) {
    // Remove active class from all pages
    pages.forEach(page => {
        page.classList.remove('active', 'flipping-out', 'flipping-in');
        page.style.display = 'none';
    });
    
    // Show current page
    if (pages[pageIndex]) {
        pages[pageIndex].classList.add('active');
        pages[pageIndex].style.display = 'grid';
    }
    
    updateNavigation();
    updatePageDots();
    updatePageIndicator();
}

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages - 1) {
        const currentPageEl = pages[currentPage];
        const nextPageEl = pages[currentPage + 1];
        
        // Animate current page out
        currentPageEl.classList.add('flipping-out');
        
        // After animation, show next page
        setTimeout(() => {
            currentPage++;
            nextPageEl.style.display = 'grid';
            nextPageEl.classList.add('active', 'flipping-in');
            currentPageEl.classList.remove('active', 'flipping-out');
            currentPageEl.style.display = 'none';
            
            // Remove flipping-in class after animation
            setTimeout(() => {
                nextPageEl.classList.remove('flipping-in');
            }, 800);
            
            updateNavigation();
            updatePageDots();
            updatePageIndicator();
        }, 400);
    }
}

// Navigate to previous page
function previousPage() {
    if (currentPage > 0) {
        const currentPageEl = pages[currentPage];
        const prevPageEl = pages[currentPage - 1];
        
        // Animate current page out
        currentPageEl.classList.add('flipping-out');
        
        // After animation, show previous page
        setTimeout(() => {
            currentPage--;
            prevPageEl.style.display = 'grid';
            prevPageEl.classList.add('active', 'flipping-in');
            currentPageEl.classList.remove('active', 'flipping-out');
            currentPageEl.style.display = 'none';
            
            // Remove flipping-in class after animation
            setTimeout(() => {
                prevPageEl.classList.remove('flipping-in');
            }, 800);
            
            updateNavigation();
            updatePageDots();
            updatePageIndicator();
        }, 400);
    }
}

// Go to specific page
function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages && pageIndex !== currentPage) {
        const currentPageEl = pages[currentPage];
        const targetPageEl = pages[pageIndex];
        
        // Animate current page out
        currentPageEl.classList.add('flipping-out');
        
        // After animation, show target page
        setTimeout(() => {
            currentPage = pageIndex;
            targetPageEl.style.display = 'grid';
            targetPageEl.classList.add('active', 'flipping-in');
            currentPageEl.classList.remove('active', 'flipping-out');
            currentPageEl.style.display = 'none';
            
            // Remove flipping-in class after animation
            setTimeout(() => {
                targetPageEl.classList.remove('flipping-in');
            }, 800);
            
            updateNavigation();
            updatePageDots();
            updatePageIndicator();
        }, 400);
    }
}

// Update navigation buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}

// Update page indicator
function updatePageIndicator() {
    const indicator = document.getElementById('pageIndicator');
    
    // Get the data-page attribute or use index
    const pageNum = pages[currentPage].getAttribute('data-page') || currentPage;
    
    if (currentPage === 0) {
        indicator.textContent = 'Cover';
    } else {
        indicator.textContent = `Page ${pageNum}`;
    }
}

// Create page dots for navigation
function createPageDots() {
    const dotsContainer = document.getElementById('pageDots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goToPage(i);
        dotsContainer.appendChild(dot);
    }
}

// Update page dots
function updatePageDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousPage();
    } else if (e.key === 'ArrowRight') {
        nextPage();
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next page
        nextPage();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous page
        previousPage();
    }
}

// Initialize on load
window.addEventListener('load', init);
