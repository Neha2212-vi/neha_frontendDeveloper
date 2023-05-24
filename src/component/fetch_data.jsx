import { useEffect, useState } from "react";
import "./fetch_data.css";
const Data = () => {
    const [capsuleData, setCapsuleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(capsuleData)
    const recordPerPage = 8;
    const lastPage = recordPerPage * currentPage;
    const firstPage = lastPage - recordPerPage;
    const records = search.slice(firstPage, lastPage);
    const numberOfPages = Math.ceil(search.length / recordPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1)
    
    // console.log(records)
    useEffect(() => {
        fetch("https://api.spacexdata.com/v3/capsules")
            .then((data) => data.json())
            .then((fetchedData) => {
                console.log(fetchedData)
                setCapsuleData(fetchedData)
                setSearch(fetchedData)
            })
            .catch((error) => console.log(error))
    }, [])
    const setPreviousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changePage = (n) => {
        setCurrentPage(n)
    }
    const setNextPage = () => {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleChange = (e) => {
        setSearch(capsuleData.filter(serachfil => serachfil.capsule_serial.toLowerCase().includes(e.target.value)))
    }
    return (
        <div className="main_div">
            <div className="search">
                <input type="text" onChange={handleChange} placeholder="search by capsule_serial"
                    className="serach_input"
                />
            </div>
            <div className="data">
                <table className="show-data">
                    <thead>
                        <th>capsule_serial</th>
                        <th>capsule_id</th>
                        <th>details</th>
                    </thead>
                    <tbody>
                        {records.map((data) => (
                            <tr>
                                <td>{data.capsule_serial}</td>
                                <td>{data.capsule_id}</td>
                                <td>{data.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    <li className="page-item"><a href="#" onClick={setPreviousPage} className="page-link">Previous</a></li>
                    {numbers.map((num, i) => (
                        <li className="page-item" key={i}>
                            <a href="#" onClick={() => changePage(num)}>{num}</a>
                        </li>
                    ))}
                    <li className="page-item"><a href="#" onClick={setNextPage} className="page-link">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Data;