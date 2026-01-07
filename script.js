// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle missing profile image gracefully
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.onerror = function() {
            // Create a placeholder if image is not found
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = '<span>👤</span>';
            this.parentNode.appendChild(placeholder);
        };
    }

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add print button functionality (optional)
    const printButton = document.getElementById('printBtn');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Add copy email functionality (optional)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal mailto behavior
            console.log('Email link clicked:', this.href);
        });
    });

    // Log IPFS deployment info (for debugging)
    console.log('%c🌐 CV hosted on IPFS', 'color: #3498db; font-size: 16px; font-weight: bold;');
    console.log('%c📡 Deployed via Raspberry Pi 4', 'color: #e74c3c; font-size: 14px;');
    console.log('%c🔗 Web3 Domain Ready', 'color: #2ecc71; font-size: 14px;');

    // Add Web3 integration placeholder (can be extended for ENS or other Web3 features)
    if (typeof window.ethereum !== 'undefined') {
        console.log('Web3 wallet detected!');
        // Future: Add Web3 wallet integration if needed
    }

    // Performance monitoring (optional)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });
    }

    // Service Worker for offline support (IPFS friendly)
    if ('serviceWorker' in navigator) {
        // Note: Service workers need to be served over HTTPS or localhost
        // IPFS gateways typically support this
        console.log('Service Worker support available (can be enabled for offline access)');
        
        // Uncomment to register a service worker:
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered:', reg))
        //     .catch(err => console.log('Service Worker registration failed:', err));
    }
});

// Utility function to get IPFS CID if available
function getIPFSCID() {
    // Try to extract CID from URL if hosted on IPFS gateway
    const url = window.location.href;
    // Match both CIDv0 (Qm... base58, 46 chars total) and CIDv1 (baf... base32) formats
    const ipfsMatch = url.match(/\/ipfs\/(Qm[1-9A-HJ-NP-Za-km-z]{44}|baf[a-z2-7A-Z0-9]+)/);
    if (ipfsMatch) {
        return ipfsMatch[1];
    }
    return null;
}

// Display IPFS info if available
const cid = getIPFSCID();
if (cid) {
    console.log(`📦 IPFS CID: ${cid}`);
    console.log(`🔗 Alternative gateways:`);
    console.log(`   - https://ipfs.io/ipfs/${cid}`);
    console.log(`   - https://gateway.pinata.cloud/ipfs/${cid}`);
    console.log(`   - https://cloudflare-ipfs.com/ipfs/${cid}`);
}
