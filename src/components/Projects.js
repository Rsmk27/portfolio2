import React, { useState, useEffect } from 'react';
import projectData from '../data/projects.json';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectData);
  }, []);

  return (
    <div className="section" id="projects">
      <h2>Projects</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {projects.map(project => (
          <div key={project.id} style={{ border: '1px solid #555', padding: '1rem', borderRadius: '8px', width: '300px' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a> | 
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"> Live Demo</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
