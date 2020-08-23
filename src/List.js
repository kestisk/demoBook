import React, { useEffect, useState } from "react";
import { Table, Collapse } from "react-bootstrap";
import PropTypes from "prop-types";
function List(props) {
  const [isExpand, setIsExpand] = useState([]);
  useEffect(() => {
    setIsExpand(new Array(props.data && props.data.length).fill(false));
  }, [props.data]);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Author</th>
          <th>Title</th>
        </tr>
      </thead>
      {props.data.map((item, index) => {
        return (
          <tbody key={item.id}>
            <tr
              key={item.id}
              className="sk-listGroup"
              onClick={() => {
                isExpand[index] = !isExpand[index];
                setIsExpand([...isExpand]);
              }}
            >
              <td>{!isExpand[index] ? "+" : "-"}</td>
              <td> {item && item.book_author}</td>
              <td> {item && item.book_title}</td>
            </tr>
            <tr>
              <td colSpan={3}>
                <Collapse in={isExpand[index]}>
                  <div>
                    <table size="sm">
                      <thead>
                        <tr>
                          <th>Publication Year</th>
                          <th>Publication Country</th>
                          <th>Publication City</th>
                          <th>Book Pages</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item && item.book_publication_year}</td>
                          <td>{item && item.book_publication_country}</td>
                          <td> {item && item.book_publication_city}</td>
                          <td> {item && item.book_pages}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Collapse>
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
}

export default List;
List.propTypes = {
  data: PropTypes.string.isRequired,
};
