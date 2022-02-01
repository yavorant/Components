// From:
// https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
// JavaScript Paginate Function Usage
// The paginate function accepts the following parameters:

// totalItems (required) - the total number of items to be paged
// currentPage (optional) - the current active page, defaults to the first page
// pageSize (optional) - the number of items per page, defaults to 10
// maxPages (optional) - the maximum number of page navigation links to display, defaults to 10
// The output of the paginate function is an object containing all the information needed to display the current page of items in the view and the page navigation links.

// Below are some example inputs and outputs to give you a better idea of how the function works, you can also tinker with them live on StackBlitz here.

// paginate(150)
// totalItems: 150

// {
//     totalItems: 150,
//     currentPage: 1,
//     pageSize: 10,
//     totalPages: 15,
//     startPage: 1,
//     endPage: 10,
//     startIndex: 0,
//     endIndex: 9,
//     pages: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// }

// paginate(150, 7)
// totalItems: 150, currentPage: 7

// {
//     totalItems: 150,
//     currentPage: 7,
//     pageSize: 10,
//     totalPages: 15,
//     startPage: 2,
//     endPage: 11,
//     startIndex: 60,
//     endIndex: 69,
//     pages: [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
// }

// paginate(150, 7, 15)
// totalItems: 150, currentPage: 7, pageSize: 15

// {
//     totalItems: 150,
//     currentPage: 7,
//     pageSize: 15,
//     totalPages: 10,
//     startPage: 1,
//     endPage: 10,
//     startIndex: 90,
//     endIndex: 104,
//     pages: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// }

// paginate(150, 7, 15, 5)
// totalItems: 150, currentPage: 7, pageSize: 15, maxPages: 5

// {
//     totalItems: 150,
//     currentPage: 7,
//     pageSize: 15,
//     totalPages: 10,
//     startPage: 5,
//     endPage: 9,
//     startIndex: 90,
//     endIndex: 104,
//     pages: [ 5, 6, 7, 8, 9 ]
// }

function paginate(totalItems, currentPage = 1, pageSize = 10, maxPages = 10) {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage = ?;
  let endPage = ?;

  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
}

// export = paginate;

console.log(paginate(150, 7, 15, 5));
