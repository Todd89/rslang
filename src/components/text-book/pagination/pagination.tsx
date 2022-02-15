import usePagination from './usePagination';
import { PaginationData, DOTS } from '../../../const/const';
import { PaginationComponentProps } from '../../../interface/interface';

const Pagination: React.FC<PaginationComponentProps> = ({
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
  }) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if  (!paginationRange) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === PaginationData.START_INDEX) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container'
    >
      <li
        className={
          currentPage === PaginationData.START_INDEX 
            ? 'pagination-item disabled' 
            : 'pagination-item'
        }
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={
              pageNumber === currentPage 
                ? 'pagination-item selected' 
                : 'pagination-item'
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage 
            ? 'pagination-item disabled' 
            : 'pagination-item'
        }
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;