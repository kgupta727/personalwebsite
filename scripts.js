// =============== Cursor Animation ===============
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Add some smoothing to cursor movement
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animateCursor);
}

// Cursor interactions with clickable elements
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// Prevent cursor getting stuck during scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        cursor.style.opacity = '0';
    }
    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        cursor.style.opacity = '1';
        scrollTimeout = null;
    }, 150);
});

// =============== Navigation & Scrolling ===============
// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Progress Bar
window.onscroll = function() {
    const winScroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    
    requestAnimationFrame(() => {
        document.getElementById("progressBar").style.width = scrolled + "%";
    });
};

// // =============== PDF Viewer ===============
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

// const loadPDF = async () => {
//     const loadingTask = pdfjsLib.getDocument('C:\Users\kavya\Desktop\final portfolio\files\KavyaGupta_Resume.pdf');
//     try {
//         const pdf = await loadingTask.promise;
//         const page = await pdf.getPage(1);
//         const scale = 1.5;
//         const viewport = page.getViewport({ scale });

//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         const renderContext = {
//             canvasContext: context,
//             viewport: viewport
//         };

//         document.getElementById('pdf-viewer').appendChild(canvas);
//         await page.render(renderContext);
//     } catch (error) {
//         console.error('Error loading PDF:', error);
//     }
// };

// =============== Awards Timeline Animation ===============
const nodes = document.querySelectorAll('.node');

nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        nodes.forEach(otherNode => {
            if (otherNode !== node) {
                otherNode.style.opacity = '0.3';
                otherNode.style.transform = 'scale(0.8)';
            }
        });
    });

    node.addEventListener('mouseleave', () => {
        nodes.forEach(otherNode => {
            otherNode.style.opacity = '1';
            otherNode.style.transform = 'scale(1)';
        });
    });
});

// =============== Image Collage Animation ===============
const collageImages = document.querySelectorAll('.collage-item img');
collageImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
        img.style.zIndex = '1';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.zIndex = '0';
    });
});

// // =============== Download CV Button ===============
// const downloadButton = document.querySelector('.download-cv');
// downloadButton.addEventListener('click', () => {
//     const link = document.createElement('a');
//     link.href = 'C:\Users\kavya\Desktop\final portfolio\files\KavyaGupta_Resume.pdf';
//     link.download = 'KavyaGupta_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// });

// =============== Section Animations ===============
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
});

// Initialize PDF viewer when resume section is visible
const resumeSection = document.querySelector('#resume');
const resumeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !document.querySelector('#pdf-viewer canvas')) {
            loadPDF();
        }
    });
}, { threshold: 0.1 });

resumeObserver.observe(resumeSection);

// =============== Background Parallax Effect ===============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// =============== Handle Window Resize ===============
window.addEventListener('resize', () => {
    if (document.querySelector('#pdf-viewer canvas')) {
        loadPDF();
    }
});

// =============== Initialization ===============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cursor
    cursorX = mouseX;
    cursorY = mouseY;
    animateCursor();
    cursor.style.opacity = '1';
    
    // Initialize progress bar
    document.getElementById("progressBar").style.width = "0%";
    
    // Trigger initial scroll event
    window.dispatchEvent(new Event('scroll'));
});