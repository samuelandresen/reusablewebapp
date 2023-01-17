import React, { useMemo, useState } from 'react';
import Feed from './pages/Forum/Feed';
import LoginPage from './pages/Login/LoginPage';
import Marketplace from './pages/MarketPlace/Marketplace';
import NavBar from './pages/NavBar';
import Home from './pages/Home/Home'
import CreateAccount from './pages/Login/CreateAccount';
import ReqHome from './pages/Request/ReqHome'
import { BrowserRouter, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import { RepairPost } from './RepairPost';
import { RequestPost } from './RequestPost';
import { ListingPost } from './ListingPost';


function AppRouter() {
  const [user, setUser] = useState(null);
  const [post, setPosts] = useState(null)
  const [request, setRequests] = useState(null)
  const [listing, setListings] = useState(null)

  const userMemo = useMemo(() => ({ user, setUser }), [user, setUser])
  const postMemo = useMemo(() => ({ post, setPosts }), [post, setPosts])
  const requestMemo = useMemo(() => ({ request, setRequests }), [request, setRequests])
  const listingMemo = useMemo(() => ({ listing, setListings }), [listing, setListings])


  return (
    <BrowserRouter>
      <ListingPost.Provider value={listingMemo}>
        <RepairPost.Provider value={postMemo}>
          <RequestPost.Provider value={requestMemo}>
            <UserContext.Provider value={userMemo}>
              <NavBar />
              <Route exact path='/' component={Home} />
              <Route exact path='/requests' component={ReqHome} />
              <Route exact path='/feed' component={Feed} />
              <Route exact path='/market' component={Marketplace} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/createAccount' component={CreateAccount} />
            </UserContext.Provider>
          </RequestPost.Provider>
        </RepairPost.Provider>
      </ListingPost.Provider>
    </BrowserRouter>
  );
}

export default AppRouter;