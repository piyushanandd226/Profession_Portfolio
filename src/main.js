import React from 'https://esm.sh/react@18.3.1'
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client'
import '../js/script.js'

function App() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('a', { href: '#main-content', className: 'skip-link' }, 'Skip to main content'),
    React.createElement(
      'header',
      null,
      React.createElement('div', { className: 'scroll-progress', 'aria-hidden': 'true' },
        React.createElement('div', { className: 'scroll-progress-bar', id: 'scroll-progress-bar' })
      ),
      React.createElement(
        'nav',
        { 'aria-label': 'Primary' },
        React.createElement('a', { href: '#home', className: 'logo', 'aria-label': 'Piyush Kumar Anand — home' }, 'PKA'),
        React.createElement(
          'button',
          { type: 'button', className: 'hamburger', id: 'hamburger', 'aria-label': 'Open menu', 'aria-expanded': 'false', 'aria-controls': 'nav-links' },
            React.createElement('span', { className: 'hamburger-box', 'aria-hidden': 'true' },
            React.createElement('span', { className: 'hamburger-bar' }),
            React.createElement('span', { className: 'hamburger-bar' }),
            React.createElement('span', { className: 'hamburger-bar' })
          )
        ),
        React.createElement('ul', { id: 'nav-links' },
          React.createElement('li', null, React.createElement('a', { href: '#home' }, 'Home')),
          React.createElement('li', null, React.createElement('a', { href: '#about' }, 'About')),
          React.createElement('li', null, React.createElement('a', { href: '#experience' }, 'Experience')),
          React.createElement('li', null, React.createElement('a', { href: '#skills' }, 'Skills')),
          React.createElement('li', null, React.createElement('a', { href: '#projects' }, 'Projects')),
          React.createElement('li', null, React.createElement('a', { href: '#contact' }, 'Contact'))
        ),
        React.createElement('div', { className: 'nav-actions' },
          React.createElement('a', { href: 'asset/resume.pdf', className: 'nav-btn', download: true }, 'Resume')
        )
      )
    ),
    React.createElement('main', { id: 'main-content', tabIndex: '-1' },
      React.createElement('section', { id: 'home', className: 'hero' },
        React.createElement('div', { className: 'hero-grid' },
          React.createElement('div', { className: 'hero-copy' },
            React.createElement('span', { className: 'eyebrow' }, 'Senior Software Engineer'),
            React.createElement('h1', null, 'Piyush Kumar Anand'),
            React.createElement('p', null, 'Java • Spring Boot • Kafka • Reactive Systems • Cloud-Native Architecture'),
            React.createElement('div', { className: 'hero-actions' },
              React.createElement('a', { href: 'asset/resume.pdf', className: 'btn btn-primary', download: 'Piyush_Kumar_Anand_Resume.pdf' }, 'Download Resume'),
              React.createElement('a', { href: '#projects', className: 'btn btn-secondary' }, 'View Projects')
            )
          ),
          React.createElement('div', { className: 'hero-panel' },
            React.createElement('img', { src: 'asset/profile.png', alt: 'Piyush Kumar Anand', className: 'profile-photo', width: '240', height: '240', decoding: 'async', fetchpriority: 'high' })
          )
        )
      ),
      React.createElement('section', { id: 'about' },
        React.createElement('div', { className: 'container' },
          React.createElement('h2', null, 'About'),
          React.createElement('p', { className: 'section-lead' }, 'Senior Software Engineer with 5.6+ years of experience building high-scale, cloud-native platforms across telecom, automotive, and compliance domains.'),
          React.createElement('div', { className: 'contact-cards' },
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'What I Build'),
              React.createElement('p', null, 'Reactive Java microservices, secure API Gateway integrations, and event-driven systems powered by Kafka/RabbitMQ for real-time reliability.')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Impact Delivered'),
              React.createElement('p', null, 'Delivered 30% latency reduction, 20% throughput improvement, and 40% faster deployments through architecture optimization and CI/CD automation.')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Core Strengths'),
              React.createElement('p', null, 'Spring Boot/WebFlux, Kubernetes on AWS, resilient distributed design, and mentoring engineering teams on reactive programming practices.')
            )
          )
        )
      ),
      React.createElement('section', { id: 'experience' },
        React.createElement('div', { className: 'container' },
          React.createElement('h2', null, 'Experience'),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'Capgemini — Senior Software Engineer (Dec 2024 – Jun 2025)'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Architected Spring WebFlux microservices with WebClient + API Gateway for real-time Kafka provisioning at 50K+ scale.'),
              React.createElement('li', null, 'Implemented adaptive backpressure in Kafka pipelines, reducing latency by 30%.'),
              React.createElement('li', null, 'Automated CI/CD with Jenkins, Docker, Kubernetes on AWS EKS, cutting deployment cycles by 40%.')
            )
          ),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'British Telecom — Design Engineer (Nov 2022 – Dec 2024)'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Designed Spring MVC REST APIs with Feign + API Gateway using JWT, rate-limits, and circuit breakers.'),
              React.createElement('li', null, 'Migrated services to Spring WebFlux and optimized Kafka partitioning/consumer groups for scale.'),
              React.createElement('li', null, 'Introduced Playwright automation, reducing QA effort by 25%.')
            )
          ),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'Renault Nissan Technology — Senior Software Engineer (Nov 2019 – Nov 2022)'),
            React.createElement('ul', null,
              React.createElement('li', null, 'Migrated legacy Struts services to Spring Boot microservices for better modularity and maintainability.'),
              React.createElement('li', null, 'Built RxJava compliance pipelines and Kafka ingestion with schema registry/replay for data integrity.'),
              React.createElement('li', null, 'Raised automated coverage to 95% with JUnit + Mockito, reducing production defects.')
            )
          )
        )
      ),
      React.createElement('section', { id: 'skills' },
        React.createElement('div', { className: 'container' },
          React.createElement('h2', null, 'Skills'),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'Backend'),
            React.createElement('p', null, 'Java, Spring Boot, Spring MVC, Spring WebFlux, Hibernate, REST APIs, Feign Client, JWT, Redis, SQL.')
          ),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'Frontend'),
            React.createElement('p', null, 'JavaScript (ES6+), React, Angular, HTML5, CSS3.')
          ),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'DevOps & Cloud'),
            React.createElement('p', null, 'AWS (EKS, EC2, Lambda), Docker, Kubernetes, Jenkins, Git, CI/CD pipelines, observability and deployment automation.')
          ),
          React.createElement('div', { className: 'experience-item' },
            React.createElement('h3', null, 'Miscellaneous'),
            React.createElement('p', null, 'Kafka, RabbitMQ, Project Reactor, RxJava, Camunda, Vault, ELK Stack, Agile/Scrum, mentoring and system design (HLD/LLD).')
          )
        )
      ),
      React.createElement('section', { id: 'projects', className: 'section-alt' },
        React.createElement('div', { className: 'container' },
          React.createElement('h2', null, 'Projects'),
          React.createElement('div', { className: 'contact-cards' },
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'C Datacom (2024–2025)'),
              React.createElement('p', null, 'Built Spring Boot + Kafka reactive microservices with exactly-once semantics on AWS, delivering 30% lower latency and 20% higher throughput.')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'ESB Integration (2022–2024)'),
              React.createElement('p', null, 'Designed secure, resilient API Gateway patterns with Feign, JWT, rate limiting, circuit breaker, and reactive messaging for high-concurrency traffic.')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'BDTVV / CCV / BDCO2 (2019–2022)'),
              React.createElement('p', null, 'Modernized legacy services, improved telemetry throughput, and reduced reporting turnaround through pipeline and architecture upgrades.')
            )
          )
        )
      ),
      React.createElement('section', { id: 'contact', className: 'section-alt' },
        React.createElement('div', { className: 'container' },
          React.createElement('h2', null, 'Contact'),
          React.createElement('div', { className: 'contact-cards' },
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Email'),
              React.createElement('p', { className: 'contact-content' },
                React.createElement('a', { href: 'mailto:kumaranandpiyush5@gmail.com' }, 'kumaranandpiyush5@gmail.com'),
                ' ',
                React.createElement('button', { type: 'button', className: 'copy-btn', 'data-copy': 'kumaranandpiyush5@gmail.com' }, 'Copy')
              )
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Phone'),
              React.createElement('p', null, '+91-8210508660')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Location'),
              React.createElement('p', null, 'Bellandur, Bangalore')
            ),
            React.createElement('article', { className: 'contact-card' },
              React.createElement('h4', null, 'Social'),
              React.createElement('p', { className: 'contact-links' },
                React.createElement('a', { href: 'https://github.com/piyushanand226/piyushanand226.github.io', target: '_blank', rel: 'noopener noreferrer' }, 'GitHub'),
                ' · ',
                React.createElement('a', { href: 'https://www.linkedin.com/in/piyush-kumar-anand-096959355/', target: '_blank', rel: 'noopener noreferrer' }, 'LinkedIn')
              )
            )
          )
        )
      )
    ),

    React.createElement('footer', { className: 'container', style: { padding: '20px 24px 40px', textAlign: 'center', color: 'var(--text-muted)' } },
      React.createElement('small', null, '© All Rights Reserved Piyush Kumar Anand 2026')
    )
  )
}

createRoot(document.getElementById('root')).render(React.createElement(App))
