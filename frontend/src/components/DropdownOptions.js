import React, {useState} from 'react';

const TagList = ({headerText, jsonData, onClick}) => {
    const [isListVisible, setListVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const handleLinkClick = (event) => {
        event.stopPropagation();
        setListVisible(!isListVisible);
    };

    const handleShowAllClick = () => {
        setShowAll(!showAll);
    };

    const headerStyle = {
        cursor: 'pointer',
        borderTop: '2px solid lightgrey',
        paddingTop: '20px',
    };

    const underlineStyle = {
        content: '',
        display: 'block',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'dodgerblue',
        transform: isListVisible ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.2s ease',
    };
    const sortedData = [...jsonData].sort((a, b) => b.entries.length - a.entries.length);
    const visibleData = showAll ? sortedData : sortedData.slice(0, 10);

    const onItemClick = (item) => {
        item["header"] = headerText
        onClick(item);
    };

    return (
        <div style={headerStyle}>
            <h6 style={{position: 'relative', marginBottom: '20px'}} onClick={handleLinkClick}>
                {headerText.replace("_", " ")}
                <span style={underlineStyle}></span>
            </h6>
            {isListVisible && (
                <div className="mt-3">
                    <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
                        {visibleData.map((item) => (
                            <li
                                key={item.id}
                                style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}
                                onClick={() => onItemClick(item)}
                            >
                                <span>{item.title}</span>
                                {item.entries.length > 0 && (
                                    <span style={{marginLeft: '10px'}}>{item.entries.length}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    {sortedData.length > 10 && !showAll && (
                        <button className="btn btn-link" onClick={handleShowAllClick}>
                            Show More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TagList;
