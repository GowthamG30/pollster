import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Stats = () => {
  const [counts, setCounts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [names, setNames] = useState([]);
  const [question, setQuestion] = useState("");
  const [typeOfChart, setTypeOfChart] = useState(0);
  const { id } = useParams();

  useEffect(() => {
		// JWT verification for API request
    let requestOptions = {headers: {}};
    requestOptions.headers["content-type"] = "application/json";
    
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
    }
    JSON.stringify(requestOptions);

    axios
      .get("/api/poll/" + id, requestOptions)
      .then(res => {
        if(res.data.poll.question.length > 50) {
          setQuestion(res.data.poll.question.substr(0, 50) + "...");
        }
        setQuestion(res.data.poll.question);
        const options = res.data.poll.options;
        options.forEach(element => {
          let value = element.name;
          if(value.length > 20) {
            value = value.substr(0, 20) + "...";
          }
          setNames((prevNames) => [...prevNames, value]);
          setCounts((prevCounts) => [...prevCounts, element.count]);
        });
        setLoaded(true);
      })
      .catch(err => {
        if(err.response.status === 403) {
          alert("Session expired");
          window.location.reload();
        }
        else if(err.response.status === 500) {
          alert("Internal server error");
        }
        else {
          alert("Something went wrong");
        }
      });
  }, [id]);

  const data = {
    labels: names,
    datasets: [{
        label: "# of Votes",
        data: counts,
        borderWidth: 1,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
    }]
  };

  const options = {		
		maintainAspectRatio: false,	// Removes aspect ratio
		responsive: true,	// Adjusts width and height according to container
    scales: {
      y: {
				ticks: {
					precision: 0	// To remove decimal labels
				}
      }
    },
		plugins: {
			legend: {
				display: false	// Remove chart legend
			},
			title: {
				display: true,
				text: question,
			}
		}
  };

	const handleClick = (event) => {
		if(event.target.name === "Bar") {
			setTypeOfChart(0);
			document.getElementsByName("Bar")[0].classList.add("clicked");
			document.getElementsByName("Pie")[0].classList.remove("clicked");
		}
		else {
			setTypeOfChart(1);
			document.getElementsByName("Pie")[0].classList.add("clicked");
			document.getElementsByName("Bar")[0].classList.remove("clicked");
		}
	}

  const getChart = () => {
    if(typeOfChart === 0) {
      return (
        <Bar
          data={data}
          options={options}
        />
      );
    }
    else if(typeOfChart === 1) {
      return (
        <Pie
          data={data}
          options={options}
        />
      );
    }
    else {
      return (null);
    }
  };

  return (
    <>
      <Navbar />
			<div className="container">
				<div className="btn-group">
					<button className="btn btn-group-btn left-btn clicked" name="Bar" onClick={handleClick}>Bar</button>
					<button className="btn btn-group-btn right-btn" name="Pie" onClick={handleClick}>Pie</button>
				</div>
				{
					loaded ?
						<>
							<div className="chart-container">
								{getChart()}
							</div>
						</> :
					<Loader />
				}
			</div>
    </>
  );
};

export default Stats;
