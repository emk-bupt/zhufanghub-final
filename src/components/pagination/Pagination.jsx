import React from 'react';
import classes from './pagination.module.css';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useTheme } from 'next-themes'; // Import for dark mode support

const Pagination = ({
    setItemOffset,
    itemsPerPage,
    reviews
}) => {
    const { theme } = useTheme(); // Detect the current theme

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % reviews?.length;
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            nextClassName={`${classes.item} ${classes.nextArrow} ${
                theme === 'dark' ? classes.darkMode : ''
            }`}
            previousClassName={`${classes.item} ${classes.previousArrow} ${
                theme === 'dark' ? classes.darkMode : ''
            }`}
            pageClassName={`${classes.item} ${
                theme === 'dark' ? classes.darkMode : ''
            }`}
            activeClassName={`${classes.item} ${classes.active} ${
                theme === 'dark' ? classes.activeDark : ''
            }`}
            breakClassName={`${classes.item} ${
                theme === 'dark' ? classes.darkMode : ''
            }`}
            containerClassName={`${classes.pagination} ${
                theme === 'dark' ? classes.darkMode : ''
            }`}
            breakLabel="..."
            previousLabel={<AiOutlineArrowLeft size={25} />}
            nextLabel={<AiOutlineArrowRight size={25} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={reviews?.length / itemsPerPage}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
