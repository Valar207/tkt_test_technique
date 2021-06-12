import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BusinessPage({ business }) {
  const urlResultList = "https://test.wertkt.com/api/result/";

  const [firstResult, setFirstResult] = useState({});
  const [secondResult, setSecondResult] = useState({});

  useEffect(() => {
    axios
      .get(urlResultList + `/${business.results[0]}/`)
      .then((res) => {
        setFirstResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(urlResultList + `/${business.results[1]}/`)
      .then((res) => {
        setSecondResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [business.results]);

  const datas = (first, second) => {
    return {
      labels: ["2016", "2017"],
      datasets: [
        {
          type: "line",
          data: [first, second],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 2,
        },
        {
          maxBarThickness: 60,
          data: [first, second],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
    scales: {
      xAxes: [
        {
          barPercentage: 1,
        },
      ],
    },
    responsive: true,
  };

  return (
    <div className="businessPage">
      <div className="titlePage">
        <h1> {business.name} </h1>
        <h3> SIREN : {business.siren} </h3>
        <Link to="/">
          <Button variant="primary">Back to list</Button>
        </Link>
      </div>

      <div className="Bars">
        <div className="chartBar">
          <h1 className="chartTitle">Chiffre d'affaire</h1>
          <Bar data={datas(firstResult.ca, secondResult.ca)} options={options} />
        </div>
        <div className="chartBar">
          <h1 className="chartTitle">Ebitda</h1>
          <Bar data={datas(firstResult.ebitda, secondResult.ebitda)} options={options} />
        </div>

        <div className="chartBar">
          <h1 className="chartTitle">Loss</h1>
          <Bar data={datas(firstResult.loss, secondResult.loss)} options={options} />
        </div>

        <div className="chartBar">
          <h1 className="chartTitle">Margin</h1>
          <Bar data={datas(firstResult.margin, secondResult.margin)} options={options} />
        </div>
      </div>
    </div>
  );
}
