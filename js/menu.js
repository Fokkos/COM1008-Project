//Script for defining how the responsive menu works
//Tutorial used: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
//Author: James March, 2021

"use strict";

function expandMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " open";
    } else {
      x.className = "navbar";
    }
  }
  