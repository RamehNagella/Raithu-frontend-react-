you commited the first commit then you have to do

git remote add origin https://github.com/username/repo.git
git push -u origin main
to push into github reposito

# Raithu

# vedio 1

-create a vite+react application

- Remove unnecessary code and crate a Hellow World app
- Install Tailwind css (https://tailwindcss.com/docs/installation/using-vite)
- Install Daisy UI (https://daisyui.com/docs/install/)
- Add NavBar component to App.jsx (https://daisyui.com/components/navbar/)

- Create a NavBar.jsx seperate component file
- Install react-router-dom (https://reactrouter.com/upgrading/v6#upgrading-from-v6)
- Create BrowserRouter > Routes > Route=/ Body> RouteChildren
- Create an <Outlet /> in you Body component
- Add Footer (https://daisyui.com/components/footer/)

# vedio 2

- Install axios
- CORS -install cors in backend => add middleware to with configuration: origin, credentials: true
- Whenever you are making API call pass axios =>{withCredentials: true} (if not token will not sent back for each route)
- Install redux tool kit (https://redux-toolkit.js.org/introduction/getting-started)

# npm install @reduxjs/toolkit

# npm install react-redux

- configureStore => Provider(in App.jsx) => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly as soon as user logged In
- NavbBar should update as soon as user loggedIn
- Refactor our code to add constants file + create a components folder

Body
NavBar
Route=/ => Feed (grains)
Route=/login => Login
Route=/singup => Signup
Route=/profile => Profile

# to provie any action (component)or any card on webpage

flow is like this

1.  Create a component file (Login.jsx, profile.jsx ...)
2.  Go to App.jsx then add Children route for the specific action in the parent route of App.jsx file
    e.g.
    <BrowserRouter basename="/">
    <Routes>
    {/\* <Route path="/" element={<div>Body</div>} />

              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="/test" element={<div>Test Page</div>} /> */}

              <Route path="/" element={<Body />}>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>

3.  To view that route data in the web page
    go to Body.jsx file and add children route in an <Outlet >

# Then according to your routing(api endpoint) page will display
