import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login';
// import { useEffect } from 'react';
// import { auth } from './Firebase';
// import { useStateValue } from './contextAPI/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KLTqhSJ8843tiRLrDLXoBSPVx2gBXE1SpIhSKOvnJxoq7IFVcgOvzB91mnf1mrJkhV8aQeMXYwqyRGhGy2gS7fA00gT22y0Gs');

function App() {

  // const [state, dispatch] = useStateValue();

//       useEffect(() => {
//         // will run once when the app loads
//     //   const subcribe = auth.onAuthStateChanged(authUser => {
//     //     if(authUser) {
//     //         dispatch({
//     //         // logged in
//     //         type: "SET_USER",
//     //         user: authUser
//     //         })
//     //     }
//     //     else {
//     //         // logged out
//     //         dispatch({
//     //         type: "SET_USER",
//     //         user: null
//     //         })
//     //     }
//     // })
//     // return subcribe;
//     console.log("Wassup!")
// })

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route> 
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>          
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
