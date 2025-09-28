// Load all projects and display in order: Python → SQL → Power BI → Excel → Tableau
async function loadAllProjectsInOrder() {
    const container = document.getElementById('allProjects');

    try {
        const response = await fetch('assets/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const allProjects = await response.json();

        // Define the desired order of types
        const typeOrder = ['python', 'sql', 'powerbi', 'excel', 'tableau'];

        // Sort projects by type order (and keep original order within each type)
        const sortedProjects = [...allProjects].sort((a, b) => {
            return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
        });

        if (sortedProjects.length === 0) {
            container.innerHTML = '<p>No projects available.</p>';
            return;
        }

        // Generate HTML for all projects in sorted order
        const projectsHTML = sortedProjects.map(project => {
            let bgColor = 'linear-gradient(45deg, var(--primary), var(--success))';
            if (project.type === 'sql') bgColor = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
            if (project.type === 'powerbi') bgColor = 'linear-gradient(45deg, #0078d4, #005a9e)';
            if (project.type === 'excel') bgColor = 'linear-gradient(45deg, #217346, #185c37)';
            if (project.type === 'tableau') bgColor = 'linear-gradient(45deg, #e68523, #d46b08)';

            return `
                <div class="project-card">
                    <div class="project-img" style="background: ${bgColor};">
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
            `;
        }).join('');

        container.innerHTML = projectsHTML;

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `<p>Failed to load projects. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadAllProjectsInOrder);