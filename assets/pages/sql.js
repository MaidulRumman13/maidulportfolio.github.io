// Load SQL projects (newest first)
async function loadSQLProjects() {
    const container = document.getElementById('sqlProjects');
    
    try {
        const response = await fetch('assets/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const allProjects = await response.json();
        const sqlProjects = allProjects.filter(project => project.type === 'sql');
        
        const reversedProjects = [...sqlProjects].reverse();
        
        if (reversedProjects.length === 0) {
            container.innerHTML = '<p>No SQL projects available.</p>';
            return;
        }
        
        const projectsHTML = reversedProjects.map(project => `
            <div class="project-card">
                <div class="project-img" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24);">
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
        console.error('Error loading SQL projects:', error);
        container.innerHTML = `<p>Failed to load projects. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadSQLProjects);