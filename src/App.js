import "./styles/App.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { BusinessContext } from "./BusinessContext";
import BusinessPage from "./components/BusinessPage";
import ListBusinesses from "./components/ListBusinesses";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [allInfos, setAllInfos] = useState({});

  const [businesses, setBusinesses] = useState({});
  const [listSectors, setListSectors] = useState([]);
  const [listCompanies, setListCompanies] = useState([]);
  const [filteredInfos, setFilteredInfos] = useState({
    businessName: "All",
    sector: "All",
  });

  const [loaded, setLoaded] = useState(false); //if all data was fetch display everything

  const urlBusinessList = "https://test.wertkt.com/api/biz/";

  useEffect(() => {
    var tmpSectors = [];
    var tmpCompanies = [];
    var tmpAllInfos = [];

    if (!loaded) {
      axios
        .get(urlBusinessList)
        .then((res) => {
          tmpAllInfos = res.data
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .filter(
              (thing, index, self) => index === self.findIndex((t) => t.place === thing.place && t.name === thing.name)
            ); //all infos sorted by name and removed all duplicates businesses

          tmpAllInfos.forEach((el) => {
            tmpSectors.push(el.sector); //pushing all sectors available in tmp variable
            tmpCompanies.push(el.name); //pushing all business available in tmp variable
          });

          tmpSectors = tmpSectors.filter((item, index) => tmpSectors.indexOf(item) === index); //get a list of all the sectors available without duplicate
          tmpCompanies = tmpCompanies.filter((item, index) => tmpCompanies.indexOf(item) === index); //get a list of all the businesses available without duplicate

          setListSectors(tmpSectors);
          setListCompanies(tmpCompanies);
          setAllInfos(tmpAllInfos); //storing all informations in this state for futur filtering
          setBusinesses(tmpAllInfos); //state which is going to display everything
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (filteredInfos.businessName !== "All" || filteredInfos.sector !== "All") {
        var businessesFiltered = allInfos.filter(
          (b) => b.name === filteredInfos.businessName || b.sector === filteredInfos.sector
        );
        setBusinesses(businessesFiltered);
      } else {
        setBusinesses(allInfos);
      }
    }
  }, [filteredInfos, allInfos, loaded]);

  if (loaded) {
    return (
      <div className="App">
        <Router>
          <BusinessContext.Provider value={{ listSectors, listCompanies, businesses, filteredInfos, setFilteredInfos }}>
            <Switch>
              <Route exact path="/listBusinesses" component={() => <ListBusinesses />} />

              {businesses.map((b, i) => (
                <Route key={i} path={"/" + b.id} component={() => <BusinessPage business={b} />} />
              ))}

              <Route path="/" component={() => <ListBusinesses />} />
            </Switch>
          </BusinessContext.Provider>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="containerSpinner">
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default App;
