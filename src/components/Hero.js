import React from 'react';

const Hero = () => {
  return (
    <div className="section" id="hero">
      <h1>RSMK</h1>
      <p>Electrical & Electronics Engineering Student | AI Enthusiast | Web Developer</p>
      <button>View Projects</button>
      <button style={{ marginLeft: '1rem' }}>Contact Me</button>
    </div>
  );
};

export default Hero;```

`src/components/About.js`
```javascript
import React from 'react';

const About = () => {
  return (
    <div className="section" id="about">
      <h2>About Me</h2>
      <p>
        I am an Electrical & Electronics Engineering student with a keen interest in AI, Web Development, and Green Tech. 
        I am passionate about building solutions that are not only innovative but also sustainable.
      </p>
    </div>
  );
};

export default About;
