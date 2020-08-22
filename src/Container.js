import React, { useState, useEffect } from "react";
import List from "./List";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/action/index";

function Container(props) {
  const change = (index) => {
    props.setIndex(index);
    props.fetchData(index);
  };
  useEffect(() => {
    let param = window.location.pathname;
    if (props.data && props.data.length > 0) {
      debugger;
      if (param !== "" && param !== "/") {
        debugger;
        let indexs = parseInt(param.slice(1, 2));
        props.fetchData(props.index);
        props.setIndex(indexs);
      }
    }
    else{
      props.fetchData(props.index);
    }
  }, []);
  return props.data ? (
    <>
      <List data={props.data} />
      <div style={{ marginLeft: "20px" }}>
        {Array.apply(null, { length: Math.ceil(props.count/20) }).map(
          (x, i) => {
            return (
              <Link
                onClick={() => change(i + 1)}
                style={{
                  marginRight: "20px",
                  fontSize: 25,
                  color: props.index === i + 1 ? "red" : "blue",
                }}
                to={"/" + `${i + 1}`}
              >
                {i + 1}
              </Link>
            );
          }
        )}
      </div>
    </>
  ) : null;
}
const mapStateToProps = (state) => {
  return {
    index: state.list.index,
    data: state.list.data,
    count:state.list.count
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (value) => dispatch(actionCreators.setIndex(value)),
    fetchData: (value) => dispatch(actionCreators.fetchData(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
