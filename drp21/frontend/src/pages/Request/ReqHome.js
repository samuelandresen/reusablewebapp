import './ReqHome.css'
import CreateRequest from './CreateRequest'
import SearchRequest from "./SearchRequest";
import Requests from './Requests';
import { useState } from "react";

function ReqHome(props) {

    const [searchBar, setSearchBar] = useState(true)
    const [refresh, setRefresh] = useState(true)
    const [search, setSearch] = useState("")

    return (
        <div className="ReqHome">
            <header className="ReqHome-header">
                <div className="ReqHomeContainer" style={{ width: "90%" }}>
                    <div className="Search">
                        {searchBar
                            ? <SearchRequest setSearchBar={setSearchBar} setSearch={setSearch} setRefresh={setRefresh} />
                            : <CreateRequest setSearchBar={setSearchBar} setRefresh={setRefresh} />
                        }
                    </div>
                    <Requests refresh={refresh} search={search} setRefresh={setRefresh} />
                </div>
            </header>
        </div>
    )
}

export default ReqHome