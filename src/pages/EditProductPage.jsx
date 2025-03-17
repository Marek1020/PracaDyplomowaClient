import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";

const fetchProductAndCategories = async (id) => {
  try {
    const [productResponse, categoryResponse] = await Promise.all([
      fetch(`http://localhost:3001/v1/products/${id}`),
      fetch(`http://localhost:3001/v1/category`),
    ]);

    if (!productResponse.ok || !categoryResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const productData = await productResponse.json();
    const categoryData = await categoryResponse.json();

    return {
      product: {
        name: productData?.data[0]["wh_product.name"] || "",
        description: productData?.data[0]["wh_product.description"] || "",
        price: productData?.data[0]["wh_product.unit_price"] || 0,
        quantity: productData?.data[0]["wh_product.stock_amount"] || 0,
        min_quantity: productData?.data[0]["wh_product.min_stock_amount"] || 0,
        max_quantity: productData?.data[0]["wh_product.max_stock_amount"] || 0,
        category: productData?.data[0]["wh_category.w_id"] || "",
      },
      categories: categoryData?.data || [],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { product: null, categories: [] };
  }
};

const EditProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    min_quantity: 0,
    max_quantity: 0,
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const dbQuery = useCallback(async () => {
    setLoading(true);
    const { product, categories } = await fetchProductAndCategories(id);
    if (product) setProduct(product);
    setCategories(categories);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    dbQuery().catch((error) => console.error(error));
  }, [dbQuery]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const saveProductData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/v1/products/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas edycji danych");
      }

      setAlert({ type: "success", message: "Dane zostały zapisane poprawnie" });
    } catch (error) {
      setAlert({ type: "error", message: "Błąd podczas edycji danych." });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 bg-white">
      <h1 className="text-md font-semibold mb-4">Edycja produktu</h1>
      <Alert alert={alert} />
      {loading ? (
        <p className="text-center">Ładowanie danych...</p>
      ) : (
        <div className="space-y-4">
          {[
            "name",
            "description",
            "price",
            "quantity",
            "min_quantity",
            "max_quantity",
          ].map((field) => (
            <FormInput
              key={field}
              label={field.replace("_", " ").toUpperCase()}
              name={field}
              type={typeof product[field] === "number" ? "number" : "text"}
              value={product[field]}
              onChange={handleChange}
            />
          ))}

          <label className="block mb-1 font-medium text-xs" htmlFor="category">
            Kategoria produktu
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled hidden>
              Wybierz kategorię
            </option>
            {categories.map(({ w_id, category }) => (
              <option key={w_id} value={w_id}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        onClick={saveProductData}
        className="mt-6 w-full bg-[#fb8500] text-white py-2"
        disabled={loading}
      >
        {loading ? "Zapisywanie..." : "Zapisz"}
      </button>
    </div>
  );
};

const FormInput = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block mb-1 font-medium text-xs" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

export default EditProductPage;
