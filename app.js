"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// ─── SHARED DATA & COMPONENTS ─────────────────────────────────────────────────

// Local SVG placeholder used when a frame has no real photo wired up.
var BTS_PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#141414"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient>' +
  '<pattern id="p" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="transparent"/><circle cx="11" cy="11" r="0.6" fill="#1a1a1a"/></pattern></defs>' +
  '<rect width="800" height="1000" fill="url(#g)"/><rect width="800" height="1000" fill="url(#p)"/>' +
  '<g font-family="JetBrains Mono, monospace" fill="#3a3a3a" text-anchor="middle">' +
  '<text x="400" y="498" font-size="18" letter-spacing="6">NO FRAME</text>' +
  '<text x="400" y="528" font-size="12" letter-spacing="4" opacity="0.6">PLACEHOLDER</text>' +
  '</g></svg>'
);
function btsImg(seed) {
  return BTS_PLACEHOLDER;
}
function btsImgColor(seed) {
  return BTS_PLACEHOLDER;
}
// Render an absolutely-positioned <picture> layer with AVIF/WebP/JPG sources and lazy loading.
// `pic` can be either a URL string (legacy / placeholder) or an object { src, srcWebp, srcAvif }.
function pictureLayer(pic, opts) {
  if (!pic) return null;
  opts = opts || {};
  var isObj = _typeof(pic) === "object";
  var src = isObj ? pic.src : pic;
  if (!src) return null;
  var srcWebp = isObj ? pic.srcWebp : null;
  var srcAvif = isObj ? pic.srcAvif : null;
  var children = [];
  if (srcAvif) children.push(React.createElement("source", { key: "avif", srcSet: srcAvif, type: "image/avif" }));
  if (srcWebp) children.push(React.createElement("source", { key: "webp", srcSet: srcWebp, type: "image/webp" }));
  children.push(React.createElement("img", {
    key: "img",
    src: src,
    alt: opts.alt || "",
    loading: opts.eager ? "eager" : "lazy",
    decoding: "async",
    draggable: false,
    style: {
      width: "100%",
      height: "100%",
      objectFit: opts.objectFit || "cover",
      objectPosition: opts.focusPosition || "center",
      display: "block",
      filter: opts.bw ? "grayscale(1) contrast(1.08) brightness(0.92)" : undefined
    }
  }));
  return React.createElement("picture", {
    key: opts.key,
    className: opts.className,
    style: _objectSpread({
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      display: "block",
      opacity: opts.opacity != null ? opts.opacity : 1,
      transition: opts.transition || undefined,
      zIndex: opts.zIndex,
      pointerEvents: "none"
    }, opts.style || {})
  }, children);
}
function FilmFrame(_ref) {
  var _ref$seed = _ref.seed,
    seed = _ref$seed === void 0 ? 0 : _ref$seed,
    _ref$w = _ref.w,
    w = _ref$w === void 0 ? 800 : _ref$w,
    _ref$h = _ref.h,
    h = _ref$h === void 0 ? 1000 : _ref$h,
    label = _ref.label,
    frameNo = _ref.frameNo,
    ratio = _ref.ratio,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    children = _ref.children,
    _ref$colorable = _ref.colorable,
    colorable = _ref$colorable === void 0 ? false : _ref$colorable,
    _ref$colorOn = _ref.colorOn,
    colorOn = _ref$colorOn === void 0 ? false : _ref$colorOn,
    _ref$realSrc = _ref.realSrc,
    realSrc = _ref$realSrc === void 0 ? null : _ref$realSrc,
    _ref$realColorSrc = _ref.realColorSrc,
    realColorSrc = _ref$realColorSrc === void 0 ? null : _ref$realColorSrc,
    _ref$focusPosition = _ref.focusPosition,
    focusPosition = _ref$focusPosition === void 0 ? "center" : _ref$focusPosition,
    _ref$objectFit = _ref.objectFit,
    objectFit = _ref$objectFit === void 0 ? "cover" : _ref$objectFit,
    _ref$eager = _ref.eager,
    eager = _ref$eager === void 0 ? false : _ref$eager;
  // Normalize bw + color picture data (accept string URL OR { src, srcWebp, srcAvif })
  var bwPicData = (realSrc && _typeof(realSrc) === "object")
    ? realSrc
    : (realSrc ? { src: realSrc } : { src: btsImg(seed, w, h) });
  var colorPicData = null;
  if (colorable) {
    if (realColorSrc && _typeof(realColorSrc) === "object") colorPicData = realColorSrc;
    else if (realColorSrc) colorPicData = { src: realColorSrc };
    else if (realSrc && _typeof(realSrc) === "object") colorPicData = realSrc;
    else if (realSrc) colorPicData = { src: realSrc };
    else colorPicData = { src: btsImgColor(seed, w, h) };
  }
  return React.createElement("div", {
    className: "grain vignette",
    style: _objectSpread({
      position: "relative",
      width: "100%",
      height: "100%",
      background: "#0a0a0a",
      overflow: "hidden"
    }, style)
  }, colorable && pictureLayer(colorPicData, {
    key: "color",
    focusPosition: focusPosition,
    objectFit: objectFit,
    opacity: colorOn ? 1 : 0,
    transition: "opacity .32s cubic-bezier(.3,.7,.3,1)",
    eager: eager,
    alt: label || ""
  }), pictureLayer(bwPicData, {
    key: "bw",
    className: "bw-img",
    focusPosition: focusPosition,
    objectFit: objectFit,
    opacity: colorable && colorOn ? 0 : 1,
    transition: "opacity .32s cubic-bezier(.3,.7,.3,1)",
    eager: eager,
    bw: true,
    alt: label || ""
  }), frameNo && React.createElement("div", {
    style: {
      position: "absolute",
      top: 8,
      left: 10,
      zIndex: 2,
      fontSize: 9,
      color: "var(--accent)",
      fontWeight: 700,
      letterSpacing: ".08em",
      textShadow: "0 0 4px rgba(0,0,0,.7)"
    }
  }, frameNo), label && React.createElement("div", {
    className: "film-frame-label",
    style: {
      position: "absolute",
      bottom: 6,
      left: 10,
      right: 10,
      zIndex: 2,
      fontSize: 9,
      color: "rgba(255,255,255,.88)",
      letterSpacing: ".12em",
      textShadow: "0 0 4px rgba(0,0,0,.8)",
      display: "flex",
      justifyContent: "space-between"
    }
  }, React.createElement("span", null, label), ratio && React.createElement("span", {
    style: {
      opacity: .7
    }
  }, ratio)), children);
}
function Timecode(_ref2) {
  var _ref2$live = _ref2.live,
    live = _ref2$live === void 0 ? true : _ref2$live;
  var _React$useState = React.useState(142),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    f = _React$useState2[0],
    setF = _React$useState2[1];
  React.useEffect(function () {
    if (!live) return;
    var id = null;
    var start = function start() {
      if (id) return;
      id = setInterval(function () {
        return setF(function (x) {
          return x + 1;
        });
      }, 1000 / 24);
    };
    var stop = function stop() {
      if (id) {
        clearInterval(id);
        id = null;
      }
    };
    var onVis = function onVis() {
      return document.hidden ? stop() : start();
    };
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);
    return function () {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [live]);
  var m = Math.floor(f / (60 * 24)).toString().padStart(2, "0");
  var s = Math.floor(f / 24 % 60).toString().padStart(2, "0");
  var fr = (f % 24).toString().padStart(2, "0");
  return React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, "00:", m, ":", s, ":", fr);
}
function kindLabel(f) {
  return f.kind === "MUSIC" ? "MUSIC VIDEO" : f.kind === "WEB" ? "WEB SERIES" : "FEATURE";
}
function kindRatioCSS(f, heroOrientation) {
  if (heroOrientation === "portrait") return "2 / 3";
  return f.kind === "FILM" ? "2.39 / 1" : f.kind === "WEB" ? "2 / 1" : "16 / 9";
}
function kindRatioText(f) {
  return f.kind === "FILM" ? "2.39 : 1" : f.kind === "WEB" ? "2 : 1" : "16 : 9";
}

// ─── PORTFOLIO DATA ───────────────────────────────────────────────────────────

var PORTFOLIO = {
  name: "SHUBHAM SRIVASTAVA",
  initials: "S.S.",
  role: "BTS Photographer",
  tagline: "Stills from inside the frame.",
  city: "HYDERABAD",
  years: "2025 —",
  bio: ["I think of myself as the snow leopard on set — everywhere on the floor, seen by almost no one. I read the frame the way the camera department does, probably because I spend most of my day watching them work. What happens between takes — beside the monitor, behind the lens — tells a story the film itself never will.", "I work like a third camera unit: reliable, self-directed, always rolling. My brief is the entire set, from the director to the spark. Everyone earns a real portrait when I'm around, because everyone shapes how the film gets made. I read the emotion before I frame it — that's the job. Catching what someone feels in the moment, and being ready when it surfaces, is what separates a BTS still from a snapshot.", "What I'm really building is a production archive — a record of how these films were made, who made them, and what it actually looked like from the inside. Hyderabad, 2024 onwards. The crew is the subject."],
  gear: [
    ["Sony A7 IV", "Primary body, all-digital workflow"],
    ["Sigma 50mm f/1.4 Art", "Portraits, low-light close work"],
    ["Sigma 24-70mm f/2.8", "All-purpose set zoom"],
    ["Zeiss 85mm f/1.8", "Compressed candids, monitor side"],
    ["Sony 35mm f/1.4 GM", "Environmental, wider on-set context"],
    ["Sony 70-200mm f/4 G", "Long lens, unobtrusive coverage"],
    ["Sony 85mm f/1.4 GM", "Director and DOP portraits"]
  ],
  films: [{
    id: "001",
    kind: "FILM",
    title: "KAANTHA",
    altTitle: "SHAANTHA (KANNADA)",
    dir: "SELVAMANI SELVARAJ",
    dop: "DANI SÁNCHEZ-LÓPEZ",
    yr: "2025",
    lang: "TAMIL",
    langs: ["TAMIL", "TELUGU", "HINDI", "MALAYALAM", "KANNADA"],
    days: 75,
    fmt: "DGTL · SONY A7 IV",
    cam: "SONY A7 IV",
    frames: "10,000+",
    archive: "~1 TB",
    loc: "HYDERABAD",
    cast: ["DULQUER SALMAAN", "SAMUTHIRAKANI", "BHAGYASHRI BORSE", "RANA DAGGUBATI"],
    status: "RELEASED",
    releaseDate: "14 NOV 2025",
    ott: "NETFLIX",
    ottDate: "12 DEC 2025",
    runtime: "2H 43M",
    producers: [{
      name: "DULQUER SALMAAN",
      banner: "WAYFARER FILMS"
    }, {
      name: "RANA DAGGUBATI",
      banner: "SPIRIT MEDIA"
    }],
    motion: "RAW · ~2.8 TB"
  }, {
    id: "002",
    kind: "FILM",
    title: "SUBHAM",
    dir: "PRAVEEN KANDREGULA",
    dop: "MRIDUL SEN",
    yr: "2025",
    lang: "TELUGU",
    days: 48,
    fmt: "DGTL · SONY A7 IV",
    cam: "SONY A7 IV",
    frames: "20,000+",
    archive: "~0.8 TB",
    loc: "HYDERABAD · BHEEMLI",
    cast: ["HARSHITH REDDY", "SHRIYA KONTHAM", "SHALINI KONDEPUDI", "CHARAN PERI", "VAMSHIDHAR GOUD"],
    status: "RELEASED",
    archiveInProgress: true,
    archiveNote: "ARCHIVE IN PROGRESS",
    releaseDate: "09 MAY 2025",
    ott: "JIOHOTSTAR",
    ottDate: "13 JUN 2025",
    runtime: "2H 05M",
    producers: [{
      name: "SAMANTHA RUTH PRABHU",
      banner: "TRALALA MOVING PICTURES"
    }],
    genre: "HORROR COMEDY",
    motion: "RAW · ~1.2 TB"
  }, {
    id: "003",
    kind: "WEB",
    title: "BLACK AND WHITE",
    dir: "PRAVEEN SATTARU",
    dop: "VIVEK KALEPU",
    yr: "2026",
    lang: "TELUGU",
    langs: ["TELUGU"],
    days: 87,
    fmt: "DGTL · SONY A7 IV",
    cam: "SONY A7 IV",
    frames: "15,000+",
    archive: "~1.8 TB",
    loc: "HYDERABAD",
    cast: ["JAGAPATHI BABU", "AMANI"],
    status: "POST",
    platform: "SONY LIV",
    producers: [{
      name: "NORTHSTAR PRODUCTION"
    }],
    motion: "RAW · ~2.2 TB"
  }, {
    id: "004",
    kind: "MUSIC",
    title: "KHAALI PEELI",
    dir: "ESWAR ASRITH",
    yr: "2026",
    lang: "TELUGU · HINDI · ENGLISH",
    days: 1,
    fmt: "DGTL · STILLS ONLY",
    frames: "1,170",
    archive: "44.5 GB",
    loc: "HYDERABAD",
    artist: "KRILLZ",
    artistRealName: "KRANTHI RAJEN",
    label: "INDEPENDENT",
    blurb: "One-day shoot. Trilingual track — verses in Telugu, Hindi, English. Stills only, no motion.",
    motion: "NONE"
  }, {
    id: "005",
    kind: "FILM",
    title: "UNNAMED",
    dir: "VIKRAM K. KUMAR",
    yr: "2025",
    lang: "TELUGU",
    days: "—",
    fmt: "DGTL · LOOK TEST",
    frames: "300+",
    archive: "LOOK TEST ONLY",
    loc: "HYDERABAD",
    status: "SHELVED",
    shelvedReason: "SCHEDULING"
  }, {
    id: "006",
    kind: "WEB",
    title: "GUVVALA CHERUVU GHAT",
    dir: "BHARATH KAMMA",
    dop: "MANOJH REDDY",
    yr: "2026",
    lang: "TELUGU",
    langs: ["TELUGU"],
    days: "8 / ~25",
    fmt: "DGTL · SONY A7 IV",
    cam: "SONY A7 IV",
    frames: "TBD",
    archive: "TBD",
    loc: "HYDERABAD",
    cast: ["KIRAN ABBAVARAM", "THIRUVEER", "SAMYUKTHA MENON", "TEJASWI RAO", "SIDDIQUE", "AADUKALAM NAREN", "VIKAS DARSHAN", "MAHARSHI VIDHYA", "VINOD KISHAN"],
    status: "PRODUCTION",
    archiveInProgress: true,
    archiveNote: "PRODUCTION IN PROGRESS",
    platform: "AMAZON PRIME",
    producers: [{
      name: "BAPINEEDU B"
    }, {
      name: "SUDHEER EDARA"
    }],
    productionHouse: "DREAM FARMERS LLP",
    creators: ["BHARATH KAMMA", "PRASANKAR"],
    dialogues: ["PRASANKAR", "DEVI HARI PRASAAD", "VENKATESH D. PATI"],
    motion: "NONE"
  }],
  series: [{
    id: "directors",
    title: "THE DIRECTORS",
    count: 27,
    blurb: "Directors on set, in action — blocking, deciding, watching. Drawn from across the slate.",
    role: "THE EYES",
    thumbnailSrc: "DIRECTORS_THUMB",
    thumbnailOrient: "portrait"
  }, {
    id: "dops",
    title: "THE CINEMATOGRAPHERS",
    count: 29,
    blurb: "DOPs framing, blocking, gaffing — the people whose work mine is in conversation with. With notes on lenses and lights where I caught them.",
    role: "THE FRAMES"
  }, {
    id: "crew",
    title: "THE CREW",
    count: 48,
    blurb: "Focus pullers, gaffers, sound, art, AD. The people who actually make the film. The largest series in the archive.",
    role: "THE HANDS"
  }, {
    id: "between",
    title: "BETWEEN SETUPS",
    count: 35,
    blurb: "Cigarette breaks. Long lunches. Naps on apple boxes. The unguarded twenty minutes between shots, which I think is when most of the real character emerges.",
    role: "THE PAUSE"
  }, {
    id: "set",
    title: "THE SET ITSELF",
    count: 26,
    blurb: "Locations between takes. Empty production design. Marks taped on the floor at 4am. A set with no people in it is its own kind of portrait.",
    role: "THE ROOM"
  }],
  contact: {
    email: "shubham.srivastava1502@gmail.com",
    phone: "+91 8447402780",
    whatsapp: "https://wa.me/918447402780",
    base: "HYDERABAD · OPEN TO TRAVEL",
    rates: "DAY RATES ON REQUEST · NDA STANDARD"
  }
};

// ─── ATOMS ────────────────────────────────────────────────────────────────────

function Eyebrow(_ref3) {
  var children = _ref3.children,
    _ref3$style = _ref3.style,
    style = _ref3$style === void 0 ? {} : _ref3$style;
  return React.createElement("div", {
    style: _objectSpread({
      fontSize: 10,
      letterSpacing: ".3em",
      opacity: .55
    }, style)
  }, children);
}
function BigType(_ref4) {
  var children = _ref4.children,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? "h1" : _ref4$size,
    _ref4$style = _ref4.style,
    style = _ref4$style === void 0 ? {} : _ref4$style;
  var className = typeof size === "string" ? "bt-" + size : "bt-h1";
  var inlineFs = typeof size === "number" ? { fontSize: size } : {};
  return React.createElement("div", {
    className: className,
    style: _objectSpread(_objectSpread({}, inlineFs), style)
  }, children);
}
function Rule(_ref5) {
  var _ref5$style = _ref5.style,
    style = _ref5$style === void 0 ? {} : _ref5$style;
  return React.createElement("div", {
    style: _objectSpread({
      height: 1,
      background: "var(--line-strong)"
    }, style)
  });
}
function Meta(_ref6) {
  var k = _ref6.k,
    v = _ref6.v;
  return React.createElement("div", null, React.createElement("div", {
    style: {
      opacity: .55,
      fontSize: 9,
      letterSpacing: ".25em",
      marginBottom: 6
    }
  }, k), React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: ".05em",
      lineHeight: 1.4
    }
  }, v));
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox(_ref8) {
  var items = _ref8.items,
    startIndex = _ref8.index,
    initialColor = _ref8.initialColor,
    onClose = _ref8.onClose;
  // Normalise to a list of { src, colorSrc }
  var list = Array.isArray(items) && items.length ? items : [];
  var _idxState = React.useState(typeof startIndex === "number" ? startIndex : 0),
    idx = _idxState[0],
    setIdx = _idxState[1];
  var _colorState = React.useState(!!initialColor),
    inColor = _colorState[0],
    setInColor = _colorState[1];
  var count = list.length;
  var safeIdx = count ? (idx % count + count) % count : 0;
  var current = list[safeIdx] || {};
  var src = current.src;
  var colorSrc = current.colorSrc;
  var hasNav = count > 1;
  var goPrev = React.useCallback(function () {
    setInColor(false);
    setIdx(function (i) {
      return (i - 1 + count) % count;
    });
  }, [count]);
  var goNext = React.useCallback(function () {
    setInColor(false);
    setIdx(function (i) {
      return (i + 1) % count;
    });
  }, [count]);
  React.useEffect(function () {
    var onKey = function onKey(e) {
      if (e.key === "Escape") onClose();else if (hasNav && e.key === "ArrowLeft") goPrev();else if (hasNav && e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("lb-open");
    return function () {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("lb-open");
    };
  }, [onClose, goPrev, goNext, hasNav]);
  // src / colorSrc may be a string OR an object { src, srcWebp, srcAvif }
  function renderPicture(pic, alt, isColor) {
    if (!pic) return null;
    var isObj = _typeof(pic) === "object";
    var url = isObj ? pic.src : pic;
    if (!url) return null;
    var webp = isObj ? pic.srcWebp : null;
    var avif = isObj ? pic.srcAvif : null;
    var kids = [];
    if (avif) kids.push(React.createElement("source", { key: "avif", srcSet: avif, type: "image/avif" }));
    if (webp) kids.push(React.createElement("source", { key: "webp", srcSet: webp, type: "image/webp" }));
    kids.push(React.createElement("img", {
      key: "img",
      src: url,
      alt: alt,
      decoding: "async",
      draggable: false,
      style: {
        maxWidth: "82vw",
        maxHeight: "78vh",
        objectFit: "contain",
        display: "block",
        filter: isColor ? undefined : "grayscale(1) contrast(1.08) brightness(.92)",
        opacity: isColor ? (inColor ? 1 : 0) : (inColor ? 0 : 1),
        transition: "opacity .25s cubic-bezier(.3,.7,.3,1)"
      }
    }));
    return React.createElement("picture", {
      key: isColor ? "color" : "bw",
      style: isColor ? {
        position: "absolute", inset: 0, display: "block",
        maxWidth: "82vw", maxHeight: "78vh"
      } : { display: "block" }
    }, kids);
  }
  function navButton(dir) {
    return React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        dir === "prev" ? goPrev() : goNext();
      },
      "aria-label": dir === "prev" ? "Previous image" : "Next image",
      style: {
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        [dir === "prev" ? "left" : "right"]: "max(10px, 2vw)",
        width: 46,
        height: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: "rgba(255,255,255,.7)",
        background: "rgba(0,0,0,.4)",
        border: "1px solid rgba(255,255,255,.25)",
        borderRadius: "50%",
        cursor: "pointer",
        fontFamily: "'JetBrains Mono', monospace",
        zIndex: 2
      }
    }, dir === "prev" ? "\u2190" : "\u2192");
  }
  return React.createElement("div", {
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Image preview",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,.96)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "zoom-out"
    }
  }, hasNav && navButton("prev"), hasNav && navButton("next"), React.createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
      if (colorSrc) setInColor(function (v) {
        return !v;
      });
    },
    onContextMenu: function onContextMenu(e) {
      return e.preventDefault();
    },
    style: {
      position: "relative",
      maxWidth: "82vw",
      maxHeight: "78vh",
      cursor: colorSrc ? "pointer" : "default",
      userSelect: "none"
    }
  }, renderPicture(src, "Behind-the-scenes still", false),
     colorSrc && renderPicture(colorSrc, "Behind-the-scenes still (colour)", true),
     React.createElement("div", {
    className: "lightbox-caption",
    style: {
      position: "absolute",
      bottom: -36,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      fontSize: 10,
      letterSpacing: ".25em",
      color: "rgba(255,255,255,.4)",
      fontFamily: "'JetBrains Mono', monospace"
    }
  }, colorSrc && React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      setInColor(function (v) {
        return !v;
      });
    },
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: ".22em",
      fontWeight: 700,
      padding: "5px 12px",
      cursor: "pointer",
      color: inColor ? "#000" : "#fff",
      background: inColor ? "var(--accent)" : "transparent",
      border: "1px solid ".concat(inColor ? "var(--accent)" : "rgba(255,255,255,.4)"),
      transition: "background .2s, color .2s, border-color .2s"
    }
  }, inColor ? "\u25D0 COLOUR" : "\u25D0 B&W"), hasNav && React.createElement("span", {
    style: { opacity: .8 }
  }, String(safeIdx + 1).padStart(2, "0"), " / ", String(count).padStart(2, "0")), React.createElement("span", null, hasNav ? colorSrc ? "\u2190 \u2192 TO BROWSE \xB7 CLICK TO TOGGLE COLOUR \xB7 ESC TO CLOSE" : "\u2190 \u2192 TO BROWSE \xB7 ESC TO CLOSE" : colorSrc ? "CLICK IMAGE TO TOGGLE COLOUR \xB7 ESC OR CLICK OUTSIDE TO CLOSE" : "ESC OR CLICK OUTSIDE TO CLOSE"))), React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close preview",
    style: {
      position: "fixed",
      top: 24,
      right: 28,
      fontSize: 11,
      letterSpacing: ".3em",
      color: "rgba(255,255,255,.5)",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "'JetBrains Mono', monospace",
      zIndex: 2
    }
  }, "\u2715 CLOSE"));
}

// ─── CHROME ───────────────────────────────────────────────────────────────────

function TopNav(_ref9) {
  var route = _ref9.route,
    onNavigate = _ref9.onNavigate;
  var items = [["home", "HOME"], ["work", "WORK"], ["series", "SERIES"], ["about", "ABOUT"], ["contact", "CONTACT"]];
  return React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      background: "rgba(10,10,10,.78)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--line)",
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, React.createElement("button", {
    onClick: function onClick() {
      return onNavigate("home");
    },
    style: {
      display: "flex",
      gap: 12,
      alignItems: "baseline",
      padding: 0
    }
  }, React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 14,
      letterSpacing: "-.02em"
    }
  }, "SHUBHAM SRIVASTAVA"), React.createElement("span", {
    style: {
      opacity: .5,
      fontSize: 10,
      letterSpacing: ".18em"
    }
  }, "\xB7 STILLS \xB7 CINE \xB7 BTS \xB7 POSTERS")), React.createElement("div", {
    style: {
      display: "flex",
      gap: 26
    }
  }, items.map(function (_ref0) {
    var _ref1 = _slicedToArray(_ref0, 2),
      k = _ref1[0],
      label = _ref1[1];
    return React.createElement("button", {
      key: k,
      onClick: function onClick() {
        return onNavigate(k);
      },
      style: {
        padding: 0,
        color: "var(--ink)",
        opacity: route === k ? 1 : .55,
        borderBottom: route === k ? "1px solid var(--accent)" : "1px solid transparent",
        paddingBottom: 2,
        transition: "opacity .15s, border-color .15s"
      }
    }, label);
  })));
}
function FilmstripDock(_ref10) {
  var activeId = _ref10.activeId,
    onSelect = _ref10.onSelect;
  var ref = React.useRef(null);
  React.useEffect(function () {
    var c = ref.current;
    if (!c) return;
    var el = c.querySelector("[data-film=\"".concat(activeId, "\"]"));
    if (!el) return;
    var target = el.offsetLeft - (c.clientWidth - el.clientWidth) / 2;
    c.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeId]);
  return React.createElement("div", {
    style: {
      position: "sticky",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      background: "#000",
      borderTop: "1px solid var(--line)"
    },
    className: "perf-top"
  }, React.createElement("div", {
    ref: ref,
    className: "nice-scroll",
    style: {
      display: "flex",
      gap: 6,
      padding: "20px 16px",
      overflow: "auto"
    }
  }, PORTFOLIO.films.map(function (f, i) {
    var active = f.id === activeId;
    return React.createElement("button", {
      key: f.id,
      "data-film": f.id,
      onClick: function onClick() {
        return onSelect(f);
      },
      style: {
        flex: "0 0 auto",
        width: 138,
        height: 92,
        padding: 0,
        position: "relative",
        background: "#0a0a0a",
        cursor: "pointer",
        outline: active ? "2px solid var(--accent)" : "1px solid #1f1f1f",
        outlineOffset: active ? "1px" : "0",
        transition: "outline-color .15s"
      }
    }, function () {
      var heroData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(f.id, "_hero")] : null;
      if (f.archiveInProgress && !heroData) {
        return React.createElement("div", {
          style: {
            width: "100%",
            height: "100%",
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6
          }
        }, React.createElement("span", {
          style: {
            fontSize: 7,
            letterSpacing: ".3em",
            color: "rgba(255,255,255,.2)"
          }
        }, f.archiveNote || "ARCHIVE IN PROGRESS"));
      }
      return React.createElement(FilmFrame, {
        seed: i + 11,
        w: 300,
        h: 200,
        frameNo: f.id,
        realSrc: heroData || null,
        focusPosition: f.id === "001" ? "top" : f.id === "005" ? "top" : "center"
      });
    }(), React.createElement("div", {
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        fontSize: 7,
        color: "#fff",
        letterSpacing: ".15em",
        padding: "3px 5px",
        background: "linear-gradient(transparent, rgba(0,0,0,.85))",
        textAlign: "left"
      }
    }, f.title));
  })));
}
function PageWrap(_ref11) {
  var children = _ref11.children,
    k = _ref11.k;
  return React.createElement("div", {
    className: "page-enter",
    key: k,
    id: "main",
    style: {
      paddingTop: 60,
      paddingBottom: 0,
      minHeight: "calc(100vh - 60px)"
    }
  }, children);
}

function SiteFooter() {
  var year = new Date().getFullYear();
  var footerRef = React.useRef(null);
  // Hide the WhatsApp FAB while the footer is on screen so it never
  // overlaps the "Back to top" link.
  React.useEffect(function () {
    var el = footerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    var io = new IntersectionObserver(function (entries) {
      document.body.classList.toggle("footer-in-view", entries[0].isIntersecting);
    }, { rootMargin: "0px 0px -10px 0px" });
    io.observe(el);
    return function () {
      io.disconnect();
      document.body.classList.remove("footer-in-view");
    };
  }, []);
  return React.createElement("footer", { className: "site-footer", ref: footerRef },
    React.createElement("div", { className: "sf-copy" },
      React.createElement("div", null, "\u00A9 Shubham Srivastava, " + year)
    ),
    React.createElement("div", { className: "sf-line" },
      "STILLS \u00B7 CINE \u00B7 BTS \u00B7 POSTERS"
    ),
    React.createElement("a", {
      href: "#top",
      className: "sf-top",
      onClick: function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    }, "Back to top \u2191")
  );
}

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────

function MetaPair(_ref12) {
  var k = _ref12.k,
    v = _ref12.v;
  return React.createElement("div", null, React.createElement("div", {
    style: {
      opacity: .55,
      fontSize: 9,
      letterSpacing: ".25em",
      marginBottom: 6
    }
  }, k), React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: ".05em",
      lineHeight: 1.4
    }
  }, v));
}
function SeriesCard(_ref13) {
  var s = _ref13.s,
    idx = _ref13.idx,
    onOpen = _ref13.onOpen;
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    hover = _React$useState6[0],
    setHover = _React$useState6[1];
  var _React$useState7 = React.useState(0),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    frame = _React$useState8[0],
    setFrame = _React$useState8[1];
  React.useEffect(function () {
    if (!hover) return;
    var id = setInterval(function () {
      return setFrame(function (f) {
        return f + 1;
      });
    }, 350);
    return function () {
      return clearInterval(id);
    };
  }, [hover]);
  var seed = idx * 13 + 7 + frame;
  var thumbSrc = typeof SERIES_THUMBS !== "undefined" ? SERIES_THUMBS[s.id] : null;
  return React.createElement("button", {
    onClick: onOpen,
    onMouseEnter: function onMouseEnter() {
      setHover(true);
      setFrame(0);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    style: {
      padding: 0,
      textAlign: "left",
      cursor: "pointer",
      background: "transparent",
      border: "1px solid var(--line)",
      transition: "border-color .15s, transform .2s",
      transform: hover ? "translateY(-2px)" : "none",
      borderColor: hover ? "var(--accent)" : "var(--line)",
      display: "flex",
      flexDirection: "column"
    }
  }, React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      position: "relative"
    }
  }, React.createElement(FilmFrame, {
    seed: seed,
    w: 600,
    h: 450,
    frameNo: s.role,
    label: s.title,
    realSrc: thumbSrc || null,
    focusPosition: "center"
  })), React.createElement("div", {
    style: {
      padding: "18px 18px 16px"
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, React.createElement(BigType, {
    size: "h3",
    style: {
      letterSpacing: "-.005em"
    }
  }, s.title), React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: ".2em",
      opacity: .55
    }
  }, s.count)), React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 12,
      lineHeight: 1.5,
      opacity: .7,
      textWrap: "pretty"
    }
  }, s.blurb)));
}
function PageHome(_ref14) {
  var activeFilm = _ref14.activeFilm,
    onOpenFilm = _ref14.onOpenFilm,
    onOpenSeries = _ref14.onOpenSeries,
    onNavigate = _ref14.onNavigate,
    onScrub = _ref14.onScrub;
  var P = PORTFOLIO;
  var isMusic = activeFilm.kind === "MUSIC";
  var heroPos = activeFilm.id === "001" || activeFilm.id === "005" ? "top" : "center";
  var heroData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(activeFilm.id, "_hero")] : null;
  var heroIsPortrait = heroData && heroData.orientation === "portrait";
  var tbFrom = function tbFrom(s) {
    var m = String(s || "").match(/([\d.]+)\s*TB/i);
    return m ? parseFloat(m[1]) : 0;
  };
  var photoTB = tbFrom(activeFilm.archive);
  var motionTB = tbFrom(activeFilm.motion);
  var totalTB = photoTB + motionTB;
  var archiveDisplay = totalTB > 0 ? "~".concat(Number(totalTB.toFixed(2)), " TB") : activeFilm.archive || activeFilm.frames;
  var _React$useStateLB = React.useState(null),
    _React$useStateLB2 = _slicedToArray(_React$useStateLB, 2),
    lightbox = _React$useStateLB2[0],
    setLightbox = _React$useStateLB2[1];
  var openLightbox = function openLightbox(a, b) {
    if (Array.isArray(a)) return setLightbox({ items: a, index: b || 0 });
    return setLightbox({ items: [{ src: a, colorSrc: b || null }], index: 0 });
  };
  var closeLightbox = function closeLightbox() {
    return setLightbox(null);
  };
  return React.createElement(React.Fragment, null, lightbox && React.createElement(Lightbox, {
    items: lightbox.items,
    index: lightbox.index,
    onClose: closeLightbox
  }), React.createElement(PageWrap, {
    k: "home",
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "60px 36px 32px"
    }
  }, React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 60,
      alignItems: "end"
    }
  }, React.createElement("div", {
    className: "home-hero-copy"
  }, React.createElement(Eyebrow, null, "VOLUME OF WORK"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 20
    }
  }, "SHUBHAM", React.createElement("br", null), "SRIVASTAVA", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      textWrap: "pretty",
      opacity: .85,
      paddingBottom: 18
    }
  }, "The snow leopard on set \u2014 everywhere on the floor, rarely in the way. I shoot from the first rehearsal to the final pack-up, working like a third camera unit. Features, web series, music videos \u2014 Hyderabad, and wherever the call sheet lands.", React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, React.createElement("button", {
    onClick: function onClick() {
      return onNavigate("about");
    },
    className: "ulink",
    style: {
      fontSize: 13,
      letterSpacing: ".15em"
    }
  }, "ABOUT ME \u2192"))))), React.createElement("section", {
    style: {
      position: "relative",
      minHeight: "calc(100vh - 60px - 134px)",
      borderTop: "1px solid var(--line)",
      display: "grid",
      gridTemplateColumns: "1.45fr 1fr",
      gap: 32,
      padding: "32px 36px 28px",
      alignItems: "center"
    }
  }, React.createElement("div", {
    onClick: function onClick() {
      if (heroData && heroData.src) openLightbox(heroData, null);
    },
    style: {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      maxHeight: heroIsPortrait ? "min(58vh, 480px)" : "min(68vh, 600px)",
      maxWidth: heroIsPortrait ? 360 : "100%",
      aspectRatio: function () {
        var hd = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(activeFilm.id, "_hero")] : null;
        return kindRatioCSS(activeFilm, hd ? hd.orientation : null);
      }(),
      alignSelf: "center",
      justifySelf: "center",
      cursor: heroData && heroData.src ? "zoom-in" : "default",
      transition: "aspect-ratio .4s cubic-bezier(.4,.7,.3,1)"
    }
  }, function () {
    var heroData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(activeFilm.id, "_hero")] : null;
    if (activeFilm.archiveInProgress && !heroData) {
      return React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10
        }
      }, React.createElement("span", {
        style: {
          fontSize: 9,
          letterSpacing: ".3em",
          color: "rgba(255,255,255,.2)"
        }
      }, activeFilm.archiveNote || "ARCHIVE IN PROGRESS"));
    }
    return React.createElement(FilmFrame, {
      seed: parseInt(activeFilm.id) + 11,
      w: 1400,
      h: 900,
      frameNo: "R0".concat(activeFilm.id, "-").concat((parseInt(activeFilm.id) * 42 + 13).toString().padStart(4, "0")),
      label: "".concat(activeFilm.title, " \u2014 ").concat(activeFilm.dir),
      ratio: kindRatioText(activeFilm),
      realSrc: heroData || null,
      objectFit: "contain",
      focusPosition: heroPos
    });
  }(), React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 3,
      padding: "5px 10px",
      background: "rgba(0,0,0,.7)",
      fontSize: 9,
      letterSpacing: ".3em",
      fontWeight: 700,
      color: isMusic ? "var(--accent)" : "#fff",
      border: "1px solid ".concat(isMusic ? "var(--accent)" : "rgba(255,255,255,.4)")
    }
  }, kindLabel(activeFilm))), React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, "NOW SHOWING \u2014 \u2116 ", activeFilm.id), React.createElement(BigType, {
    size: "h2",
    style: {
      marginTop: 14
    }
  }, activeFilm.title), React.createElement("div", {
    style: {
      fontSize: 15,
      opacity: .8,
      marginTop: 14
    }
  }, isMusic ? React.createElement(React.Fragment, null, activeFilm.artist, " \xB7 DIR. ", activeFilm.dir) : React.createElement(React.Fragment, null, "DIR. ", activeFilm.dir)), activeFilm.status === "SHELVED" && React.createElement("div", {
    style: {
      marginTop: 14,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "5px 9px",
      border: "1px solid var(--accent)",
      color: "var(--accent)",
      fontSize: 9,
      letterSpacing: ".3em",
      fontWeight: 700
    }
  }, React.createElement("span", null, "\u25CF"), React.createElement("span", null, "SHELVED", activeFilm.shelvedReason ? " \u2014 ".concat(activeFilm.shelvedReason) : "")), React.createElement("div", {
    style: {
      marginTop: 28,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px 22px",
      fontSize: 11,
      letterSpacing: ".15em"
    }
  }, React.createElement(MetaPair, {
    k: "YEAR",
    v: activeFilm.yr
  }), React.createElement(MetaPair, {
    k: "LANGUAGE",
    v: activeFilm.lang
  }), React.createElement(MetaPair, {
    k: "LOCATION",
    v: activeFilm.loc
  }), React.createElement(MetaPair, {
    k: isMusic ? "LABEL" : "DAYS",
    v: isMusic ? activeFilm.label : activeFilm.days
  }), React.createElement(MetaPair, {
    k: "FORMAT",
    v: activeFilm.fmt
  }), activeFilm.dop && React.createElement(MetaPair, {
    k: "DOP",
    v: activeFilm.dop
  }), React.createElement(MetaPair, {
    k: "ARCHIVE",
    v: totalTB > 0 ? React.createElement("span", null, archiveDisplay, " ", React.createElement("span", {
      style: {
        opacity: .5,
        fontWeight: 400
      }
    }, "\xB7 P+M")) : archiveDisplay
  })), React.createElement("div", {
    className: "home-hero-actions",
    style: {
      marginTop: 32,
      display: "flex",
      gap: 14
    }
  }, React.createElement("button", {
    onClick: function onClick() {
      return onOpenFilm(activeFilm.id);
    },
    style: {
      padding: "12px 18px",
      background: "var(--accent)",
      color: "#000",
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, "OPEN CONTACT SHEET \u2192"), React.createElement("button", {
    onClick: function onClick() {
      return onNavigate("work");
    },
    style: {
      padding: "12px 18px",
      border: "1px solid var(--line-strong)",
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, "ALL WORK"))), React.createElement("div", {
    style: {
      marginTop: 28,
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: 11,
      letterSpacing: ".2em",
      opacity: .65
    }
  }, React.createElement("button", {
    onClick: function onClick() {
      return onScrub && onScrub(-1);
    },
    "aria-label": "Previous project",
    style: {
      padding: "4px 8px",
      border: "1px solid var(--line-strong)",
      fontSize: 12,
      letterSpacing: 0,
      cursor: "pointer"
    }
  }, "\u2190"), React.createElement("button", {
    onClick: function onClick() {
      return onScrub && onScrub(1);
    },
    "aria-label": "Next project",
    style: {
      padding: "4px 8px",
      border: "1px solid var(--line-strong)",
      fontSize: 12,
      letterSpacing: 0,
      cursor: "pointer"
    }
  }, "\u2192"), React.createElement("span", null, "SCRUB FILMSTRIP"), React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--line)"
    }
  }), React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF"), React.createElement(Timecode, null)))), React.createElement("section", {
    style: {
      padding: "60px 36px 36px",
      borderTop: "1px solid var(--line)"
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 28
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, "BY SUBJECT \xB7 A SECOND READING"), React.createElement(BigType, {
    size: "h2",
    style: {
      marginTop: 14
    }
  }, "SERIES", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, ".")), React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 13,
      lineHeight: 1.6,
      opacity: .7,
      maxWidth: 560,
      textWrap: "pretty"
    }
  }, "The same archive, read another way \u2014 frames cut across films and music videos, organised by ", React.createElement("i", null, "who"), ": directors, DOPs, crew, the empty set itself.")), React.createElement("button", {
    onClick: function onClick() {
      return onNavigate("series");
    },
    className: "ulink",
    style: {
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, "ALL ", P.series.length, " SERIES \u2192")), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 12
    }
  }, P.series.map(function (s, i) {
    var thumb = typeof SERIES_THUMBS !== "undefined" ? SERIES_THUMBS[s.id] : null;
    return React.createElement("button", {
      key: s.id,
      onClick: function onClick() {
        return onOpenSeries(s.id);
      },
      style: {
        padding: 0,
        textAlign: "left",
        border: "1px solid var(--line-strong)",
        background: "#0a0a0a",
        cursor: "pointer",
        transition: "border-color .18s, transform .2s",
        display: "flex", flexDirection: "column", overflow: "hidden"
      },
      onMouseEnter: function (e) { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; },
      onMouseLeave: function (e) { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.transform = "none"; }
    },
      React.createElement("div", {
        style: {
          width: "100%",
          aspectRatio: "4 / 5",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden"
        }
      }, thumb ? pictureLayer(thumb, {
        key: "thumb",
        objectFit: "contain",
        focusPosition: "center",
        bw: true,
        alt: s.title
      }) : null),
      React.createElement("div", {
        style: { padding: "9px 10px 11px", display: "flex", flexDirection: "column", gap: 4 }
      },
        React.createElement("div", { style: { fontSize: 8, letterSpacing: ".22em", opacity: .55 } }, String(i + 1).padStart(2, "0")),
        React.createElement("div", { style: { fontWeight: 800, fontSize: 12, letterSpacing: "-.01em", lineHeight: 1.15 } }, s.title),
        React.createElement("div", { style: { fontSize: 9, letterSpacing: ".2em", opacity: .6 } }, s.count, " FRAMES")
      )
    );
  })))));
}

// ─── PAGE: WORK ───────────────────────────────────────────────────────────────

function FilmRow(_ref15) {
  var film = _ref15.film,
    onOpen = _ref15.onOpen;
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    hover = _React$useState0[0],
    setHover = _React$useState0[1];
  var isMusic = film.kind === "MUSIC";
  var kindBadge = film.kind === "MUSIC" ? "MV" : film.kind === "WEB" ? "WEB" : "FILM";
  return React.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    onClick: onOpen,
    style: {
      display: "grid",
      gridTemplateColumns: "56px 70px 1.5fr 1.2fr 104px 60px 80px 60px 30px",
      gap: 16,
      alignItems: "center",
      padding: "16px 0",
      paddingLeft: hover ? 16 : 0,
      background: hover ? "rgba(255,255,255,.03)" : "transparent",
      borderBottom: "1px solid var(--line)",
      cursor: "pointer",
      transition: "padding-left .18s ease, background .18s"
    }
  }, React.createElement("span", {
    style: {
      fontSize: 11,
      opacity: .55
    }
  }, film.id), React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: ".2em",
      fontWeight: 700,
      padding: "3px 7px",
      justifySelf: "start",
      color: isMusic ? "var(--accent)" : "var(--ink)",
      border: "1px solid ".concat(isMusic ? "var(--accent)" : "var(--line-strong)")
    }
  }, kindBadge), React.createElement("span", {
    className: "title-stable",
    style: {
      fontWeight: 700,
      fontSize: 22,
      color: hover ? "var(--accent)" : "var(--ink)",
      transition: "color .18s",
      letterSpacing: "-.01em",
      lineHeight: 1.1,
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      flexWrap: "wrap"
    }
  }, film.title, film.status === "SHELVED" && React.createElement("span", {
    style: {
      fontSize: 8,
      letterSpacing: ".25em",
      fontWeight: 700,
      padding: "2px 6px",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      transform: "translateY(-2px)"
    }
  }, "SHELVED")), React.createElement("span", {
    style: {
      opacity: .75,
      fontSize: 13
    }
  }, isMusic ? React.createElement(React.Fragment, null, React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, film.artist), React.createElement("span", {
    style: {
      opacity: .7
    }
  }, " \xB7 ", film.dir)) : film.dir), React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: .65
    }
  }, film.yr), React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: .65
    }
  }, film.lang), React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: .65
    }
  }, film.loc), React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: .65
    }
  }, film.days), React.createElement("span", {
    style: {
      color: "var(--accent)",
      opacity: hover ? 1 : .3,
      transition: "opacity .18s"
    }
  }, "\u2192"));
}
function PageWork(_ref16) {
  var onOpenFilm = _ref16.onOpenFilm,
    onNavigate = _ref16.onNavigate;
  var P = PORTFOLIO;
  var _React$useState1 = React.useState("ALL"),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    filter = _React$useState10[0],
    setFilter = _React$useState10[1];
  var all = P.films;
  var filterDefs = [["ALL", "ALL", all.length], ["FILM", "FILMS", all.filter(function (f) {
    return f.kind === "FILM";
  }).length], ["MUSIC", "MUSIC VIDEOS", all.filter(function (f) {
    return f.kind === "MUSIC";
  }).length], ["WEB", "WEB SERIES", all.filter(function (f) {
    return f.kind === "WEB";
  }).length]];
  var visible = filter === "ALL" ? all : all.filter(function (f) {
    return f.kind === filter;
  });
  return React.createElement(PageWrap, {
    k: "work",
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "60px 36px 24px"
    }
  }, React.createElement(Eyebrow, null, "FILMOGRAPHY \xB7 ", all.length, " PROJECTS"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 16
    }
  }, "INDEX OF WORK", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, ".")), React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 13,
      opacity: .65,
      maxWidth: 640,
      textWrap: "pretty"
    }
  }, "Films, web series, and music videos \u2014 recent first. Open any row for that project's contact sheet, where you can ", React.createElement("i", null, "hold a single frame"), " \u2014 or flip the whole sheet \u2014 into colour.")), React.createElement("section", {
    style: {
      padding: "0 36px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 10,
      letterSpacing: ".25em",
      borderBottom: "1px solid var(--line)"
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      gap: 22
    }
  }, filterDefs.map(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 3),
      k = _ref18[0],
      label = _ref18[1],
      n = _ref18[2];
    return React.createElement("button", {
      key: k,
      onClick: function onClick() {
        return setFilter(k);
      },
      style: {
        padding: "14px 0",
        display: "flex",
        gap: 8,
        alignItems: "baseline",
        opacity: filter === k ? 1 : .55,
        borderBottom: filter === k ? "1px solid var(--accent)" : "1px solid transparent",
        transition: "opacity .15s"
      }
    }, React.createElement("span", null, label), React.createElement("span", {
      style: {
        fontSize: 9,
        opacity: .65
      }
    }, n));
  })), React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      opacity: .65
    }
  }, React.createElement("span", null, "SORT \u2014 RECENT"), React.createElement("span", null, "VIEW \u2014 LIST"))), React.createElement("div", {
    className: "work-index-head",
    style: {
      padding: "12px 36px",
      display: "grid",
      gridTemplateColumns: "56px 70px 1.5fr 1.2fr 104px 60px 80px 60px 30px",
      gap: 16,
      fontSize: 9,
      letterSpacing: ".25em",
      opacity: .55,
      borderBottom: "1px solid var(--line)"
    }
  }, React.createElement("span", null, "\u2116"), React.createElement("span", null, "KIND"), React.createElement("span", null, "TITLE"), React.createElement("span", null, "DIRECTOR / ARTIST"), React.createElement("span", null, "RELEASE YEAR"), React.createElement("span", null, "LANG"), React.createElement("span", null, "LOCATION"), React.createElement("span", null, "DAYS"), React.createElement("span", null)), React.createElement("div", {
    style: {
      padding: "0 36px"
    }
  }, visible.map(function (f, i) {
    return React.createElement(FilmRow, {
      key: f.id,
      film: f,
      idx: i,
      onOpen: function onOpen() {
        return onOpenFilm(f.id);
      }
    });
  })));
}

// ─── PAGE: FILM DETAIL ────────────────────────────────────────────────────────

function placeholderOrientation(i) {
  // Simulate a natural BTS mix — roughly every 3rd or 4th portrait
  return i % 7 === 2 || i % 7 === 5 ? "portrait" : "landscape";
}
function ContactFrame(_ref19) {
  var film = _ref19.film,
    i = _ref19.i,
    origIdx = _ref19.origIdx,
    colorable = _ref19.colorable,
    forceColor = _ref19.forceColor,
    lookTestCat = _ref19.lookTestCat,
    orientation = _ref19.orientation,
    onExpand = _ref19.onExpand;
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    held = _React$useState12[0],
    setHeld = _React$useState12[1];
  var colorOn = colorable && (held || !!forceColor);
  var holdTimer = React.useRef(null);
  var didHold = React.useRef(false);
  var ltCats = ["FRAMING", "LIGHT", "WARDROBE", "LOCATION", "PALETTE", "FACE"];
  // Use real photo orientation from PHOTO_DATA if available
  var realPhotoKey = "".concat(film.id, "_sheet_").concat(origIdx !== undefined ? origIdx : i);
  var realPhotoData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA[realPhotoKey] : null;
  var orient = orientation || (realPhotoData ? realPhotoData.orientation : placeholderOrientation(i));
  var isPortrait = orient === "portrait";
  var ratio = isPortrait ? "2/3" : "3/2";
  var imgW = isPortrait ? 340 : 500;
  var imgH = isPortrait ? 510 : 340;
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    hover = _React$useState14[0],
    setHover = _React$useState14[1];
  var photoKey = "".concat(film.id, "_sheet_").concat(origIdx !== undefined ? origIdx : i);
  var photoData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA[photoKey] : null;
  var bwSrc = photoData || null;
  var colorSrc = colorable ? bwSrc : null; // same image, FilmFrame handles color toggle

  return React.createElement("div", {
    style: {
      position: "relative",
      gridRow: isPortrait ? "span 2" : "span 1"
    }
  }, React.createElement("div", {
    style: {
      aspectRatio: ratio,
      position: "relative",
      cursor: colorable ? held ? "grabbing" : "grab" : "zoom-in",
      userSelect: "none",
      touchAction: "none",
      transform: hover ? "scale(1.02)" : "scale(1)",
      transition: "transform .18s cubic-bezier(.2,.7,.3,1)",
      outline: hover ? "1px solid rgba(240,237,228,.3)" : "1px solid transparent"
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      setHover(false);
      setHeld(false);
      clearTimeout(holdTimer.current);
      didHold.current = false;
    },
    onMouseDown: function onMouseDown() {
      didHold.current = false;
      if (colorable) {
        holdTimer.current = setTimeout(function () {
          didHold.current = true;
          setHeld(true);
        }, 180);
      }
    },
    onMouseUp: function onMouseUp() {
      clearTimeout(holdTimer.current);
      setHeld(false);
    },
    onTouchStart: function onTouchStart(e) {
      e.preventDefault();
      didHold.current = false;
      if (colorable) {
        holdTimer.current = setTimeout(function () {
          didHold.current = true;
          setHeld(true);
        }, 180);
      }
    },
    onTouchEnd: function onTouchEnd() {
      clearTimeout(holdTimer.current);
      setHeld(false);
    },
    onTouchCancel: function onTouchCancel() {
      clearTimeout(holdTimer.current);
      setHeld(false);
      didHold.current = false;
    },
    onContextMenu: function onContextMenu(e) {
      return colorable && e.preventDefault();
    },
    onClick: function onClick() {
      if (!didHold.current && onExpand && bwSrc) onExpand(bwSrc, colorable ? bwSrc : null);
      didHold.current = false;
    }
  }, function () {
    var photoKey = "".concat(film.id, "_sheet_").concat(origIdx !== undefined ? origIdx : i);
    var photoData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA[photoKey] : null;
    return React.createElement(FilmFrame, {
      seed: parseInt(film.id) * 7 + i + 3,
      w: imgW,
      h: imgH,
      frameNo: lookTestCat ? "LT ".concat((i + 1).toString().padStart(2, "0")) : "".concat((i + 1).toString().padStart(2, "0")),
      ratio: film.fmt,
      colorable: colorable,
      colorOn: colorOn,
      realSrc: photoData || null
    });
  }(), lookTestCat && React.createElement("div", {
    style: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 4,
      fontSize: 8,
      letterSpacing: ".22em",
      fontWeight: 700,
      padding: "3px 6px",
      color: "#fff",
      background: "rgba(0,0,0,.65)",
      border: "1px solid rgba(255,255,255,.3)",
      pointerEvents: "none"
    }
  }, lookTestCat), colorable && React.createElement("div", {
    style: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 4,
      fontSize: 8,
      letterSpacing: ".18em",
      fontWeight: 700,
      padding: "3px 6px",
      color: colorOn ? "#000" : "#fff",
      background: colorOn ? "var(--accent)" : "rgba(0,0,0,.6)",
      border: "1px solid ".concat(colorOn ? "var(--accent)" : "rgba(255,255,255,.35)"),
      transition: "background .2s, color .2s, border-color .2s",
      pointerEvents: "none"
    }
  }, "\u25D0 ", colorOn ? "COLOUR" : "HOLD")), React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 9,
      letterSpacing: ".15em",
      display: "flex",
      justifyContent: "space-between",
      opacity: .65
    }
  }, React.createElement("span", null, lookTestCat ? "LT ".concat((i + 1).toString().padStart(3, "0")) : "FR ".concat((i + 1).toString().padStart(3, "0"))), React.createElement("span", {
    style: {
      opacity: .7
    }
  }, isPortrait ? "▯" : "▬", " ", film.fmt, colorable ? " · ◐" : "")));
}
function PageFilm(_ref20) {
  var film = _ref20.film,
    onBack = _ref20.onBack,
    onNavigate = _ref20.onNavigate;
  var f = film;
  var isMusic = f.kind === "MUSIC";
  var isFilm = f.kind === "FILM";
  var isLookTest = !!f.lookTest;
  var isShelved = f.status === "SHELVED";
  var isArchiveInProgress = !!f.archiveInProgress;
  var heroPos = f.id === "001" || f.id === "005" ? "top" : "center";
  var filmHeroData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(f.id, "_hero")] : null;
  var heroIsPortrait = filmHeroData && filmHeroData.orientation === "portrait";
  var _React$useState15 = React.useState(null),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    lightbox = _React$useState16[0],
    setLightbox = _React$useState16[1]; // {src, colorSrc}
  var openLightbox = function openLightbox(a, b) {
    if (Array.isArray(a)) return setLightbox({ items: a, index: b || 0 });
    return setLightbox({ items: [{ src: a, colorSrc: b || null }], index: 0 });
  };
  var closeLightbox = function closeLightbox() {
    return setLightbox(null);
  };
  var _useStateColour = React.useState(false),
    showAllColour = _useStateColour[0],
    setShowAllColour = _useStateColour[1];
  // All frames marked Hold for Color
  var projectMarks = {
    "001": {
      holdForColor: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51]
    },
    "003": {
      holdForColor: [0, 1, 3, 4, 5, 6, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 23, 24, 25, 27, 29, 32, 33, 34, 37, 41, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53]
    },
    "005": {
      holdForColor: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  };
  var pm = !isLookTest && projectMarks[f.id] || {};

  // colorFrames keyed by ORIGINAL slot index
  var colorOrigSet = isLookTest ? new Set() : new Set(pm.holdForColor || []);
  var colorFrames = colorOrigSet;
  var ltCats = ["FRAMING", "LIGHT", "WARDROBE", "LOCATION", "PALETTE", "FACE"];
  return React.createElement(React.Fragment, null, lightbox && React.createElement(Lightbox, {
    items: lightbox.items,
    index: lightbox.index,
    onClose: closeLightbox
  }), React.createElement(PageWrap, {
    k: "film-".concat(f.id),
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "32px 36px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 10,
      letterSpacing: ".25em"
    }
  }, React.createElement("button", {
    onClick: onBack,
    className: "ulink",
    style: {
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, "\u2190 INDEX"), React.createElement("span", {
    style: {
      opacity: .55
    }
  }, "FILE / WORK / \u2116 ", f.id)), React.createElement("section", {
    style: {
      padding: "32px 36px 28px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 36,
      alignItems: "end"
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", {
    style: {
      color: isMusic ? "var(--accent)" : "inherit",
      fontWeight: 700,
      marginRight: 12
    }
  }, kindLabel(f)), "\u2116 ", f.id, " \xB7 ", f.fmt, " \xB7 ARCHIVE ", f.archive || f.frames), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 14
    }
  }, f.title), React.createElement("div", {
    style: {
      marginTop: 18,
      fontSize: 14,
      letterSpacing: ".2em"
    }
  }, isMusic ? React.createElement(React.Fragment, null, f.artist, " \xB7 DIR. ", f.dir, " \xB7 ", f.loc, " \xB7 ", f.yr) : React.createElement(React.Fragment, null, "DIR. ", f.dir, " \xB7 ", f.loc, " \xB7 ", f.yr)), isShelved && React.createElement("div", {
    style: {
      marginTop: 18,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 12px",
      border: "1px solid var(--accent)",
      color: "var(--accent)",
      fontSize: 10,
      letterSpacing: ".3em",
      fontWeight: 700
    }
  }, React.createElement("span", null, "\u25CF"), React.createElement("span", null, "SHELVED", f.shelvedReason ? " \u2014 ".concat(f.shelvedReason) : "")))), React.createElement("section", {
    style: {
      padding: "0 36px 28px"
    }
  }, React.createElement("div", {
    onClick: function onClick() {
      if (filmHeroData && filmHeroData.src) openLightbox(filmHeroData, null);
    },
    style: heroIsPortrait ? {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      maxWidth: "min(86vw, 460px)",
      aspectRatio: "2 / 3",
      margin: "0 auto",
      cursor: filmHeroData && filmHeroData.src ? "zoom-in" : "default"
    } : {
      aspectRatio: isFilm ? "21/9" : f.kind === "WEB" ? "2/1" : "16/9",
      position: "relative",
      cursor: filmHeroData && filmHeroData.src ? "zoom-in" : "default"
    }
  }, function () {
    var heroData = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(f.id, "_hero")] : null;
    if (f.archiveInProgress && !filmHeroData) {
      return React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10
        }
      }, React.createElement("span", {
        style: {
          fontSize: 9,
          letterSpacing: ".3em",
          color: "rgba(255,255,255,.2)"
        }
      }, f.archiveNote || "ARCHIVE IN PROGRESS"));
    }
    return React.createElement(FilmFrame, {
      seed: parseInt(f.id) + 11,
      w: 2000,
      h: 900,
      frameNo: "R0".concat(f.id, "-").concat(isLookTest ? "LOOKTEST" : "FEATURE"),
      label: "".concat(f.title, " \u2014 ").concat(f.dir),
      ratio: kindRatioText(f),
      realSrc: filmHeroData || null,
      objectFit: heroIsPortrait ? "contain" : "cover",
      focusPosition: heroPos
    });
  }())), React.createElement("section", {
    style: {
      padding: "20px 36px",
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 22,
      fontSize: 11,
      letterSpacing: ".18em",
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)"
    }
  }, React.createElement(Meta, {
    k: "DIRECTOR",
    v: f.dir
  }), isMusic ? React.createElement(Meta, {
    k: "ARTIST",
    v: f.artist
  }) : React.createElement(Meta, {
    k: "LANGUAGE",
    v: f.lang
  }), React.createElement(Meta, {
    k: "LOCATION",
    v: f.loc
  }), isMusic ? React.createElement(Meta, {
    k: "LABEL",
    v: f.label
  }) : React.createElement(Meta, {
    k: "DAYS ON SET",
    v: f.days
  }), React.createElement(Meta, {
    k: "FORMAT",
    v: f.fmt
  }), f.dop && React.createElement(Meta, {
    k: "DOP",
    v: f.dop
  }), React.createElement(Meta, {
    k: "YEAR",
    v: f.yr
  }), React.createElement(Meta, {
    k: "MOTION",
    v: f.motion || "ON REQUEST"
  })), React.createElement("section", {
    style: {
      padding: "44px 36px 36px"
    }
  }, isArchiveInProgress ? React.createElement("div", {
    style: {
      padding: "80px 36px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      textAlign: "center"
    }
  }, React.createElement(Eyebrow, null, f.archiveNote || "ARCHIVE IN PROGRESS"), React.createElement("div", {
    style: {
      fontSize: 40,
      opacity: .15,
      letterSpacing: ".2em",
      marginTop: 8
    }
  }, "\u25AF \u25AF \u25AF"), React.createElement("p", {
    style: {
      fontSize: 10,
      letterSpacing: ".2em",
      opacity: .5,
      maxWidth: 340,
      lineHeight: 2,
      marginTop: 8
    }
  }, f.status === "PRODUCTION" ? "SHOOT IN PROGRESS \u2014 FRAMES AVAILABLE POST WRAP" : "FRAMES FROM THIS PRODUCTION ARE BEING COMPILED \u2014 CONTACT FOR AVAILABILITY")) : React.createElement(React.Fragment, null, function () {
    var order = typeof SHEET_ORDER !== "undefined" && SHEET_ORDER[f.id] || null;
    var photoCount = typeof PHOTO_DATA !== "undefined" ? Object.keys(PHOTO_DATA).filter(function (k) {
      return k.startsWith("".concat(f.id, "_sheet_"));
    }).length : 0;
    var frameCount = order ? order.length : photoCount > 0 ? photoCount : 18;
    return null; // label is below
  }(), React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 22
    }
  }, React.createElement("div", null, function () {
    var photoCount = typeof PHOTO_DATA !== "undefined" ? Object.keys(PHOTO_DATA).filter(function (k) {
      return k.startsWith("".concat(f.id, "_sheet_"));
    }).length : 0;
    var order = typeof SHEET_ORDER !== "undefined" && SHEET_ORDER[f.id] || null;
    var frameCount = order ? order.length : photoCount > 0 ? photoCount : 18;
    return React.createElement(Eyebrow, null, isLookTest ? "LOOK TEST \u2014 ".concat(frameCount, " REFERENCE FRAMES \xB7 ARCHIVE ").concat(f.archive || f.frames) : "CONTACT SHEET \u2014 ".concat(frameCount, " SELECTS \xB7 ARCHIVE ").concat(f.archive || f.frames));
  }(), React.createElement(BigType, {
    size: "h2",
    style: {
      marginTop: 10
    }
  }, isLookTest ? "LOOK TESTS" : "SELECTS")), React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      fontSize: 10,
      letterSpacing: ".2em",
      opacity: .85,
      flexWrap: "wrap",
      justifyContent: "flex-end"
    }
  }, isLookTest ? ltCats.map(function (c) {
    return React.createElement("span", {
      key: c,
      style: {
        opacity: .7
      }
    }, c);
  }) : colorFrames.size > 0 ? React.createElement(React.Fragment, null, React.createElement("button", {
    onClick: function onClick() {
      setShowAllColour(function (v) {
        return !v;
      });
    },
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: ".2em",
      fontWeight: 700,
      padding: "5px 11px",
      cursor: "pointer",
      color: showAllColour ? "#000" : "#fff",
      background: showAllColour ? "var(--accent)" : "transparent",
      border: "1px solid ".concat(showAllColour ? "var(--accent)" : "rgba(255,255,255,.35)"),
      transition: "background .2s, color .2s, border-color .2s"
    }
  }, showAllColour ? "\u25D0 COLOUR \u2014 ON" : "\u25D0 SHOW ALL IN COLOUR"), React.createElement("span", {
    style: {
      opacity: .5,
      alignSelf: "center"
    }
  }, "OR HOLD A FRAME")) : null)), function () {
    // Count real photos for this project, fall back to 18 placeholders
    var order = typeof SHEET_ORDER !== "undefined" && SHEET_ORDER[f.id] || null;
    var photoCount = typeof PHOTO_DATA !== "undefined" ? Object.keys(PHOTO_DATA).filter(function (k) {
      return k.startsWith("".concat(f.id, "_sheet_"));
    }).length : 0;
    var frameCount = order ? order.length : photoCount > 0 ? photoCount : 18;
    return React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoRows: "auto",
        gap: 16,
        alignItems: "start"
      }
    }, function () {
      var items = [];
      // Ordered list of real frames for lightbox prev/next navigation
      var lbItems = [];
      var frameToLb = {};
      var orderedFrameIndices = [];
      var landscapeOrder = [];
      var portraitOrder = [];
      if (order) {
        for (var _j = 0; _j < order.length; _j++) {
          var _origIdx = order[_j];
          var _pd = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(f.id, "_sheet_").concat(_origIdx)] : null;
          if (_pd && _pd.orientation === "portrait") portraitOrder.push(_origIdx);
          else landscapeOrder.push(_origIdx);
        }
        orderedFrameIndices = landscapeOrder.concat(portraitOrder);
      } else {
        for (var _i2 = 0; _i2 < frameCount; _i2++) {
          orderedFrameIndices.push(_i2);
        }
      }
      var landscapeCount = landscapeOrder.length || frameCount;
      var cols = 6;
      var rem = landscapeCount % cols;
      var spacersNeeded = rem === 0 ? 0 : cols - rem;
      var dividerInserted = false;
      for (var _frameIdx = 0; _frameIdx < frameCount; _frameIdx++) {
        // Insert spacers + divider at landscape/portrait boundary
        if (_frameIdx === landscapeCount && !dividerInserted) {
          dividerInserted = true;
          for (var s = 0; s < spacersNeeded; s++) {
            items.push(React.createElement("div", {
              key: "spacer-".concat(s),
              style: {
                aspectRatio: "3/2",
                opacity: 0,
                pointerEvents: "none"
              }
            }));
          }
          items.push(React.createElement("div", {
            key: "portrait-divider",
            style: {
              gridColumn: "1 / -1",
              borderTop: "1px solid var(--line)",
              padding: "10px 0 6px",
              fontSize: 9,
              letterSpacing: ".3em",
              opacity: .45,
              display: "flex",
              alignItems: "center",
              gap: 14
            }
          }, React.createElement("span", null, "\u25AF PORTRAIT FRAMES"), React.createElement("span", {
            style: {
              flex: 1,
              height: 1,
              background: "var(--line)"
            }
          })));
        }
        // origIdx comes from the ordered frame list, grouped by landscape then portrait
        var origIdx = orderedFrameIndices[_frameIdx];
        var framePd = typeof PHOTO_DATA !== "undefined" ? PHOTO_DATA["".concat(f.id, "_sheet_").concat(origIdx)] : null;
        if (framePd) {
          frameToLb[_frameIdx] = lbItems.length;
          lbItems.push({ src: framePd, colorSrc: colorFrames.has(origIdx) ? framePd : null });
        }
        items.push(React.createElement(ContactFrame, {
          key: _frameIdx,
          film: f,
          i: _frameIdx,
          origIdx: origIdx,
          colorable: colorFrames.has(origIdx),
          forceColor: showAllColour,
          lookTestCat: isLookTest ? ltCats[_frameIdx % ltCats.length] : null,
          onExpand: function (fIdx) {
            return function () {
              openLightbox(lbItems, frameToLb[fIdx] || 0);
            };
          }(_frameIdx)
        }));
      }
      return items;
    }());
  }(), React.createElement("div", {
    style: {
      marginTop: 26,
      fontSize: 10,
      letterSpacing: ".2em",
      opacity: .55,
      textAlign: "center"
    }
  }, isLookTest ? "LOOK TEST FRAMES \xB7 PROJECT SHELVED \xB7 ARCHIVE ".concat(f.frames, " \u2014 UNRELEASED \xB7 NDA") : "REQUEST FULL PROOFS \xB7 COLOUR MASTERS \u2014 ARCHIVE ".concat(f.archive || f.frames, " \xB7 UNRELEASED \xB7 NDA")), React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      justifyContent: "center"
    }
  }, React.createElement("button", {
    onClick: onBack,
    className: "ulink",
    style: { fontSize: 11, letterSpacing: ".2em" }
  }, "\u2190 BACK TO ALL FILMS"))))));
}

// ─── PAGE: SERIES ─────────────────────────────────────────────────────────────

function PageSeries(_ref21) {
  var onOpenSeries = _ref21.onOpenSeries,
    onNavigate = _ref21.onNavigate;
  var P = PORTFOLIO;
  return React.createElement(PageWrap, {
    k: "series",
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "60px 36px 24px"
    }
  }, React.createElement(Eyebrow, null, "BY SUBJECT \xB7 ", P.series.length, " COLLECTIONS"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 16
    }
  }, "SERIES", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, ".")), React.createElement("div", {
    style: {
      marginTop: 18,
      fontSize: 14,
      lineHeight: 1.6,
      opacity: .8,
      maxWidth: 660,
      textWrap: "pretty"
    }
  }, "The other way to read the archive. Each series cuts across films and music videos, organised by ", React.createElement("i", null, "who"), ", not ", React.createElement("i", null, "which"), ". The crew is the subject \u2014 directors at the monitor, DOPs working a setup, the focus puller's hands. Open any series for its contact sheet.")), React.createElement("section", {
    style: {
      padding: "20px 36px 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, P.series.map(function (s, i) {
    return React.createElement(SeriesCard, {
      key: s.id,
      s: s,
      idx: i,
      onOpen: function onOpen() {
        return onOpenSeries(s.id);
      }
    });
  })));
}

// ─── PAGE: SERIES DETAIL ──────────────────────────────────────────────────────

// Runtime detection of genuinely monochrome (greyscale) images by sampling
// average colour saturation on a small canvas. Cached by URL.
var __monoCache = {};
function detectMonochrome(pic, cb) {
  var url = pic && _typeof(pic) === "object" ? pic.srcAvif || pic.srcWebp || pic.src : pic;
  if (!url) {
    cb(false);
    return;
  }
  if (Object.prototype.hasOwnProperty.call(__monoCache, url)) {
    cb(__monoCache[url]);
    return;
  }
  var img = new Image();
  img.decoding = "async";
  img.onload = function () {
    try {
      var W = 40,
        H = 40;
      var c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      var ctx = c.getContext("2d", {
        willReadFrequently: true
      });
      ctx.drawImage(img, 0, 0, W, H);
      var data = ctx.getImageData(0, 0, W, H).data;
      var total = 0,
        n = 0;
      for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 16) continue;
        var mx = Math.max(data[i], data[i + 1], data[i + 2]);
        var mn = Math.min(data[i], data[i + 1], data[i + 2]);
        total += mx - mn;
        n++;
      }
      var mono = n > 0 && total / n < 12;
      __monoCache[url] = mono;
      cb(mono);
    } catch (e) {
      __monoCache[url] = false;
      cb(false);
    }
  };
  img.onerror = function () {
    __monoCache[url] = false;
    cb(false);
  };
  img.src = url;
}

function pickRole(seriesId, i) {
  var roles = {
    directors: ["DIRECTOR", "DIRECTOR · MONITOR", "DIRECTOR · BLOCKING", "DIRECTOR · DOP", "DIR · NOTE-PASS"],
    dops: ["DOP · A-CAM", "FOCUS PULLER", "DOP · METER", "DOP · LENS-CHECK", "GAFFER + DOP"],
    crew: ["FOCUS PULLER", "GAFFER", "SOUND", "ART DEPT", "AD", "BOOM OP", "SPARK", "PROD. DESIGN"],
    between: ["LUNCH BREAK", "BETWEEN TAKES", "REHEARSAL", "RESET", "SMOKE BREAK", "CALL TIME"],
    music: ["ARTIST · REH.", "DOP · MV", "DIRECTOR · MV", "RECORD CO.", "SET DRESS"],
    set: ["EMPTY SET", "TAPE MARKS", "PROP SETUP", "LIGHTING RIG", "LOCATION"]
  };
  var list = roles[seriesId] || ["BTS"];
  return list[i % list.length];
}
function PageSeriesDetail(_ref22) {
  var series = _ref22.series,
    onBack = _ref22.onBack,
    onNavigate = _ref22.onNavigate;
  var s = series;
  var films = PORTFOLIO.films;
  var _React$useState17 = React.useState(null),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    heldFrame = _React$useState18[0],
    setHeldFrame = _React$useState18[1];
  var _useStateSeriesColour = React.useState(false),
    showAllColour = _useStateSeriesColour[0],
    setShowAllColour = _useStateSeriesColour[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    lightbox = _React$useState20[0],
    setLightbox = _React$useState20[1];
  var _useStateMono = React.useState({}),
    monoMap = _useStateMono[0],
    setMonoMap = _useStateMono[1];
  React.useEffect(function () {
    if (typeof SERIES_PHOTO_DATA === "undefined") return;
    var cancelled = false;
    Object.entries(SERIES_PHOTO_DATA).filter(function (e) {
      return e[0].startsWith("series_".concat(s.id, "_"));
    }).forEach(function (e) {
      var pic = e[1];
      var url = pic.srcAvif || pic.srcWebp || pic.src;
      detectMonochrome(pic, function (mono) {
        if (cancelled) return;
        setMonoMap(function (m) {
          if (m[url] === mono) return m;
          var next = Object.assign({}, m);
          next[url] = mono;
          return next;
        });
      });
    });
    return function () {
      cancelled = true;
    };
  }, [s.id]);
  var openLightbox = function openLightbox(a, b, color) {
    if (Array.isArray(a)) return setLightbox({ items: a, index: b || 0, color: !!color });
    return setLightbox({ items: [{ src: a, colorSrc: b || null }], index: 0, color: !!color });
  };
  var closeLightbox = function closeLightbox() {
    return setLightbox(null);
  };
  var seriesDidHold = React.useRef(false);
  var seriesHoldTimer = React.useRef(null);
  var frames = Array.from({
    length: 24
  }, function (_, i) {
    var _s$id, _s$id2;
    var src = films[(i * 3 + parseInt(((_s$id = s.id) === null || _s$id === void 0 ? void 0 : _s$id.length) || 0)) % films.length];
    return {
      seed: i * 11 + 17 + (((_s$id2 = s.id) === null || _s$id2 === void 0 ? void 0 : _s$id2.charCodeAt(0)) || 0),
      src: src,
      role: pickRole(s.id, i)
    };
  });
  return React.createElement(React.Fragment, null, lightbox && React.createElement(Lightbox, {
    items: lightbox.items,
    index: lightbox.index,
    initialColor: lightbox.color,
    onClose: closeLightbox
  }), React.createElement(PageWrap, {
    k: "series-".concat(s.id),
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "32px 36px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 10,
      letterSpacing: ".25em"
    }
  }, React.createElement("button", {
    onClick: onBack,
    className: "ulink",
    style: {
      fontSize: 11,
      letterSpacing: ".2em"
    }
  }, "\u2190 SERIES"), React.createElement("span", {
    style: {
      opacity: .55
    }
  }, "FILE / SERIES / ", s.id.toUpperCase())), React.createElement("section", {
    style: {
      padding: "32px 36px 28px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 36,
      alignItems: "end"
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, s.count, " FRAMES \xB7 ACROSS ", PORTFOLIO.films.length, " PROJECTS"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 14
    }
  }, s.title), React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 12,
      letterSpacing: ".25em",
      opacity: .65
    }
  }, s.role, " \xB7 A SERIES")), React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      opacity: .85,
      textWrap: "pretty",
      paddingBottom: 14
    }
  }, s.blurb)), React.createElement("section", {
    style: {
      padding: "32px 36px 36px"
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 22
    }
  }, React.createElement(Eyebrow, null, "SELECTS \xB7 ", typeof SERIES_PHOTO_DATA !== "undefined" ? Object.keys(SERIES_PHOTO_DATA).filter(function (k) {
    return k.startsWith("series_".concat(s.id, "_"));
  }).length : 24, " FRAMES"), React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      fontSize: 10,
      letterSpacing: ".2em",
      alignItems: "center",
      opacity: .85
    }
  }, React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF SOURCE PROJECT"), React.createElement("button", {
    onClick: function onClick() {
      setShowAllColour(function (v) {
        return !v;
      });
    },
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: ".2em",
      fontWeight: 700,
      padding: "5px 11px",
      cursor: "pointer",
      color: showAllColour ? "#000" : "#fff",
      background: showAllColour ? "var(--accent)" : "transparent",
      border: "1px solid ".concat(showAllColour ? "var(--accent)" : "rgba(255,255,255,.35)"),
      transition: "background .2s, color .2s, border-color .2s"
    }
  }, showAllColour ? "\u25D0 COLOUR \u2014 ON" : "\u25D0 SHOW ALL IN COLOUR"), React.createElement("span", {
    style: {
      opacity: .5,
      alignSelf: "center"
    }
  }, "OR HOLD A FRAME"))), function () {
    var realFrames = typeof SERIES_PHOTO_DATA !== "undefined" ? Object.entries(SERIES_PHOTO_DATA).filter(function (_ref23) {
      var _ref24 = _slicedToArray(_ref23, 1),
        k = _ref24[0];
      return k.startsWith("series_".concat(s.id, "_"));
    }).sort(function (_ref25, _ref26) {
      var _ref27 = _slicedToArray(_ref25, 1),
        a = _ref27[0];
      var _ref28 = _slicedToArray(_ref26, 1),
        b = _ref28[0];
      return parseInt(a.split("_").pop()) - parseInt(b.split("_").pop());
    }) : [];
    var useReal = realFrames.length > 0;
    // Sort real frames: landscapes first, then portraits
    var sortedReal = useReal ? [].concat(_toConsumableArray(realFrames.filter(function (_ref29) {
      var _ref30 = _slicedToArray(_ref29, 2),
        v = _ref30[1];
      return v.orientation !== "portrait";
    })), _toConsumableArray(realFrames.filter(function (_ref31) {
      var _ref32 = _slicedToArray(_ref31, 2),
        v = _ref32[1];
      return v.orientation === "portrait";
    }))) : [];
    var landscapeCount = useReal ? sortedReal.filter(function (_ref33) {
      var _ref34 = _slicedToArray(_ref33, 2),
        v = _ref34[1];
      return v.orientation !== "portrait";
    }).length : 0;
    var cols = 6;
    var spacersNeeded = landscapeCount % cols === 0 ? 0 : cols - landscapeCount % cols;
    var frameCount = useReal ? sortedReal.length : 24;
    // Ordered list for lightbox prev/next navigation (real frames are colourable except genuinely monochrome photos)
    var seriesLbItems = useReal ? sortedReal.map(function (e) {
      var pic = e[1];
      var u = pic.srcAvif || pic.srcWebp || pic.src;
      var mono = !!monoMap[u];
      return { src: pic, colorSrc: mono ? null : pic };
    }) : [];
    var items = [];
    var dividerInserted = false;
    var _loop = function _loop(fi) {
      if (useReal && fi === landscapeCount && !dividerInserted) {
        dividerInserted = true;
        for (var sp = 0; sp < spacersNeeded; sp++) {
          items.push(React.createElement("div", {
            key: "sp-".concat(sp),
            style: {
              aspectRatio: "3/2",
              opacity: 0,
              pointerEvents: "none"
            }
          }));
        }
        if (spacersNeeded > 0 || landscapeCount > 0) {
          items.push(React.createElement("div", {
            key: "divider",
            style: {
              gridColumn: "1 / -1",
              borderTop: "1px solid var(--line)",
              padding: "10px 0 6px",
              fontSize: 9,
              letterSpacing: ".3em",
              opacity: .45,
              display: "flex",
              alignItems: "center",
              gap: 14
            }
          }, React.createElement("span", null, "\u25AF PORTRAIT FRAMES"), React.createElement("span", {
            style: {
              flex: 1,
              height: 1,
              background: "var(--line)"
            }
          })));
        }
      }
      if (useReal) {
        var _sortedReal$fi = _slicedToArray(sortedReal[fi], 2),
          key = _sortedReal$fi[0],
          _val = _sortedReal$fi[1];
        var isPortrait = _val.orientation === "portrait";
        var isHeld = heldFrame === fi;
        var isMono = !!monoMap[_val.srcAvif || _val.srcWebp || _val.src];
        items.push(React.createElement("div", {
          key: fi,
          style: {
            position: "relative",
            gridRow: isPortrait ? "span 2" : "span 1"
          }
        }, React.createElement("div", _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
          style: {
            aspectRatio: isPortrait ? "2/3" : "3/2",
            position: "relative",
            cursor: isHeld ? "grabbing" : "zoom-in",
            transform: "scale(1)",
            transition: "transform .18s cubic-bezier(.2,.7,.3,1)",
            outline: "1px solid transparent"
          },
          onMouseEnter: function onMouseEnter(e) {
            return e.currentTarget.style.transform = "scale(1.02)";
          },
          onMouseLeave: function onMouseLeave(e) {
            e.currentTarget.style.transform = "scale(1)";
            setHeldFrame(null);
          },
          onMouseDown: function onMouseDown() {
            seriesDidHold.current = false;
            if (isMono) return;
            seriesHoldTimer.current = setTimeout(function () {
              seriesDidHold.current = true;
              setHeldFrame(fi);
            }, 180);
          },
          onMouseUp: function onMouseUp() {
            clearTimeout(seriesHoldTimer.current);
            setHeldFrame(null);
          }
        }, "onMouseLeave", function onMouseLeave() {
          clearTimeout(seriesHoldTimer.current);
          setHeldFrame(null);
          seriesDidHold.current = false;
        }), "onTouchStart", function onTouchStart(e) {
          e.preventDefault();
          seriesDidHold.current = false;
          if (isMono) return;
          seriesHoldTimer.current = setTimeout(function () {
            seriesDidHold.current = true;
            setHeldFrame(fi);
          }, 180);
        }), "onTouchEnd", function onTouchEnd() {
          clearTimeout(seriesHoldTimer.current);
          setHeldFrame(null);
        }), "onContextMenu", function onContextMenu(e) {
          return e.preventDefault();
        }), "onClick", function onClick() {
          if (!seriesDidHold.current) openLightbox(seriesLbItems, fi, !isMono && (heldFrame === fi || showAllColour));
          seriesDidHold.current = false;
        }), React.createElement(FilmFrame, {
          seed: fi,
          w: isPortrait ? 340 : 500,
          h: isPortrait ? 510 : 340,
          frameNo: "F".concat(String(fi + 1).padStart(2, "0")),
          realSrc: _val,
          focusPosition: "center",
          colorable: !isMono,
          colorOn: !isMono && (heldFrame === fi || showAllColour)
        }), !isMono && React.createElement("div", {
          style: {
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 4,
            fontSize: 8,
            letterSpacing: ".18em",
            fontWeight: 700,
            padding: "3px 6px",
            color: heldFrame === fi || showAllColour ? "#000" : "#fff",
            background: heldFrame === fi || showAllColour ? "var(--accent)" : "rgba(0,0,0,.6)",
            border: "1px solid ".concat(heldFrame === fi || showAllColour ? "var(--accent)" : "rgba(255,255,255,.35)"),
            transition: "background .2s, color .2s, border-color .2s",
            pointerEvents: "none"
          }
        }, "\u25D0 ", heldFrame === fi || showAllColour ? "COLOUR" : "HOLD")), React.createElement("div", {
          style: {
            marginTop: 6,
            fontSize: 9,
            letterSpacing: ".15em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            opacity: .8
          }
        }, React.createElement("span", {
          style: {
            color: "var(--accent)"
          }
        }, _val.projectName), React.createElement("span", {
          style: {
            opacity: .6
          }
        }, isPortrait ? "▯" : "▬"))));
      } else {
        var fr = frames[fi];
        var _isPortrait = placeholderOrientation(fi) === "portrait";
        var _isHeld = heldFrame === fi;
        items.push(React.createElement("div", {
          key: fi,
          style: {
            position: "relative",
            gridRow: _isPortrait ? "span 2" : "span 1"
          }
        }, React.createElement("div", _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
          style: {
            aspectRatio: _isPortrait ? "2/3" : "3/2",
            position: "relative",
            cursor: _isHeld ? "grabbing" : "zoom-in",
            transform: "scale(1)",
            transition: "transform .18s cubic-bezier(.2,.7,.3,1)",
            outline: "1px solid transparent"
          },
          onMouseEnter: function onMouseEnter(e) {
            return e.currentTarget.style.transform = "scale(1.02)";
          },
          onMouseLeave: function onMouseLeave(e) {
            e.currentTarget.style.transform = "scale(1)";
            setHeldFrame(null);
          },
          onMouseDown: function onMouseDown() {
            seriesDidHold.current = false;
            seriesHoldTimer.current = setTimeout(function () {
              seriesDidHold.current = true;
              setHeldFrame(fi);
            }, 180);
          },
          onMouseUp: function onMouseUp() {
            clearTimeout(seriesHoldTimer.current);
            setHeldFrame(null);
          }
        }, "onMouseLeave", function onMouseLeave() {
          clearTimeout(seriesHoldTimer.current);
          setHeldFrame(null);
          seriesDidHold.current = false;
        }), "onTouchStart", function onTouchStart(e) {
          e.preventDefault();
          seriesDidHold.current = false;
          seriesHoldTimer.current = setTimeout(function () {
            seriesDidHold.current = true;
            setHeldFrame(fi);
          }, 180);
        }), "onTouchEnd", function onTouchEnd() {
          clearTimeout(seriesHoldTimer.current);
          setHeldFrame(null);
        }), "onContextMenu", function onContextMenu(e) {
          return e.preventDefault();
        }), "onClick", function onClick() {
          // Placeholder frames have no image source — no-op
          seriesDidHold.current = false;
        }), React.createElement(FilmFrame, {
          seed: fr.seed,
          w: _isPortrait ? 340 : 500,
          h: _isPortrait ? 510 : 340,
          frameNo: "".concat(fr.src.id, "/F").concat(String(fi + 1).padStart(2, "0")),
          ratio: fr.src.fmt
        })), React.createElement("div", {
          style: {
            marginTop: 6,
            fontSize: 9,
            letterSpacing: ".15em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            opacity: .8
          }
        }, React.createElement("span", {
          style: {
            color: "var(--accent)"
          }
        }, fr.src.title), React.createElement("span", {
          style: {
            opacity: .6
          }
        }, fr.role))));
      }
    };
    for (var fi = 0; fi < frameCount; fi++) {
      _loop(fi);
    }
    return React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoRows: "auto",
        gap: 16,
        alignItems: "start"
      }
    }, items);
  }(), React.createElement("div", {
    style: {
      marginTop: 30,
      fontSize: 10,
      letterSpacing: ".2em",
      opacity: .55,
      textAlign: "center"
    }
  }, "REQUEST FULL SERIES \u2014 ", s.count, " FRAMES \xB7 LICENSING ON REQUEST"), React.createElement("div", {
    style: {
      marginTop: 22,
      display: "flex",
      justifyContent: "center"
    }
  }, React.createElement("button", {
    onClick: onBack,
    className: "ulink",
    style: { fontSize: 11, letterSpacing: ".2em" }
  }, "\u2190 BACK TO ALL SERIES")))));
}

// ─── PAGE: ABOUT ─────────────────────────────────────────────────────────────

function PageAbout(_ref35) {
  var onNavigate = _ref35.onNavigate;
  var P = PORTFOLIO;
  var langSet = new Set();
  P.films.forEach(function (f) {
    if (f.langs && Array.isArray(f.langs)) {
      f.langs.forEach(function (l) {
        return langSet.add(l.trim());
      });
    }
    if (f.lang && f.lang !== "TBD") {
      f.lang.split(/[·,\/]/).forEach(function (l) {
        return langSet.add(l.trim());
      });
    }
  });
  var languages = Array.from(langSet).filter(Boolean).join(" · ");
  return React.createElement(PageWrap, {
    k: "about",
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "60px 36px 36px"
    }
  }, React.createElement(Eyebrow, null, "ABOUT \u00B7 THE PERSON BEHIND THE ARCHIVE"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 18
    }
  }, "THE PHOTOGRAPHER", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), React.createElement("section", {
    style: {
      padding: "0 36px 48px",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 56,
      alignItems: "start",
      maxWidth: 860
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 22,
      lineHeight: 1.4,
      textWrap: "pretty",
      fontWeight: 400
    }
  }, "\"", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "Every production ends."), " What it looked like from the inside \u2014 that's worth keeping.\""), React.createElement(Rule, {
    style: {
      margin: "28px 0"
    }
  }), P.bio.map(function (p, i) {
    return React.createElement("p", {
      key: i,
      style: {
        fontSize: 15,
        lineHeight: 1.7,
        textWrap: "pretty",
        opacity: .9,
        marginBottom: 18
      }
    }, p);
  }), React.createElement(Rule, {
    style: {
      margin: "36px 0 20px"
    }
  }), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      rowGap: 18,
      columnGap: 28,
      fontSize: 12,
      letterSpacing: ".15em"
    }
  }, [["BASED", "HYDERABAD"], ["ACTIVE SINCE", "2024"], ["FILMS", "".concat(P.films.filter(function (f) {
    return f.kind === "FILM";
  }).length, " FEATURES")], ["MUSIC VIDEOS", "".concat(P.films.filter(function (f) {
    return f.kind === "MUSIC";
  }).length, " RELEASED")], ["WEB SERIES", "".concat(P.films.filter(function (f) {
    return f.kind === "WEB";
  }).length, " TITLE").concat(P.films.filter(function (f) {
    return f.kind === "WEB";
  }).length === 1 ? "" : "S")], ["LANGUAGES", languages || "—"]].map(function (_ref36) {
    var _ref37 = _slicedToArray(_ref36, 2),
      k = _ref37[0],
      v = _ref37[1];
    return React.createElement("div", {
      key: k
    }, React.createElement("div", {
      style: {
        fontSize: 9,
        opacity: .5
      }
    }, k), React.createElement("div", {
      style: {
        fontWeight: 600,
        marginTop: 4
      }
    }, v));
  })), React.createElement(Rule, {
    style: {
      margin: "36px 0 20px"
    }
  }), React.createElement(Eyebrow, {
    style: {
      marginBottom: 14
    }
  }, "EQUIPMENT \u2014 WHAT'S IN THE BAG"), React.createElement("div", null, P.gear.map(function (_ref38) {
    var _ref39 = _slicedToArray(_ref38, 2),
      item = _ref39[0],
      note = _ref39[1];
    return React.createElement("div", {
      key: item,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        padding: "12px 0",
        borderBottom: "1px solid var(--line)",
        fontSize: 13,
        letterSpacing: ".05em"
      }
    }, React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, item), React.createElement("span", {
      style: {
        opacity: .65
      }
    }, note));
  })))));
}

// ─── PAGE: CONTACT ────────────────────────────────────────────────────────────

function EnquiryForm(_ref41) {
  var contact = _ref41.contact;
  var PROJECT_TYPES = ["FEATURE", "WEB SERIES", "MUSIC VIDEO", "AD / COMMERCIAL", "DOCUMENTARY"];
  var _useTypes = React.useState([]),
    types = _useTypes[0],
    setTypes = _useTypes[1];
  var _useStatus = React.useState({
      msg: "",
      kind: ""
    }),
    status = _useStatus[0],
    setStatus = _useStatus[1];
  var formRef = React.useRef(null);
  var toggleType = function toggleType(t) {
    setTypes(function (prev) {
      return prev.indexOf(t) >= 0 ? prev.filter(function (x) {
        return x !== t;
      }) : prev.concat([t]);
    });
  };
  var collect = function collect() {
    var f = formRef.current;
    if (!f) return null;
    var data = new FormData(f);
    return {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim(),
      banner: (data.get("banner") || "").toString().trim(),
      message: (data.get("message") || "").toString().trim()
    };
  };
  var buildBody = function buildBody(v) {
    return "Name: " + (v.name || "") + "\n" + "Email: " + (v.email || "") + "\n" + "Phone: " + (v.phone || "") + "\n" + "Production / Banner: " + (v.banner || "") + "\n" + "Project type: " + (types.join(", ") || "\u2014") + "\n\n" + "Message:\n" + (v.message || "");
  };
  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    var f = formRef.current;
    if (f && !f.checkValidity()) {
      f.reportValidity();
      return;
    }
    var v = collect();
    if (!v) return;
    var subject = encodeURIComponent("BTS enquiry \u2014 " + (v.name || "New brief"));
    var body = encodeURIComponent(buildBody(v));
    setStatus({
      msg: "Opening your email \u2014 send the pre-filled message to complete your enquiry. I reply within two working days.",
      kind: "ok"
    });
    window.location.href = "mailto:" + contact.email + "?subject=" + subject + "&body=" + body;
  };
  var onWhatsApp = function onWhatsApp() {
    var f = formRef.current;
    if (f && !f.checkValidity()) {
      f.reportValidity();
      return;
    }
    var v = collect();
    if (!v) return;
    var intro = "Hi Shubham \u2014 enquiry from your BTS portfolio.\n\n";
    var text = encodeURIComponent(intro + buildBody(v));
    setStatus({
      msg: "Opening WhatsApp \u2014 send the pre-filled message to complete your enquiry. I reply within two working days.",
      kind: "ok"
    });
    window.open(contact.whatsapp + "?text=" + text, "_blank", "noopener,noreferrer");
  };
  return React.createElement("form", {
    ref: formRef,
    className: "bts-form",
    onSubmit: onSubmit,
    noValidate: true
  }, React.createElement("div", {
    className: "bts-field-grid"
  }, React.createElement("label", null, React.createElement("span", {
    className: "bts-flabel"
  }, "NAME ", React.createElement("em", {
    className: "req"
  }, "*")), React.createElement("input", {
    className: "bts-field",
    type: "text",
    name: "name",
    required: true,
    autoComplete: "name",
    placeholder: "Your name"
  })), React.createElement("label", null, React.createElement("span", {
    className: "bts-flabel"
  }, "EMAIL ", React.createElement("em", {
    className: "req"
  }, "*")), React.createElement("input", {
    className: "bts-field",
    type: "email",
    name: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@studio.com"
  })), React.createElement("label", null, React.createElement("span", {
    className: "bts-flabel"
  }, "PHONE"), React.createElement("input", {
    className: "bts-field",
    type: "tel",
    name: "phone",
    autoComplete: "tel",
    placeholder: "+91 \u2026"
  })), React.createElement("label", null, React.createElement("span", {
    className: "bts-flabel"
  }, "PRODUCTION / BANNER ", React.createElement("em", {
    className: "req"
  }, "*")), React.createElement("input", {
    className: "bts-field",
    type: "text",
    name: "banner",
    required: true,
    autoComplete: "organization",
    placeholder: "Studio or banner"
  }))), React.createElement("div", null, React.createElement("span", {
    className: "bts-flabel",
    style: {
      display: "block",
      marginBottom: 10
    }
  }, "PROJECT TYPE ", React.createElement("em", {
    style: {
      fontStyle: "normal",
      opacity: .6
    }
  }, "(SELECT ALL THAT APPLY)")), React.createElement("div", {
    className: "bts-pills",
    role: "group",
    "aria-label": "Project type"
  }, PROJECT_TYPES.map(function (t) {
    return React.createElement("button", {
      key: t,
      type: "button",
      className: "bts-pill",
      "aria-pressed": types.indexOf(t) >= 0,
      onClick: function onClick() {
        return toggleType(t);
      }
    }, t);
  }))), React.createElement("label", null, React.createElement("span", {
    className: "bts-flabel"
  }, "MESSAGE"), React.createElement("textarea", {
    className: "bts-field",
    rows: 5,
    name: "message",
    placeholder: "Dates, location, scope \u2014 anything that helps."
  })), React.createElement("div", {
    className: "bts-form-actions"
  }, React.createElement("button", {
    className: "bts-submit",
    type: "submit"
  }, "SEND ENQUIRY"), React.createElement("button", {
    className: "bts-submit alt",
    type: "button",
    onClick: onWhatsApp,
    "aria-label": "Send via WhatsApp"
  }, "SEND VIA WHATSAPP")), status.msg ? React.createElement("div", {
    className: "bts-form-status",
    "aria-live": "polite"
  }, status.msg) : null);
}
function PageContact(_ref40) {
  var onNavigate = _ref40 && _ref40.onNavigate;
  var P = PORTFOLIO;
  return React.createElement(PageWrap, {
    k: "contact",
    onNavigate: onNavigate
  }, React.createElement("section", {
    style: {
      padding: "60px 36px 36px"
    }
  }, React.createElement(Eyebrow, null, "CONTACT \xB7 BOOKING & ENQUIRIES"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 18,
      fontSize: "clamp(30px, 5vw, 52px)"
    }
  }, "GET IN TOUCH", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), React.createElement("section", {
    style: {
      padding: "0 36px 60px",
      maxWidth: 640
    }
  }, React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, React.createElement("a", {
    href: "mailto:".concat(P.contact.email),
    style: {
      padding: "22px 0",
      borderBottom: "1px solid var(--line)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textDecoration: "none"
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: ".3em",
      opacity: .5,
      marginBottom: 6
    }
  }, "EMAIL"), React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: ".02em"
    }
  }, P.contact.email)), React.createElement("span", {
    style: {
      opacity: .4,
      fontSize: 18
    }
  }, "\u2192")), React.createElement("a", {
    href: P.contact.whatsapp,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      padding: "22px 0",
      borderBottom: "1px solid var(--line)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textDecoration: "none"
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: ".3em",
      opacity: .5,
      marginBottom: 6
    }
  }, "WHATSAPP"), React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: ".02em"
    }
  }, P.contact.phone)), React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontSize: 18
    }
  }, "\u2197")), React.createElement("div", {
    style: {
      padding: "22px 0",
      borderBottom: "1px solid var(--line)"
    }
  }, React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: ".3em",
      opacity: .5,
      marginBottom: 6
    }
  }, "BASE"), React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: ".02em"
    }
  }, P.contact.base)), React.createElement("div", {
    style: {
      padding: "22px 0",
      borderBottom: "1px solid var(--line)"
    }
  }, React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: ".3em",
      opacity: .5,
      marginBottom: 6
    }
  }, "RATES"), React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: ".02em"
    }
  }, P.contact.rates))), React.createElement("div", {
    style: {
      marginTop: 40,
      padding: "20px 22px",
      border: "1px solid var(--line-strong)"
    }
  }, React.createElement(Eyebrow, null, "STATUS"), React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 700
    }
  }, React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF"), "\xA0 OPEN \u2014 Q3 2026"))), React.createElement("section", {
    style: {
      padding: "0 36px 80px",
      maxWidth: 640
    }
  }, React.createElement(Rule, {
    style: {
      marginBottom: 36
    }
  }), React.createElement(Eyebrow, null, "ENQUIRY \u00B7 SEND A BRIEF"), React.createElement(BigType, {
    size: "h1",
    style: {
      marginTop: 14,
      fontSize: "clamp(30px, 5vw, 52px)"
    }
  }, "LET'S MAKE FRAMES", React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, ".")), React.createElement("p", {
    style: {
      marginTop: 16,
      marginBottom: 30,
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--ink-dim)",
      maxWidth: 520
    }
  }, "Tell me about the project \u2014 the dates, the locations, the scope. I read every message and reply within two working days."), React.createElement(EnquiryForm, {
    contact: P.contact
  })));
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  var _React$useState21 = React.useState({
      page: "home",
      filmId: null,
      seriesId: null
    }),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    route = _React$useState22[0],
    setRoute = _React$useState22[1];
  var _React$useState23 = React.useState(PORTFOLIO.films[0].id),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    featuredId = _React$useState24[0],
    setFeaturedId = _React$useState24[1];
  function navigate(page, idA) {
    var filmId = page === "film" ? idA : null;
    var seriesId = page === "series-detail" ? idA : null;
    if (page === route.page && filmId === route.filmId && seriesId === route.seriesId) return;
    if (filmId) setFeaturedId(filmId);
    setRoute({
      page: page,
      filmId: filmId,
      seriesId: seriesId
    });
    window.scrollTo(0, 0);
  }
  function dockSelect(film) {
    if (route.page === "home") setFeaturedId(film.id);else navigate("film", film.id);
  }

  // Arrow-key scrubbing
  React.useEffect(function () {
    function onKey(e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
      if (route.page !== "home" && route.page !== "film") return;
      var films = PORTFOLIO.films;
      var currentId = route.page === "home" ? featuredId : route.filmId;
      var idx = films.findIndex(function (f) {
        return f.id === currentId;
      });
      if (idx < 0) return;
      var step = e.key === "ArrowRight" ? 1 : -1;
      var next = films[(idx + step + films.length) % films.length];
      e.preventDefault();
      if (route.page === "home") setFeaturedId(next.id);else navigate("film", next.id);
    }
    window.addEventListener("keydown", onKey);
    return function () {
      return window.removeEventListener("keydown", onKey);
    };
  }, [route.page, route.filmId, featuredId]);

  // Sync document.title to the current route so browser tabs and shared links read correctly
  React.useEffect(function () {
    var base = "Shubham Srivastava \u00b7 BTS";
    var title = base;
    if (route.page === "home") title = base + " \u2014 Behind-the-scenes Photographer";
    else if (route.page === "work") title = "Work \u00b7 " + base;
    else if (route.page === "series") title = "Series \u00b7 " + base;
    else if (route.page === "about") title = "About \u00b7 " + base;
    else if (route.page === "contact") title = "Contact \u00b7 " + base;
    else if (route.page === "film" && route.filmId) {
      var f = PORTFOLIO.films.find(function (x) { return x.id === route.filmId; });
      title = (f ? f.title : "Film") + " \u00b7 \u2116 " + route.filmId + " \u00b7 " + base;
    } else if (route.page === "series-detail" && route.seriesId) {
      var s = PORTFOLIO.series.find(function (x) { return x.id === route.seriesId; });
      title = (s ? s.title : "Series") + " \u00b7 " + base;
    }
    document.title = title;
  }, [route.page, route.filmId, route.seriesId]);
  var featured = PORTFOLIO.films.find(function (f) {
    return f.id === featuredId;
  }) || PORTFOLIO.films[0];
  var dockActiveId = route.page === "home" ? featuredId : route.page === "film" ? route.filmId : null;
  var page = null;
  switch (route.page) {
    case "home":
      page = React.createElement(PageHome, {
        activeFilm: featured,
        onOpenFilm: function onOpenFilm(id) {
          return navigate("film", id);
        },
        onOpenSeries: function onOpenSeries(id) {
          return navigate("series-detail", id);
        },
        onNavigate: navigate,
        onScrub: function onScrub(dir) {
          var films = PORTFOLIO.films;
          var idx = films.findIndex(function (f) { return f.id === featuredId; });
          if (idx < 0) return;
          var next = films[(idx + dir + films.length) % films.length];
          setFeaturedId(next.id);
        }
      });
      break;
    case "work":
      page = React.createElement(PageWork, {
        onOpenFilm: function onOpenFilm(id) {
          return navigate("film", id);
        },
        onNavigate: navigate
      });
      break;
    case "film":
      page = React.createElement(PageFilm, {
        film: PORTFOLIO.films.find(function (f) {
          return f.id === route.filmId;
        }) || featured,
        onBack: function onBack() {
          return navigate("work");
        },
        onNavigate: navigate
      });
      break;
    case "series":
      page = React.createElement(PageSeries, {
        onOpenSeries: function onOpenSeries(id) {
          return navigate("series-detail", id);
        },
        onNavigate: navigate
      });
      break;
    case "series-detail":
      page = React.createElement(PageSeriesDetail, {
        series: PORTFOLIO.series.find(function (s) {
          return s.id === route.seriesId;
        }) || PORTFOLIO.series[0],
        onBack: function onBack() {
          return navigate("series");
        },
        onNavigate: navigate
      });
      break;
    case "about":
      page = React.createElement(PageAbout, {
        onNavigate: navigate
      });
      break;
    case "contact":
      page = React.createElement(PageContact, { onNavigate: navigate });
      break;
    default:
      page = React.createElement(PageHome, {
        activeFilm: featured,
        onOpenFilm: function onOpenFilm(id) {
          return navigate("film", id);
        },
        onOpenSeries: function onOpenSeries(id) {
          return navigate("series-detail", id);
        },
        onNavigate: navigate,
        onScrub: function onScrub(dir) {
          var films = PORTFOLIO.films;
          var idx = films.findIndex(function (f) { return f.id === featuredId; });
          if (idx < 0) return;
          var next = films[(idx + dir + films.length) % films.length];
          setFeaturedId(next.id);
        }
      });
  }
  return React.createElement(React.Fragment, null, React.createElement(TopNav, {
    route: route.page,
    onNavigate: navigate
  }), React.createElement("div", {
    style: { position: "relative" }
  }, page, React.createElement(FilmstripDock, {
    activeId: dockActiveId,
    onSelect: dockSelect
  })), React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
