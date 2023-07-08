import { useCartContext } from "../provider/CartProvider";


const ProductDetail = ({ product }) => {
    console.log("🚀 ~ file: ProductDetail.jsx:5 ~ ProductDetail ~ product:", product)
    const { dispatch } = useCartContext();
    return(
        <>
        <h1 className="text-center">{product.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 m-8">
            <div className="flex flex-col justify-around m-8">
                <p className="text-center text-lg">{product.description}</p>
                <div className="flex justify-around">
                    <span>Puntuación: {product.rating.rate}</span>
                    <span>Votos: {product.rating.count}</span>
                </div>
                <p className="text-center">${product.price}</p>
                {
                    product.inCart ?
                    (
                      <button
                        className="bg-red-400 hover:bg-red-600 text-white rounded-md p-2 mt-2"
                        onClick={() => {
                          dispatch({ type: "REMOVE_FROM_CART", payload: product });
                          alert("Producto eliminado del carrito");
                        }}
                      >
                        Eliminar del carrito
                      </button>
                    ):
                    (
                      <button
                        className="bg-emerald-300 hover:bg-emerald-600 text-white rounded-md p-2 mt-2"
                        onClick={() => {
                          dispatch({ type: "ADD_TO_CART", payload: product });
                          alert("Producto añadido al carrito");
                        }}
                      >
                        Añadir al carrito
                      </button>
                    )
                }
            </div>
            <div>
                <div className="flex justify-end">
                    <div className="bg-zinc-600 text-white p-3 w-fit rounded-full">
                        <span>{product.category}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src={product.image} alt={product.title} className="w-1/2" />
                </div>
            </div>
        </div>
        
        </>
    )
}

export default ProductDetail