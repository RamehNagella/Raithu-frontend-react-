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
- you should not be access other routes without login

# vedio 2

- If token is not present, redirect user to login page
- Logout feature
- store grain data in redux store
- Display Grain in web page
- Add modification to the grainCard
- Display grains user is logged in or not
- Display action icons (view Grains in login page, login action in grains page if user was not loggedIn)
- Add Sell your grain action icon at the right side of the screan
- Add actions icons using lucide-react (https://lucide.dev/guide/packages/lucide-react#with-lucide-lab-or-custom-icons)
  for card, order, mygrains, organic, nonorganic,..etc
- add each page for each action
- add CIRCLEACTION.JSX reusable code
- add routes in the app.jsx file
- some of the actions display after loggedIn
- some of the actions dislay without loggedIn
<!-- //// -->
- add hover action to the leftside actions and rightside actions
- display rightSell action to required pages(WOrk on Body.jsx using .some() method)
- Add pages for all icons and button actions
- Work on OrderNow action button (take two backend apis for this action one router.get("/grain/:grainId" and router.post("/order/place-order")))
- Display OrderSummary on the page
<!--  -->
- Work complete Order api (/place-order, .get('/orders/),/my-orders,/track, /cancel/order, /cancel/item, )
- Orders Doesn't stored on Redux store
- complete ui work based on each api on their respective pages
- Set NavBar and Footer, SideBar and MainContent at their positions

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

Then according to your routing(api endpoint) page will display

# Displaying data in page work flow

- 1. define router in App.jsx as a child route
     e.g. <Route path="/grain" element={<Feed />} /> (Feed is the name of the file which has all data we need and display code taken from backend api )
- 2. create a file.jsx such that it get the data from suitable backend api and displaying react code
- 3. In the fil create a async function and get the data from backend api
     e.g.
     const Feed = ()=>{

     const grains = async()=>{
     const res = await axios.get(BASE_URL + "/grains",{withCreadentials: true});
      <!-- (http://localhost:7777/grains) this is backend api get the data from server -->

     }

     }

- 4. after getting the feed(data from backend ) add the data to store (redux store) for this create a util file (feedSlice.js)
     e.g
     const feedSlice = createSlice({
     name:"feed",
     initialState: null,
     reducers: {
     addFeed:(state, action)=>{
     return action.payload
     }
     removeFeed:(state, action)=>{
     return null;
     }
     }
     })

  export const {addFeed} = feedSlice.actions (this export wil add the data to the store)
  export default feedslice.reducer;

- 5. then call(register) this above function in appStore.js file so that it works as expected to store data in browser redux store
     e.g
     import userReducer from "./userSlice.js"
     import feedReducer from "./feedSlice.js"

     const appStore = configureStore({
     reducer:{
     user: userReducer, <!--this will store user data in redux store  -->
     feed: feedReducer <!--this will store  feed data in redux store  -->
     }
     })

     export defualt appStore;

with this we added the data in store

- 6. when we call getFeed() function will make api call, get the data then we need to dispatch the action using
     e.g  
      import {addFeed} from "../utils/feedSlice"
     const dispatch = useDispatch();
     const getFeed = ()=>{
     const res = api call
     dispatch(addFeed(res.data)) (<!-- finally we added the feed or data to the store  from 4 to 6 is the process of creating files to store data in redux store so that we dont call api every time when we want to data --> )
     }
- 7. Once you added the data to user we can read and remove it using

  const feed = useSelector(store=>store.feed);
  - when we get the feed first time we need add useEffect() like this
    useEffect(()=>{
    getFeed()
    },[]) <!-- this means when page loads call getFeed so that data will diplay -->

  - if data is already present in store then no need to call api
    add this check in the getFeed() function of feed() function

    const feed = useSelector(store =>store.feed)
    const grains = async()=>{
    if(feed) return; <!--check added-->

    const res = await axios.get(BASE_URL + "/grains",{withCreadentials: true});
    <!-- (http://localhost:7777/grains) this is backend api get the data from server -->

    dispatch(addFeed(res.data))

    }

# ✅ 📌 Displaying Backend Data in React (Redux Flow)

🔁 Complete Workflow (Step-by-Step)
🟢 1️⃣ Define Route in App.jsx

Create route for the page that will display data.

Example:

<Route path="/grain" element={<Feed />} />

👉 When user visits /grain, Feed.jsx loads.

🟢 2️⃣ Create Feed.jsx Component

This component:

Calls backend API

Dispatches data to Redux store

Reads data from Redux store

Displays data in UI

🟢 3️⃣ Create API Function Inside Component
const getFeed = async () => {
const res = await axios.get(BASE_URL + "/grains", {
withCredentials: true
});

dispatch(addFeed(res.data));
};

👉 This function:

Calls backend (http://localhost:7777/grains)

Gets data

Sends data to Redux store

🟢 4️⃣ Create Redux Slice (feedSlice.js)

Purpose: Store API data globally.

const feedSlice = createSlice({
name: "feed",
initialState: null,
reducers: {
addFeed: (state, action) => {
return action.payload;
},
removeFeed: () => {
return null;
}
}
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;

👉 addFeed → Adds API data to store
👉 removeFeed → Clears data

🟢 5️⃣ Add Slice to Store (appStore.js)
const appStore = configureStore({
reducer: {
user: userReducer,
feed: feedReducer
}
});

👉 Now Redux store contains:

store = {
user: {},
feed: {}
}
🟢 6️⃣ Dispatch Data After API Call

Inside Feed.jsx:

const dispatch = useDispatch();

dispatch(addFeed(res.data));

👉 This sends backend data into Redux store.

🟢 7️⃣ Read Data From Store
const feed = useSelector(store => store.feed);

👉 Now you can display:

{feed && feed.map(item => (

   <div key={item._id}>{item.name}</div>
))}
🟢 8️⃣ Prevent Unnecessary API Calls (Important 🚀)

Before calling API, check if data already exists:

const getFeed = async () => {
if (feed) return; // ✅ Already in store, don't call API

const res = await axios.get(BASE_URL + "/grains", {
withCredentials: true
});

dispatch(addFeed(res.data));
};

👉 This improves performance
👉 Avoids repeated backend calls

🟢 9️⃣ Call API on Page Load Using useEffect
useEffect(() => {
getFeed();
}, []);
🔥 Why Do We Call useEffect()?

This is VERY important concept.

👉 React component lifecycle:

When component loads:

React renders component

Then we want to call API

Then update state

But if we call API directly inside component body:

getFeed(); ❌

It will:

Call API on every render

Cause infinite loop

Crash app

✅ So we use useEffect(() => {}, [])

The empty dependency array [] means:

👉 "Run this only once when component mounts"

So:

Page loads
↓
useEffect runs
↓
API called
↓
Data stored in Redux
↓
UI updates
🧠 Simple Memory Trick

Think like this:

Route → Component → API Call → Dispatch → Store → useSelector → Display

OR shorter:

API → Dispatch → Store → useSelector → UI
🎯 Why Redux Here?

Because:

Without Redux:

Every page change → API call again ❌

With Redux:

API call once ✅

Data reused everywhere ✅

Faster UI ✅

Clean architecture ✅

Since you're a backend engineer moving strong into frontend (React + Redux), this pattern is industry standard.

If you want next, I can give you:

🔥 Professional folder structure for this

🔥 Optimized version using RTK Query

🔥 How big companies structure API + Redux
