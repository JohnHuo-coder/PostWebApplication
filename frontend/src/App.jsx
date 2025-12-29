import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import MyProfile from './components/MyProfile.jsx';
import Info from './components/NotUsed/Info.jsx';
import Public_info from './components/public_info.jsx';
import Settings from './components/NotUsed/Settings.jsx';
import Discover from './components/Discover.jsx';
import UserProfile from './components/UserProfile.jsx';
import Posts from './components/Posts.jsx';
import Post from './components/Post.jsx';
import PostDetail from './components/PostDetail.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import Onboard from './components/Onboard.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import PostSuccess from './components/postSuccess.jsx';
import ErrorPage from './components/popOuts/ErrorPage.jsx';
import OauthCallback from './components/AuthCallback.jsx';

function App() {


  return(
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/discover">
            <Route index element={<Discover />} />  
            <Route path=":id" element={<UserProfile />} /> 
          </Route>
          <Route path="/posts">
            <Route index element={<Posts />} />  
            <Route path="post" element={<Post />} />
            <Route path="success" element={<PostSuccess />} />
            <Route path=":id" element={<PostDetail />} />
          </Route>
          <Route path='/myprofile'>
            <Route index element={<MyProfile />} />  
            <Route path="edit/personal" element={<Info />} />
            <Route path="edit/public" element={<Public_info />} /> 
          </Route>

          <Route path='/settings' element={<Settings />}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='auth/callback' element={<OauthCallback />}/>
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/onboard" element={<Onboard />} />
          <Route path="*" element={<ErrorPage type="404" message="Page Not Found" description="The page you are looking for does not exist." />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
