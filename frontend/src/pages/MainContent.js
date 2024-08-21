import React from 'react';

function MainContent() {
  const renderCard = (title, description) => (
    <div className="card">
      <img src={`https://picsum.photos/200/150?random=${Math.random()}`} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );

  return (
    <main className="main-content">
      {['Most Played', 'Latest Songs', 'Your Recommendations'].map((section) => (
        <section key={section} className="content-section">
          <div className="section-header">
            <h2 className="section-title">{section}</h2>
            <a href="#" className="view-all">View all</a>
          </div>
          <div className="card-grid">
            {[1, 2, 3, 4].map((i) => renderCard(`${section} ${i}`, `Description for ${section.toLowerCase()} ${i}`))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default MainContent;