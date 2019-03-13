// ==UserScript==
// @name        Remove Sponsored Posts
// @description Hides all the sponsored stories / Suggested Posts from the Facebook feed
// @namespace   http://facebook.com
// @author      Navneet Khare
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @version     1.1
// ==/UserScript==

window.cleanSponsoredPosts = function() {

  var stories = document.getElementsByClassName("userContentWrapper");
  for (var i = 0; i < stories.length; i++) {
    var story = stories[i];

    var spls= story.querySelectorAll('[role="presentation"]');

    for (var il = 0; il < spls.length; il++) {
        var storyspls = spls[il];
        try{
        var siblingsAnchors=storyspls.previousSibling.getElementsByTagName('a');

        for(var ill=0;ill < siblingsAnchors.length; ill++){
          if(siblingsAnchors[ill].innerText=='Sponsored'){
            story.style.display="none";
            console.log('Sponsored ad hidden');
          }
        }
        }catch(e){
          //console.log('error'+e);
        }

    }

  }
};

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var target = document.getElementsByTagName("body")[0];
var config = { attributes: true, childList: true, characterData: true };

var mutationObserver = new MutationObserver(function(mutations) {
  cleanSponsoredPosts();

});



mutationObserver.observe(target, config);
cleanSponsoredPosts();
