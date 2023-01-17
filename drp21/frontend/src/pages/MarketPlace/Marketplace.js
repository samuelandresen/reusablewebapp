import './Marketplace.css';
import { useState } from 'react'
import Listings from './Listings';
import SearchMarket from './SearchMarket'
import CreateListing from './CreateListing'


function Marketplace() {

    const [search, setSearch] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [searchBar, setSearchBar] = useState(true);


    return (
        <div className='Market'>
            <header className="Market-header">
                <div className="Conatiner" style={{width: "90%"}}>
                    
                    {
                        searchBar 
                        ? <SearchMarket search={search} setSearch={setSearch} setRefresh={setRefresh} setSearchBar={setSearchBar}/>
                        : <CreateListing setRefresh={setRefresh} setSearchBar={setSearchBar} />
                    }
                    <Listings setRefresh={setRefresh} refresh={refresh} search={search} />
                </div>
            </header>
        </div>
    );
}

export default Marketplace;