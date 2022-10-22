import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          
          <Routes>
          <Route
              exact
              path="/"
              element={
                <News
                  key="general"
                  country="us"
                  pageSize={this.pageSize} 
                  apiKey = {this.apiKey}
                  category="general"
                />
              }
            />

            <Route
              exact
              path="/general"
              element={
                <News
                  key="general"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="general"
                />
              }
            />

            <Route
              exact
              path="/business"
              element={
                <News
                  key="business"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="business"
                />
              }
            />

            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="entertainment"
                />
              }
            />

            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="health"
                />
              }
            />

            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="science"
                />
              }
            />

            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="sports"
                />
              }
            />

            <Route
              exact
              path="/technology"
              element={
                <News
                  key="technology"
                  country="us"
                  pageSize={this.pageSize}
                  apiKey = {this.apiKey}
                  category="technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
