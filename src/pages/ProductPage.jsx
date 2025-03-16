import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Column from "../components/Column";
import { useAuth } from "../context/authContext";

const ProductPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:3001/v1/products");
          const data = await response.json();
          setProducts(data.data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };

      fetchProducts();
    }
  }, [user]);

  return (
    <DataTable value={products ? products : [{}]}>
      <Column field="wh_category.category" header="Kategoria" />
      <Column field="wh_product.name" header="Nazwa" />
      <Column field="wh_product.description" header="Opis" />
      <Column field="wh_product.stock_amount" header="Ilość detaliczna" />
      <Column field="wh_product.unit_price" header="Cena jednostkowa" />
    </DataTable>
  );
};

export default ProductPage;
