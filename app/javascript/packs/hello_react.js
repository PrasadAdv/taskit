import React from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "../components/HelloWorld";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.body.appendChild(document.createElement('div'));
  const root = createRoot(rootElement);
  root.render(<HelloWorld />);
});
