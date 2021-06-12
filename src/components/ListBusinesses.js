import React, { useContext, useState } from "react";
import Filter from "./Filter";
import BusinessCard from "./BusinessCard";
import { BusinessContext } from "../BusinessContext";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function ListBusinesses() {
  const state = useContext(BusinessContext);
  const { businesses } = state;

  const [pageNumber, setPageNumber] = useState(0);

  const businessPerPage = 10;
  const pagesVisited = pageNumber * businessPerPage;

  const displayBusinesses = () =>
    businesses.slice(pagesVisited, pagesVisited + businessPerPage).map((b, i) => {
      return (
        <div key={i} className="linkContainer">
          <Link className="link" key={i} to={"/" + b.id}>
            <BusinessCard key={i} businesses={b} />
          </Link>
        </div>
      );
    });

  const pageCount = Math.ceil(businesses.length / businessPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="containerList">
      <Filter />
      {displayBusinesses()}
      <ReactPaginate
        className="paginationContainer"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
        activeClassName={"activeBtn"}
        pageClassName={"pageClassName"}
      />
    </div>
  );
}
