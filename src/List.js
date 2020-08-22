import React,{useEffect,useState} from "react";
import { ListGroup, Collapse } from "react-bootstrap";

function App(props) {
  const [isExpand, setIsExpand] = useState([]);
  useEffect(() => {
    setIsExpand(new Array(props.data && props.data.length).fill(false));
}, []);
  return props.data ? (
    <ListGroup>
      {props.data.map((item, index) => {
        return(
        <>
          <ListGroup.Item
            onClick={() => {
              isExpand[index] = !isExpand[index];
              setIsExpand([...isExpand]);
            }}
            key={index}
          >
            {item&&item.book_title}
          </ListGroup.Item>
          <Collapse in={isExpand[index]}>
            <div className="sk-background">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
          </Collapse>
        </>
        )
      })}
    </ListGroup>
  ) : null;
}

export default App;
