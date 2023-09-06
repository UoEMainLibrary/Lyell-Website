import React, {useState} from "react";
import Top from "../components/Header"
import pr_ft from "../images/principles_front.png"
import el_bd from "../images/Elements_binding_light.jpg"
import textContent from "../content/books.json"
import {Link} from "react-router-dom";


const ToggleTable = ({ data }) => {
  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTable = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <div>
      <button className="btn btn-green" onClick={toggleTable}>
        {isTableVisible ? '1st edition' : '1st edition'}
      </button>
      {isTableVisible && (
        <table className="table mt-3" style={{width: "900px"}}>
          <thead>
            <tr>
              <th>Document</th>
              <th>Source</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Document}</td>
                <td>{row.Source}</td>
                <td>
                  <a href={row.Link} target="_blank" rel="">
                    {row.LinkText}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


function BookInfo() {
    const tableData = {"1st edition":[
    {
      Document: 'Principles of Geology 1st edition, 1st vol. Jan. 1830',
      Source: 'Internet archive',
      Link: 'https://archive.org/details/ PrinciplesgeoloVol1Lyel/page/n13/mode/2up\n',
      LinkText: 'https://archive.org/details/ PrinciplesgeoloVol1Lyel/page/n13/mode/2up\n',
    },
    {
      Document: 'Principles of Geology 1st edition, 2nd vol. Jan. 1832',
      Source: 'Internet archive',
      Link: 'https://archive.org/details/ PrinciplesgeoloVol2Lyel/page/n9/mode/2up\n',
      LinkText: 'https://archive.org/details/ PrinciplesgeoloVol2Lyel/page/n9/mode/2up\n',
    },
    {
      Document: 'Principles of Geology 1st edition, 3rd vol. May 1833\n',
      Source: 'Internet archive',
      Link: 'https://archive.org/details/ PrinciplesgeoloV3Lyel/page/n11/mode/2up\n',
      LinkText: 'https://archive.org/details/ PrinciplesgeoloV3Lyel/page/n11/mode/2up\n',
    },
  ]}
    return (
        <div>
            <div className="container">
                <div className="about-box py-3">
                    <img className="about2-img float-end me-4" style={{width: "350px"}} src={pr_ft}
                         alt="notebook cover"/>
                    <h3>{textContent.header}</h3><br/>
                    <p>{textContent.intro}</p>
                    <p>Access to a digital first edition can be found at the Internet Archives here: <Link to="https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up">https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up</Link></p>
                    <br/><h5>{textContent.principles.conclusion}</h5>
                    <div>
                        {textContent.principles.mainContent.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    <p>{textContent.principles.conclusion}</p>
                    <ToggleTable data={tableData} />
                </div>
                <div>


                </div>
            </div>
        </div>
    )
}



function Books() {



    return (
        <div>
            <Top
                title={"Published works"}
                imageURL={el_bd}
                size={{height: "200px", text: "50px"}}
            />

            <BookInfo/>

        </div>
    )
}

export default Books;