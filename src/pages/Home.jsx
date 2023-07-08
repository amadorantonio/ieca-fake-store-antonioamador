import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import ProductItem from "../components/ProductItem";
import { useCartContext } from "../provider/CartProvider";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getProducts } = useAPI();
  const {
    state: { cart },
  } = useCartContext();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {

    const asyncProducts = async () => {
      const products = await getProducts();

      const productsCart = products.map(product => {
        return{
          ...product,
          inCart: cart.some(productInCart => productInCart.id === product.id)
        }
      })

      setProducts(productsCart);
      setProductsFiltered(productsCart)
      setLoading(false)
    };

    asyncProducts()

    // getProducts()
    //   .then((products) => {
    //     setProducts(products);
    //     setLoading(false);
    //   })
    //   .catch((err) => console.error(err));
  }, [cart]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    setProductsFiltered(products.filter(product => product.title.toLowerCase().includes(inputValue.toLocaleLowerCase())))
  }, [inputValue])

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <h1>FakeStore</h1>
      {loading && <p>Cargando...</p>}
      {!loading && (
        <>
          <div>
            <label className="flex justify-center">
              <span className="sr-only">Buscar</span>
              <input onChange={handleInputChange} value={inputValue} className="placeholder:italic placeholder:text-slate-400 block bg-white w-1/2 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Escribe algo a buscar" type="text"/>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productsFiltered.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;