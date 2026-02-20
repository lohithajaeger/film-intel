import { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [project, setProject] = useState({
    title: "",
    genre: "",
    description: "",
    marketingBudget: "",
    targetCity: "",
    releaseDate: "",
    cast: [{ name: "", role: "" }]
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleCastChange = (index, e) => {
    const newCast = [...project.cast];
    newCast[index][e.target.name] = e.target.value;
    setProject({ ...project, cast: newCast });
  };

  const addCastMember = () => {
    setProject({
      ...project,
      cast: [...project.cast, { name: "", role: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/api/projects", project);
      alert("Project Created Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating project");
    }
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="genre" placeholder="Genre" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="marketingBudget" placeholder="Marketing Budget" type="number" onChange={handleChange} />
        <input name="targetCity" placeholder="Target City" onChange={handleChange} />
        <input name="releaseDate" type="date" onChange={handleChange} />

        <h4>Cast</h4>
        {project.cast.map((member, index) => (
          <div key={index}>
            <input
              name="name"
              placeholder="Actor Name"
              onChange={(e) => handleCastChange(index, e)}
            />
            <input
              name="role"
              placeholder="Role"
              onChange={(e) => handleCastChange(index, e)}
            />
          </div>
        ))}

        <button type="button" onClick={addCastMember}>
          Add Cast Member
        </button>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;