import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paginate } from "../../../../../utils/paginate";
import Pagination from "../../../../common/pagination";
import GroupList from "../../../../ui/groupList";
import _ from "lodash";
import ShowHistoryCardsTable from "../../../../ui/table/showHistoryCardsTable";
import { useDispatch, useSelector } from "react-redux";
import {loadIncomeCategorysList, getIncomeCategorys} from "../../../../../store/incomeCategorys";
import { loadReceiptsList, getReceipts, removeReceipt} from "../../../../../store/receipts";



const ShowHistoryCardPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cardId } = useParams();


    const receipts = useSelector(getReceipts());
    const categorys = useSelector(getIncomeCategorys());

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(loadReceiptsList(cardId));
        dispatch(loadIncomeCategorysList());
      }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const handleCategorySelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
    };

    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };
    console.log(receipts)  
    const filteredCategorys = searchQuery
        ? receipts.filter((receipt) => receipt.data.indexOf(searchQuery) !== -1)
        : selectedCategory
            ? receipts.filter(
                (receipt) => receipt.category === selectedCategory._id,
            )
            : receipts;

         

     const sortedCategorys = _.orderBy(
         filteredCategorys,
         [sortBy.path],
         [sortBy.order]
     );

    const receiptsCrop = paginate(sortedCategorys, currentPage, pageSize);

   

    const handleDelete = (receiptId) => {;
            dispatch(removeReceipt(receiptId));
        };

    const handleAddIncomeItem = () => {
        navigate(`/home/main/mainlist/${cardId}/addreceipt`, {replace: true});
    };

    const clearFilter = () => {
        setSelectedCategory();
    };

    if (receipts) {
        const count = filteredCategorys.length;
       
        return (
            <div className="d-flex">
                {categorys && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedCategory}
                            items={categorys}
                            onItemSelect={handleCategorySelect}
                            incomeId={cardId}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <ShowHistoryCardsTable
                            receipts={receiptsCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                        />
                   )} 
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                <div>
                    <button 
                    onClick={handleAddIncomeItem}
                    >
                        Добавить поступление
                    </button>
                </div>
            </div>
        );
    }
    return "loading...";
};

export default ShowHistoryCardPage;
