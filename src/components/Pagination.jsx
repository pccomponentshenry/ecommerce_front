import Pagination from "react-bootstrap/Pagination";
import P from "../styles/Pagination.module.css";

function AdvancedExample(props) {
  const pages = [];

  for (let i = 0; i <= Math.ceil(props.data / props.itemsPerPage); i++) {
    pages.push(i); //Redondea para arriba asegurando una página para la data remanente. Pushea solo los índices.
  }
  function handlePage(e) {
    props.setCurrentPage(Number(e.target.innerText));
  }

  function handleSetPage(e) {
    if (e.target.innerText == 1) {
      props.setCurrentPage(pages[1]);
    }
    if (e.target.innerText == pages[pages.length - 1]) {
      props.setCurrentPage(pages[pages.length - 1]);
    }
  }
  function handleNext(e) {
    if (props.currentPage !== 1) {
      if (e.target.innerText === "<" || e.target.id === "prev") {
        props.setCurrentPage(props.currentPage - 1);
        if ((props.currentPage - 1) % props.pageNumberLimit == 0) {
          props.setmaxPageNumberLimit(
            props.maxPageNumberLimit - props.pageNumberLimit
          );
          props.setminPageNumberLimit(
            props.minPageNumberLimit - props.pageNumberLimit
          );
        }
      }
    }
    if (e.target.innerText === ">" || e.target.id === "next") {
      props.setCurrentPage(props.currentPage + 1);
      if (props.currentPage + 1 > props.maxPageNumberLimit) {
        props.setmaxPageNumberLimit(
          props.maxPageNumberLimit + props.pageNumberLimit
        );
        props.setminPageNumberLimit(
          props.minPageNumberLimit + props.pageNumberLimit
        );
      }
    }
  }

  return (
    <div>
      <ul className={P.numberList}>
        <li>
          <button
            className={P.pageBtn}
            disabled={props.currentPage == pages[1] ? true : false}
            onClick={e => handleNext(e)}
          >
            &lt;
          </button>
        </li>

        {pages.length > props.maxPageNumberLimit ? (
          <li id="prev" onClick={e => handleSetPage(e)} className={P.hellip}>
            {pages[1]}
          </li>
        ) : null}
        <li className={P.hellip}>&hellip;</li>
        {props.data > 0 &&
          pages.map(el =>
            el < props.maxPageNumberLimit && el > props.minPageNumberLimit ? (
              <li
                className={props.currentPage == el ? P.active : P.off}
                key={el}
                id={el}
                onClick={handlePage}
              >
                {el}
              </li>
            ) : null
          )}
        <li className={P.hellip}>&hellip;</li>
        {pages.length > props.maxPageNumberLimit ? (
          <li className={P.hellip} id="next" onClick={e => handleSetPage(e)}>
            {pages[pages.length - 1]}
          </li>
        ) : null}

        <li>
          <button
            className={P.pageBtn}
            disabled={
              props.currentPage == pages[pages.length - 1] ? true : false
            }
            onClick={e => handleNext(e)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdvancedExample;
