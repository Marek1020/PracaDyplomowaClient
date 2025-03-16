import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
        price: productData?.data[0]["wh_product.unit_price"] || "",
        quantity: productData?.data[0]["wh_product.stock_amount"] || "",
        category: productData?.data[0]["wh_category.category"] || "",
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
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  const dbQuery = useCallback(async () => {
    setLoading(true);
    const { product, categories } = await fetchProductAndCategories(id);
    if (product) setProduct(product);
    setCategories(categories);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    dbQuery().catch(setError);
  }, [dbQuery]);

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    console.log("save data");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 bg-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Edytuj Produkt
      </h1>

      {error && (
        <p className="text-red-500 text-center">Błąd: {error.message}</p>
      )}
      {loading ? (
        <p className="text-center">Ładowanie danych...</p>
      ) : (
        <div className="space-y-4">
          {[
            {
              label: "Nazwa produktu",
              name: "name",
              type: "text",
              placeholder: "Nazwa produktu",
            },
            {
              label: "Opis produktu",
              name: "description",
              type: "text",
              placeholder: "Opis produktu",
            },
            {
              label: "Cena produktu",
              name: "price",
              type: "text",
              placeholder: "Cena produktu",
            },
            {
              label: "Ilość produktu",
              name: "quantity",
              type: "text",
              placeholder: "Ilość produktu",
            },
          ].map(({ label, name, type, placeholder }) => (
            <FormInput
              key={name}
              label={label}
              name={name}
              type={type}
              placeholder={placeholder}
              value={product[name]}
              onChange={handleChange}
            />
          ))}

          <div>
            <label className="block mb-1 font-medium" htmlFor="category">
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
              {categories.length > 0 ? (
                categories.map((val) => (
                  <option key={val.category} value={val.category}>
                    {val.category}
                  </option>
                ))
              ) : (
                <option value="0" disabled>
                  Ładowanie...
                </option>
              )}
            </select>
          </div>
        </div>
      )}

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-[#fb8500] text-white py-2"
        disabled={loading}
      >
        {loading ? "Zapisywanie..." : "Zapisz"}
      </button>
    </div>
  );
};

const FormInput = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label className="block mb-1 font-medium" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

export default EditProductPage;
