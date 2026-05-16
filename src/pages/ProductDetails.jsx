import { useParams , useNavigate } from "react-router-dom"
import { useProducts } from "../context/ProductsContext"
import '../styles/ProductDetails.css'

export default function ProductDetails() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { productsData } = useProducts()
    console.log(productsData)
    const product = productsData.find(product => product.id == parseInt(id))

    if (!product) return <p>Loading...</p>

    return (
        <div className="product-detail">
      <button className="back-btn" onClick={() => navigate("/shop")}>
        ← Back to shop
      </button>

      <div className="product-detail__content">
        <div className="product-detail__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail__info">
          <span className="product-detail__origin">{product.origin}</span>
          <h1>{product.name}</h1>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__price">
            KES {product.price}
          </div>
        </div>
      </div>
    </div>
    )
}