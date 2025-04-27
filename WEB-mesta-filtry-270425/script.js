document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeText(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeText(newTheme);
    });
    
    function updateThemeText(theme) {
        themeText.textContent = theme === 'dark' ? 'Světlý režim' : 'Tmavý režim';
    }

    const cityFilter = document.getElementById('city-filter');
    if (cityFilter) {
        cityFilter.addEventListener('input', function() {
            const filterValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('#cities-table tbody tr');
            
            rows.forEach(row => {
                const cityCell = row.querySelector('td:nth-child(2)');
                if (cityCell) {
                    const cityName = cityCell.textContent.toLowerCase();
                    row.style.display = cityName.includes(filterValue) ? '' : 'none';
                }
            });
        });
    }

    const menuFilter = document.getElementById('menu-filter');
    const citySelect = document.getElementById('city-select');
    
    if (menuFilter && citySelect) {
        const originalOptions = Array.from(citySelect.options).filter(opt => opt.value);
        
        menuFilter.addEventListener('input', function() {
            const filterValue = this.value.toLowerCase();
            
            while (citySelect.options.length > 1) {
                citySelect.remove(1);
            }
            
            originalOptions.forEach(option => {
                if (option.text.toLowerCase().includes(filterValue)) {
                    citySelect.add(option);
                }
            });
        });
    }

    const cityForm = document.getElementById('city-form');
    if (cityForm) {
        cityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedOption = citySelect.options[citySelect.selectedIndex];
            
            if (!selectedOption.value) {
                showNotification('Prosím vyberte město', false);
                return;
            }
            
            showNotification(`Vybrané město: ${selectedOption.text}`);
            console.log('Vybrané město:', selectedOption.text);
        });
    }
    
    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        if (!isSuccess) notification.style.backgroundColor = '#f44336';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});