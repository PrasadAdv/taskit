// Support component names relative to this directory:
import "../../assets/stylesheets/application.css";
import "./hello_react";

var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
