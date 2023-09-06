import React, {useState, useEffect} from 'react';
import {useSearch} from '../api/Search';
import {Link, useSearchParams} from "react-router-dom";
import TagList from '../components/DropdownOptions'
import lyell_2 from "../images/lyell_landscape.jpg";
import Top from "../components/Header";

function SingleResult({obj}) {
    return (
        <div key={obj.id} className="row align-items-center my-4">
            <div className="col-lg-9 col-md-6 col-sm-12">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={obj.link} style={{textDecoration: 'none'}}><h3
                        className="font-weight-light custom-heading">{obj.title}</h3></Link>
                </div>
                <p className="my-1"><strong> {obj.date}</strong></p>
                <p className="my-1"><strong> shelfmark: </strong> {obj.shelfmark}</p>
                <p>{obj.body}</p>
            </div>
            <div className="col-lg-3 col-md-5">
                <Link to={obj.link}>
                    <img
                        className="img-fluid rounded mb-4 mb-lg-0"
                        src={obj.image}
                        alt=""
                        style={{height: "300px"}}
                    />
                </Link>
            </div>
        </div>
    );
}

function Results({result}) {
    return (
        <div className="">
            {result.map((t, index) => (
                <SingleResult
                    key={t["component_id"]}
                    obj={{
                        id: t["component_id"].split("/").pop(),
                        title: t["title"],
                        shelfmark: t["component_id"],
                        date: t["dates"]["expression"],
                        body: t["notes"][0]["content"],
                        image: t["thumbnail"],
                        link: "/collections/object/a1-" + t["component_id"].split("/").pop()
                    }}
                />
            ))}
        </div>
    );
}

function SearchBar({searchParams, setSearchParams}) {
    const [search, setSearch] = useState(searchParams.get('search') || "");

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleChange = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('search', search);
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        setSearch(searchParams.get('search') || "");
    }, [searchParams]);

    return (
        <div className="input-group mb-3 rounded">
            <input
                type="text"
                className="form-control"
                value={search}
                onChange={handleInputChange}
                placeholder="Enter your search query"
            />
            <button className="btn btn-green" type="button" id="button-addon2" onClick={handleChange}>
                Search
            </button>
        </div>
    );
}

function TagFilter({filterTags, searchParams, setSearchParams}) {
    const handleTagRemoved = (tag) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const updatedTags = Array.from(newSearchParams.getAll('tag')).filter((i) => i !== tag);

        // Clear the 'tag' parameter in searchParams
        newSearchParams.delete('tag');

        // Re-add the remaining tags after filtering
        updatedTags.forEach((updatedTag) => {
            newSearchParams.append('tag', updatedTag);
        });

        setSearchParams(newSearchParams);
    };

    return (
        <div>
            {filterTags.map((tag) => (
                <button
                    key={tag}
                    className="m-1 btn-outline-success"
                    style={{
                        border: 'none',
                        backgroundColor: 'lightgrey',
                        borderRadius: '5px',
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    onClick={() => handleTagRemoved(tag)}
                >
                    <span style={{fontSize: '10px', marginRight: '3px'}}>❌</span>
                    {tag.split(':')[1]}
                </button>
            ))}
        </div>
    );
}


function Explore() {
    const {searchData, fetchDataFromAPI} = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterTags, setFilterTags] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(25); // Initial items per page
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchDataFromAPI(searchParams);
    }, [searchParams, itemsPerPage, currentPage]);

    useEffect(() => {
        const activeTags = searchParams.getAll('tag');
        setFilterTags(activeTags);
    }, [searchParams]);

    const handleTagClick = (clickedItem) => {
        if (!filterTags.includes(clickedItem.title)) {
            let newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.append('tag', `${clickedItem.header}:${clickedItem.title}`);
            setSearchParams(newSearchParams);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageSize = (event) => {
        const selectedItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(selectedItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    // Calculate start and end indices based on current page and items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div>
            <Top
                title={""}
                imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~83972~103414/full/!1300,1300/0/default.jpg"}
                size={{height: "150px", text: "70px"}}
            />
            <div className="mx-5 my-5">
                <div className="row">
                    <div className="col-3 bg-light py-3">
                        <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}/>
                        <TagFilter filterTags={filterTags} searchParams={searchParams}
                                   setSearchParams={setSearchParams}/>
                        <div>
                            {Object.entries(searchData.tags).map(([key, value]) => (
                                <TagList key={key} headerText={key} jsonData={value} onClick={handleTagClick}/>
                            ))}
                        </div>
                    </div>
                    <div className="col">
                        <div className="row p-3" style={{borderBottom: '2px solid lightgrey'}}>
                            <p className="col-9 m-0">Showing {startIndex+1}-{endIndex} of {searchData.amount} results</p>
                            <div className="col">
                                <label className="mx-2" htmlFor="itemsPerPage">Items per Page: </label>
                                <select
                                    id="itemsPerPage"
                                    value={itemsPerPage}
                                    onChange={handlePageSize}
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        <Results
                            result={searchData.results.slice(startIndex, endIndex)} // Display a subset of results based on pagination
                        />
                        <div className="pagination">
                            <button className="btn mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <span>Page {currentPage}</span>
                            <button className="btn mx-2" onClick={handleNextPage} disabled={endIndex >= searchData.results.length}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Explore;
