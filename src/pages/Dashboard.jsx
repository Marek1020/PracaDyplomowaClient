import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import DataTable from "../components/DataTable";
import Column from "../components/Column";

const Dashboard = () => {
  const [productData, setProductData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/dashboard/product/raport`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setProductData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Grouping products by date and counting occurrences
  const groupedData = productData.reduce((acc, product) => {
    const date = product["wh_product.sys_create_date"].split(" ")[0]; // Extracting date
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Ilość produktów utworzonych w danym dniu",
        data: Object.values(groupedData),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="">
      <div className="mb-24">
        <h2 className="text-xl font-bold mb-4">Błędy magazynowe</h2>
        <DataTable value={productData ? productData : [{}]}>
          <Column field="wh_category.category" header="Kategoria" />
          <Column field="wh_product.name" header="Nazwa" />
          <Column field="wh_product.description" header="Opis" />
          <Column field="wh_product.stock_amount" header="Ilość detaliczna" />
          <Column field="wh_product.unit_price" header="Cena jednostkowa" />
        </DataTable>
      </div>
      <div className="">
        <h2 className="text-xl font-bold mb-4">Analiza utworzenia produktów</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
