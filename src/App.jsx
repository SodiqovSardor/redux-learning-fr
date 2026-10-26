import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Features/GetProductsSlice";
import { deleteProducts } from "./Features/DeleteProductSlice";
import { addProduct } from "./Features/AddProductSlice";
import { editProducts } from "./Features/EditProductSlice"; // Fixed import name

const App = () => {
  const dispatch = useDispatch(); // Moved to the top

  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useSelector((state) => state.getproducts);
  
  const { loading: deleteLoading } = useSelector((state) => state.deleteproducts);
  const { loading: addLoading } = useSelector((state) => state.addproducts);
  const { loading: editLoading } = useSelector((state) => state.editproducts);

  const [id, setId] = useState(""); // Track ID for editing
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if we are adding or editing

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ title, price }));
    setTitle("");
    setPrice("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editProducts({ id, title })); // Fixed to editProducts
    setIsEditing(false);
    setId("");
    setTitle("");
  };

  // Helper to populate form for editing
  const handleStartEdit = (product) => {
    setIsEditing(true);
    setId(product.id);
    setTitle(product.title);
  };

  if (getLoading) {
    return <h1>Loading...</h1>;
  }
  if (getError) {
    return <h1>Some error happened...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h1>{isEditing ? `Edit Product (ID: ${id})` : "Add Products"}</h1>
        <form onSubmit={isEditing ? handleEditSubmit : handleAddSubmit}>
          <div>
            <input
              type="text"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {!isEditing && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" style={{ marginTop: "10px" }}>
            {isEditing ? (editLoading ? "Updating..." : "Update") : (addLoading ? "Adding..." : "Submit")}
          </button>
          {isEditing && (
            <button 
              type="button" 
              onClick={() => { setIsEditing(false); setTitle(""); }} 
              style={{ marginLeft: "10px", marginTop: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2>Product List</h2>
        {getData &&
          getData.map((product) => (
            <div key={product.id} style={{ marginBottom: "10px" }}>
              <span>{product.title}</span>
              <button
                onClick={() => dispatch(deleteProducts(product.id))}
                style={{ marginLeft: "10px" }}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => handleStartEdit(product)}
                style={{ marginLeft: "5px" }}
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
