(function() {
    'use strict';
    
    const THEMES = ['light', 'dark', 'system'];
    const STORAGE_KEY = 'theme-preference';
    
    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY);
    }
    
    function setStoredTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
    }
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function getActualTheme(theme) {
        if (theme === 'system') {
            return getSystemTheme();
        }
        return theme;
    }
    
    function applyTheme(theme) {
        const actualTheme = getActualTheme(theme);
        document.documentElement.setAttribute('data-theme', actualTheme);
        
        // Update button text
        const button = document.getElementById('theme-toggle');
        if (button) {
            const icons = {
                'light': '○',
                'dark': '●',
                'system': '◑'
            };
            button.textContent = icons[theme];
            button.setAttribute('title', `Current mode: ${theme === 'system' ? 'system (' + actualTheme + ')' : theme}`);
        }
    }
    
    function getNextTheme(currentTheme) {
        const currentIndex = THEMES.indexOf(currentTheme);
        return THEMES[(currentIndex + 1) % THEMES.length];
    }
    
    function toggleTheme() {
        const currentTheme = getStoredTheme() || 'light';
        const nextTheme = getNextTheme(currentTheme);
        setStoredTheme(nextTheme);
        applyTheme(nextTheme);
    }
    
    function initTheme() {
        const storedTheme = getStoredTheme() || 'light';
        applyTheme(storedTheme);
        
        // Listen for system theme changes when in system mode
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function() {
            const currentTheme = getStoredTheme();
            if (currentTheme === 'system') {
                applyTheme('system');
            }
        });
    }
    
    // Initialize theme as soon as possible
    initTheme();
    
    // Add toggle functionality when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.addEventListener('click', toggleTheme);
            // Reapply theme to update button text
            const currentTheme = getStoredTheme() || 'light';
            applyTheme(currentTheme);
        }
    });
})();