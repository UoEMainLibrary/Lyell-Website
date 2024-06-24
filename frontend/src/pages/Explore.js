import React, {useState, useEffect} from 'react';
import {useSearch} from '../api/Search';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import TagList from '../components/DropdownOptions'
import lyell_2 from "../images/N13p24.jpg";
import Top from "../components/Header";
import {fetchData} from "../api/ApiCall";

function SingleResult({obj}) {
    const description = obj.body
        .replace(/<lb><\/lb>/g, "<br/>")
        .split('<br/>')
    return (
        <div key={obj.id} className="row align-items-center my-4">
            <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={obj.link} style={{textDecoration: 'none'}}><h3
                        className="font-weight-light custom-heading">{obj.title}</h3></Link>
                </div>
                <p className="my-1"><strong> date: {obj.date}</strong></p>
                <p className="my-1"><strong> shelfmark: </strong> {obj.shelfmark}</p>
                <p>{description[0]}</p>
            </div>
            <div className="col-lg-3 col-md-4">
                <Link to={obj.link}>
                    <img
                        className="img-fluid rounded mb-4 mb-lg-0"
                        src={obj.image}
                        alt=""
                        style={{maxHeight: "300px"}}
                    />
                </Link>
            </div>
        </div>
    );
}

function Results({result}) {
    return (
        <div className="">
            {result.map((t, index) => {
                if (Array.isArray(t)) {
                    t = t[0]
                }
                let b = ""
                t["notes"].forEach((i) => {
                    if (i["type"] === "scopecontent") {
                        if (i["desc"] === "dis") {
                            b = i["content"]
                        }
                    }
                });
                const id = t["component_id"].split("/")
                return (
                    <SingleResult
                        key={t["component_id"]}
                        obj={{
                            id: id[1] + "-" + id[2],
                            title: t["title"],
                            shelfmark: t["component_id"],
                            date: t["dates"]["expression"],
                            body: b,
                            image: t["thumbnail"],
                            link: "/collections/object/"+ id[1] +"-" + id[2]
                        }}
                    />
                )
            })}
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleChange()
        }
    }

    return (
        <div className="input-group mb-3 rounded">
            <input
                type="text"
                className="form-control"
                value={search}
                onKeyUp={handleKeyPress}
                onChange={handleInputChange}
                placeholder="Enter your search query"
            />
            <button className="btn btn-blue" type="button" id="button-addon2" onClick={handleChange}>
                Search
            </button>
        </div>
    );
}

function DateSearch({searchParams, setSearchParams}) {
    const [afterYear, setAfterYear] = useState('');
    const [beforeYear, setBeforeYear] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleAfterYearChange = (event) => {
        setAfterYear(event.target.value);
    };
    const handleBeforeYearChange = (event) => {
        setBeforeYear(event.target.value);
    };

    const handleApply = (event) => {
        const isAfterNumber = !Number.isNaN(afterYear) || afterYear === '';
        const isBeforeNumber = !Number.isNaN(beforeYear) || beforeYear === '';
        if (isAfterNumber && isBeforeNumber) {
            setErrorMsg("vaild");

            if (afterYear) {
                if (afterYear < 1825 || afterYear > 1874) {
                    setAfterYear(1825);
                }
            }
            if (beforeYear) {
                if (beforeYear < 1825 || beforeYear > 1874) {
                    setBeforeYear(1874);
                }
            }

            if (beforeYear && afterYear) {
                if (afterYear > beforeYear) {
                    setErrorMsg("before year must be larger than after year")
                }
            }
            let dates = afterYear + " " + beforeYear
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('date', dates);
            setSearchParams(newSearchParams);

        } else {
            setErrorMsg("not vaild");
        }

    };

    return (
        <div className="row pb-2">
            <div className="col  pe-1">
                <div className="form-group">
                    <label htmlFor="afterYear">After</label>
                    <input
                        type="number"
                        placeholder="1825"
                        id="afterYear"
                        className="form-control"
                        value={afterYear}
                        onChange={handleAfterYearChange}
                    />
                </div>
            </div>
            <div className="col px-1">
                <div className="form-group">
                    <label htmlFor="beforeYear">Before</label>
                    <input
                        type="number"
                        placeholder="1874"
                        id="beforeYear"
                        className="form-control"
                        value={beforeYear}
                        onChange={handleBeforeYearChange}
                    />
                </div>
            </div>
            <div className="col-3 px-1" style={{position: "relative", bottom: "0"}}><br></br>
                <button className="btn btn-blue" onClick={handleApply}>apply</button>
            </div>
            <p className="mb-0">{errorMsg}</p>
        </div>
    );
}

function SetsFilter({ searchParams, setSearchParams, amounts }) {
    const location = useLocation();

    // Function to get initial params from URL
    const getInitialParams = () => {
        const params = new URLSearchParams(location.search);
        const setsParam = params.get('sets');
        const initialParams = { a1: true, a2: true, a3: true, a4: true, a5: true };

        if (setsParam) {
            const setsArray = setsParam.split(' ');
            setsArray.forEach((set) => {
                if (initialParams.hasOwnProperty(set)) {
                    initialParams[set] = false;
                }
            });
        }

        return initialParams;
    };

    const [params, setParams] = useState(getInitialParams);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setParams((prevParams) => ({
            ...prevParams,
            [name]: checked,
        }));
    };

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        const deselectedParams = Object.keys(params)
            .filter(key => !params[key])
            .join(' ');

        if (deselectedParams) {
            newSearchParams.set('sets', deselectedParams);
            setSearchParams(newSearchParams);
        } else {
            newSearchParams.delete('sets');
            setSearchParams(newSearchParams);
        }
    }, [params, searchParams, setSearchParams]);

    return (
        <div className="my-4">
            <div className="pb-2">
                <input
                    type="checkbox"
                    id="a1"
                    name="a1"
                    className="me-3"
                    checked={params.a1}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="a1">
                    Scientific Notebooks, 1825-1874 <span className="text-muted small">({amounts["A1"]})</span>
                </label>
            </div>
            <div className="pb-2">
                <input
                    type="checkbox"
                    id="a2"
                    name="a2"
                    className="me-3"
                    checked={params.a2}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="a2">
                    Daily and Travel Journals, 1818 - 1830 <span className="text-muted small">({amounts["A2"]})</span>
                </label>
            </div>
            <div className="pb-2">
                <input
                    type="checkbox"
                    id="a3"
                    name="a3"
                    className="me-3"
                    checked={params.a3}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="a3">
                    Manuscript Notebooks, 1855 - 1861 <span className="text-muted small">({amounts["A3"]})</span>
                </label>
            </div>
            <div className="pb-2">
                <input
                    type="checkbox"
                    id="a4"
                    name="a4"
                    className="me-4"
                    checked={params.a4}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="a4">
                    Madeira and Canary Notebooks, 1856-1859 <span className="text-muted small">({amounts["A4"]})</span>
                </label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="a5"
                    name="a5"
                    className="me-3"
                    checked={params.a5}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="a5">
                    Index Notebooks, 1855 - 1871 <span className="text-muted small">({amounts["A5"]})</span>
                </label>
            </div>
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
    // const {searchData, fetchDataFromAPI} = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterTags, setFilterTags] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(50); // Initial items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("r");
    const [searchData, setSearchData] = useState({
        results: [],
        total: 0,
        amounts: {},
        tags: []
    });

    useEffect(() => {

        async function fetchDataFromAPI() {
            const data = await fetchData("search?" + searchParams);
            if (data !== {}) {
                if (data.results && data.results.length > 0) {
                    let n = data.results[0]
                    if (n.constructor === Object) {
                        data.results.sort((a, b) => {
                            // Extract the component_id for both elements
                            const idA = a["component_id"];
                            const idB = b["component_id"];

                            // Split the component_id to get both parts
                            const [partA, numA] = idA.split('/').slice(-2);
                            const [partB, numB] = idB.split('/').slice(-2);

                            // Compare the string parts first
                            if (partA < partB) return sortBy === "sd" ? 1 : -1;
                            if (partA > partB) return sortBy === "sd" ? -1 : 1;

                            // If the string parts are equal, compare the numeric parts
                            const numericA = parseInt(numA);
                            const numericB = parseInt(numB);

                            return sortBy === "sd" ? numericB - numericA : numericA - numericB;
                        });

                    } else if (Array.isArray(n)) {
                        if (sortBy !== "r") {
                            data.results.sort((a, b) => {
                                const idA = parseInt(a[0]["component_id"].split('/').pop());
                                const idB = parseInt(b[0]["component_id"].split('/').pop());
                                return sortBy === "sd" ? idB - idA : idA - idB;
                            });
                        } else {
                            data.results.sort((a, b) => b[1] - a[1]);
                        }
                    } else {
                        console.log("no valid type");
                    }
                }
                setSearchData(data);
            }
        }

        fetchDataFromAPI()
    }, [searchParams, itemsPerPage, currentPage, sortBy])

    useEffect(() => {
        const activeTags = searchParams.getAll('tag');
        setCurrentPage(1)
        setFilterTags(activeTags);
    }, [searchParams]);

    const handleTagClick = (clickedItem) => {
        if (!filterTags.includes(clickedItem.title)) {
            let newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.append('tag', `${clickedItem.header}:${clickedItem.title}`);
            setSearchParams(newSearchParams);
        }
    };

    const handleSortBy = (event) => {
        const selectedValue = event.target.value;
        setSortBy(selectedValue);
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            window.scrollTo(0, 0);
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
                imageURL={lyell_2}
                size={{height: "150px", text: "70px"}}
            />
            <div className="mx-5 my-5">
                <div className="row">
                    <div className="col-12 col-md-3 bg-light py-3">
                        <h5 className="pb-2">Search the notebooks</h5>
                        <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}/>
                        <DateSearch searchParams={searchParams} setSearchParams={setSearchParams}/>
                        <SetsFilter searchParams={searchParams} setSearchParams={setSearchParams} amounts={searchData.amounts}/>
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
                            {searchData.total < itemsPerPage ? (
                                <p className="col col-md m-0 pb-3 pb-md-0">Showing {searchData.total} results</p>
                            ) : (
                                <p className="col col-md m-0 pb-3 pb-md-0">Showing {startIndex + 1}-{endIndex} of {searchData.total} results</p>
                            )}

                            <div className="col pb-3 pb-md-0 col-md-4">
                                <label className="mx-2" htmlFor="sortBy">Order by: </label>
                                <select
                                    id="sortBy"
                                    value={sortBy}
                                    onChange={handleSortBy}
                                >
                                    <option value="r">Relevance</option>
                                    <option value="sa">Shelfmark accenting</option>
                                    <option value="sd">Shelfmark descending</option>
                                </select>
                            </div>

                            <div className="col pb-3 pb-md-0 col-md-4">
                                <label className="mx-2" htmlFor="itemsPerPage">Items per Page: </label>
                                <select
                                    id="itemsPerPage"
                                    value={itemsPerPage}
                                    onChange={handlePageSize}
                                >
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                        {searchData.results[0] ? <Results
                            result={searchData.results.slice(startIndex, endIndex)}
                        /> : <div className="py-4 ps-4"><p>No results found please change search parameters</p></div>}
                        <div className="pagination">
                            <button className="btn btn-outline-secondary mx-2" onClick={handlePrevPage}
                                    disabled={currentPage === 1}>
                                Prev
                            </button>
                            <span>Page {currentPage}</span>
                            <button className="btn btn-outline-secondary mx-2" onClick={handleNextPage}
                                    disabled={endIndex >= searchData.results.length}>
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
