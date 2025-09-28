// Load Python projects dynamically with error handling
async function loadPythonProjects() {
    const container = document.getElementById('pythonProjects');
    
    try {
        // Try multiple paths
        const paths = ['assets/projects.json', '../projects.json', './assets/projects.json'];
        let response;
        let data;
        
        for (const path of paths) {
            try {
                response = await fetch(path);
                if (response.ok) {
                    data = await response.json();
                    break;
                }
            } catch (e) {
                console.log(`Path ${path} failed`);
            }
        }
        
        if (!data) {
            throw new Error('Could not load projects.json from any path');
        }
        
        const pythonProjects = data.filter(project => project.type === 'python');
        
        if (pythonProjects.length === 0) {
            container.innerHTML = '<p>No Python projects available.</p>';
            return;
        }
        
        const projectsHTML = pythonProjects.map(project => `
            <div class="project-card">
                <div class="project-img" style="background: linear-gradient(45deg, var(--primary), var(--success));">
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
        console.error('Error loading Python projects:', error);
        container.innerHTML = `<p>Failed to load projects. Error: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadPythonProjects);