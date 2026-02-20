import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div>
      <h2>All Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{project.title}</h3>
            <p><strong>Genre:</strong> {project.genre}</p>
            <p><strong>Marketing Budget:</strong> ₹{project.marketingBudget}</p>
            <p><strong>Target City:</strong> {project.targetCity}</p>

            <button
              onClick={() => navigate(`/projects/${project._id}`)}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewProjects;