/* תפריט נגישות מובנה — סופלה. בלי שירות חיצוני; ההעדפות נשמרות בדפדפן של הגולש בלבד */
(function(){
  var KEY="sfl_a11y",OPTS=[
    ["zoom","הגדלת טקסט","A+"],
    ["contrast","ניגודיות גבוהה","◐"],
    ["links","הדגשת קישורים","🔗"],
    ["font","גופן קריא","Aa"],
    ["still","עצירת אנימציות","⏸"],
    ["cursor","סמן גדול","➤"]
  ];
  var st={};try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  var css=document.createElement("style");
  css.textContent=
    ".a11y-fab{position:fixed;bottom:16px;left:16px;z-index:95;width:52px;height:52px;border-radius:50%;background:#1f4fd1;color:#fff;border:3px solid #fff;box-shadow:0 8px 24px rgba(0,0,0,.25);display:grid;place-items:center;cursor:pointer}"+
    ".a11y-fab svg{width:28px;height:28px}"+
    ".a11y-panel{position:fixed;bottom:80px;left:16px;z-index:96;width:min(320px,calc(100vw - 32px));background:#fff;color:#1a1a1a;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);padding:18px;font-family:Heebo,Arial,sans-serif;direction:rtl;display:none}"+
    ".a11y-panel.open{display:block}"+
    ".a11y-panel h2{font-size:18px;margin:0 0 12px;display:flex;justify-content:space-between;align-items:center}"+
    ".a11y-panel .x{background:none;border:0;font-size:22px;cursor:pointer;color:#1a1a1a}"+
    ".a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}"+
    ".a11y-grid button{border:2px solid #d9d9d9;background:#f7f7f7;border-radius:14px;padding:12px 8px;font:700 13.5px Heebo,Arial,sans-serif;color:#1a1a1a;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px}"+
    ".a11y-grid button b{font-size:18px}"+
    ".a11y-grid button[aria-pressed=true]{border-color:#1f4fd1;background:#e8eeff;color:#1f4fd1}"+
    ".a11y-foot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:13px}"+
    ".a11y-foot button{background:none;border:0;text-decoration:underline;cursor:pointer;font:inherit;color:#1a1a1a}"+
    ".a11y-foot a{color:#1f4fd1;font-weight:700}"+
    ".a11y-fab:focus-visible,.a11y-panel button:focus-visible,.a11y-panel a:focus-visible{outline:3px solid #ffb300;outline-offset:2px}"+
    "html.a11y-zoom body{zoom:1.15}"+
    "html.a11y-contrast{--muted:#2b1c10!important;--line:#6b5442!important;--pink:#b8123a!important;--pink-d:#8f0d2c!important}"+
    "html.a11y-contrast body,html.a11y-contrast .item,html.a11y-contrast .row,html.a11y-contrast .group{background:#fff!important;color:#000!important}"+
    "html.a11y-contrast body::after{display:none!important}"+
    "html.a11y-links a{text-decoration:underline!important;text-underline-offset:3px;outline:2px dashed currentColor;outline-offset:2px}"+
    "html.a11y-font body,html.a11y-font body *{font-family:Arial,Helvetica,sans-serif!important;letter-spacing:.02em}"+
    "html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important}"+
    "html.a11y-cursor,html.a11y-cursor *{cursor:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M4 2l28 14-12 3-5 13z' fill='black' stroke='white' stroke-width='2'/%3E%3C/svg%3E\") 4 2,auto!important}"+
    "*:focus-visible{outline:3px solid #EF4263;outline-offset:3px}"+
    ".skip-link{position:absolute;top:-80px;right:12px;z-index:200;background:#452910;color:#fff;padding:10px 16px;border-radius:10px;font-weight:700;text-decoration:none}"+
    ".skip-link:focus{top:12px}";
  document.head.appendChild(css);

  var root=document.documentElement;
  function apply(){
    OPTS.forEach(function(o){root.classList.toggle("a11y-"+o[0],!!st[o[0]])});
    if(window.gsap){st.still?gsap.globalTimeline.pause():gsap.globalTimeline.resume()}
    try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}
    document.querySelectorAll(".a11y-grid button").forEach(function(b){b.setAttribute("aria-pressed",st[b.dataset.k]?"true":"false")});
  }
  window.SFL_A11Y_STILL=function(){return !!st.still};

  function build(){
    var fab=document.createElement("button");
    fab.className="a11y-fab";fab.type="button";
    fab.setAttribute("aria-label","תפריט נגישות");fab.setAttribute("aria-expanded","false");fab.setAttribute("aria-controls","a11yPanel");
    fab.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M19 8.5c-2.2.6-4.6.9-7 .9s-4.8-.3-7-.9l-.5 1.9c1.9.5 3.9.8 5.9.9V14l-2.2 7.2 1.9.6L12 15.6l1.9 6.2 1.9-.6L13.6 14v-2.7c2-.1 4-.4 5.9-.9z"/></svg>';
    var pn=document.createElement("div");
    pn.className="a11y-panel";pn.id="a11yPanel";pn.setAttribute("role","dialog");pn.setAttribute("aria-label","הגדרות נגישות");
    pn.innerHTML='<h2>נגישות<button class="x" type="button" aria-label="סגירת תפריט הנגישות">✕</button></h2><div class="a11y-grid">'+
      OPTS.map(function(o){return '<button type="button" data-k="'+o[0]+'" aria-pressed="false"><b aria-hidden="true">'+o[2]+'</b>'+o[1]+'</button>'}).join("")+
      '</div><div class="a11y-foot"><button type="button" class="reset">איפוס</button><a href="accessibility.html">הצהרת נגישות</a></div>';
    document.body.appendChild(fab);document.body.appendChild(pn);
    function toggle(open){pn.classList.toggle("open",open);fab.setAttribute("aria-expanded",open?"true":"false");if(open)pn.querySelector(".a11y-grid button").focus();else fab.focus()}
    fab.onclick=function(){toggle(!pn.classList.contains("open"))};
    pn.querySelector(".x").onclick=function(){toggle(false)};
    pn.querySelector(".reset").onclick=function(){st={};apply()};
    pn.addEventListener("click",function(e){var b=e.target.closest(".a11y-grid button");if(!b)return;st[b.dataset.k]=!st[b.dataset.k];apply()});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&pn.classList.contains("open"))toggle(false)});
    // קישור דילוג לתוכן
    var main=document.querySelector("main");
    if(main){if(!main.id)main.id="main";var sk=document.createElement("a");sk.className="skip-link";sk.href="#"+main.id;sk.textContent="דילוג לתוכן הראשי";document.body.prepend(sk)}
    apply();
  }
  OPTS.forEach(function(o){root.classList.toggle("a11y-"+o[0],!!st[o[0]])});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build);else build();
})();
