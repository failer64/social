import styles from "./Users.module.css";
import {useEffect, useState} from "react";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 15}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pagesArr = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagesArr.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    //useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);

    return (
        <div className={styles.pagging}>
            {
                portionNumber > 1 && <span onClick={() => setPortionNumber(portionNumber - 1)}>prev</span>
            }
            {
                pagesArr
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p, value) =>
                        <span key={value} onClick={() => onPageChanged(p)}
                              className={(p === currentPage) ? styles.active : null}>
            {p}
                </span>)

            }
            {
                portionCount > portionNumber && <span onClick={() => setPortionNumber(portionNumber + 1)}>next</span>
            }
        </div>
    )
}

export default Paginator;
