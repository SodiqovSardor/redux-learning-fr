import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "./Features/Products/GetProductsSlice";
import { deleteProducts } from "./Features/Products/DeleteProductSlice";
import { useState } from "react";
import { addProducts } from "./Features/Products/AddProductSlice";
import { editProducts } from "./Features/Products/EditProductSlice";

const App = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setPrice("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { title, price: Number(price) };

    if (editingId) {
      dispatch(editProducts({ id: editingId, editedproduct: product }));
    } else {
      dispatch(addProducts(product));
    }

    resetForm();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error while getting products...</h1>;
  }

  return (
    <div>
      <div>
        <h1>{editingId ? "Edit Product" : "Add Product"}</h1>
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
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
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
            <button type="button" onClick={() => handleEdit(product)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
