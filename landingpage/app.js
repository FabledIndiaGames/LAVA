/* LAVA landing — vanilla JS, no trackers. Copy-link + progress + FAQ deep-linking stay in this browser only. */
(function(){
  "use strict";
  var y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();

  // Scroll progress
  var bar = document.getElementById("progressBar");
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? (h.scrollTop / max) : 0;
    if(bar) bar.style.width = (p*100).toFixed(1) + "%";
  }
  document.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // FAQ deep-linking
  document.querySelectorAll(".faq details").forEach(function(d){
    d.addEventListener("toggle", function(){
      if(d.open && d.id) history.replaceState(null,"","#"+d.id);
    });
  });

  // Copy link (traffic helper, no tracker)
  var c = document.getElementById("copyLinkBtn");
  if(c) c.addEventListener("click", function(){
    var url = "https://lava.fabledindia.com/?utm_source=copy-link";
    function done(){ c.textContent = "Copied ✓"; setTimeout(function(){ c.textContent = "Copy link"; }, 1600); }
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done, done); }
    else { var t=document.createElement("textarea"); t.value=url; document.body.appendChild(t); t.select(); try{document.execCommand("copy");}catch(e){} document.body.removeChild(t); done(); }
  });
})();
