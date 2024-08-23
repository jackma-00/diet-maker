import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Added import statement for BrowserRouter

import { Overview } from "./presenters/overviewPresenter.jsx";
import { Sidebar } from "./presenters/sidebarPresenter.jsx";
import { Meals } from "./presenters/mealsPresenter.jsx";
import { Stats } from "./presenters/statsPresenter.jsx";
import { Daily } from "./presenters/dailyPresenter.jsx";
import { SearchPresenter } from "./presenters/searchPresenter.jsx";
import { HeaderPresenter } from "./presenters/headerPresenter.jsx";
import "./styles.css";
import LoginPresenter from "./presenters/loginPresenter.jsx";
import { GroceryListPresenter } from "./presenters/groceryListPresenter.jsx";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./persistence/firebasePersistence";

const ReactRoot = observer(function ReactRoot(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groceryListSize, setGroceryListSize] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
  }

  if (!user) {
    return (
      <div>
        <LoginPresenter />
      </div>
    );
  }

  if (!props.model.meal && !props.model.daily && !props.model.weekly) {
    return <img src={"https://brfenergi.se/iprog/loading.gif"}></img>;
  }
  return (
    <>
      <Router>
        {/* Added BrowserRouter component */}
        <HeaderPresenter user={user} groceryListSize={groceryListSize} />
        <div className="container" style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route
              path="/overview"
              element={
                <Overview
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/daily"
              element={
                <Daily
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/daily/:id"
              element={
                <Daily
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/meal"
              element={
                <Meals
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/meal/:id"
              element={
                <Meals
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route path="/stats" element={<Stats model={props.model} />} />
            <Route
              path="/search"
              element={
                <SearchPresenter
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/search/:id"
              element={
                <SearchPresenter
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/groceries"
              element={
                <GroceryListPresenter
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
            <Route
              path="/*"
              element={
                <Overview
                  model={props.model}
                  setGroceryListSize={setGroceryListSize}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
});

export { ReactRoot };
