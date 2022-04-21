import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [vertex, setVertex] = useState("");
  const [vertices, setVertices] = useState([
    "Sameer",
    "Ayushi",
    "Bhaskar",
    "Kamalnath",
    "ShantiKumar",
  ]);
  const [startVertex, setStartVertex] = useState("");
  const [endVertex, setEndVertex] = useState("");
  const [edges, setEdges] = useState([
    ["Sameer", "Ayushi"],
    ["Ayushi", "Bhaskar"],
    ["Sameer", "Kamalnath"],
    ["Kamalnath", "ShantiKumar"],
    ["ShantiKumar", "Bhaskar"],
  ]);
  const [firstPerson, setFirstPerson] = useState("");
  const [secondPerson, setSecondPerson] = useState("");

  class Graph {
    constructor(noOfVertices) {
      this.noOfVertices = noOfVertices;
      this.AdjList = new Map();
    }

    addVertex(v) {
      this.AdjList.set(v, []);
    }

    addEdge(v, w) {
      this.AdjList.get(v).push(w);
    }
    printGraph() {
      var get_keys = this.AdjList.keys();
      let graphConnections = [];
      for (var i of get_keys) {
        var get_values = this.AdjList.get(i);
        var conc = "";

        for (var j of get_values) conc += j + "\xa0\xa0";

        let gc = i + " -> " + conc + ", ";
        graphConnections.push(gc);
        console.log(gc);
      }
      return graphConnections;
    }

    printAllPaths(s, d) {
      let isVisited = new Array(this.noOfVertices);
      for (let i = 0; i < this.noOfVertices; i++) isVisited[i] = false;
      let pathList = [];

      pathList.push(s);

      g.printAllPathsUtil(s, d, isVisited, pathList);
    }
    printAllPathsUtil(u, d, isVisited, localPathList) {
      if (u === d) {
        let text = "";
        for (let i = 0; i < localPathList.length; i++) {
          if (i < localPathList.length - 1) text += localPathList[i] + " > ";
          else {
            text += localPathList[i];
          }
        }
        let myElement = document.getElementById("zzz");
        myElement.innerHTML += text + "<br>";
        console.log(text);
        return;
      }
      isVisited[u] = true;

      for (let i = 0; i < this.AdjList.get(u).length; i++) {
        if (!isVisited[this.AdjList.get(u)[i]]) {
          localPathList.push(this.AdjList.get(u)[i]);
          g.printAllPathsUtil(
            this.AdjList.get(u)[i],
            d,
            isVisited,
            localPathList
          );

          localPathList.splice(
            localPathList.indexOf(this.AdjList.get(u)[i]),
            1
          );
        }
      }

      isVisited[u] = false;
    }
  }
  const g = new Graph(vertices.length);

  for (let i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
  }

  for (let i = 0; i < edges.length; i++) {
    g.addEdge(edges[i][0], edges[i][1]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    g.printAllPaths(firstPerson, secondPerson);
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Social Connections Web App</h1>
        <div className="add_vertex">
          <h3>Enter vertex to add person in the graph :</h3>
          <input
            type="text"
            value={vertex}
            onChange={(e) => setVertex(e.target.value)}
            placeholder="Add Vertex"
            className="input"
            required="required"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setVertices(() => [...vertices, vertex]);
            }}
            className="btn"
            type="submit"
          >
            Add Vertex
          </button>
          <h3>Current Vertices :</h3>
          <div className="vertices">
            {vertices.map((vertx) => {
              return <h3>{vertx}</h3>;
            })}
          </div>
        </div>
        <form className="add_edge">
          <h3>
            Enter start and end vertex to make friend connection between two
            persons :
          </h3>
          <input
            type="text"
            value={startVertex}
            onChange={(e) => setStartVertex(e.target.value)}
            placeholder="Enter start vertex"
            className="input"
          />

          <input
            type="text"
            value={endVertex}
            onChange={(e) => setEndVertex(e.target.value)}
            placeholder="Enter end vertex"
            className="input"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setEdges(() => [...edges, [startVertex, endVertex]]);
            }}
            className="btn"
          >
            Add Edge
          </button>
        </form>
        <div className="graph_print">
          <h3>Graph print :</h3>
          <div className="printGraph">{g.printGraph()}</div>
        </div>
        <div className="degreeOfSeparation">
          <h3>
            Enter input to find out the degree of separation between two persons
            :
          </h3>
          <input
            type="text"
            value={firstPerson}
            onChange={(e) => setFirstPerson(e.target.value)}
            placeholder="Enter first person"
            className="input"
          />
          <input
            type="text"
            value={secondPerson}
            onChange={(e) => setSecondPerson(e.target.value)}
            placeholder="Enter second person"
            className="input"
          />
          <button className="btn" onClick={handleSubmit}>
            Submit!
          </button>
        </div>
        <div className="different_paths">
          <h3>
            Following are all different paths from first Person to second person
            :
          </h3>
        </div>
        <div id="zzz"></div>
      </div>
    </div>
  );
}

export default App;
