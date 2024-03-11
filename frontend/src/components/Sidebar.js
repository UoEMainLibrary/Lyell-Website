import React, {useEffect, useState} from 'react';
import ExploreButton from "./ExploreButton";

function extractStartText(str) {
    if (str.endsWith("}") && str.startsWith("{") && str.includes(":")) {
        return str.split(":")[0].substr(1);
    }
    return str;
}

function TextNavRender({items}) {
    const handleHeaderClick = (header) => {
        if (!Array.isArray(header)) {
            const headerId = header.replace(/\s+/g, '_')
            scrollToSection(headerId);
        }
    };
    const scrollToSection = (sectionName) => {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
            sectionElement.scrollIntoView({behavior: 'smooth'});
        }
    };


    const navConvert = () => {
        return Object.entries(items).reduce((result, [header, subheaders]) => {
            const formattedHeader = header.split(',')[0].trim();
            result.push(formattedHeader);
            const temp = [];
            if (header !== "Papers arranged by theme and miscellaneous") {
                for (const key in subheaders) {
                    const formattedSubHeader = extractStartText(key).split(',')[0].trim();
                    if (formattedSubHeader) {
                        temp.push(formattedSubHeader);
                    }
                }
            }
            if (temp.length > 0) {
                result.push(temp);
            }
            return result;
        }, []);
    };
    return (
        <ul className="">
            {navConvert().map((item, index) => (
                <li key={index} onClick={() => handleHeaderClick(item)} style={{
                    color: "blue",
                    cursor: "pointer"
                }}>
                    {Array.isArray(item) ? (
                        <ul className="">
                            {item.map((subItem, subIndex) => (
                                <li key={subIndex} onClick={() => handleHeaderClick(subItem)} style={{
                                    color: "blue",
                                    cursor: "pointer"
                                }}>{subItem}</li>
                            ))}
                        </ul>
                    ) : (
                        item
                    )}
                </li>
            ))}
        </ul>
    )
}

function PageNavRender({items}) {
    const setupPageNav = () => {
        const list = ["Overview", "Notebooks", "Specimens", "Papers", "Offprints"]
        return list.map(item => [item, `/collections/about/${item.toLowerCase()}`]);
    };
    return (
        <ul>
            {setupPageNav().map((entry, index) => (
                <li key={index} style={{
                    color: "blue",
                    cursor: "pointer"
                }}>
                    <a style={{textDecoration: 'none', color: 'inherit'}} href={entry[1]}>{entry[0]}</a>
                </li>
            ))}
        </ul>
    );
}

function Sidebar({content}) {
    const [sidebarHeight, setSidebarHeight] = useState('');

    const updateSidebarHeight = () => {
        const contentBody = document.querySelector('.body-d');
        const sidebar = document.querySelector('.sidebar1');


        if (contentBody && sidebar) {
            const contentBodyRect = contentBody.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            const screenHeight = window.innerHeight;
            const screenWidth = window.innerWidth;
            let newHeight = '';

            // Calculate the maximum height for the sidebar based on the content-body
            if (screenWidth < 991) {
                setSidebarHeight("auto")
            }

            else if ((contentBodyRect.height - Math.max(0, contentBodyRect.top)) < screenHeight) {
                setSidebarHeight("100%")
            } else if (contentBodyRect.bottom === sidebarRect.bottom || sidebarRect.bottom < screenHeight) {
                newHeight = (contentBodyRect.bottom + sidebarRect.top) + 'px';
                setSidebarHeight(newHeight);
            } else {
                setSidebarHeight("100vh")
            }

        }
    };

    useEffect(() => {
        updateSidebarHeight();
        window.addEventListener('scroll', updateSidebarHeight);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', updateSidebarHeight);
        };
    }, []);

    const renderContentItem = (section, index) => {
        switch (section.type) {
            case 'text':
                return <div key={index} className="sidebar1-section">
                    <h3 className="sidebar1-header">{section.header}</h3>
                    <div className="sidebar1-line"></div>
                    <p>{section.content}</p>
                </div>
            case 'text-nav':
                return <div key={index} className="sidebar1-section">
                    <h3 className="sidebar1-header">{section.header}</h3>
                    <div className="sidebar1-line"></div>
                    <div className="sidebar1-content">
                        <TextNavRender items={section.content.data}/>
                    </div>
                </div>
            case 'page-nav':
                return <div key={index} className="sidebar1-section">
                    <h3 className="sidebar1-header">{section.header}</h3>
                    <div className="sidebar1-line"></div>
                    <div className="sidebar1-content">
                        <PageNavRender/>
                    </div>
                </div>
            case 'button':
                return <div className="mb-4">
                    <div className="sidebar1-line"></div>
                    <ExploreButton/>
                    <div className="sidebar1-line pt-2"></div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className="sidebar1" style={{height: sidebarHeight}}>
            {content.map((section, index) => (
                renderContentItem(section, index)
            ))}
        </div>
    );
}

export default Sidebar;
