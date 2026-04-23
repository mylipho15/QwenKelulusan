/**
 * ========================================
 * Portal Kelulusan - SMKS Kesehatan SDM Sumedang
 * JavaScript File
 * ========================================
 * 
 * Features:
 * - DBLess system using JSON data file
 * - NIPD validation
 * - Result display with animations
 * - Error handling
 */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    DATA_FILE: 'data.json',
    MIN_NIPD_LENGTH: 9,
    MAX_NIPD_LENGTH: 9,
    LOADING_DELAY: 1500 // ms
};

// ========================================
// Sample Data (Fallback if JSON file not found)
// ========================================
const SAMPLE_DATA = [
    {
        "nipd": "242510001",
        "nama": "Ahmad Fauzi",
        "kelas": "XII TKJ 1",
        "jurusan": "Teknik Komputer dan Jaringan",
        "status": "LULUS",
        "nilai_rata": "88.5",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "242510002",
        "nama": "Siti Nurhaliza",
        "kelas": "XII TKJ 1",
        "jurusan": "Teknik Komputer dan Jaringan",
        "status": "LULUS",
        "nilai_rata": "92.3",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "242510003",
        "nama": "Budi Santoso",
        "kelas": "XII RPL 1",
        "jurusan": "Rekayasa Perangkat Lunak",
        "status": "LULUS",
        "nilai_rata": "85.7",
        "keterangan": "Dengan Predikat Memuaskan"
    },
    {
        "nipd": "242510004",
        "nama": "Dewi Lestari",
        "kelas": "XII AKL 1",
        "jurusan": "Akuntansi Keuangan Lembaga",
        "status": "LULUS",
        "nilai_rata": "90.1",
        "keterangan": "Dengan Predikat Sangat Memuaskan"
    },
    {
        "nipd": "242510005",
        "nama": "Eko Prasetyo",
        "kelas": "XII TKJ 2",
        "jurusan": "Teknik Komputer dan Jaringan",
        "status": "LULUS",
        "nilai_rata": "87.9",
        "keterangan": "Dengan Predikat Memuaskan"
    }
];

// ========================================
// Global Variables
// ========================================
let studentData = [];
let isLoading = false;

// ========================================
// DOM Elements
// ========================================
const elements = {
    form: null,
    nipdInput: null,
    loadingIndicator: null,
    resultDisplay: null,
    errorDisplay: null,
    resultContent: null,
    errorMessage: null
};

// ========================================
// Initialize Application
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeEventListeners();
    loadStudentData();
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    elements.form = document.getElementById('graduationForm');
    elements.nipdInput = document.getElementById('nipdInput');
    elements.loadingIndicator = document.getElementById('loadingIndicator');
    elements.resultDisplay = document.getElementById('resultDisplay');
    elements.errorDisplay = document.getElementById('errorDisplay');
    elements.resultContent = document.getElementById('resultContent');
    elements.errorMessage = document.getElementById('errorMessage');
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Form submission
    if (elements.form) {
        elements.form.addEventListener('submit', handleFormSubmit);
    }
    
    // Input validation on typing
    if (elements.nipdInput) {
        elements.nipdInput.addEventListener('input', handleNipdInput);
        elements.nipdInput.addEventListener('keypress', handleNumericOnly);
    }
}

/**
 * Load student data from JSON file
 */
async function loadStudentData() {
    try {
        const response = await fetch(CONFIG.DATA_FILE);
        
        if (!response.ok) {
            throw new Error('Failed to load data file');
        }
        
        studentData = await response.json();
        console.log('✅ Data loaded successfully:', studentData.length, 'students');
        
    } catch (error) {
        console.warn('⚠️ Using sample data (JSON file not found):', error.message);
        studentData = SAMPLE_DATA;
    }
}

/**
 * Handle NIPD input - only allow numbers
 */
function handleNumericOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    
    // Allow numbers (48-57), backspace (8), delete (46), tab (9), arrow keys
    if (charCode > 31 && (charCode < 48 || charCode > 57) && 
        ![8, 9, 46, 37, 38, 39, 40].includes(charCode)) {
        event.preventDefault();
        return false;
    }
}

/**
 * Handle NIPD input formatting
 */
function handleNipdInput(event) {
    const input = event.target;
    let value = input.value;
    
    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');
    
    // Limit to max length
    if (value.length > CONFIG.MAX_NIPD_LENGTH) {
        value = value.substring(0, CONFIG.MAX_NIPD_LENGTH);
    }
    
    input.value = value;
    
    // Hide previous results when user starts typing
    hideResults();
    hideError();
}

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const nipd = elements.nipdInput.value.trim();
    
    // Validate NIPD
    if (!validateNipd(nipd)) {
        showError('NIPD harus terdiri dari 9 digit angka!');
        return;
    }
    
    // Check if already loading
    if (isLoading) {
        return;
    }
    
    // Start loading
    startLoading();
    
    // Simulate network delay for better UX
    await sleep(CONFIG.LOADING_DELAY);
    
    // Search for student
    const student = findStudentByNipd(nipd);
    
    // Stop loading
    stopLoading();
    
    // Display result
    if (student) {
        displayResult(student);
    } else {
        showError('Data siswa dengan NIPD ' + nipd + ' tidak ditemukan. Silahkan periksa kembali NIPD Anda atau hubungi admin.');
    }
}

/**
 * Validate NIPD format
 */
function validateNipd(nipd) {
    if (!nipd) return false;
    if (nipd.length !== CONFIG.MIN_NIPD_LENGTH) return false;
    if (!/^\d{9}$/.test(nipd)) return false;
    return true;
}

/**
 * Find student by NIPD
 */
function findStudentByNipd(nipd) {
    return studentData.find(student => student.nipd === nipd);
}

/**
 * Display search result
 */
function displayResult(student) {
    const isGraduated = student.status.toUpperCase() === 'LULUS';
    const statusColor = isGraduated ? '#00ff41' : '#ff003c';
    const statusGlow = isGraduated ? 
        '0 0 10px rgba(0, 255, 65, 0.7), 0 0 20px rgba(0, 255, 65, 0.5)' :
        '0 0 10px rgba(255, 0, 60, 0.7), 0 0 20px rgba(255, 0, 60, 0.5)';
    
    const html = `
        <div class="student-info">
            <div class="info-item">
                <div class="info-label"><i class="fas fa-id-card"></i> NIPD</div>
                <div class="info-value">${formatNipd(student.nipd)}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-user"></i> Nama Siswa</div>
                <div class="info-value">${student.nama}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-chalkboard-teacher"></i> Kelas</div>
                <div class="info-value">${student.kelas}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-graduation-cap"></i> Jurusan</div>
                <div class="info-value">${student.jurusan}</div>
            </div>
            ${student.nilai_rata ? `
            <div class="info-item">
                <div class="info-label"><i class="fas fa-star"></i> Nilai Rata-rata</div>
                <div class="info-value">${student.nilai_rata}</div>
            </div>
            ` : ''}
        </div>
        
        <div class="graduation-status">
            <p style="margin-bottom: 0.5rem; font-size: 1.1rem;">Status Kelulusan:</p>
            <div class="status-badge" style="color: ${statusColor}; text-shadow: ${statusGlow};">
                <i class="fas ${isGraduated ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                ${student.status}
            </div>
            ${student.keterangan ? `
            <p style="margin-top: 1rem; color: ${statusColor}; font-size: 1rem;">
                ${student.keterangan}
            </p>
            ` : ''}
        </div>
        
        <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="printResult()" class="btn cyber-btn" style="font-size: 1rem; padding: 0.75rem 1.5rem;">
                <i class="fas fa-print"></i> Cetak Hasil
            </button>
            <button onclick="resetSearch()" class="btn cyber-btn" style="font-size: 1rem; padding: 0.75rem 1.5rem; margin-left: 0.5rem; background: linear-gradient(135deg, #ff00ff 0%, #9d00ff 100%);">
                <i class="fas fa-redo"></i> Cek Lagi
            </button>
        </div>
    `;
    
    elements.resultContent.innerHTML = html;
    elements.resultDisplay.classList.remove('d-none');
    
    // Scroll to result
    setTimeout(() => {
        elements.resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/**
 * Show error message
 */
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorDisplay.classList.remove('d-none');
    
    // Hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    elements.errorDisplay.classList.add('d-none');
}

/**
 * Hide results
 */
function hideResults() {
    elements.resultDisplay.classList.add('d-none');
}

/**
 * Start loading state
 */
function startLoading() {
    isLoading = true;
    elements.loadingIndicator.classList.remove('d-none');
    elements.form.querySelector('button[type="submit"]').disabled = true;
    elements.nipdInput.disabled = true;
}

/**
 * Stop loading state
 */
function stopLoading() {
    isLoading = false;
    elements.loadingIndicator.classList.add('d-none');
    elements.form.querySelector('button[type="submit"]').disabled = false;
    elements.nipdInput.disabled = false;
    elements.nipdInput.focus();
}

/**
 * Reset search form
 */
function resetSearch() {
    elements.nipdInput.value = '';
    hideResults();
    hideError();
    elements.nipdInput.focus();
}

/**
 * Print result
 */
function printResult() {
    window.print();
}

/**
 * Format NIPD with dashes (optional)
 */
function formatNipd(nipd) {
    // You can customize the format here
    // Example: 242-510-001
    return nipd;
}

/**
 * Sleep utility function
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * SweetAlert2 integration for beautiful alerts
 */
function showSuccessAlert(message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Berhasil!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            background: 'rgba(10, 10, 15, 0.95)',
            color: '#e0e0e0',
            confirmButtonColor: '#00ffff',
            backdrop: `
                rgba(0, 0, 0, 0.8)
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' stroke='rgba(0, 255, 255, 0.1)' fill='none'/%3E%3C/svg%3E")
                left top
                no-repeat
            `
        });
    }
}

/**
 * Show info alert
 */
function showInfoAlert(message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Informasi',
            text: message,
            icon: 'info',
            confirmButtonText: 'Mengerti',
            background: 'rgba(10, 10, 15, 0.95)',
            color: '#e0e0e0',
            confirmButtonColor: '#00ffff'
        });
    }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance
 */
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

/**
 * Throttle function for performance
 */
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

/**
 * Log with timestamp
 */
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅';
    console.log(`${prefix} [${timestamp}] ${message}`);
}

/**
 * Export data to CSV (for admin use)
 */
function exportToCSV() {
    if (studentData.length === 0) {
        console.warn('No data to export');
        return;
    }
    
    const headers = Object.keys(studentData[0]);
    const csv = [
        headers.join(','),
        ...studentData.map(row => 
            headers.map(fieldName => 
                JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)
            ).join(',')
        )
    ].join('\r\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data_kelulusan.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Make functions available globally
window.resetSearch = resetSearch;
window.printResult = printResult;
window.exportToCSV = exportToCSV;


console.log('🚀 Portal Kelulusan initialized successfully!');
console.log('📊 Loaded', studentData.length, 'student records');
