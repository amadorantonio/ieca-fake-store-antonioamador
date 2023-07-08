import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useAPI from "../hooks/useAPI";
import ProductDetail from "../components/ProductDetail";
import { useCartContext } from "../provider/CartProvider";


const ProductDetailPage = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { getProduct } = useAPI();
    const {
        state: { cart },
      } = useCartContext();

    useEffect(() => {
        const asyncProduct = async () => {
            const product = await getProduct(id);

            product.inCart = cart.some(productInCart => productInCart.id === product.id)

            setProduct(product);
            setLoading(false)
        };
      
        asyncProduct();
    }, [cart])

    return(
        <section className="m-8">
            {loading && <p>Cargando...</p>}
            {!loading && <ProductDetail product={product}></ProductDetail>}
        </section>
    )
}

export default ProductDetailPage