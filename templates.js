// Resume templates with different styling approaches
const templates = {
    modern: {
        name: 'Modern',
        render: (data) => {
            return `
                <div class="template-modern">
                    <div class="resume-header">
                        <div class="resume-name">${data.fullName || 'Your Name'}</div>
                        <div class="resume-title">${data.jobTitle || 'Job Title'}</div>
                        <div class="resume-contact">
                            ${data.email ? `<span><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                            ${data.phone ? `<span><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                            ${data.address ? `<span><i class="fas fa-map-marker-alt"></i> ${data.address}</span>` : ''}
                            ${data.linkedin ? `<span><i class="fab fa-linkedin"></i> ${data.linkedin}</span>` : ''}
                        </div>
                    </div>
                    
                    ${data.summary ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Professional Summary</div>
                            <div>${data.summary}</div>
                        </div>
                    ` : ''}
                    
                    ${data.experience && data.experience.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Work Experience</div>
                            ${data.experience.map(exp => `
                                <div class="experience-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${exp.position || 'Position'}</div>
                                            <div class="entry-company">${exp.company || 'Company'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${exp.startDate || 'Start'} - ${exp.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.education && data.education.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Education</div>
                            ${data.education.map(edu => `
                                <div class="education-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${edu.degree || 'Degree'}</div>
                                            <div class="entry-school">${edu.school || 'School'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${edu.startDate || 'Start'} - ${edu.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${edu.description ? `<div class="entry-description">${edu.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.skills ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Skills</div>
                            <div class="skills-list">
                                ${data.skills.split(',').map(skill => 
                                    `<span class="skill-tag">${skill.trim()}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    },
    
    classic: {
        name: 'Classic',
        render: (data) => {
            return `
                <div class="template-classic">
                    <div class="resume-header">
                        <div class="resume-name">${data.fullName || 'Your Name'}</div>
                        <div class="resume-title">${data.jobTitle || 'Job Title'}</div>
                        <div class="resume-contact">
                            ${data.email ? `<span>${data.email}</span>` : ''}
                            ${data.phone ? `<span>${data.phone}</span>` : ''}
                            ${data.address ? `<span>${data.address}</span>` : ''}
                            ${data.linkedin ? `<span>${data.linkedin}</span>` : ''}
                        </div>
                    </div>
                    
                    ${data.summary ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Summary</div>
                            <div>${data.summary}</div>
                        </div>
                    ` : ''}
                    
                    ${data.experience && data.experience.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Experience</div>
                            ${data.experience.map(exp => `
                                <div class="experience-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${exp.position || 'Position'}</div>
                                            <div class="entry-company">${exp.company || 'Company'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${exp.startDate || 'Start'} - ${exp.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.education && data.education.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Education</div>
                            ${data.education.map(edu => `
                                <div class="education-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${edu.degree || 'Degree'}</div>
                                            <div class="entry-school">${edu.school || 'School'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${edu.startDate || 'Start'} - ${edu.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${edu.description ? `<div class="entry-description">${edu.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.skills ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Skills</div>
                            <div class="skills-list">
                                ${data.skills.split(',').map(skill => 
                                    `<span class="skill-tag">${skill.trim()}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    },
    
    minimal: {
        name: 'Minimal',
        render: (data) => {
            return `
                <div class="template-minimal">
                    <div class="resume-header">
                        <div class="resume-name">${data.fullName || 'Your Name'}</div>
                        <div class="resume-title">${data.jobTitle || 'Job Title'}</div>
                        <div class="resume-contact">
                            ${data.email ? `<span>${data.email}</span>` : ''}
                            ${data.phone ? `<span>${data.phone}</span>` : ''}
                            ${data.address ? `<span>${data.address}</span>` : ''}
                            ${data.linkedin ? `<span>${data.linkedin}</span>` : ''}
                        </div>
                    </div>
                    
                    ${data.summary ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Summary</div>
                            <div>${data.summary}</div>
                        </div>
                    ` : ''}
                    
                    ${data.experience && data.experience.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Experience</div>
                            ${data.experience.map(exp => `
                                <div class="experience-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${exp.position || 'Position'}</div>
                                            <div class="entry-company">${exp.company || 'Company'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${exp.startDate || 'Start'} - ${exp.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.education && data.education.length > 0 ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Education</div>
                            ${data.education.map(edu => `
                                <div class="education-entry">
                                    <div class="entry-header">
                                        <div>
                                            <div class="entry-title">${edu.degree || 'Degree'}</div>
                                            <div class="entry-school">${edu.school || 'School'}</div>
                                        </div>
                                        <div class="entry-dates">
                                            ${edu.startDate || 'Start'} - ${edu.endDate || 'End'}
                                        </div>
                                    </div>
                                    ${edu.description ? `<div class="entry-description">${edu.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${data.skills ? `
                        <div class="resume-section">
                            <div class="resume-section-title">Skills</div>
                            <div class="skills-list">
                                ${data.skills.split(',').map(skill => 
                                    `<span class="skill-tag">${skill.trim()}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
};
