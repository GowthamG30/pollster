import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Stats = () => {
  const [names, setNames] = useState([]);
  const [counts, setCounts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
    .get("/api/poll/" + id)
    .then(res => {
      const options = res.data.options;
      options.forEach(element => {
        setNames((prevNames) => [...prevNames, element.name]); // prevState is very important
        setCounts((prevCounts) => [...prevCounts, element.count]);
      });
    })
    .catch(err => console.error(err));
  }, [id]);

  const data = {
    labels: names,
    datasets: [{
        label: "# of Votes",
        data: counts,
        borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Link to={"/poll/" + id}>
        Back
      </Link>
      <Bar
        data={data}
        options={options}  
      />
    </div>
  );
};

export default Stats;
