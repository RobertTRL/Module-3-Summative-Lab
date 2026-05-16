export default function ProductCard({ coffee }) {
    return (
        <div className="product-card">
            <img src={coffee.image} alt={coffee.name} />
            <div className="product-card__body">
                <span className="product-card__origin">{coffee.origin}</span>
                <h3>{coffee.name}</h3>
                <p>{coffee.description}</p>
                <span className="product-card__price">Ksh. {coffee.price}</span>
            </div>
        </div>
    )
}