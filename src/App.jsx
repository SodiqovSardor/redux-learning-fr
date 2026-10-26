import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "./Features/GetProductsSlice";
import { deleteProducts } from "./Features/DeleteProductSlice";
import { useState } from "react";
import { addProduct } from "./Features/AddProductSlice";
import { editProducts } from "./Features/EditProductSlice";

const App = () => {
  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useSelector((state) => state.getproducts);
  const {
    data: deleteData,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.deleteproducts);
  const {
    data: addData,
    loading: addLoading,
    error: addError,
  } = useSelector((state) => state.addproducts);
  const {
    data: editData,
    loading: editLoading,
    error: editError,
  } = useSelector((state) => state.editproducts);

  const [id , setId] = useState('1')
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ title, price }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({ id, title }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (getLoading) {
    return <h1>Loading...</h1>;
  }
  if (getError) {
    return <h1>Some error happened...</h1>;
  }
  console.log(getData);
  return (
    <div>
      <div>
        <h1> Add Products</h1>
        <form onSubmit={handleAddSubmit}>
          <div>
            <input
              type="text"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </button>
        </form>
      </div>
      {getData &&
        getData.map((product) => (
          <div key={product.id}>
            <h2>Title : {product.title}</h2>
            <button
              onClick={() => {
                dispatch(deleteProducts(product.id));
              }}
            >
              Delete
            </button>
            <button>Edit</button>
          </div>
        ))}
    </div>
  );
};

export default App;
