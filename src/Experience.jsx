import React from "react";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: "AI Student Researcher",
      company: "AiLECS",
      date: "Mar 2025 - Nov 2025",
      technologies: "Python",
      achievements: [
        "Fine tuned and benchmarked existing CNNs, Transformers and MLLMs for weapon detection.",
        "Proposed a pipeline involving LLMDET and Qwen2.5VL for detection and contextual scene understanding under surveillance environments."
      ],
      side: "left"
    },
    {
      id: 2,
      position: "Software Engineer",
      company: "Monash High Powered Rocketry",
      date: "Mar 2023 - Aug 2025",
      technologies: "Cython, Python, Bash",
      achievements: [
        "Collaborated in a team of over 100 members to build Australia’s first fully SRAD (Student Research and Designed) rocket to reach 10000 feet.",
        "Maintained existing in-house built simulation software by addressing issues including feature development and hotfixes.",
        "Built automation scripts to execute simulations and generate flightline analyses, reducing manual intervention and minimising the risk of human error during critical launch phases."
      ],
      side: "right"
    },
    {
      id: 3,
      position: "Data Scientist",
      company: "Coles Group",
      date: "Jul 2024 - Dec 2024",
      technologies: "PowerQuery, SQL, DAX",
      achievements: [
        "Utilised PowerBI to create dashboards to validate item sales forecast data",
        "Managed Snowflake tables for efficient PowerBI data integration and analysis resulting in reduced load time by 67%.",
        "Prepared technical documentation on custom visualisations and methods used, as well as delivering presentations showcasing such visualisations."
      ],
      side: "left"
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <h2>Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp) => (
          <div key={exp.id} className={`timeline-item ${exp.side}`}>
            <div className="timeline-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              {/* <p className="technologies">🔧 {exp.technologies}</p> */}
              <div className="achievements">
                {exp.achievements.map((achievement, index) => (
                  <p key={index}>• {achievement}</p>
                ))}
              </div>
            </div>
            <div className="timeline-dot">
              <div className="dot-icon">💼</div>
            </div>
            <div className="timeline-date">{exp.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;