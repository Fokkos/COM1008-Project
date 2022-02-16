//DarkToggle function to enable dark mode functionality
//Author: James March 2021

function darkToggle(){
    if (dark == false){ //If the website is in light mode, enable dark mode
        //Below changes the style of the top elements containing the header
        document.body.style.backgroundColor = "black";
        document.getElementById("titleHolder").style.backgroundColor= "#0e2c39";
        document.getElementById("darkToggleIcon").style.filter = "invert(100%)";

        //Below that is the elements containing the navbar elements
        document.getElementById("navbar").style.backgroundColor= "#173b4a";
        document.getElementById("active").style.color= "white";
        var all = document.getElementsByClassName('navbarItem');
        for (var i = 0; i < all.length; i++) {
            all[i].style.color = 'white';
        }
        document.getElementById("menuIcon").style.color= "white";
        document.getElementById("pageName").style.color= "white";

        //The following for loops go through every element in a content div
        var all = document.getElementsByClassName('contentH1'); //h1
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = '#0e2c39';
            all[i].style.color = 'white';
        }
        var all = document.getElementsByClassName('contentP'); //p1
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = '#173b4a';
            all[i].style.color = 'white';
            all[i].style.fontWeight = 'bold';
        }

        //Then sets current page mode to dark mode for if icon is clicked again
        dark = true;
    }
    else{ //If the page is in dark mode already, it just reverts elements back
          //To original state
        document.body.style.backgroundColor = "white";
        document.getElementById("titleHolder").style.backgroundColor= "#3999c1";
        document.getElementById("darkToggleIcon").style.filter = "invert(0%)";
        document.getElementById("navbar").style.backgroundColor= "#bcebff";
        document.getElementById("active").style.color= "black";
        var all = document.getElementsByClassName('navbarItem');
        for (var i = 0; i < all.length; i++) {
            all[i].style.color = 'black';
        }
        document.getElementById("menuIcon").style.color= "black";
        document.getElementById("pageName").style.color= "black";


        var all = document.getElementsByClassName('contentH1');
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = '#3999c1';
            all[i].style.color = 'black';
        }

        var all = document.getElementsByClassName('contentP');
        for (var i = 0; i < all.length; i++) {
            all[i].style.backgroundColor = '#bcebff';
            all[i].style.color = 'black';
            all[i].style.fontWeight = 'normal';
        }
        
        dark = false;
    }
}

//Initially the page is loaded in light mode, so dark == false
dark = false;