import * as actionTypes from "./actionTypes";
import axios from "axios";
export const setIndex = (value) => {
  return {
    type: actionTypes.INDEX,
    val: value,
  };
};
export const setCount = (value) => {
  return {
    type: actionTypes.COUNT,
    val: value,
  };
};
export const setData = (value) => {
  return {
    type: actionTypes.DATA,
    val: value,
  };
};
export const fetchData = (page) => {
  return (dispatch) => {
    axios({
      data: {page},
      method: 'post',
      url: "http://nyx.vima.ekt.gr:3000/api/books"
    })
      .then((response) => {
        dispatch(setCount(response.data.count));
        dispatch(setData(response.data.books));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
