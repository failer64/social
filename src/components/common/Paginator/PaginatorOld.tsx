import styles from "./Paginator.module.css";
import {FC, useEffect, useState} from "react";
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    onPageChanged: (page: number) => void
}

const PaginatorOld: FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 15}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pagesArr: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagesArr.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize]);

    return (
        <div className={styles.paging}>
            {
                portionNumber > 1 && <span onClick={() => setPortionNumber(portionNumber - 1)}>prev</span>
            }
            {
                pagesArr
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p, value) =>
                        <span key={value} onClick={() => onPageChanged(p)}
                              className={cn({[styles.active]: p === currentPage})}>
                            {p}
                        </span>)

            }
            {
                portionCount > portionNumber &&
                <span onClick={() => setPortionNumber(portionNumber + 1)}>next</span>
            }
        </div>
    )
}

export default PaginatorOld;
