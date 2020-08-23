import React, { useEffect, useState, useRef } from "react";
import List from "./List";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import {
  Spinner,
  Dropdown,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import * as actionCreators from "./store/action/index";

function Container(props) {
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();
  const [pageFrom, setPageFrom] = useState();
  const [pageTo, setPageTo] = useState();
  const [open, setOpen] = useState("none");
  const dropdownRef = useRef(null);
  useEffect(() => {
    let param = window.location.pathname;
    let ind;
    if (param === "" || param === "/") {
      ind = props.index;
    } else {
      ind = parseInt(param.substring(1, param.length));
    }
    props.fetchData(ind, props.filters);
    props.setIndex(ind);
  }, []);
  useEffect(() => {
    function clickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen("none");
      }
    }
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [dropdownRef]);
  const formControl = () => {
    setOpen("none");
    const filter = { type: "all", values: [] };
    yearFrom && filter.values.push("book_publication_year>=" + yearFrom);
    yearTo && filter.values.push("book_publication_year<=" + yearTo);
    pageFrom && filter.values.push("book_pages>=" + pageFrom);
    pageTo && filter.values.push("book_pages<=" + pageTo);
    props.setFilters(filter);
    props.fetchData(1, filter);
  };
  return props.data ? (
    <div className="sk-container">
      <div ref={dropdownRef}>
        <Button
          variant="info"
          onClick={() => (open === "none" ? setOpen("block") : setOpen("none"))}
          id="dropdown-basic"
        >
          Select Filters
        </Button>

        <div
          className="sk-content"
          style={{
            display: open,
          }}
        >
          <InputGroup className="mb-3">
            <Col>
              <Row>
                <Form.Label>Publication Year</Form.Label>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    as="input"
                    type="number"
                    onChange={(e) => {
                      setYearFrom(e.target.value);
                    }}
                    size="sm"
                    placeholder="From"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    as="input"
                    onChange={(e) => {
                      setYearTo(e.target.value);
                    }}
                    size="sm"
                    placeholder="To"
                  />
                </Col>
              </Row>
            </Col>
          </InputGroup>
          <InputGroup className="mb-3">
            <Col>
              <Row>
                <Form.Label>Book Pages</Form.Label>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    as="input"
                    onChange={(e) => {
                      setPageFrom(e.target.value);
                    }}
                    size="sm"
                    placeholder="From"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    as="input"
                    onChange={(e) => {
                      setPageTo(e.target.value);
                    }}
                    size="sm"
                    placeholder="To"
                  />
                </Col>
              </Row>
            </Col>
          </InputGroup>
          <Button onClick={formControl} variant="primary" type="submit">
            Submit
          </Button>
          <Button
            onClick={() => setOpen("none")}
            variant="secondary"
            type="submit"
          >
            Cancel
          </Button>
        </div>
      </div>
      <List data={props.data} />
      <Pagination />
    </div>
  ) : (
    <Spinner animation="border" />
  );
}
const mapStateToProps = (state) => {
  return {
    index: state.list.index,
    data: state.list.data,
    count: state.list.count,
    filters: state.list.filters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (value) => dispatch(actionCreators.setIndex(value)),
    setFilters: (value) => dispatch(actionCreators.setFilters(value)),
    fetchData: (value, filters) =>
      dispatch(actionCreators.fetchData(value, filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
