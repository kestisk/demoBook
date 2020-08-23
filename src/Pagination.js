import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/action/index";
const Pagination = (props) => {
  const change = async (index) => {
    window.scrollTo(0, 0);
    props.setIndex(index);
    props.fetchData(index, props.filters);
  };
  return (
    <div style={{ marginLeft: "20px" }}>
      <Link
        onClick={() => change(props.index - 1)}
        to={"/" + (props.index - 1)}
      >
        {"<"}
      </Link>{" "}
      <Link
        className="sk-link"
        style={{
          color: props.index === 1 ? "red" : "blue",
        }}
        onClick={() => change(1)}
        to={"/" + 1}
      >
        {"1"}
      </Link>
      <div style={{ display: 10 - props.index > 3 ? "none" : "contents" }}>
        {"....."}
      </div>
      {Array.apply(null, { length: Math.ceil(props.count / 20) }).map(
        (x, i) => {
          if (i !== 0 && i !== Math.ceil(props.count / 20)) {
            if (i >= props.index - 5) {
              if (i < 10) {
                return (
                  <Link
                    className="sk-link"
                    key={i}
                    onClick={() => change(i + 1)}
                    style={{
                      color: props.index === i + 1 ? "red" : "blue",
                    }}
                    to={"/" + (i + 1)}
                  >
                    {i + 1}
                  </Link>
                );
              } else if (i < props.index + 4) {
                if (props.index + 3 < Math.ceil(props.count / 20)) {
                  return (
                    <Link
                      key={i}
                      onClick={() => change(i + 1)}
                      className="sk-link"
                      style={{
                        color: props.index === i + 1 ? "red" : "blue",
                      }}
                      to={"/" + (i + 1)}
                    >
                      {i + 1}
                    </Link>
                  );
                } else {
                  if (
                    i > Math.ceil(props.count / 20) - 10 &&
                    i < Math.ceil(props.count / 20) - 1
                  ) {
                    return (
                      <Link
                        key={i}
                        className="sk-link"
                        onClick={() => change(i + 1)}
                        style={{
                          color: props.index === i + 1 ? "red" : "blue",
                        }}
                        to={"/" + (i + 1)}
                      >
                        {i + 1}
                      </Link>
                    );
                  }
                }
              }
            }
          }
          return null;
        }
      )}
      <div
        style={{
          display:
            Math.ceil(props.count / 20) - props.index > 5 ? "contents" : "none",
        }}
      >
        {"....."}
      </div>
      <Link
        className="sk-link"
        style={{
          color: props.index === Math.ceil(props.count / 20) ? "red" : "blue",
        }}
        onClick={() => change(Math.ceil(props.count / 20))}
        to={"/" + Math.ceil(props.count / 20)}
      >
        {" "}
        {Math.ceil(props.count / 20)}
      </Link>
      <Link onClick={() => change(props.index + 1)} to={"/" + props.index + 1}>
        {">"}
      </Link>
    </div>
  );
};
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
    fetchData: (value, filters) =>
      dispatch(actionCreators.fetchData(value, filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
