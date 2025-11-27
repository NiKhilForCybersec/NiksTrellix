/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TRELLIX SECURITY PLATFORM - ULTIMATE DOCUMENTATION GUIDE
 * Main JavaScript - Interactive Components
 * ═══════════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

function initializeComponents() {
    initTabs();
    initAccordions();
    initCodeBlocks();
    initMobileMenu();
    initSearch();
    initSmoothScroll();
    initActiveNavigation();
    initTooltips();
    initArchitectureComponents();
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TABS COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-button');
        const panels = container.querySelectorAll('.tab-panel');
        
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                buttons.forEach(btn => btn.classList.remove('active'));
                panels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = container.querySelector(`#${button.dataset.tab}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                } else if (panels[index]) {
                    panels[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (buttons.length > 0 && !container.querySelector('.tab-button.active')) {
            buttons[0].click();
        }
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ACCORDIONS COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Optional: Close other accordion items in the same accordion
            const accordion = item.closest('.accordion');
            if (accordion && accordion.dataset.exclusive === 'true') {
                accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                });
            }
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CODE BLOCKS - COPY FUNCTIONALITY
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyButton = block.querySelector('.code-block-copy');
        const codeContent = block.querySelector('pre');
        
        if (copyButton && codeContent) {
            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeContent.textContent);
                    
                    // Visual feedback
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('copied');
                    
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    copyButton.textContent = 'Error';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
            });
        }
    });
    
    // Also handle inline code copy on double-click
    const inlineCode = document.querySelectorAll('code:not(.code-block code)');
    inlineCode.forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'Double-click to copy';
        
        code.addEventListener('dblclick', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent);
                showToast('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOBILE MENU
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                sidebar.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                sidebar.classList.remove('active');
            }
        });
    }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SEARCH FUNCTIONALITY
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initSearch() {
    const searchInput = document.querySelector('.header-search input');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length >= 2) {
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300);
        });
        
        // Keyboard shortcut to focus search (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

function performSearch(query) {
    // This is a placeholder for search functionality
    // In a full implementation, this would search through page content
    console.log('Searching for:', query);
    
    // Could be enhanced with:
    // - Algolia DocSearch integration
    // - Local page index
    // - Fuzzy search library like Fuse.js
}

function clearSearchResults() {
    // Clear search results dropdown
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SMOOTH SCROLL
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ACTIVE NAVIGATION HIGHLIGHTING
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
            
            // Expand parent section if exists
            const section = link.closest('.sidebar-section');
            if (section) {
                section.classList.add('expanded');
            }
        }
    });
    
    // Scroll spy for in-page navigation
    const sections = document.querySelectorAll('section[id], h2[id], h3[id]');
    
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -66%',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    updateActiveNavLink(id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
}

function updateActiveNavLink(id) {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TOOLTIPS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltipText = el.dataset.tooltip;
        
        el.addEventListener('mouseenter', (e) => {
            showTooltip(e.target, tooltipText);
        });
        
        el.addEventListener('mouseleave', () => {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-elevated);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 1px solid var(--border-primary);
        pointer-events: none;
        animation: fadeIn 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TOAST NOTIFICATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--bg-elevated);
        color: var(--text-primary);
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 1px solid var(--border-primary);
        border-left: 4px solid ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ARCHITECTURE DIAGRAM INTERACTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initArchitectureComponents() {
    const archComponents = document.querySelectorAll('.arch-component');
    
    archComponents.forEach(component => {
        component.addEventListener('click', () => {
            const info = component.dataset.info;
            const modal = component.dataset.modal;
            
            if (modal) {
                showComponentModal(modal);
            } else if (info) {
                showToast(info, 'info');
            }
        });
    });
}

function showComponentModal(contentId) {
    const modalContent = document.getElementById(contentId);
    if (!modalContent) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 12px;
        padding: 24px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    
    modal.innerHTML = modalContent.innerHTML;
    modal.prepend(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UTILITY FUNCTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format file sizes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate table of contents from headings
function generateTableOfContents() {
    const headings = document.querySelectorAll('.content-wrapper h2, .content-wrapper h3');
    const toc = document.querySelector('.table-of-contents');
    
    if (!toc || headings.length === 0) return;
    
    const list = document.createElement('ul');
    list.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) heading.id = id;
        
        const li = document.createElement('li');
        li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        list.appendChild(li);
    });
    
    toc.appendChild(list);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.TrellixDocs = {
    showToast,
    showComponentModal,
    initTabs,
    initAccordions,
    generateTableOfContents
};
