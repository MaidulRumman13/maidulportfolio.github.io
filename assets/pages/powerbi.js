// Load Power BI projects dynamically
async function loadPowerBIProjects() {
    const container = document.getElementById('powerbiProjects');
    
    try {
        const response = await fetch('./assets/projects.json');
        const allProjects = await response.json();
        const powerbiProjects = allProjects.filter(project => project.type === 'powerbi');
        
        if (powerbiProjects.length === 0) {
            container.innerHTML = '<p>No Power BI projects available.</p>';
            return;
        }
        
        const projectsHTML = powerbiProjects.map(project => `
            <div class="project-card">
                <div class="project-img" style="background: linear-gradient(45deg, #0078d4, #005a9e);">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" class="btn">View Project</a>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = projectsHTML;
        
    } catch (error) {
        console.error('Error loading Power BI projects:', error);
        container.innerHTML = `<p>Failed to load projects. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPowerBIProjects);