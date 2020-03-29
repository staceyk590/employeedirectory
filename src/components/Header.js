import React, { Component } from 'react';
import "../styles/Header.css";

export default function Header() {
    return (
      <div className="header">
        <h1>Employee Directory</h1>
        <p>Click on carrots to filter by heading or use the search box to narrow your results.</p>
      </div>
    )
}