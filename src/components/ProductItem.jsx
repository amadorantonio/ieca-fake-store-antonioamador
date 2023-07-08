import { Link } from "react-router-dom";
import { useCartContext } from "../provider/CartProvider";

const ProductItem = ({ product }) => {
  const { dispatch } = useCartContext();

  return (
    <div className="flex flex-col border border-gray-300 shadow-sm rounded-xl p-4">
      <img
        src={product.image}
        alt={product.title}
        className="h-28 object-cover self-center"
      />
      <h2 className="font-bold">{product.title}</h2>
      <span>${product.price}</span>
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
      <Link to={`/product/${product.id}`}>
        <button
          className="bg-black hover:bg-gray-800 text-white rounded-md p-2 mt-2 w-full"
        >
          Ver detalle
        </button>
      </Link>
    </div>
  );
};

export default ProductItem;