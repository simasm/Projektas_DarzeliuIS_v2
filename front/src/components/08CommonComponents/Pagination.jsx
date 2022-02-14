import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import "../../App.css";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (pagesCount >= 6) {
      setPages(_.range(2, 6));
    } else if (pagesCount < 6) {
      setPages(_.range(2, pagesCount));
    }
  }, [pagesCount]);

  if (pagesCount === 1) return null;

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      onPageChange(Number(e.target.value));
    }
  };

  const handlePrevious = (currentPage) => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className={"page-item"}>
            <a
              href="#0"
              className="page-link"
              onClick={() => handlePrevious(currentPage)}
            >
              &lt;
            </a>
          </li>

          {/* VIENETAS */}
          <li className={1 === currentPage ? "page-item active" : "page-item"}>
            <a href="#0" className="page-link" onClick={() => onPageChange(1)}>
              1
            </a>
          </li>
          {/* VIENETAS */}

          {/* BODIS */}
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                href="#0"
                onClick={() => onPageChange(page)}
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
          {/* BODIS */}

          {/* TARPAS */}

          {currentPage < 6 || currentPage === Number(pagesCount) ? (
            <li className="page-item">
              <a className="page-link">&lt;...&gt;</a>
            </li>
          ) : (
            <li className="page-item active">
              <a className="page-link">&lt;{currentPage}&gt;</a>
            </li>
          )}

          {/* TARPAS */}

          {/* PASKUTINIS */}
          <li
            className={
              Number(pagesCount) === currentPage
                ? "page-item active"
                : "page-item"
            }
          >
            <a
              className="page-link"
              href="#0"
              onClick={() => onPageChange(Number(pagesCount))}
            >
              {pagesCount}
            </a>
          </li>

          <li className={"page-item"}>
            <a
              href="#0"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </a>
          </li>

          <li className="page-item">
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <input
                  className="page-link"
                  style={{ width: "60px", height: "37px" }}
                  placeholder="#"
                  maxLength={3}
                  onKeyPress={(e) => handleSubmit(e)}
                />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
