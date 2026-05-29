
import './card.css';

const Cards = () => {
  const cards = [
    { id: 1, title: 'Card 1', content: 'This is the first card content', color: 'blue' },
    { id: 2, title: 'Card 2', content: 'This is the second card content', color: 'green' },
    { id: 3, title: 'Card 3', content: 'This is the third card content', color: 'red' },
    { id: 4, title: 'Card 4', content: 'This is the fourth card content', color: 'purple' },
    { id: 5, title: 'Card 5', content: 'This is the fifth card content', color: 'orange' },
    { id: 6, title: 'Card 6', content: 'This is the sixth card content', color: 'pink' },
    { id: 7, title: 'Card 7', content: 'This is the seventh card content', color: 'indigo' },
    { id: 8, title: 'Card 8', content: 'This is the eighth card content', color: 'teal' },
    { id: 9, title: 'Card 9', content: 'This is the ninth card content', color: 'cyan' },
  ];

  return (
    <div className="app">
      <h2 className="app-title">3x3 Card Grid</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className={`card card-${card.color}`}>
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-text">{card.content}</p>
              <button className="card-button">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
