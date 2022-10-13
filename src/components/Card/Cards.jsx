import "./Cards.css";
import { Link } from "react-router-dom";
import { Card } from "./Card";

const Cards = ({ cards }) => {
  return (
    <section className="cards-container">
      {cards.length ? (
        cards.map((card) => <Card key={card.id} card={card} />)
      ) : (
        <div className="card-empty">
          <h2 className="card-empty-title">There are not cards yet</h2>
          <Link className="btn-add-new-card" to="/weather-card/create">
            Add new card
          </Link>
        </div>
      )}
    </section>
  );
};

export { Cards };
