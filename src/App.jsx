import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "./Features/Products/GetProductsSlice";
import { deleteProducts } from "./Features/Products/DeleteProductSlice";
import { useState } from "react";
import { addProducts } from "./Features/Products/AddProductSlice";

const App = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProducts({
        title,
        price: Number(price),
      })
    );
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error while getting products...</h1>;
  }

  console.log(data);

  return (
    <div>
      <div>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="enter the price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <button
              onClick={() => {
                dispatch(deleteProducts(product.id));
              }}
            >
              Delete
            </button>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
