// Resume Builder Application
let currentTemplate = 'modern';
let experienceCount = 0;
let educationCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updatePreview();
});

function initializeApp() {
    // Add initial experience and education entries
    addExperience();
    addEducation();
    
    // Load saved data if available
    loadFromStorage();
}

function setupEventListeners() {
    // Add event listeners to all form inputs for real-time updates
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.id !== 'templateSelect') {
            input.addEventListener('input', updatePreview);
        }
    });
    
    // Handle form validation
    document.getElementById('fullName').addEventListener('blur', validateRequired);
    document.getElementById('email').addEventListener('blur', validateEmail);
}

function validateRequired(event) {
    const input = event.target;
    const errorDiv = input.nextElementSibling;
    
    if (!input.value.trim()) {
        input.classList.add('is-invalid');
        if (!errorDiv || !errorDiv.classList.contains('error')) {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'This field is required';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorDiv && errorDiv.classList.contains('error')) {
            errorDiv.remove();
        }
    }
}

function validateEmail(event) {
    const input = event.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorDiv = input.nextElementSibling;
    
    if (input.value && !emailRegex.test(input.value)) {
        input.classList.add('is-invalid');
        if (!errorDiv || !errorDiv.classList.contains('error')) {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = 'Please enter a valid email address';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    } else {
        input.classList.remove('is-invalid');
        if (input.value) {
            input.classList.add('is-valid');
        }
        if (errorDiv && errorDiv.classList.contains('error')) {
            errorDiv.remove();
        }
    }
}

function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'experience-item fade-in';
    experienceDiv.innerHTML = `
        <div class="item-header">
            <h6>Experience ${experienceCount}</h6>
            <button type="button" class="remove-btn" onclick="removeExperience(this)" title="Remove Experience">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Position</label>
                <input type="text" class="form-control experience-position" oninput="updatePreview()">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Company</label>
                <input type="text" class="form-control experience-company" oninput="updatePreview()">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input type="text" class="form-control experience-start" placeholder="MM/YYYY" oninput="updatePreview()">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input type="text" class="form-control experience-end" placeholder="MM/YYYY or Present" oninput="updatePreview()">
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control experience-description" rows="3" placeholder="Describe your responsibilities and achievements..." oninput="updatePreview()"></textarea>
        </div>
    `;
    container.appendChild(experienceDiv);
}

function removeExperience(button) {
    const experienceItem = button.closest('.experience-item');
    experienceItem.remove();
    updatePreview();
}

function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-item fade-in';
    educationDiv.innerHTML = `
        <div class="item-header">
            <h6>Education ${educationCount}</h6>
            <button type="button" class="remove-btn" onclick="removeEducation(this)" title="Remove Education">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Degree</label>
                <input type="text" class="form-control education-degree" oninput="updatePreview()">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">School</label>
                <input type="text" class="form-control education-school" oninput="updatePreview()">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Start Date</label>
                <input type="text" class="form-control education-start" placeholder="YYYY" oninput="updatePreview()">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">End Date</label>
                <input type="text" class="form-control education-end" placeholder="YYYY or Present" oninput="updatePreview()">
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control education-description" rows="2" placeholder="Additional details (optional)..." oninput="updatePreview()"></textarea>
        </div>
    `;
    container.appendChild(educationDiv);
}

function removeEducation(button) {
    const educationItem = button.closest('.education-item');
    educationItem.remove();
    updatePreview();
}

function changeTemplate() {
    currentTemplate = document.getElementById('templateSelect').value;
    updatePreview();
}

function updatePreview() {
    const data = collectFormData();
    const template = template[currentTemplate];
    const previewContainer = document.getElementById('resumePreview');
    
    if (template && template.render) {
        previewContainer.innerHTML = template.render(data);
    } else {
        previewContainer.innerHTML = '<div class="error">Template not found</div>';
    }
}

function collectFormData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        experience: [],
        education: []
    };
    
    // Collect experience data
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const position = item.querySelector('.experience-position').value;
        const company = item.querySelector('.experience-company').value;
        const startDate = item.querySelector('.experience-start').value;
        const endDate = item.querySelector('.experience-end').value;
        const description = item.querySelector('.experience-description').value;
        
        if (position || company || startDate || endDate || description) {
            data.experience.push({
                position,
                company,
                startDate,
                endDate,
                description
            });
        }
    });
    
    // Collect education data
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        const degree = item.querySelector('.education-degree').value;
        const school = item.querySelector('.education-school').value;
        const startDate = item.querySelector('.education-start').value;
        const endDate = item.querySelector('.education-end').value;
        const description = item.querySelector('.education-description').value;
        
        if (degree || school || startDate || endDate || description) {
            data.education.push({
                degree,
                school,
                startDate,
                endDate,
                description
            });
        }
    });
    
    return data;
}

function saveResume() {
    try {
        const data = collectFormData();
        data.template = currentTemplate;
        data.timestamp = new Date().toISOString();
        
        localStorage.setItem('resumeData', JSON.stringify(data));
        showNotification('Resume saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving resume:', error);
        showNotification('Error saving resume. Please try again.', 'error');
    }
}

function loadResume() {
    try {
        const savedData = localStorage.getItem('resumeData');
        if (!savedData) {
            showNotification('No saved resume found.', 'error');
            return;
        }
        
        const data = JSON.parse(savedData);
        populateForm(data);
        showNotification('Resume loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading resume:', error);
        showNotification('Error loading resume. Please try again.', 'error');
    }
}

function loadFromStorage() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            populateForm(data);
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

function populateForm(data) {
    // Populate basic fields
    document.getElementById('fullName').value = data.fullName || '';
    document.getElementById('jobTitle').value = data.jobTitle || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('phone').value = data.phone || '';
    document.getElementById('address').value = data.address || '';
    document.getElementById('linkedin').value = data.linkedin || '';
    document.getElementById('summary').value = data.summary || '';
    document.getElementById('skills').value = data.skills || '';
    
    // Set template
    if (data.template) {
        currentTemplate = data.template;
        document.getElementById('templateSelect').value = currentTemplate;
    }
    
    // Clear existing experience and education
    document.getElementById('experienceContainer').innerHTML = '';
    document.getElementById('educationContainer').innerHTML = '';
    experienceCount = 0;
    educationCount = 0;
    
    // Populate experience
    if (data.experience && data.experience.length > 0) {
        data.experience.forEach(exp => {
            addExperience();
            const items = document.querySelectorAll('.experience-item');
            const lastItem = items[items.length - 1];
            
            lastItem.querySelector('.experience-position').value = exp.position || '';
            lastItem.querySelector('.experience-company').value = exp.company || '';
            lastItem.querySelector('.experience-start').value = exp.startDate || '';
            lastItem.querySelector('.experience-end').value = exp.endDate || '';
            lastItem.querySelector('.experience-description').value = exp.description || '';
        });
    } else {
        addExperience();
    }
    
    // Populate education
    if (data.education && data.education.length > 0) {
        data.education.forEach(edu => {
            addEducation();
            const items = document.querySelectorAll('.education-item');
            const lastItem = items[items.length - 1];
            
            lastItem.querySelector('.education-degree').value = edu.degree || '';
            lastItem.querySelector('.education-school').value = edu.school || '';
            lastItem.querySelector('.education-start').value = edu.startDate || '';
            lastItem.querySelector('.education-end').value = edu.endDate || '';
            lastItem.querySelector('.education-description').value = edu.description || '';
        });
    } else {
        addEducation();
    }
    
    updatePreview();
}

function exportPDF() {
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Generating...';
        button.disabled = true;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const data = collectFormData();
        
        // Set font
        doc.setFont('helvetica');
        
        // Add header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(data.fullName || 'Your Name', 20, 25);
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(data.jobTitle || 'Job Title', 20, 35);
        
        // Add contact info
        let yPos = 45;
        doc.setFontSize(10);
        const contacts = [];
        if (data.email) contacts.push(`Email: ${data.email}`);
        if (data.phone) contacts.push(`Phone: ${data.phone}`);
        if (data.address) contacts.push(`Address: ${data.address}`);
        if (data.linkedin) contacts.push(`LinkedIn: ${data.linkedin}`);
        
        doc.text(contacts.join(' | '), 20, yPos);
        yPos += 15;
        
        // Add summary
        if (data.summary) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('PROFESSIONAL SUMMARY', 20, yPos);
            yPos += 7;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const summaryLines = doc.splitTextToSize(data.summary, 170);
            doc.text(summaryLines, 20, yPos);
            yPos += summaryLines.length * 5 + 10;
        }
        
        // Add experience
        if (data.experience && data.experience.length > 0) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('WORK EXPERIENCE', 20, yPos);
            yPos += 7;
            
            data.experience.forEach(exp => {
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(exp.position || 'Position', 20, yPos);
                
                doc.setFont('helvetica', 'normal');
                doc.text(`${exp.company || 'Company'} | ${exp.startDate || 'Start'} - ${exp.endDate || 'End'}`, 20, yPos + 5);
                yPos += 12;
                
                if (exp.description) {
                    doc.setFontSize(10);
                    const descLines = doc.splitTextToSize(exp.description, 170);
                    doc.text(descLines, 20, yPos);
                    yPos += descLines.length * 4 + 8;
                }
            });
            yPos += 5;
        }
        
        // Add education
        if (data.education && data.education.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('EDUCATION', 20, yPos);
            yPos += 7;
            
            data.education.forEach(edu => {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(edu.degree || 'Degree', 20, yPos);
                
                doc.setFont('helvetica', 'normal');
                doc.text(`${edu.school || 'School'} | ${edu.startDate || 'Start'} - ${edu.endDate || 'End'}`, 20, yPos + 5);
                yPos += 12;
                
                if (edu.description) {
                    doc.setFontSize(10);
                    const descLines = doc.splitTextToSize(edu.description, 170);
                    doc.text(descLines, 20, yPos);
                    yPos += descLines.length * 4 + 8;
                }
            });
        }
        
        // Add skills
        if (data.skills) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('SKILLS', 20, yPos);
            yPos += 7;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const skillsText = data.skills.split(',').map(skill => skill.trim()).join(', ');
            const skillsLines = doc.splitTextToSize(skillsText, 170);
            doc.text(skillsLines, 20, yPos);
        }
        
        // Generate filename
        const filename = `${(data.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
        
        // Save the PDF
        doc.save(filename);
        
        showNotification('PDF exported successfully!', 'success');
        
        // Restore button
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
        
    } catch (error) {
        console.error('Error exporting PDF:', error);
        showNotification('Error exporting PDF. Please try again.', 'error');
        
        // Restore button
        const button = event.target;
        button.innerHTML = '<i class="fas fa-download me-1"></i>Export PDF';
        button.disabled = false;
    }
}

function printResume() {
    // Auto-save before printing
    saveResume();
    
    // Print the page
    window.print();
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// AI Suggestions functionality
async function getAISuggestions(section) {
    const button = event.target;
    const originalText = button.innerHTML;
    
    try {
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
        button.disabled = true;
        
        // Collect current form data
        const resumeData = collectFormData();
        
        // Make API request
        const response = await fetch('/api/ai-suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resumeData: resumeData,
                section: section
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Display suggestions
        displayAISuggestions(data.suggestions, section);
        showNotification(`AI suggestions for ${section} generated successfully!`, 'success');
        
    } catch (error) {
        console.error('Error getting AI suggestions:', error);
        showNotification('Unable to get AI suggestions. Please check your internet connection and try again.', 'error');
        
        // Show fallback message
        displayAISuggestions(['Unable to generate suggestions at this time. Please ensure you have filled in relevant information and try again.'], section);
    } finally {
        // Restore button
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function displayAISuggestions(suggestions, section) {
    const container = document.getElementById('aiSuggestionsContainer');
    
    const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
    
    container.innerHTML = `
        <div class="alert alert-light border">
            <div class="d-flex align-items-center mb-2">
                <i class="fas fa-brain text-primary me-2"></i>
                <strong>AI Suggestions for ${sectionTitle}</strong>
            </div>
            <ul class="mb-0">
                ${suggestions.map(suggestion => `<li class="mb-1">${suggestion}</li>`).join('')}
            </ul>
            <div class="mt-2">
                <small class="text-muted">
                    <i class="fas fa-info-circle me-1"></i>
                    These are AI-generated suggestions. Review and apply them based on your specific situation.
                </small>
            </div>
        </div>
    `;
    
    // Scroll to suggestions
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Auto-save functionality
setInterval(() => {
    const data = collectFormData();
    if (data.fullName || data.email || data.jobTitle) {
        localStorage.setItem('resumeData_autosave', JSON.stringify({
            ...data,
            template: currentTemplate,
            timestamp: new Date().toISOString()
        }));
    }
}, 30000); // Auto-save every 30 seconds

// Handle page unload
window.addEventListener('beforeunload', function(e) {
    const data = collectFormData();
    if (data.fullName || data.email || data.jobTitle) {
        saveResume();
    }
});
