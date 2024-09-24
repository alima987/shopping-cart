import React from "react"
import styles from "./Pagination.module.css"

type PaginationProps = {
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
    disable: {
      left: boolean;
      right: boolean;
    };
    nav?: {
      current: number;
      total: number;
    };
}
const Pagination = (props: PaginationProps) => {
    const { nav = null, disable, onNextPageClick, onPrevPageClick } = props
    const handleNextPageClick = () => {
        onNextPageClick()
    }
    const handlePrevPageClick = () => {
        onPrevPageClick()
    }

    return (
        <div className={styles.paginationCont}>
            <button 
            className={styles.paginationBtn}
            type="button"
            onClick={handlePrevPageClick}
            disabled={disable.left}>
                {'<'}
            </button>
            {nav && 
            <span className={styles.paginationNav}>
               {nav.current} out of {nav.total}
            </span>}
            <button 
            className={styles.paginationBtn}
            type="button"
            onClick={handleNextPageClick}
            disabled={disable.right}>
                {'>'}
            </button>
        </div>
    )

}
export default React.memo(Pagination)