import React, { useState, useEffect } from "react";
import PublicAppContext from "../components/PublicAppContext";
import PublicWorkingWithItem from "../components/PublicWorkingWithItem";

export default function index() {
  const [SelectedItem, setSelectedItem] = useState("");

  return (
    <PublicAppContext setSelectedItem={setSelectedItem}>
      <PublicWorkingWithItem item={SelectedItem} />
    </PublicAppContext>
  );
}
