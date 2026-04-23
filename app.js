/**
 * ========================================
 * PORTAL KELULUSAN - SMKS Kesehatan SDM Sumedang
 * JavaScript Application
 * ========================================
 * 
 * DB-Less System: Data disimpan dalam file JSON/CSV
 * Tidak memerlukan database server
 */

// ========================================
// DATA WILL BE LOADED FROM EXTERNAL FILE
// ========================================
// Data will be loaded from data.json, data.csv, or data.js
// No hardcoded sample data here

let studentData = []; // Will be populated from external file

// ========================================
// DOM ELEMENTS
// ========================================

const graduationForm = document.getElementById('graduationForm');
const nipdInput = document.getElementById('nipdInput');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const resetBtn = document.getElementById('resetBtn');
const retryBtn = document.getElementById('retryBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Result display elements
const studentName = document.getElementById('studentName');
const studentNIPD = document.getElementById('studentNIPD');
const studentMajor = document.getElementById('studentMajor');
const studentYear = document.getElementById('studentYear');
const studentStatus = document.getElementById('studentStatus');
const studentClass = document.getElementById('studentClass');
const congratsMessage = document.getElementById('congratsMessage');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Setup event listeners
    setupEventListeners();
    
    // Load data from external file if available
    loadExternalData();
    
    // Add input formatting
    setupInputFormatting();
    
    console.log('🚀 Portal Kelulusan initialized successfully!');
    console.log('💡 Test NIPD: 2425.1.0001, 2425.1.0002, dst.');
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Form submission
    graduationForm.addEventListener('submit', handleFormSubmit);
    
    // Reset buttons
    resetBtn.addEventListener('click', handleReset);
    retryBtn.addEventListener('click', handleReset);
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Input validation on typing
    nipdInput.addEventListener('input', validateInput);
    
    // Close mobile menu when clicking outside or on link click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const nipd = nipdInput.value.trim();
    
    // Validate NIPD
    if (!nipd || nipd.length < 5) {
        showError('⚠️ NIPD harus minimal 5 karakter nih!');
        return;
    }
    
    // Check NIPD format (should be like 2425.1.0001)
    const nipdFormat = /^\d{4}\.\d\.\d{4}$/;
    if (!nipdFormat.test(nipd)) {
        showError('⚠️ Format NIPD salah bro! Harusnya: TAPEL.SEMESTER.NO_URUT (cth: 2425.1.0001)');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Simulate processing delay for better UX
    await delay(1500);
    
    // Search for student
    const student = findStudent(nipd);
    
    if (student) {
        showResult(student);
    } else {
        showError();
    }
}

function findStudent(nipd) {
    // Search in studentData (which is loaded from external file)
    if (!studentData || studentData.length === 0) {
        console.log('⚠️ Data belum dimuat!');
        return null;
    }
    
    const found = studentData.find(s => s.nipd === nipd);
    
    if (found) {
        return found;
    }
    
    return null;
}

// ========================================
// UI DISPLAY FUNCTIONS
// ========================================

function showLoading() {
    hideAllSections();
    loadingIndicator.classList.remove('d-none');
}

function showResult(student) {
    hideAllSections();
    
    // Populate data
    studentName.textContent = `🎓 ${student.nama}`;
    studentNIPD.textContent = student.nipd;
    studentMajor.textContent = student.jurusan;
    studentYear.textContent = student.tahunAjaran;
    studentStatus.textContent = student.status;
    studentClass.textContent = student.kelas || '-';
    
    // Customize message based on status (all students in data are considered found)
    if (student.status.toUpperCase() === 'LULUS') {
        congratsMessage.innerHTML = `✨ Selamat kepada <strong>${student.nama}</strong> dengan NIPD <strong>${student.nipd}</strong> kelas <strong>${student.kelas || '-'}</strong> jurusan <strong>${student.jurusan}</strong> yang telah dinyatakan <strong>LULUS</strong>! 🎉<br><br>🚀 Sukses selalu di perjalanan berikutnya, ya!`;
        congratsMessage.style.color = 'var(--cyber-success)';
    } else {
        congratsMessage.innerHTML = '⏳ Status kelulusan masih dalam proses';
        congratsMessage.style.color = 'var(--cyber-warning)';
    }
    
    resultSection.classList.remove('d-none');
    
    // Play success animation
    playSuccessAnimation();
}

function showError(customMessage = null) {
    hideAllSections();
    
    if (customMessage) {
        const errorCard = errorSection.querySelector('.cyber-error-card');
        errorCard.querySelector('p').textContent = customMessage;
    }
    
    errorSection.classList.remove('d-none');
}

function hideAllSections() {
    loadingIndicator.classList.add('d-none');
    resultSection.classList.add('d-none');
    errorSection.classList.add('d-none');
}

function handleReset() {
    nipdInput.value = '';
    hideAllSections();
    nipdInput.focus();
}

// ========================================
// MOBILE MENU
// ========================================

function toggleMobileMenu() {
    mobileMenu.classList.toggle('show');
    mobileMenuToggle.classList.toggle('active');
    
    // Toggle icon between bars and times (X)
    const icon = mobileMenuToggle.querySelector('i');
    if (mobileMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ========================================
// INPUT VALIDATION & FORMATTING
// ========================================

function validateInput(e) {
    const value = e.target.value;
    
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (value !== numericValue) {
        e.target.value = numericValue;
    }
    
    // Limit length
    if (numericValue.length > 15) {
        e.target.value = numericValue.slice(0, 15);
    }
}

function setupInputFormatting() {
    // Auto-format NIPD input (optional: add dashes every 4 digits)
    nipdInput.addEventListener('focus', () => {
        nipdInput.placeholder = '2425.1.0001';
    });
    
    nipdInput.addEventListener('blur', () => {
        if (!nipdInput.value) {
            nipdInput.placeholder = '2425.1.0001';
        }
    });
}

// ========================================
// EXTERNAL DATA LOADING
// ========================================

/**
 * Load data from external JSON file
 * File format: data.json
 * 
 * Example structure:
 * [
 *   {
 *     "nipd": "2425.1.0001",
 *     "nama": "Nama Siswa",
 *     "kelas": "XII Jurusan 1",
 *     "jurusan": "Jurusan",
 *     "tahunAjaran": "2024/2025",
 *     "status": "LULUS"
 *   }
 * ]
 */
async function loadExternalData() {
    try {
        // Try to load from data.json
        const response = await fetch('data.json');
        
        if (response.ok) {
            const data = await response.json();
            studentData = data; // Set the global studentData variable
            window.externalStudentData = data;
            console.log(`✅ Loaded ${data.length} students from data.json`);
            
            // Update UI to show data is loaded
            showDataLoadedNotification(data.length);
        } else {
            throw new Error('Failed to load data.json');
        }
    } catch (error) {
        // data.json not found or failed to load, show error
        console.log('⚠️ Failed to load data.json. Please ensure the file exists and is properly formatted.');
        console.log('💡 Check console for details.');
        showError('⚠️ Gagal memuat data siswa. Pastikan file data.json ada dan formatnya bener!');
    }
}

/**
 * Load data from CSV file
 * File format: data.csv
 * 
 * Example structure:
 * nipd,nama,kelas,jurusan,tahunAjaran,status
 * 2425.1.0001,Ahmad Fauzi,XII Keperawatan 1,Keperawatan,2024/2025,LULUS
 */
async function loadFromCSV() {
    try {
        const response = await fetch('data.csv');
        
        if (response.ok) {
            const csvText = await response.text();
            const data = parseCSV(csvText);
            window.externalStudentData = data;
            console.log(`✅ Loaded ${data.length} students from data.csv`);
        }
    } catch (error) {
        console.log('ℹ️ data.csv not found');
    }
}

/**
 * Parse CSV text to array of objects
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length === headers.length) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            data.push(obj);
        }
    }
    
    return data;
}

/**
 * Show notification when external data is loaded
 */
function showDataLoadedNotification(count) {
    const notification = document.createElement('div');
    notification.className = 'data-loaded-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Data berhasil dimuat: ${count} siswa</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 255, 136, 0.9);
        color: var(--cyber-dark);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Delay execution for specified milliseconds
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Play success animation (confetti effect)
 */
function playSuccessAnimation() {
    // Create confetti particles
    const colors = ['#00f5ff', '#ff00e6', '#00ff88', '#ffcc00'];
    
    for (let i = 0; i < 30; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }
}

/**
 * Create individual confetti particle
 */
function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 9999;
        animation: fall ${2 + Math.random() * 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

/**
 * Export data to JSON file
 */
function exportToJSON(data, filename = 'student_data.json') {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

/**
 * Export data to CSV file
 */
function exportToCSV(data, filename = 'student_data.csv') {
    if (data.length === 0) {
        console.error('No data to export');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

// ========================================
// CONSOLE HELPERS
// ========================================

console.log(`
╔══════════════════════════════════════════════════════════╗
║   🎓 PORTAL KELULUSAN - SMKS Kesehatan SDM Sumedang 🎓  ║
╠══════════════════════════════════════════════════════════╣
║   Status: Ready                                          ║
║   Sample NIPD: 1234567890, 2345678901, etc.             ║
║                                                          ║
║   Commands:                                              ║
║   - exportToJSON(studentData) - Export to JSON          ║
║   - exportToCSV(studentData) - Export to CSV            ║
╚══════════════════════════════════════════════════════════╝
`);

// Make functions available globally for debugging
window.exportToJSON = exportToJSON;
window.exportToCSV = exportToCSV;
window.studentData = studentData;
