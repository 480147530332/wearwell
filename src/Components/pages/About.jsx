import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Wear<span>Well</span></h1>
        <p>Building a better future with passion and innovation</p>
      </header>

      <section className="about-section fade-in">
        <h2 style={{color:'blue',textAlign:"center"}}>Our Story</h2>
        <p>
          Founded in 2023, we started as a small team with a big vision — to create products
          that simplify lives and empower businesses. Over the years, we’ve grown into a
          thriving company driven by creativity, integrity, and a commitment to quality.
        </p>
      </section>

      <section className="about-section fade-in delay-1">
        <h2 style={{color:'blue',textAlign:"center"}}>Our Mission</h2>
        <p>
          Our mission is to deliver innovative solutions that help our customers succeed. We
          focus on customer satisfaction, sustainable growth, and creating a positive impact
          on the community and environment.
        </p>
      </section>

      <section className="about-section fade-in delay-2">
        <h2 style={{color:'blue',textAlign:"center"}}>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Alice - CEO"
            />
            <h3>Alice Johnson</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Bob - CTO"
            />
            <h3>Bob Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Cara - Marketing"
            />
            <h3>Cara Davis</h3>
            <p>Marketing Lead</p>
          </div>
          {/* <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt="Dan - Product Manager"
            />
            <h3>Dan Lee</h3>
            <p>Product Manager</p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default About;
