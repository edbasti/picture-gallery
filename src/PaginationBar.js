import React from "react";
import Button from "./components/Button";

const PaginationBar = ({
  handlePrevPageCall,
  currentPage,
  handleNextPageCall,
}) => (
  <div className="btn-container">
        <Button onClick={handlePrevPageCall}>{'<<'}</Button>
    <div className={"current-page"}>Page {currentPage}</div>
    <Button onClick={handleNextPageCall}>{'>>'}</Button>
  </div>
);

export default PaginationBar;