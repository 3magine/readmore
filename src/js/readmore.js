(() => {
  var e = document.body.querySelectorAll('[data-readmore]'), 
      x, l, t, 
      tb, te, 
      d, mt, lt, 
      ho, hc,
      ln,
      sd, sr,
      aE = (a,b,c) => {try{a.addEventListener(b,c,!1)}catch(d){a.attachEvent('on'+b,c)}},
      tE = (c,d,b,a) => {b=document;b.createEvent?(a=new Event(d),c.dispatchEvent(a)):(a=b.createEventObject(),c.fireEvent("on"+d,a))};
  ;

  if(e.length == 0)   return;

  for(x=0;x<e.length;x++){
    d = e[x].dataset.readmoreDots || '...';
    mt = e[x].dataset.readmoreMore || 'Read more';
    lt = e[x].dataset.readmoreLess || 'Read less';

    //set readmore link
    ln = document.createElement('a');
    ln.textContent = lt;
    ln.dataset.readmoreLink = mt;
    ln.href='#';
    aE(ln,'click',(e) => {
      var t = ln.dataset.readmoreLink,
          p = ln.parentNode,
          h = p.dataset.readmoreHeight,
          d = p.querySelector('[data-readmore-dots]'),
          r = p.querySelector('[data-readmore-rest]'),
          l = p.querySelector('[data-readmore-link]');

      e.preventDefault();

      //swap link text
      l.dataset.readmoreLink = l.textContent;
      l.textContent = t;

      //toggle dots
      sd.dataset.readmoreDots = parseInt(sd.dataset.readmoreDots) ? 0 : 1;
      
      //toggle rest
      sr.dataset.readmoreRest = parseInt(sr.dataset.readmoreRest) ? 0 : 1;

      //toggle heights
      p.dataset.readmoreHeight = p.style.height;
      p.style.height = h;
      
    });

    l = parseInt(e[x].dataset.readmore);
    t = e[x].textContent;

    //don't break words
    while(/\s/.test(t.substr(l-1,1)) === false) ++l;
    --l; //dont include space
    e[x].dataset.readmore = l; //update

    if(t.length > l){
      //append link
      tb = t.substr(0,l);
      te = t.substr(l);
      
      //set initial content
      e[x].textContent = tb;

      //append dots
      sd = document.createElement('span');
      sd.dataset.readmoreDots=0; //hidden when expanded
      sd.textContent = `${d} `; //include space at the end
      e[x].appendChild(sd);

      //append rest of content
      sr = document.createElement('span');
      sr.dataset.readmoreRest = 1; //visible when expanded
      sr.textContent = `${te} `; //include space at the end
      e[x].appendChild(sr);

      //append readmore link
      e[x].appendChild(ln);

      //calculate expanded height
      ho = e[x].offsetHeight;

      //show dots
      sd.dataset.readmoreDots = 1;
      
      //hide rest
      sr.dataset.readmoreRest = 0;

      //swap link text
      ln.textContent = mt;
      ln.dataset.readmoreLink = lt;

      //now calculate collapsed height
      hc = e[x].offsetHeight;

      //set/store heights for animations
      e[x].style.height = `${hc}px`;
      e[x].dataset.readmoreHeight = `${ho}px`;
    }
  }

})();
