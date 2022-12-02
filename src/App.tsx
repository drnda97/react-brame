import React, {FC} from 'react';
// @ts-ignore
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Login from "./pages/Login/Login";
import Articles from "./pages/Articles/Articles";
import ProtectedRoute from "./components/Protected";
import AdminArticles from "./pages/admin/Articles/AdminArticles";
import AdminCategories from "./pages/admin/Categories/AdminCategories";
import ArticlePage from "./pages/Article/Article";
import './App.css';

const App:FC = () => {
    return (
        <Router>
        <div className="App">
            <Header />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/admin">
                  <ProtectedRoute>
                    <AdminArticles />
                  </ProtectedRoute>
              </Route>
              <Route path="/categories">
                  <ProtectedRoute>
                    <AdminCategories />
                  </ProtectedRoute>
              </Route>
              <Route path="/article/:id" >
                <ArticlePage />
              </Route>
              <Route path="/">
                <Articles />
              </Route>
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Switch>
            <Footer />
        </div>
        </Router>
    );
}

export default App;
