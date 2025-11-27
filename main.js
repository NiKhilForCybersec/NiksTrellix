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
 * TABS COMPONENT - FIXED VERSION
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initTabs() {
    var tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(function(container) {
        var buttons = container.querySelectorAll('.tab-button');
        var panels = container.querySelectorAll('.tab-panel');
        
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panels
                buttons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                panels.forEach(function(panel) {
                    panel.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Find and activate the corresponding panel using getElementById
                var tabId = this.getAttribute('data-tab');
                var targetPanel = document.getElementById(tabId);
                
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ACCORDIONS COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initAccordions() {
    var accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(function(item) {
        var header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                var isActive = item.classList.contains('active');
                
                // Optional: Close other accordion items in the same accordion
                var accordion = item.closest('.accordion');
                if (accordion && accordion.dataset.exclusive === 'true') {
                    accordion.querySelectorAll('.accordion-item').forEach(function(i) {
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
        }
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CODE BLOCKS - COPY FUNCTIONALITY
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initCodeBlocks() {
    var codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(function(block) {
        var copyButton = block.querySelector('.code-block-copy');
        var codeContent = block.querySelector('pre');
        
        if (copyButton && codeContent) {
            copyButton.addEventListener('click', function() {
                // Fallback for older browsers
                var textArea = document.createElement('textarea');
                textArea.value = codeContent.textContent;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    
                    // Visual feedback
                    var originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('copied');
                    
                    setTimeout(function() {
                        copyButton.textContent = originalText;
                        copyButton.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    copyButton.textContent = 'Error';
                    setTimeout(function() {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
                
                document.body.removeChild(textArea);
            });
        }
    });
    
    // Also handle inline code copy on double-click
    var inlineCode = document.querySelectorAll('code:not(.code-block code)');
    inlineCode.forEach(function(code) {
        code.style.cursor = 'pointer';
        code.title = 'Double-click to copy';
        
        code.addEventListener('dblclick', function() {
            var textArea = document.createElement('textarea');
            textArea.value = code.textContent;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            
            document.body.removeChild(textArea);
        });
    });
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOBILE MENU
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initMobileMenu() {
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                sidebar.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
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
    var searchInput = document.querySelector('.header-search input');
    
    if (searchInput) {
        var searchTimeout;
        
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(function() {
                var query = e.target.value.toLowerCase().trim();
                
                if (query.length >= 2) {
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300);
        });
        
        // Keyboard shortcut to focus search (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
}

function performSearch(query) {
    // This is a placeholder for search functionality
    console.log('Searching for:', query);
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
    var anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            
            if (target) {
                var header = document.querySelector('.header');
                var headerHeight = header ? header.offsetHeight : 70;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
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
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function highlightNav() {
        var scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(highlightNav, 100));
    highlightNav();
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TOOLTIPS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initTooltips() {
    var tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            var text = element.dataset.tooltip;
            showTooltip(element, text);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = 
        'position: absolute;' +
        'background: var(--bg-elevated);' +
        'color: var(--text-primary);' +
        'padding: 8px 12px;' +
        'border-radius: 4px;' +
        'font-size: 0.85rem;' +
        'z-index: 1000;' +
        'box-shadow: 0 4px 12px rgba(0,0,0,0.3);' +
        'border: 1px solid var(--border-primary);' +
        'pointer-events: none;';
    
    document.body.appendChild(tooltip);
    
    var rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.bottom + 8) + 'px';
}

function hideTooltip() {
    var tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TOAST NOTIFICATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function showToast(message, type) {
    type = type || 'success';
    
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    
    var borderColor = type === 'success' ? '#10b981' : '#ef4444';
    
    toast.style.cssText = 
        'position: fixed;' +
        'bottom: 20px;' +
        'right: 20px;' +
        'background: var(--bg-elevated);' +
        'color: var(--text-primary);' +
        'padding: 12px 24px;' +
        'border-radius: 8px;' +
        'font-size: 0.9rem;' +
        'z-index: 1000;' +
        'box-shadow: 0 4px 12px rgba(0,0,0,0.3);' +
        'border: 1px solid var(--border-primary);' +
        'border-left: 4px solid ' + borderColor + ';';
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ARCHITECTURE DIAGRAM INTERACTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */
function initArchitectureComponents() {
    var archComponents = document.querySelectorAll('.arch-component');
    
    archComponents.forEach(function(component) {
        component.addEventListener('click', function() {
            var info = component.dataset.info;
            var modal = component.dataset.modal;
            
            if (modal) {
                showComponentModal(modal);
            } else if (info) {
                showToast(info, 'info');
            }
        });
    });
}

function showComponentModal(contentId) {
    var modalContent = document.getElementById(contentId);
    if (!modalContent) return;
    
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 
        'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100%;' +
        'height: 100%;' +
        'background: rgba(0, 0, 0, 0.8);' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        'z-index: 1000;';
    
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = 
        'background: var(--bg-card);' +
        'border: 1px solid var(--border-primary);' +
        'border-radius: 12px;' +
        'padding: 24px;' +
        'max-width: 600px;' +
        'max-height: 80vh;' +
        'overflow-y: auto;' +
        'position: relative;';
    
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = 
        'position: absolute;' +
        'top: 12px;' +
        'right: 12px;' +
        'background: none;' +
        'border: none;' +
        'color: var(--text-muted);' +
        'font-size: 24px;' +
        'cursor: pointer;' +
        'line-height: 1;';
    
    closeBtn.addEventListener('click', function() {
        overlay.remove();
    });
    
    overlay.addEventListener('click', function(e) {
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
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    var inThrottle;
    return function() {
        var context = this;
        var args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// Format file sizes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate table of contents from headings
function generateTableOfContents() {
    var headings = document.querySelectorAll('.content-wrapper h2, .content-wrapper h3');
    var toc = document.querySelector('.table-of-contents');
    
    if (!toc || headings.length === 0) return;
    
    var list = document.createElement('ul');
    list.className = 'toc-list';
    
    headings.forEach(function(heading, index) {
        var id = heading.id || 'heading-' + index;
        if (!heading.id) heading.id = id;
        
        var li = document.createElement('li');
        li.className = 'toc-item toc-' + heading.tagName.toLowerCase();
        
        var link = document.createElement('a');
        link.href = '#' + id;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        list.appendChild(li);
    });
    
    toc.appendChild(list);
}

// Export functions for potential external use
window.TrellixDocs = {
    showToast: showToast,
    showComponentModal: showComponentModal,
    initTabs: initTabs,
    initAccordions: initAccordions,
    generateTableOfContents: generateTableOfContents
};