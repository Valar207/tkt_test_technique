import React, { useState, useEffect, useContext } from "react";
import { BusinessContext } from "../BusinessContext";
import Select from "react-select";

export default function Filter() {
  const state = useContext(BusinessContext);
  const { businesses, listSectors, listCompanies, filteredInfos, setFilteredInfos } = state;

  const [businessNamesOption, setBusinessNamesOption] = useState([]);
  const [sectorsOption, setSectorsOption] = useState([]);

  const sectorChange = (value) => {
    setFilteredInfos({ businessName: "All", sector: value.value });
  };

  const BusinessChange = (value) => {
    setFilteredInfos({ sector: "All", businessName: value.value });
  };

  useEffect(() => {
    //Creating options for Select
    var tmpSectors = [{ value: "All", label: "All" }];
    var tmpBusinessNames = [{ value: "All", label: "All" }];

    listSectors.forEach((s) => tmpSectors.push({ value: s, label: s }));
    listCompanies.forEach((s) => tmpBusinessNames.push({ value: s, label: s }));

    businesses.forEach((business) => tmpBusinessNames.push({ value: business.name, label: business.name }));
    setSectorsOption(tmpSectors);
    setBusinessNamesOption(tmpBusinessNames);
  }, [filteredInfos, businesses, listCompanies, listSectors]);

  return (
    <div className="filter">
      <div className="select">
        <p className="selectTitle">Sector :</p>
        <Select
          value={{ label: filteredInfos.sector }}
          onChange={(value) => sectorChange(value)}
          options={sectorsOption}
        />
      </div>
      <div className="select">
        <p className="selectTitle">Company :</p>
        <Select
          value={{ label: filteredInfos.businessName }}
          onChange={(value) => BusinessChange(value)}
          options={businessNamesOption}
        />
      </div>
    </div>
  );
}
