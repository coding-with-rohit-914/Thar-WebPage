document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    initTheme();

    // Initialize car configuration
    initCarConfig();

    // Initialize 360 viewer
    init360Viewer();

    // Initialize comparison tool
    initComparisonTool();

    // Initialize test drive booking
    initTestDriveBooking();

    // Initialize performance charts
    initPerformanceCharts();

    // Initialize gallery
    initGallery();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize back to top
    initBackToTop();

    // Initialize modals
    initModals();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Set initial theme
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        updateThemeIcon('dark');
    } else {
        updateThemeIcon('light');
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', function () {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark ? 'dark' : 'light');

        // Add animation effect
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0)';
        }, 300);
    });

    // Update theme icon
    function updateThemeIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');

        if (theme === 'dark') {
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(-90deg)';
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'rotate(0)';
        } else {
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(0)';
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'rotate(90deg)';
        }
    }
}

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Car Configuration System
function initCarConfig() {
    // Configuration data
    const config = {
        variant: 'ax',
        engine: 'petrol',
        transmission: 'manual',
        color: 'red',
        wheels: '17',
        roof: 'soft',
        accessories: [],
        basePrice: 1199000,
        totalPrice: 1199000
    };

    // Color options with local images
    const colorOptions = [
        {
            id: 'red',
            name: 'Red Rage',
            code: '#FF416C',
            gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
            image: 'Red Rage Thar.png'
        },
        {
            id: 'blue',
            name: 'Nautical Blue',
            code: '#36D1DC',
            gradient: 'linear-gradient(135deg, #36D1DC, #5B86E5)',
            image: 'Natural Blue Thar.png'
        },
        {
            id: 'black',
            name: 'Mystic Black',
            code: '#000000',
            gradient: 'linear-gradient(135deg, #000000, #434343)',
            image: 'Mystic Black Thar.png'
        },
        {
            id: 'white',
            name: 'Pearl White',
            code: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #FFFFFF, #F5F7FA)',
            image: 'Pearl White Thar.png'
        }
    ];

    // Initialize color selector
    initColorSelector(colorOptions);

    // Configuration steps
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.config-step-content');
    let currentStep = 1;

    // Step navigation
    steps.forEach(step => {
        step.addEventListener('click', function () {
            const stepNum = parseInt(this.dataset.step);
            if (stepNum <= currentStep) {
                showStep(stepNum);
            }
        });
    });

    // Next/Previous buttons
    document.getElementById('nextStep').addEventListener('click', nextStep);
    document.getElementById('prevStep').addEventListener('click', prevStep);

    // Variant selection
    document.querySelectorAll('.variant-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.variant-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            config.variant = this.dataset.variant;
            config.basePrice = parseInt(this.dataset.price);
            updateSummary();
        });
    });

    // Engine selection
    document.querySelectorAll('.engine-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.engine-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            config.engine = this.dataset.engine;
            updateSummary();
        });
    });

    // Transmission selection
    document.querySelectorAll('.transmission-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.transmission-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            config.transmission = this.dataset.transmission;
            updateSummary();
        });
    });

    // Wheel selection
    document.querySelectorAll('.wheel-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.wheel-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            config.wheels = this.dataset.wheel;
            updateSummary();
        });
    });

    // Roof selection
    document.querySelectorAll('.roof-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.roof-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            config.roof = this.dataset.roof;
            updateSummary();
        });
    });

    // Accessories selection
    document.querySelectorAll('.accessory-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const accessory = this.closest('.accessory-option').dataset.accessory;
            const price = parseInt(this.closest('.accessory-option').dataset.price);

            if (this.checked) {
                config.accessories.push({ id: accessory, price: price });
            } else {
                config.accessories = config.accessories.filter(a => a.id !== accessory);
            }
            updateSummary();
        });
    });

    // Save configuration
    document.getElementById('saveConfig').addEventListener('click', function () {
        const modal = document.getElementById('successModal');
        const modalMessage = document.getElementById('modalMessage');

        modalMessage.textContent = `Your Thar configuration has been saved! Total price: ₹ ${formatPrice(config.totalPrice)}`;
        modal.classList.add('active');

        // Save to localStorage
        localStorage.setItem('tharConfig', JSON.stringify(config));
    });

    function showStep(step) {
        // Update steps
        steps.forEach(s => s.classList.remove('active'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');

        // Update step contents
        stepContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');

        currentStep = step;

        // Update navigation buttons
        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');

        prevBtn.style.display = step === 1 ? 'none' : 'flex';

        // Fix for the button content issue
        if (step === 5) {
            nextBtn.innerHTML = 'Complete';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    function nextStep() {
        if (currentStep < 5) {
            showStep(currentStep + 1);
        } else {
            // Complete configuration
            document.getElementById('saveConfig').click();
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }

    function updateSummary() {
        // Calculate total price
        let total = config.basePrice;

        // Add engine price
        const engineOption = document.querySelector('.engine-option.active');
        if (engineOption) {
            total += parseInt(engineOption.dataset.price);
        }

        // Add transmission price
        const transmissionOption = document.querySelector('.transmission-option.active');
        if (transmissionOption) {
            total += parseInt(transmissionOption.dataset.price);
        }

        // Add wheels price
        const wheelOption = document.querySelector('.wheel-option.active');
        if (wheelOption) {
            total += parseInt(wheelOption.dataset.price);
        }

        // Add roof price
        const roofOption = document.querySelector('.roof-option.active');
        if (roofOption) {
            total += parseInt(roofOption.dataset.price);
        }

        // Add accessories price
        let accessoriesTotal = 0;
        config.accessories.forEach(acc => {
            accessoriesTotal += acc.price;
        });

        total += accessoriesTotal;
        config.totalPrice = total;

        // Update summary display
        document.getElementById('basePrice').textContent = `₹ ${formatPrice(config.basePrice)}`;
        document.getElementById('enginePrice').textContent = `+ ₹ ${formatPrice(parseInt(engineOption?.dataset.price) || 0)}`;
        document.getElementById('transmissionPrice').textContent = `+ ₹ ${formatPrice(parseInt(transmissionOption?.dataset.price) || 0)}`;
        document.getElementById('accessoriesPrice').textContent = `+ ₹ ${formatPrice(accessoriesTotal)}`;
        document.getElementById('totalPrice').textContent = `₹ ${formatPrice(total)}`;
    }

    function initColorSelector(colors) {
        const container = document.getElementById('colorOptions');
        const carImagesContainer = document.querySelector('.car-images');

        // Clear existing content
        container.innerHTML = '';
        carImagesContainer.innerHTML = '';

        colors.forEach((color, index) => {
            // Create color option
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
            colorOption.dataset.color = color.id;
            colorOption.dataset.name = color.name;

            colorOption.innerHTML = `
                <div class="color-preview" style="background: ${color.gradient};"></div>
                <div class="color-info">
                    <span class="color-name">${color.name}</span>
                    <span class="color-code">${color.code}</span>
                </div>
                <div class="color-select-indicator">
                    <i class="fas fa-check"></i>
                </div>
            `;

            // Create car image with proper dimensions
            const carImage = document.createElement('img');
            carImage.className = `car-image ${index === 0 ? 'active' : ''}`;
            carImage.id = `car-${color.id}`;
            carImage.src = color.image;
            carImage.alt = `${color.name} Thar`;
            carImage.loading = "lazy";

            container.appendChild(colorOption);
            carImagesContainer.appendChild(carImage);

            // Add click event
            colorOption.addEventListener('click', function () {
                // Update active color
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Update car image
                document.querySelectorAll('.car-image').forEach(img => img.classList.remove('active'));
                carImage.classList.add('active');

                // Update config
                config.color = color.id;

                // Update background pattern
                updateBackgroundColor(color.id);
            });
        });
    }

    function updateBackgroundColor(colorId) {
        const bgPattern = document.querySelector('.bg-pattern');
        let gradient;

        switch (colorId) {
            case 'red':
                gradient = 'radial-gradient(circle at 20% 80%, rgba(255, 65, 108, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 75, 43, 0.15) 0%, transparent 50%)';
                break;
            case 'blue':
                gradient = 'radial-gradient(circle at 20% 80%, rgba(54, 209, 220, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(91, 134, 229, 0.15) 0%, transparent 50%)';
                break;
            case 'black':
                gradient = 'radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(67, 67, 67, 0.15) 0%, transparent 50%)';
                break;
            case 'white':
                gradient = 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 247, 250, 0.15) 0%, transparent 50%)';
                break;
            default:
                gradient = 'radial-gradient(circle at 20% 80%, rgba(108, 99, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(54, 209, 220, 0.15) 0%, transparent 50%)';
        }

        bgPattern.style.backgroundImage = gradient;
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Initialize with first step
    showStep(1);
    updateSummary();
}

// 360 Viewer
function init360Viewer() {
    const carFrame = document.getElementById('carViewer');
    let rotation = 0;
    let scale = 1;

    // Different sensitivity for mobile vs desktop
    const rotationSensitivity = isMobileDevice() ? 0.3 : 0.5;
    const zoomSensitivity = isMobileDevice() ? 0.05 : 0.1;

    // Rotation controls
    document.getElementById('rotateLeft').addEventListener('click', () => rotateCar(-30));
    document.getElementById('rotateRight').addEventListener('click', () => rotateCar(30));
    document.getElementById('zoomIn').addEventListener('click', () => zoomCar(zoomSensitivity));
    document.getElementById('zoomOut').addEventListener('click', () => zoomCar(-zoomSensitivity));

    // Mouse drag rotation
    let isDragging = false;
    let startX = 0;
    let touchStartDistance = 0;

    carFrame.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        carFrame.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        rotation += deltaX * rotationSensitivity;
        updateCarTransform();
        startX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        carFrame.style.cursor = 'grab';
    });

    // Touch support for mobile
    carFrame.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            // Two-finger pinch
            touchStartDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        } else if (e.touches.length === 1) {
            // One-finger rotate
            isDragging = true;
            startX = e.touches[0].clientX;
        }
        e.preventDefault();
    });

    carFrame.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            // Pinch zoom
            const touchDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const zoomDelta = (touchDistance - touchStartDistance) * 0.01;
            zoomCar(zoomDelta);
            touchStartDistance = touchDistance;
        } else if (e.touches.length === 1 && isDragging) {
            // Rotate
            const deltaX = e.touches[0].clientX - startX;
            rotation += deltaX * rotationSensitivity;
            updateCarTransform();
            startX = e.touches[0].clientX;
        }
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        touchStartDistance = 0;
    });

    function rotateCar(angle) {
        rotation += angle;
        updateCarTransform();
    }

    function zoomCar(delta) {
        scale = Math.max(0.5, Math.min(2, scale + delta));
        updateCarTransform();
    }

    function updateCarTransform() {
        const carImages = document.querySelector('.car-images');
        carImages.style.transform = `rotateY(${rotation}deg) scale(${scale})`;
    }

    // Initialize cursor
    carFrame.style.cursor = 'grab';
}

// Comparison Tool
function initComparisonTool() {
    // Download comparison
    document.getElementById('downloadComparison').addEventListener('click', function () {
        const comparisonData = {
            variants: ['AX Optional', 'LX', 'Hard Top', 'Convertible'],
            features: [
                { name: 'Engine Options', values: ['Petrol', 'Petrol/Diesel', 'Petrol/Diesel', 'Petrol/Diesel'] },
                { name: 'Transmission', values: ['Manual', 'Manual/Auto', 'Manual/Auto', 'Automatic'] },
                { name: 'Infotainment', values: ['7-inch', '9-inch', '9-inch', '10.25-inch'] },
                { name: 'Climate Control', values: ['Manual', 'Auto', 'Dual Zone', '3-Zone'] },
                { name: 'Safety Features', values: ['2 Airbags', '4 Airbags', '6 Airbags', '7 Airbags'] },
                { name: 'Audio System', values: ['4 Speakers', '6 Speakers', '8 Speakers', '12 Speakers'] },
                { name: 'Sunroof', values: ['No', 'Yes', 'Panoramic', 'Panoramic'] },
                { name: 'LED Lights', values: ['No', 'Yes', 'Yes', 'Yes'] }
            ]
        };

        // Create CSV content
        let csv = 'Feature,AX Optional,LX,Hard Top,Convertible\n';
        comparisonData.features.forEach(feature => {
            csv += `${feature.name},${feature.values.join(',')}\n`;
        });

        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'thar-comparison.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Show success message
        showModal('Comparison downloaded successfully! You can now view it in your downloads folder.');
    });

    // Share comparison
    document.getElementById('shareComparison').addEventListener('click', function () {
        if (navigator.share) {
            navigator.share({
                title: 'Mahindra Thar Comparison',
                text: 'Check out this detailed comparison of Mahindra Thar variants!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            navigator.clipboard.writeText(window.location.href).then(() => {
                showModal('Comparison link copied to clipboard!');
            });
        }
    });
}

// Test Drive Booking
function initTestDriveBooking() {
    const calendar = document.getElementById('calendar');
    const timeSlots = document.getElementById('timeSlots');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    // Initialize calendar
    renderCalendar(currentDate);

    // Month navigation
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Form inputs
    const locationSelect = document.getElementById('location');
    const variantSelect = document.getElementById('variantSelect');

    locationSelect.addEventListener('change', updateSummary);
    variantSelect.addEventListener('change', updateSummary);

    // Confirm booking
    document.getElementById('confirmBooking').addEventListener('click', function () {
        const fullName = document.getElementById('fullName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const variant = document.getElementById('variantSelect').value;

        // Validation
        if (!fullName || !phoneNumber || !email || !location || !variant || !selectedDate || !selectedTime) {
            showModal('Please fill in all fields and select date & time for test drive.');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
            showModal('Please enter a valid 10-digit phone number.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showModal('Please enter a valid email address.');
            return;
        }

        // Create booking object
        const booking = {
            fullName,
            phoneNumber,
            email,
            location,
            variant,
            date: selectedDate,
            time: selectedTime,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('tharTestDrive', JSON.stringify(booking));

        // Show success message
        showModal(`Test drive booked successfully! You'll receive confirmation at ${email} and ${phoneNumber}. Our representative will contact you shortly.`);

        // Reset form
        resetBookingForm();
    });

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Update month display
        currentMonthEl.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Clear calendar
        calendar.innerHTML = '';

        // Add weekday headers
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day weekday';
            dayEl.textContent = day;
            calendar.appendChild(dayEl);
        });

        // Get first day of month
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay();

        // Get days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add empty cells for starting day
        for (let i = 0; i < startingDay; i++) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'calendar-day';
            calendar.appendChild(emptyEl);
        }

        // Add days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const cellDate = new Date(year, month, day);
            cellDate.setHours(0, 0, 0, 0);

            // Disable past dates
            if (cellDate < today) {
                dayEl.classList.add('disabled');
            } else {
                // Check if date is selected
                if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                    dayEl.classList.add('selected');
                }

                dayEl.addEventListener('click', () => selectDate(cellDate));
            }

            calendar.appendChild(dayEl);
        }
    }

    function selectDate(date) {
        selectedDate = date;
        renderCalendar(currentDate);
        generateTimeSlots();
        updateSummary();
    }

    function generateTimeSlots() {
        if (!selectedDate) return;

        const slots = [
            '09:00 AM', '10:00 AM', '11:00 AM',
            '12:00 PM', '01:00 PM', '02:00 PM',
            '03:00 PM', '04:00 PM', '05:00 PM'
        ];

        // Randomly book some slots for demo
        const bookedSlots = new Set();
        const totalSlots = slots.length;
        const bookedCount = Math.floor(Math.random() * 3); // 0-2 booked slots

        for (let i = 0; i < bookedCount; i++) {
            const randomSlot = Math.floor(Math.random() * totalSlots);
            bookedSlots.add(randomSlot);
        }

        // Clear time slots
        timeSlots.innerHTML = '';

        // Create time slot buttons
        slots.forEach((slot, index) => {
            const slotEl = document.createElement('div');
            slotEl.className = 'time-slot';
            slotEl.textContent = slot;

            if (bookedSlots.has(index)) {
                slotEl.classList.add('booked');
                slotEl.title = 'This slot is already booked';
            } else {
                if (selectedTime === slot) {
                    slotEl.classList.add('selected');
                }

                slotEl.addEventListener('click', () => {
                    if (selectedTime === slot) {
                        selectedTime = null;
                        slotEl.classList.remove('selected');
                    } else {
                        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                        slotEl.classList.add('selected');
                        selectedTime = slot;
                    }
                    updateSummary();
                });
            }

            timeSlots.appendChild(slotEl);
        });
    }

    function updateSummary() {
        const selectedDateEl = document.getElementById('selectedDate');
        const selectedTimeEl = document.getElementById('selectedTime');
        const selectedLocationEl = document.getElementById('selectedLocation');

        if (selectedDate) {
            selectedDateEl.textContent = selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            selectedDateEl.textContent = 'Not selected';
        }

        selectedTimeEl.textContent = selectedTime || 'Not selected';

        const location = document.getElementById('location').value;
        if (location) {
            const locationNames = {
                'mumbai': 'Mumbai Showroom',
                'delhi': 'Delhi Showroom',
                'bangalore': 'Bangalore Showroom',
                'chennai': 'Chennai Showroom'
            };
            selectedLocationEl.textContent = locationNames[location] || 'Not selected';
        } else {
            selectedLocationEl.textContent = 'Not selected';
        }
    }

    function resetBookingForm() {
        document.getElementById('fullName').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('email').value = '';
        document.getElementById('location').value = '';
        document.getElementById('variantSelect').value = '';
        selectedDate = null;
        selectedTime = null;
        updateSummary();
        renderCalendar(new Date());
        timeSlots.innerHTML = '';
    }
}

// Performance Charts
function initPerformanceCharts() {
    // Power & Torque Chart
    const powerCtx = document.getElementById('powerChart').getContext('2d');
    const powerChart = new Chart(powerCtx, {
        type: 'line',
        data: {
            labels: ['0', '1000', '2000', '3000', '4000', '5000', '6000'],
            datasets: [
                {
                    label: 'Power (kW)',
                    data: [0, 60, 110, 130, 125, 130, 100],
                    borderColor: '#6C63FF',
                    backgroundColor: 'rgba(108, 99, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Torque (Nm)',
                    data: [150, 280, 300, 300, 280, 250, 200],
                    borderColor: '#36D1DC',
                    backgroundColor: 'rgba(54, 209, 220, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'RPM',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    },
                    grid: {
                        color: 'rgba(108, 99, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Power/Torque',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    },
                    grid: {
                        color: 'rgba(108, 99, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    }
                }
            }
        }
    });

    // Fuel Efficiency Chart
    const fuelCtx = document.getElementById('fuelChart').getContext('2d');
    const fuelChart = new Chart(fuelCtx, {
        type: 'bar',
        data: {
            labels: ['City', 'Highway', 'Combined'],
            datasets: [
                {
                    label: 'Petrol',
                    data: [12.5, 17.8, 15.2],
                    backgroundColor: 'rgba(108, 99, 255, 0.7)',
                    borderColor: '#6C63FF',
                    borderWidth: 2
                },
                {
                    label: 'Diesel',
                    data: [14.2, 18.7, 16.5],
                    backgroundColor: 'rgba(54, 209, 220, 0.7)',
                    borderColor: '#36D1DC',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(108, 99, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'km/l',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    },
                    grid: {
                        color: 'rgba(108, 99, 255, 0.1)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                    }
                }
            }
        }
    });

    // Performance tabs
    const perfTabs = document.querySelectorAll('.perf-tab');
    const perfContents = document.querySelectorAll('.perf-tab-content');

    perfTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.dataset.tab;

            // Update active tab
            perfTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding content
            perfContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

// Gallery
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainViewerImage');
    const prevBtn = document.getElementById('prevView');
    const nextBtn = document.getElementById('nextView');
    const arBtn = document.getElementById('toggleAR');

    const galleryImages = {
        exterior: 'Thar Exterior View.png',
        interior: 'Thar Interior View.png',
        dashboard: 'Thar Dashboard.png',
        night: 'Thar Night Mode.png'
    };

    let currentView = 'exterior';
    const views = ['exterior', 'interior', 'dashboard', 'night'];

    // Thumbnail click events
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const view = this.dataset.view;

            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update main image
            updateGalleryView(view);
        });
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));

    // AR Button
    arBtn.addEventListener('click', function () {
        showModal('AR View feature would open your camera to preview the Thar in your environment. This requires camera permissions.');
    });

    function updateGalleryView(view) {
        currentView = view;
        mainImage.src = galleryImages[view];
        mainImage.alt = `Thar ${view} view`;
        mainImage.loading = "eager";

        // Add transition effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
            mainImage.style.transition = 'opacity 0.5s ease';
        }, 50);
    }

    function navigateGallery(direction) {
        const currentIndex = views.indexOf(currentView);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = views.length - 1;
        if (newIndex >= views.length) newIndex = 0;

        // Update thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[newIndex].classList.add('active');

        // Update view
        updateGalleryView(views[newIndex]);
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.classList.add('active');
    });

    mobileMenuClose.addEventListener('click', function () {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        mobileMenuBtn.classList.remove('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Modals
function initModals() {
    const modalOverlay = document.getElementById('successModal');
    const modalClose = modalOverlay.querySelector('.modal-close');
    const modalOk = document.getElementById('modalOk');

    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOk.addEventListener('click', () => modalOverlay.classList.remove('active'));

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
}

// Utility function to show modal with custom message
function showModal(message) {
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');

    modalMessage.textContent = message;
    modal.classList.add('active');
}

// Sticky Navigation
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.sticky-nav');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Parallax Effect
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const carFrame = document.querySelector('.car-frame');

    if (carFrame) {
        const speed = 0.4;
        const yPos = -(scrolled * speed);
        carFrame.style.transform = `translateY(${yPos}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    animateCounter(stat);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text);
        const span = element.querySelector('span');
        const unit = span ? span.textContent : '';

        let current = 0;
        const increment = number / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.innerHTML = Math.floor(current) + (unit ? ` <span>${unit}</span>` : '');
        }, 30);
    }
});