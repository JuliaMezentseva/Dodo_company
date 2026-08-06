/* @ds-bundle: {"format":3,"namespace":"SkillazCoreDesignSystem_bf9566","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Cell","sourcePath":"components/display/Cell.jsx"},{"name":"Divider","sourcePath":"components/display/Divider.jsx"},{"name":"Loader","sourcePath":"components/display/Loader.jsx"},{"name":"FullScreenLoader","sourcePath":"components/display/Loader.jsx"},{"name":"ProgressBar","sourcePath":"components/display/ProgressBar.jsx"},{"name":"ProgressCircle","sourcePath":"components/display/ProgressCircle.jsx"},{"name":"Skeleton","sourcePath":"components/display/Skeleton.jsx"},{"name":"SkeletonText","sourcePath":"components/display/Skeleton.jsx"},{"name":"Table","sourcePath":"components/display/Table.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"TextList","sourcePath":"components/display/TextList.jsx"},{"name":"Timeline","sourcePath":"components/display/Timeline.jsx"},{"name":"SkAlertIcons","sourcePath":"components/feedback/Alert.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Snackbar","sourcePath":"components/feedback/Snackbar.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"SkSpinner","sourcePath":"components/forms/Button.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Calendar","sourcePath":"components/forms/DatePicker.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"FormHelper","sourcePath":"components/forms/FormHelper.jsx"},{"name":"FormLabel","sourcePath":"components/forms/FormLabel.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"PinInput","sourcePath":"components/forms/PinInput.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"Menu","sourcePath":"components/navigation/Menu.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"SegmentedControl","sourcePath":"components/navigation/SegmentedControl.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SkillazLogo","sourcePath":"components/navigation/SkillazLogo.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Drawer","sourcePath":"components/overlays/Drawer.jsx"},{"name":"SkCloseGlyph","sourcePath":"components/overlays/Modal.jsx"},{"name":"SkOverlay","sourcePath":"components/overlays/Modal.jsx"},{"name":"SkOverlayHeader","sourcePath":"components/overlays/Modal.jsx"},{"name":"SkActionBar","sourcePath":"components/overlays/Modal.jsx"},{"name":"Modal","sourcePath":"components/overlays/Modal.jsx"}],"sourceHashes":{"components/display/Avatar.jsx":"9abef5a13bbe","components/display/Badge.jsx":"6cbe4afdefb4","components/display/Card.jsx":"4e26e52c7e2a","components/display/Cell.jsx":"9ca41b2520d7","components/display/Divider.jsx":"f2ffd40cfb1d","components/display/Loader.jsx":"81a2c22e87d4","components/display/ProgressBar.jsx":"27162194c766","components/display/ProgressCircle.jsx":"4402f3f73e8d","components/display/Skeleton.jsx":"aec57c87e034","components/display/Table.jsx":"c2e3639316ca","components/display/Tag.jsx":"70f361b5617b","components/display/TextList.jsx":"60dcceb0f0e4","components/display/Timeline.jsx":"35d502cf072e","components/feedback/Alert.jsx":"89939909607d","components/feedback/Snackbar.jsx":"38710469503c","components/feedback/Tooltip.jsx":"e80bcd0b8d8c","components/forms/Button.jsx":"bc62785ea992","components/forms/Checkbox.jsx":"c4b9b6225349","components/forms/DatePicker.jsx":"847afcdbcd54","components/forms/FormHelper.jsx":"6557063aa904","components/forms/FormLabel.jsx":"3f2bb2c52635","components/forms/IconButton.jsx":"77269fa0cb5a","components/forms/Input.jsx":"80433af9b973","components/forms/PinInput.jsx":"be26c6337172","components/forms/Radio.jsx":"873e65505f91","components/forms/Select.jsx":"807e53cd9902","components/forms/Switch.jsx":"7dd876182e9c","components/forms/Textarea.jsx":"fd08381ed639","components/navigation/Breadcrumbs.jsx":"db9e15af78d1","components/navigation/Header.jsx":"58fe0006cd95","components/navigation/Menu.jsx":"352c663d6e5d","components/navigation/Pagination.jsx":"64c5e30c3496","components/navigation/SegmentedControl.jsx":"1f65c607af91","components/navigation/Sidebar.jsx":"7fd7424c1c50","components/navigation/SkillazLogo.jsx":"646fdf93d220","components/navigation/Tabs.jsx":"328a02065032","components/overlays/Drawer.jsx":"26f36bfefb36","components/overlays/Modal.jsx":"22f6b5d914da","ui_kits/portal/screens.jsx":"b18994d0a43a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SkillazCoreDesignSystem_bf9566 = window.SkillazCoreDesignSystem_bf9566 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Avatar.jsx
try { (() => {
const SK_AVATAR_HUES = ["blue", "green", "orange", "pink", "red", "sky", "violet", "yellow", "gray"];

/** Circle avatar: photo or initials on a token hue. */
function Avatar({
  name = "",
  src,
  size = 40,
  hue,
  style
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const auto = SK_AVATAR_HUES[Math.abs([...name].reduce((a, ch) => a + ch.charCodeAt(0), 0)) % (SK_AVATAR_HUES.length - 1)];
  const bg = `var(--sk-avatar-${hue || auto})`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: src ? "var(--sk-surface-tertiary)" : bg,
      color: "var(--sk-text-contrast)",
      font: `600 ${Math.round(size * 0.38)}px/1 var(--sk-font-ui)`,
      boxShadow: "inset 0 0 0 1px var(--stroke-stroke-avatar)",
      overflow: "hidden",
      userSelect: "none",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
/** Notification badge: numeric counter pill or 6px attention dot. */
function Badge({
  count,
  dot = false,
  hue = "negative",
  max = 99,
  style
}) {
  const colors = {
    negative: "var(--sk-negative)",
    accent: "var(--sk-accent)",
    positive: "var(--sk-positive)",
    neutral: "var(--sk-neutral)"
  };
  const bg = colors[hue] || colors.negative;
  if (dot) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: bg,
        display: "inline-block",
        flexShrink: 0,
        ...style
      }
    });
  }
  const text = count > max ? `${max}+` : String(count ?? "");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      borderRadius: "var(--sk-radius-full)",
      background: bg,
      color: "var(--sk-text-contrast)",
      font: "500 10px/16px var(--sk-font-ui)",
      letterSpacing: "0.015em",
      flexShrink: 0,
      ...style
    }
  }, text);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** White card, radius 16, shadow S OR hairline border (never both). */
function Card({
  children,
  bordered = false,
  padding = 24,
  radius = 16,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--sk-surface-card)",
      borderRadius: radius,
      padding,
      boxShadow: bordered ? "inset 0 0 0 1px var(--sk-stroke)" : "var(--sk-shadow-s)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Cell.jsx
try { (() => {
const SkCellChevron = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  style: {
    color: "var(--sk-icon-secondary)",
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M7.5 5 12.5 10l-5 5",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/** List cell: left media, center title+subtitle+description, optional value text, right action.
    `left`/`leading` and `right`/`trailing` are aliases. `chevron` appends a caret icon.
    Sizes S/M/L set vertical padding; interactive cells hover-tint. */
function Cell({
  left,
  leading,
  // leading is alias for left
  title,
  subtitle,
  description,
  value,
  // right-aligned secondary text
  right,
  trailing,
  // trailing is alias for right
  chevron = false,
  size = "m",
  // s | m | l
  interactive = false,
  selected = false,
  align = "center",
  // center | top
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const leadingNode = left || leading;
  const trailingNode = right || trailing;
  const pad = {
    s: "8px 12px",
    m: "12px 16px",
    l: "16px 16px"
  }[size] || "12px 16px";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      gap: 12,
      padding: pad,
      alignItems: align === "top" ? "flex-start" : "center",
      borderRadius: "var(--sk-radius-3)",
      background: selected ? "var(--sk-accent-secondary)" : interactive && hover ? "var(--sk-hover-neutral-secondary, var(--graphite-graphite-97))" : "transparent",
      cursor: interactive || onClick ? "pointer" : "default",
      transition: "background var(--sk-duration) var(--sk-ease)",
      ...style
    }
  }, leadingNode && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexShrink: 0,
      color: "var(--sk-icon-secondary)"
    }
  }, leadingNode), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      font: size === "l" ? "var(--sk-label-2)" : "var(--sk-label-3)",
      color: selected ? "var(--sk-text-accent)" : "var(--sk-text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: "var(--sk-text-secondary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, subtitle), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-tertiary)"
    }
  }, description)), value && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: "var(--sk-text-secondary)",
      flexShrink: 0
    }
  }, value), trailingNode && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexShrink: 0,
      alignItems: "center",
      gap: 8
    }
  }, trailingNode), chevron && /*#__PURE__*/React.createElement(SkCellChevron, null));
}
Object.assign(__ds_scope, { Cell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Cell.jsx", error: String((e && e.message) || e) }); }

// components/display/Divider.jsx
try { (() => {
/** Hairline divider (#DCE3EB). Horizontal by default; vertical needs an explicit length via style/height of parent. */
function Divider({
  orientation = "horizontal",
  inset = 0,
  insetEnd,
  style
}) {
  const end = insetEnd !== undefined ? insetEnd : inset;
  if (orientation === "vertical") {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: 1,
        alignSelf: "stretch",
        background: "var(--sk-stroke-divider)",
        marginTop: inset,
        marginBottom: end,
        flexShrink: 0,
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sk-stroke-divider)",
      marginLeft: inset,
      marginRight: end,
      flexShrink: 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Divider.jsx", error: String((e && e.message) || e) }); }

// components/display/Loader.jsx
try { (() => {
/** Spinner loader. Sizes 16/20/24/48/64/96. Arc ~75% of box, accent by default. */
function Loader({
  size = 24,
  color = "var(--sk-accent)",
  style
}) {
  const stroke = Math.max(2, Math.round(size * 0.1));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      animation: "sk-loader-spin 0.8s linear infinite"
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes sk-loader-spin{to{transform:rotate(360deg)}}"), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: (size - stroke) / 2,
    fill: "none",
    stroke: color,
    strokeOpacity: "0.2",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("path", {
    d: `M ${size / 2} ${stroke / 2} A ${(size - stroke) / 2} ${(size - stroke) / 2} 0 0 1 ${size - stroke / 2} ${size / 2}`,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round"
  })));
}

/** Full-screen / container loader on a dark translucent backdrop.
 *  Dark overlay rgba(32,38,43,0.6) with white spinner — matches Figma spec. */
function FullScreenLoader({
  caption,
  fixed = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: fixed ? "fixed" : "absolute",
      inset: 0,
      zIndex: 150,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      background: "rgba(32,38,43,0.6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Loader, {
    size: 48,
    color: "rgba(255,255,255,0.9)"
  }), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: "rgba(255,255,255,0.7)"
    }
  }, caption));
}
Object.assign(__ds_scope, { Loader, FullScreenLoader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Loader.jsx", error: String((e && e.message) || e) }); }

// components/display/ProgressBar.jsx
try { (() => {
/** Slim progress bar, 4px tall, accent fill on graphite-95 track. */
function ProgressBar({
  value = 0,
  hue = "accent",
  height = 4,
  label,
  style
}) {
  const colors = {
    accent: "var(--sk-accent)",
    positive: "var(--sk-positive)",
    negative: "var(--sk-negative)",
    warning: "var(--sk-warning)",
    special: "var(--sk-special)"
  };
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: height,
      background: "var(--graphite-graphite-95)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      borderRadius: height,
      background: colors[hue] || colors.accent,
      transition: "width 300ms var(--sk-ease)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/display/ProgressCircle.jsx
try { (() => {
const SK_PC_HUES = {
  accent: "var(--sk-accent)",
  blue: "var(--blue-blue-50)",
  positive: "var(--sk-positive)",
  warning: "var(--sk-warning)",
  negative: "var(--sk-negative)",
  special: "var(--sk-special)"
};

/** Circular progress. Sizes 24…120.
 *  `hue` sets fill colour. `showValue` overlays percentage; defaults true for size≥36.
 *  `segments>1` draws a segmented ring. `track` overrides the track colour. */
function ProgressCircle({
  value = 0,
  size = 64,
  hue = "accent",
  showValue,
  thickness,
  segments = 0,
  track = "var(--graphite-graphite-90)",
  label,
  style
}) {
  const pct = Math.max(0, Math.min(100, value));
  const stroke = thickness || Math.max(3, Math.round(size * 0.085));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const showText = showValue !== undefined ? showValue : size >= 36;
  const fontSize = size >= 96 ? 18 : size >= 64 ? 16 : size >= 48 ? 12 : 9;
  const fill = SK_PC_HUES[hue] || SK_PC_HUES.accent;
  let arcs;
  if (segments > 1) {
    const gap = c * 0.04;
    const seg = (c - gap * segments) / segments;
    const filled = Math.round(pct / 100 * segments);
    arcs = Array.from({
      length: segments
    }).map((_, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: i < filled ? fill : track,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeDasharray: `${seg} ${c - seg}`,
      strokeDashoffset: -(i * (seg + gap))
    }));
  } else {
    arcs = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: track,
      strokeWidth: stroke
    }), /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: fill,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: c * (1 - pct / 100),
      style: {
        transition: "stroke-dashoffset 400ms var(--sk-ease)"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size,
      height: size,
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, arcs), showText && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: `400 ${fontSize}px/1 var(--sk-font-ui)`,
      color: "var(--sk-text-primary)"
    }
  }, Math.round(pct), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: fontSize * 0.7
    }
  }, "%"))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, label));
}
Object.assign(__ds_scope, { ProgressCircle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProgressCircle.jsx", error: String((e && e.message) || e) }); }

// components/display/Skeleton.jsx
try { (() => {
/** Loading placeholder with shimmer. shape: rect | text | circle. */
function Skeleton({
  shape = "rect",
  width,
  height,
  radius,
  lines = 1,
  style
}) {
  const base = {
    background: "linear-gradient(90deg, var(--graphite-graphite-95) 25%, var(--graphite-graphite-97) 37%, var(--graphite-graphite-95) 63%)",
    backgroundSize: "400% 100%",
    animation: "sk-shimmer 1.4s ease infinite"
  };
  const keyframes = /*#__PURE__*/React.createElement("style", null, "@keyframes sk-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}");
  if (shape === "circle") {
    const d = width || height || 40;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: d,
        height: d,
        borderRadius: "50%",
        ...base,
        ...style
      }
    }, keyframes);
  }
  if (shape === "text") {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style
      }
    }, keyframes, Array.from({
      length: lines
    }).map((_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        height: height || 12,
        width: i === lines - 1 && lines > 1 ? "60%" : width || "100%",
        borderRadius: 6,
        ...base
      }
    })));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: width || "100%",
      height: height || 16,
      borderRadius: radius ?? "var(--sk-radius-2)",
      ...base,
      ...style
    }
  }, keyframes);
}

/** N-line text skeleton (last line 60% width). Max 3 lines per spec. */
function SkeletonText({
  lines = 3,
  lineHeight = 20,
  gap = 8,
  lastWidth = "60%",
  style
}) {
  const n = Math.min(lines, 3);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
      width: "100%",
      ...style
    }
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement(Skeleton, {
    key: i,
    height: Math.round(lineHeight * 0.7),
    width: i === n - 1 && n > 1 ? lastWidth : "100%"
  })));
}
Object.assign(__ds_scope, { Skeleton, SkeletonText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/display/Table.jsx
try { (() => {
/** Data table: gray 14px header, hairline row dividers, hover tint, no zebra.
    columns: [{ key, title, width, align, render?(row) }] */
function Table({
  columns = [],
  rows = [],
  onRowClick,
  density = "large",
  style
}) {
  const pad = density === "small" ? "8px 16px" : density === "medium" ? "12px 16px" : "16px 16px";
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      font: "var(--sk-label-3-regular)",
      letterSpacing: "0.005em",
      ...style
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    style: {
      textAlign: col.align || "left",
      padding: pad,
      font: "var(--sk-label-3-regular)",
      color: "var(--sk-text-secondary)",
      borderBottom: "1px solid var(--sk-stroke)",
      whiteSpace: "nowrap",
      width: col.width
    }
  }, col.title)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement(TableRow, {
    key: row.id ?? i,
    row: row,
    columns: columns,
    pad: pad,
    onClick: onRowClick
  }))));
}
function TableRow({
  row,
  columns,
  pad,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", {
    onClick: onClick ? () => onClick(row) : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? "var(--sk-hover-table)" : "transparent",
      cursor: onClick ? "pointer" : "default",
      transition: "background var(--sk-duration) var(--sk-ease)"
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      padding: pad,
      textAlign: col.align || "left",
      borderBottom: "1px solid var(--graphite-graphite-95)",
      color: "var(--sk-text-primary)",
      verticalAlign: "middle"
    }
  }, col.render ? col.render(row) : row[col.key])));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Table.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
const SK_TAG_HUES = {
  neutral: {
    bg: "var(--sk-surface-secondary)",
    color: "var(--sk-text-primary)"
  },
  gray: {
    bg: "var(--graphite-graphite-97)",
    color: "var(--sk-text-secondary)"
  },
  accent: {
    bg: "var(--sk-accent-secondary)",
    color: "var(--sk-text-accent)"
  },
  blue: {
    bg: "var(--bg-bg-blue-secondary)",
    color: "var(--text-text-blue)"
  },
  positive: {
    bg: "var(--sk-positive-secondary)",
    color: "var(--sk-text-positive)"
  },
  negative: {
    bg: "var(--sk-negative-secondary)",
    color: "var(--sk-text-negative)"
  },
  warning: {
    bg: "var(--sk-warning-secondary)",
    color: "var(--sk-text-warning-dark)"
  },
  special: {
    bg: "var(--sk-special-secondary)",
    color: "var(--text-text-special)"
  },
  dark: {
    bg: "var(--bg-bg-dark-secondary)",
    color: "var(--sk-text-contrast)"
  }
};

/** Tinted label chip. size m=24 / s=20; pill or radius 8. */
function Tag({
  children,
  hue = "neutral",
  size = "m",
  pill = false,
  icon,
  onRemove,
  style
}) {
  const c = SK_TAG_HUES[hue] || SK_TAG_HUES.neutral;
  const h = size === "s" ? 20 : 24;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      height: h,
      padding: size === "s" ? "0 6px" : "0 8px",
      borderRadius: pill ? "var(--sk-radius-full)" : 8,
      background: c.bg,
      color: c.color,
      font: size === "s" ? "var(--sk-label-4)" : "500 12px/18px var(--sk-font-ui)",
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
      ...style
    }
  }, icon, children, onRemove && /*#__PURE__*/React.createElement("svg", {
    onClick: onRemove,
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    style: {
      cursor: "pointer",
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3l6 6M9 3l-6 6",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/display/TextList.jsx
try { (() => {
/**
 * Bulleted or numbered text list.
 * Numbered lists auto-align markers by the widest number (e.g. "10." pads "1.").
 * Gap between items scales with size: xs=8 s=10 m=12 l=14.
 */
function TextList({
  items = [],
  // string[] | ReactNode[]
  ordered = false,
  // false = bulleted (•), true = numbered
  size = "m",
  // xs | s | m | l — controls font + gap
  color,
  // override text color
  style
}) {
  const sizeMap = {
    xs: {
      font: "var(--sk-paragraph-4-regular)",
      gap: 8,
      dot: 4,
      dotMt: 8
    },
    s: {
      font: "var(--sk-paragraph-3-regular)",
      gap: 10,
      dot: 4,
      dotMt: 9
    },
    m: {
      font: "var(--sk-paragraph-2-regular)",
      gap: 12,
      dot: 5,
      dotMt: 10
    },
    l: {
      font: "var(--sk-paragraph-1-regular)",
      gap: 14,
      dot: 5,
      dotMt: 11
    }
  };
  const {
    font,
    gap,
    dot,
    dotMt
  } = sizeMap[size] || sizeMap.m;
  const textColor = color || "var(--sk-text-primary)";

  // For ordered: compute column width by widest number label
  const maxWidth = ordered ? `${String(items.length).length + 1}ch` : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
      ...style
    }
  }, items.map((text, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    }
  }, ordered ? /*#__PURE__*/React.createElement("span", {
    style: {
      font,
      color: textColor,
      flexShrink: 0,
      minWidth: maxWidth,
      textAlign: "right",
      userSelect: "none"
    }
  }, i + 1, ".") : /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: dot,
      height: dot,
      borderRadius: "50%",
      background: textColor,
      flexShrink: 0,
      marginTop: dotMt
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font,
      color: textColor,
      flex: 1
    }
  }, text))));
}
Object.assign(__ds_scope, { TextList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/TextList.jsx", error: String((e && e.message) || e) }); }

// components/display/Timeline.jsx
try { (() => {
/** Vertical change-history timeline. items: [{ id, title, meta?, time?, hue?, icon? }] */
function Timeline({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    const dot = `var(--sk-${it.hue === "negative" ? "negative" : it.hue === "positive" ? "positive" : it.hue === "warning" ? "warning" : "accent"})`;
    return /*#__PURE__*/React.createElement("div", {
      key: it.id ?? i,
      style: {
        display: "flex",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12,
        height: 12,
        borderRadius: "50%",
        marginTop: 4,
        background: it.icon ? "transparent" : dot,
        boxShadow: it.icon ? "none" : "0 0 0 3px var(--graphite-graphite-97)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: dot
      }
    }, it.icon), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        flex: 1,
        minHeight: 24,
        background: "var(--sk-stroke-divider)",
        margin: "4px 0"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        paddingBottom: last ? 0 : 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        font: "var(--sk-label-3)",
        color: "var(--sk-text-primary)"
      }
    }, it.title), it.time && /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--sk-label-4-regular)",
        color: "var(--sk-text-tertiary)",
        flexShrink: 0
      }
    }, it.time)), it.meta && /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--sk-label-4-regular)",
        color: "var(--sk-text-secondary)",
        marginTop: 2
      }
    }, it.meta)));
  }));
}
Object.assign(__ds_scope, { Timeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Timeline.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const SkAlertIcons = {
  info: color => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 11v5",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "1.2",
    fill: "white"
  })),
  warning: color => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v5",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16",
    r: "1.2",
    fill: "white"
  })),
  check: color => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12.2l2.4 2.4 4.6-4.8",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
};
const SK_ALERT_HUES = {
  accent: {
    bg: "var(--sk-accent-secondary)",
    icon: "var(--sk-icon-accent)",
    glyph: "info"
  },
  positive: {
    bg: "var(--sk-positive-secondary)",
    icon: "var(--sk-icon-positive)",
    glyph: "check"
  },
  warning: {
    bg: "var(--sk-warning-secondary)",
    icon: "var(--sk-warning)",
    glyph: "warning"
  },
  negative: {
    bg: "var(--sk-negative-secondary)",
    icon: "var(--sk-icon-negative)",
    glyph: "warning"
  },
  neutral: {
    bg: "var(--sk-surface-secondary)",
    icon: "var(--sk-icon-secondary)",
    glyph: "info"
  }
};

/** Inline alert: tinted bg, radius 12, filled status icon, title + text + optional actions. */
function Alert({
  hue = "accent",
  title,
  children,
  actions,
  onClose,
  style
}) {
  const c = SK_ALERT_HUES[hue] || SK_ALERT_HUES.accent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      padding: 16,
      borderRadius: "var(--sk-radius-3)",
      background: c.bg,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: "inline-flex"
    }
  }, SkAlertIcons[c.glyph](c.icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-subtitle-2)",
      color: "var(--sk-text-primary)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-paragraph-3)",
      color: "var(--sk-text-primary)"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, actions)), onClose && /*#__PURE__*/React.createElement("svg", {
    onClick: onClose,
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    style: {
      cursor: "pointer",
      flexShrink: 0,
      color: "var(--sk-icon-secondary)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l8 8M14 6l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { SkAlertIcons, Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Snackbar.jsx
try { (() => {
/** Dark toast (graphite-15 bg, white text, radius 12, shadow L). Fixed positioning is up to the caller. */
function Snackbar({
  children,
  action,
  onAction,
  onClose,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      minHeight: 48,
      padding: "12px 16px",
      borderRadius: "var(--sk-radius-3)",
      background: "var(--bg-bg-dark-secondary)",
      color: "var(--sk-text-contrast)",
      font: "var(--sk-label-3-regular)",
      letterSpacing: "0.005em",
      boxShadow: "var(--sk-shadow-l)",
      maxWidth: 480,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), action && /*#__PURE__*/React.createElement("span", {
    onClick: onAction,
    style: {
      font: "var(--sk-label-3)",
      color: "var(--text-text-accent-tertiary)",
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, action), onClose && /*#__PURE__*/React.createElement("svg", {
    onClick: onClose,
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    style: {
      cursor: "pointer",
      flexShrink: 0,
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l8 8M14 6l-8 8",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Snackbar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Dark tooltip on hover. Wraps its child inline. */
function Tooltip({
  content,
  placement = "top",
  children,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false)
  }, children, open && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      zIndex: 100,
      ...pos,
      background: "var(--bg-bg-dark-secondary)",
      color: "var(--sk-text-contrast)",
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em",
      padding: "6px 10px",
      borderRadius: 8,
      whiteSpace: "nowrap",
      boxShadow: "var(--sk-shadow-m)",
      pointerEvents: "none"
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SK_BTN_SIZES = {
  l: {
    height: 48,
    padding: "0 16px",
    radius: 12,
    font: "500 16px/22px var(--sk-font-ui)",
    gap: 8,
    icon: 24
  },
  m: {
    height: 40,
    padding: "0 12px",
    radius: 12,
    font: "500 14px/20px var(--sk-font-ui)",
    gap: 8,
    icon: 24
  },
  s: {
    height: 32,
    padding: "0 10px",
    radius: 8,
    font: "500 14px/20px var(--sk-font-ui)",
    gap: 6,
    icon: 16
  },
  xs: {
    height: 24,
    padding: "0 8px",
    radius: 8,
    font: "500 12px/18px var(--sk-font-ui)",
    gap: 4,
    icon: 16
  }
};
const SK_BTN_COLORS = {
  neutral: {
    primary: {
      bg: "var(--graphite-graphite-0)",
      bgHover: "var(--bg-bg-state-button-neutral-hovered)",
      color: "var(--sk-text-contrast)"
    },
    secondary: {
      bg: "var(--graphite-graphite-97)",
      bgHover: "var(--bg-bg-state-button-neutral-secondary-hovered)",
      color: "var(--sk-text-primary)"
    },
    tertiary: {
      bg: "transparent",
      bgHover: "var(--graphite-graphite-97)",
      color: "var(--sk-text-primary)"
    }
  },
  accent: {
    primary: {
      bg: "var(--sk-accent)",
      bgHover: "var(--sk-accent-hover)",
      color: "var(--sk-text-contrast)"
    },
    secondary: {
      bg: "var(--sk-accent-secondary)",
      bgHover: "var(--bg-bg-state-button-accent-secondary-hovered)",
      color: "var(--sk-text-accent)"
    },
    tertiary: {
      bg: "transparent",
      bgHover: "var(--sk-accent-secondary)",
      color: "var(--sk-text-accent)"
    }
  },
  gray: {
    primary: {
      bg: "var(--sk-surface-secondary)",
      bgHover: "var(--graphite-graphite-95)",
      color: "var(--sk-text-primary)"
    },
    secondary: {
      bg: "var(--graphite-graphite-97)",
      bgHover: "var(--graphite-graphite-95)",
      color: "var(--sk-text-secondary)"
    },
    tertiary: {
      bg: "transparent",
      bgHover: "var(--graphite-graphite-97)",
      color: "var(--sk-text-secondary)"
    }
  },
  positive: {
    primary: {
      bg: "var(--sk-positive)",
      bgHover: "var(--sk-positive-hover)",
      color: "var(--sk-text-contrast)"
    },
    secondary: {
      bg: "var(--sk-positive-secondary)",
      bgHover: "var(--bg-bg-state-button-positive-secondary-hovered)",
      color: "var(--sk-text-positive)"
    },
    tertiary: {
      bg: "transparent",
      bgHover: "var(--sk-positive-secondary)",
      color: "var(--sk-text-positive)"
    }
  },
  negative: {
    primary: {
      bg: "var(--sk-negative)",
      bgHover: "var(--sk-negative-hover)",
      color: "var(--sk-text-contrast)"
    },
    secondary: {
      bg: "var(--sk-negative-secondary)",
      bgHover: "var(--bg-bg-state-button-negative-secondary-hovered)",
      color: "var(--sk-text-negative)"
    },
    tertiary: {
      bg: "transparent",
      bgHover: "var(--sk-negative-secondary)",
      color: "var(--sk-text-negative)"
    }
  }
};
function SkSpinner({
  size = 16,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      animation: "sk-spin 0.8s linear infinite"
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes sk-spin{to{transform:rotate(360deg)}}"), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6.5",
    stroke: color,
    strokeOpacity: "0.25",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.5 8a6.5 6.5 0 0 0-6.5-6.5",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
}
function Button({
  children,
  variant = "neutral",
  // neutral | accent | gray | positive | negative
  mode = "primary",
  // primary | secondary | tertiary
  size = "m",
  // l | m | s | xs
  disabled = false,
  loading = false,
  icon = null,
  // leading icon node
  postfix = null,
  // trailing node (icon / counter)
  pill = false,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SK_BTN_SIZES[size] || SK_BTN_SIZES.m;
  const c = (SK_BTN_COLORS[variant] || SK_BTN_COLORS.neutral)[mode] || SK_BTN_COLORS.neutral.primary;
  const isDisabled = disabled || loading;
  const bg = isDisabled ? mode === "tertiary" ? "transparent" : "var(--sk-surface-disabled)" : hover ? c.bgHover : c.bg;
  const color = isDisabled ? "var(--sk-text-disabled)" : c.color;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: isDisabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      border: "none",
      borderRadius: pill ? "var(--sk-radius-full)" : s.radius,
      background: bg,
      color,
      font: s.font,
      letterSpacing: "0.005em",
      cursor: isDisabled ? "default" : "pointer",
      transition: "background var(--sk-duration) var(--sk-ease), color var(--sk-duration) var(--sk-ease)",
      whiteSpace: "nowrap",
      ...style
    },
    disabled: disabled
  }, rest), loading ? /*#__PURE__*/React.createElement(SkSpinner, {
    size: s.icon === 24 ? 20 : 16
  }) : icon, !loading && children, !loading && postfix);
}
Object.assign(__ds_scope, { SkSpinner, Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const SkCheckGlyph = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 14 14",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.5 7.5 5.5 10.5 11.5 4",
  stroke: "white",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
function Checkbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  const boxBg = disabled ? isOn ? "var(--bg-bg-state-bg-switch-checked-disabled)" : "var(--sk-surface-disabled)" : isOn || indeterminate ? "var(--sk-accent)" : "var(--sk-surface-page)";
  return /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "checkbox",
    "aria-checked": indeterminate ? "mixed" : !!isOn,
    style: {
      display: "inline-flex",
      gap: 12,
      alignItems: "flex-start",
      cursor: disabled ? "default" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: 6,
      background: boxBg,
      boxShadow: isOn || indeterminate ? "none" : "inset 0 0 0 1.5px var(--graphite-graphite-80)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--sk-duration) var(--sk-ease)",
      marginTop: 0
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 2,
      borderRadius: 1,
      background: "white"
    }
  }) : isOn && /*#__PURE__*/React.createElement(SkCheckGlyph, null)), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePicker.jsx
try { (() => {
const SK_MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const SK_WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
function startOfMonth(y, m) {
  return new Date(y, m, 1);
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** 320px month calendar (Skillgrid calendar-drop): month/year header with nav, пн–вс grid, weekends red, today ring, selected = accent circle. */
function Calendar({
  value,
  defaultValue,
  onChange,
  style
}) {
  const today = new Date();
  const initial = value || defaultValue || today;
  const [selected, setSelected] = React.useState(value || defaultValue || null);
  const [view, setView] = React.useState({
    y: initial.getFullYear(),
    m: initial.getMonth()
  });
  const cur = value !== undefined ? value : selected;
  const first = startOfMonth(view.y, view.m);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) {
    const d = new Date(view.y, view.m, i - lead + 1);
    cells.push({
      date: d,
      outside: true
    });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({
    date: new Date(view.y, view.m, d),
    outside: false
  });
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      outside: true
    });
  }
  const nav = delta => {
    let m = view.m + delta,
      y = view.y;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setView({
      y,
      m
    });
  };
  const pick = d => {
    if (value === undefined) setSelected(d);
    onChange && onChange(d);
  };
  const NavBtn = ({
    dir
  }) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => nav(dir === "l" ? -1 : 1),
    style: {
      width: 32,
      height: 32,
      border: "none",
      background: "transparent",
      borderRadius: 8,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "var(--sk-icon-secondary)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--graphite-graphite-97)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === "l" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      background: "var(--sk-surface-page)",
      borderRadius: "var(--sk-radius-4)",
      boxShadow: "var(--sk-shadow-m)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--sk-subtitle-1)",
      color: "var(--sk-text-primary)"
    }
  }, SK_MONTHS[view.m], " ", view.y), /*#__PURE__*/React.createElement(NavBtn, {
    dir: "l"
  }), /*#__PURE__*/React.createElement(NavBtn, {
    dir: "r"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sk-stroke-divider)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      marginBottom: 4
    }
  }, SK_WEEKDAYS.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: w,
    style: {
      textAlign: "center",
      padding: "8px 0",
      font: "var(--sk-label-4)",
      color: i >= 5 ? "var(--sk-text-tertiary)" : "var(--sk-text-secondary)"
    }
  }, w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 2
    }
  }, cells.map((c, i) => {
    const weekend = i % 7 >= 5;
    const isSel = sameDay(c.date, cur);
    const isToday = sameDay(c.date, today);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => pick(c.date),
      style: {
        height: 40,
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        background: isSel ? "var(--sk-accent)" : "transparent",
        color: isSel ? "var(--sk-text-contrast)" : c.outside ? "var(--sk-text-tertiary)" : weekend ? "var(--sk-text-negative)" : "var(--sk-text-primary)",
        font: "var(--sk-label-2-regular)",
        boxShadow: isToday && !isSel ? "inset 0 0 0 1px var(--sk-stroke-accent)" : "none",
        transition: "background var(--sk-duration) var(--sk-ease)"
      },
      onMouseEnter: e => {
        if (!isSel) e.currentTarget.style.background = "var(--graphite-graphite-97)";
      },
      onMouseLeave: e => {
        if (!isSel) e.currentTarget.style.background = "transparent";
      }
    }, c.date.getDate());
  }))));
}

/** Date input field that opens a Calendar popover. */
function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  required,
  helper,
  error,
  placeholder = "дд.мм.гггг",
  size = "m",
  disabled = false,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue || null);
  const ref = React.useRef(null);
  const cur = value !== undefined ? value : internal;
  const h = size === "l" ? 48 : 40;
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const fmt = d => d ? `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}` : "";
  const stroke = error ? "var(--sk-stroke-negative)" : open ? "var(--sk-stroke-accent)" : "var(--sk-stroke)";
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)",
      color: "var(--sk-text-primary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-negative)"
    }
  }, " *")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => !disabled && setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: h,
      padding: "0 12px",
      width: "100%",
      borderRadius: "var(--sk-radius-form)",
      border: "none",
      background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
      boxShadow: `inset 0 0 0 ${open && !error ? 2 : 1}px ${stroke}`,
      font: "400 14px/20px var(--sk-font-ui)",
      letterSpacing: "0.005em",
      color: cur ? "var(--sk-text-primary)" : "var(--sk-text-placeholder)",
      textAlign: "left",
      cursor: disabled ? "default" : "pointer",
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, cur ? fmt(cur) : placeholder), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      color: "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "3.5",
    width: "11",
    height: "10",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "1.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.5h11M5.5 2v2.5M10.5 2v2.5",
    stroke: "currentColor",
    strokeWidth: "1.3",
    strokeLinecap: "round"
  }))), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em",
      color: error ? "var(--sk-text-negative)" : "var(--sk-text-secondary)"
    }
  }, error || helper), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Calendar, {
    value: cur,
    onChange: d => {
      if (value === undefined) setInternal(d);
      onChange && onChange(d);
      setOpen(false);
    }
  })));
}
Object.assign(__ds_scope, { Calendar, DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormHelper.jsx
try { (() => {
/** Standalone helper / error text under a field. */
function FormHelper({
  children,
  state = "default",
  style
}) {
  const color = state === "error" ? "var(--sk-text-negative)" : state === "disabled" ? "var(--sk-text-disabled)" : "var(--sk-text-secondary)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em",
      color,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FormHelper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormHelper.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormLabel.jsx
try { (() => {
/** Standalone form label (use Input/Select/etc. built-in labels first; this is for custom layouts). */
function FormLabel({
  children,
  required = false,
  optional = false,
  htmlFor,
  size = "m",
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      font: size === "l" ? "var(--sk-label-2)" : "var(--sk-label-3)",
      color: "var(--sk-text-primary)",
      ...style
    }
  }, children, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-negative)"
    }
  }, "*"), optional && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-tertiary)",
      font: "var(--sk-label-4-regular)"
    }
  }, "\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"));
}
Object.assign(__ds_scope, { FormLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormLabel.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Icon-only square button matching Button sizes. */
function IconButton({
  children,
  // icon node
  variant = "gray",
  // neutral | accent | gray | positive | negative
  mode = "tertiary",
  // primary | secondary | tertiary
  size = "m",
  // l | m | s | xs
  disabled = false,
  title,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dims = {
    l: 48,
    m: 40,
    s: 32,
    xs: 24
  };
  const colors = {
    neutral: {
      fg: "var(--sk-text-primary)",
      fill: "var(--graphite-graphite-97)"
    },
    accent: {
      fg: "var(--sk-icon-accent)",
      fill: "var(--sk-accent-secondary)"
    },
    gray: {
      fg: "var(--sk-icon-secondary)",
      fill: "var(--graphite-graphite-97)"
    },
    positive: {
      fg: "var(--sk-icon-positive)",
      fill: "var(--sk-positive-secondary)"
    },
    negative: {
      fg: "var(--sk-icon-negative)",
      fill: "var(--sk-negative-secondary)"
    }
  };
  const c = colors[variant] || colors.gray;
  const d = dims[size] || 40;
  const bg = disabled ? "transparent" : mode === "primary" ? c.fill : hover ? c.fill : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: title,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    disabled: disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: d,
      height: d,
      border: "none",
      borderRadius: d <= 24 ? 8 : 12,
      background: bg,
      color: disabled ? "var(--graphite-graphite-85)" : c.fg,
      cursor: disabled ? "default" : "pointer",
      transition: "background var(--sk-duration) var(--sk-ease)",
      padding: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with label, helper, sizes m=48 / s=40, error & disabled states.
    Visuals: white bg, inset 1px #DCE3EB border, radius 12, focus = accent stroke. */
function Input({
  label,
  required = false,
  helper,
  error,
  // string — replaces helper, paints negative
  size = "m",
  // m | s
  icon = null,
  // leading 24px icon node
  postfix = null,
  // trailing node
  disabled = false,
  value,
  defaultValue,
  placeholder,
  onChange,
  type = "text",
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "s" ? 40 : 48;
  const stroke = error ? "var(--sk-stroke-negative)" : focus ? "var(--sk-stroke-accent)" : "var(--sk-stroke)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      font: "var(--sk-label-3)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-primary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-negative)"
    }
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: h,
      padding: "0 12px",
      borderRadius: "var(--sk-radius-form)",
      background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
      boxShadow: `inset 0 0 0 ${focus && !error ? 2 : 1}px ${stroke}`,
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "400 16px/22px var(--sk-font-ui)",
      color: disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)",
      padding: 0,
      ...inputStyle
    }
  }, rest)), postfix && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, postfix)), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em",
      color: error ? "var(--sk-text-negative)" : "var(--sk-text-secondary)"
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/PinInput.jsx
try { (() => {
/** Separate-cell code input. length cells, sizes l=48 / xl=56, states default/focused/invalid/disabled. */
function PinInput({
  length = 4,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  size = "xl",
  // l=48 | xl=56
  invalid = false,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const code = value !== undefined ? value : internal;
  const refs = React.useRef([]);
  const dim = size === "l" ? {
    w: 40,
    h: 48,
    font: 24
  } : {
    w: 48,
    h: 56,
    font: 28
  };
  const set = next => {
    if (value === undefined) setInternal(next);
    onChange && onChange(next);
    if (next.length === length && onComplete) onComplete(next);
  };
  const onCellChange = (i, ch) => {
    const digit = ch.replace(/\D/g, "").slice(-1);
    const arr = code.split("");
    arr[i] = digit;
    const next = arr.join("").slice(0, length);
    set(next);
    if (digit && i < length - 1) refs.current[i + 1] && refs.current[i + 1].focus();
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1] && refs.current[i - 1].focus();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 8,
      ...style
    }
  }, Array.from({
    length
  }).map((_, i) => {
    const filled = !!code[i];
    return /*#__PURE__*/React.createElement("input", {
      key: i,
      ref: el => refs.current[i] = el,
      value: code[i] || "",
      disabled: disabled,
      inputMode: "numeric",
      maxLength: 1,
      onChange: e => onCellChange(i, e.target.value),
      onKeyDown: e => onKey(i, e),
      style: {
        width: dim.w,
        height: dim.h,
        textAlign: "center",
        border: "none",
        outline: "none",
        borderRadius: "var(--sk-radius-form)",
        background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
        boxShadow: `inset 0 0 0 ${invalid ? 1 : 1}px ${invalid ? "var(--sk-stroke-negative)" : "var(--sk-stroke)"}`,
        font: `500 ${dim.font}px/1 var(--sk-font-ui)`,
        color: invalid ? "var(--sk-text-negative)" : "var(--sk-text-primary)",
        caretColor: "var(--sk-accent)",
        transition: "box-shadow var(--sk-duration) var(--sk-ease)"
      },
      onFocus: e => {
        if (!invalid && !disabled) e.target.style.boxShadow = "inset 0 0 0 2px var(--sk-stroke-accent)";
      },
      onBlur: e => {
        e.target.style.boxShadow = `inset 0 0 0 1px ${invalid ? "var(--sk-stroke-negative)" : "var(--sk-stroke)"}`;
      }
    });
  }));
}
Object.assign(__ds_scope, { PinInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PinInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  disabled = false,
  name,
  style
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const select = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(true);
    onChange && onChange(true);
  };
  return /*#__PURE__*/React.createElement("span", {
    onClick: select,
    role: "radio",
    "aria-checked": !!isOn,
    "data-name": name,
    style: {
      display: "inline-flex",
      gap: 12,
      alignItems: "flex-start",
      cursor: disabled ? "default" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: "50%",
      background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
      boxShadow: isOn ? `inset 0 0 0 6px ${disabled ? "var(--bg-bg-state-bg-switch-checked-disabled)" : "var(--sk-accent)"}` : "inset 0 0 0 1.5px var(--graphite-graphite-80)",
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const SkChevron = ({
  open
}) => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  style: {
    transition: "transform var(--sk-duration) var(--sk-ease)",
    transform: open ? "rotate(180deg)" : "none",
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 6l4 4 4-4",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const SkTick = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  style: {
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 8.5 6.5 12l6.5-7.5",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/** Single/multi select with a popover menu. options: [{ value, label, icon?, description?, disabled? }] */
function Select({
  options = [],
  value,
  defaultValue,
  onChange,
  multiple = false,
  placeholder = "Выберите",
  label,
  required = false,
  helper,
  error,
  size = "m",
  // m=40 | l=48
  disabled = false,
  searchable = false,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue ?? (multiple ? [] : null));
  const [query, setQuery] = React.useState("");
  const ref = React.useRef(null);
  const current = value !== undefined ? value : internal;
  const h = size === "l" ? 48 : 40;
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  const pick = opt => {
    if (opt.disabled) return;
    let next;
    if (multiple) {
      const set = new Set(current || []);
      set.has(opt.value) ? set.delete(opt.value) : set.add(opt.value);
      next = [...set];
    } else {
      next = opt.value;
      setOpen(false);
    }
    if (value === undefined) setInternal(next);
    onChange && onChange(next);
  };
  const isSelected = opt => multiple ? (current || []).includes(opt.value) : current === opt.value;
  const selectedOpts = options.filter(isSelected);
  const displayText = multiple ? selectedOpts.length ? `Выбрано: ${selectedOpts.length}` : "" : selectedOpts[0] ? selectedOpts[0].label : "";
  const stroke = error ? "var(--sk-stroke-negative)" : open ? "var(--sk-stroke-accent)" : "var(--sk-stroke)";
  const filtered = searchable && query ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)",
      color: "var(--sk-text-primary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-negative)"
    }
  }, " *")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => !disabled && setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: h,
      padding: "0 12px",
      width: "100%",
      borderRadius: "var(--sk-radius-form)",
      border: "none",
      background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
      boxShadow: `inset 0 0 0 ${open && !error ? 2 : 1}px ${stroke}`,
      font: "400 14px/20px var(--sk-font-ui)",
      letterSpacing: "0.005em",
      color: displayText ? "var(--sk-text-primary)" : "var(--sk-text-placeholder)",
      cursor: disabled ? "default" : "pointer",
      textAlign: "left",
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, displayText || placeholder), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-icon-secondary)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(SkChevron, {
    open: open
  }))), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em",
      color: error ? "var(--sk-text-negative)" : "var(--sk-text-secondary)"
    }
  }, error || helper), open && /*#__PURE__*/React.createElement("div", {
    className: "sk-scroll",
    style: {
      position: "absolute",
      top: `calc(100% + 4px)`,
      left: 0,
      right: 0,
      zIndex: 50,
      maxHeight: 280,
      overflowY: "auto",
      background: "var(--sk-surface-page)",
      borderRadius: "var(--sk-radius-3)",
      boxShadow: "var(--sk-shadow-m)",
      padding: 8,
      marginTop: label || helper || error ? 0 : 0
    }
  }, searchable && /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "\u041F\u043E\u0438\u0441\u043A",
    style: {
      width: "100%",
      height: 36,
      border: "none",
      outline: "none",
      borderRadius: 8,
      padding: "0 10px",
      marginBottom: 4,
      background: "var(--graphite-graphite-97)",
      font: "400 14px/20px var(--sk-font-ui)"
    }
  }), filtered.map(opt => {
    const sel = isSelected(opt);
    return /*#__PURE__*/React.createElement(MenuOption, {
      key: opt.value,
      opt: opt,
      selected: sel,
      multiple: multiple,
      onClick: () => pick(opt),
      Tick: SkTick
    });
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px",
      font: "var(--sk-label-3-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E")));
}
function MenuOption({
  opt,
  selected,
  multiple,
  onClick,
  Tick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 40,
      padding: "10px 12px",
      borderRadius: "var(--sk-radius-3)",
      background: opt.disabled ? "transparent" : hover ? "var(--graphite-graphite-97)" : "transparent",
      color: opt.disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)",
      cursor: opt.disabled ? "default" : "pointer",
      transition: "background var(--sk-duration) var(--sk-ease)"
    }
  }, opt.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, opt.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)"
    }
  }, opt.label), opt.description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, opt.description)), selected && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-icon-accent)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Tick, null)));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  const bg = disabled ? isOn ? "var(--bg-bg-state-bg-switch-checked-disabled)" : "var(--bg-bg-state-bg-switch-unchecked-disabled)" : isOn ? "var(--sk-accent)" : "var(--graphite-graphite-90)";
  return /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "switch",
    "aria-checked": !!isOn,
    style: {
      display: "inline-flex",
      gap: 12,
      alignItems: "center",
      cursor: disabled ? "default" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 24,
      borderRadius: 12,
      background: bg,
      position: "relative",
      flexShrink: 0,
      transition: "background var(--sk-duration) var(--sk-ease)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: isOn ? 18 : 2,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "white",
      boxShadow: "0 1px 3px rgba(112,144,176,0.4)",
      transition: "left var(--sk-duration) var(--sk-ease)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
/** Multi-line text field. Same chrome as Input; resize vertical, min-height by size. */
function Textarea({
  label,
  required = false,
  helper,
  error,
  rows = 4,
  size = "m",
  // m | s
  disabled = false,
  value,
  defaultValue,
  placeholder,
  onChange,
  maxLength,
  showCount = false,
  resize = "vertical",
  // vertical | none
  style,
  textareaStyle
}) {
  const [focus, setFocus] = React.useState(false);
  const [internal, setInternal] = React.useState(defaultValue || "");
  const val = value !== undefined ? value : internal;
  const stroke = error ? "var(--sk-stroke-negative)" : focus ? "var(--sk-stroke-accent)" : "var(--sk-stroke)";
  const minH = size === "s" ? 80 : 112;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)",
      color: "var(--sk-text-primary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-negative)"
    }
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      borderRadius: "var(--sk-radius-form)",
      background: disabled ? "var(--sk-surface-disabled)" : "var(--sk-surface-page)",
      boxShadow: `inset 0 0 0 ${focus && !error ? 2 : 1}px ${stroke}`,
      padding: 12,
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    value: val,
    placeholder: placeholder,
    disabled: disabled,
    maxLength: maxLength,
    onChange: e => {
      if (value === undefined) setInternal(e.target.value);
      onChange && onChange(e);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      minHeight: minH,
      resize,
      border: "none",
      outline: "none",
      background: "transparent",
      font: "400 16px/22px var(--sk-font-ui)",
      color: disabled ? "var(--sk-text-disabled)" : "var(--sk-text-primary)",
      padding: 0,
      display: "block",
      ...textareaStyle
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--sk-label-4-regular)",
      letterSpacing: "0.01em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: error ? "var(--sk-text-negative)" : "var(--sk-text-secondary)"
    }
  }, error || helper || ""), showCount && maxLength && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-tertiary)"
    }
  }, val.length, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** Breadcrumb trail; last item is current (primary text). items: [{ label, onClick? }] */
function Breadcrumbs({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      font: "var(--sk-label-3-regular)",
      letterSpacing: "0.005em",
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      onClick: last ? undefined : it.onClick,
      style: {
        color: last ? "var(--sk-text-primary)" : "var(--sk-text-secondary)",
        cursor: last || !it.onClick ? "default" : "pointer"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      style: {
        color: "var(--sk-text-tertiary)",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 4l4 4-4 4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
/** App header: bg-secondary bar with white product-switcher pill (left) and bell + user (right). */
function Header({
  product = "Портал",
  onProductClick,
  userName = "",
  userAvatar,
  notifications = 0,
  onBellClick,
  onUserClick,
  height = 64,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      height,
      padding: "0 24px",
      background: "var(--sk-surface-secondary)",
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(ProductPill, {
    label: product,
    onClick: onProductClick
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    onClick: onBellClick,
    style: {
      position: "relative",
      display: "inline-flex",
      cursor: "pointer",
      color: "var(--sk-icon-secondary)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4a6 6 0 0 0-6 6v3.2l-1.4 2.4a.8.8 0 0 0 .7 1.2h13.4a.8.8 0 0 0 .7-1.2L18 13.2V10a6 6 0 0 0-6-6Z",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 19.5a2 2 0 0 0 4 0",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  })), notifications > 0 && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    dot: true,
    style: {
      position: "absolute",
      top: 1,
      right: 2
    }
  })), /*#__PURE__*/React.createElement("span", {
    onClick: onUserClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: userName,
    src: userAvatar,
    size: 40
  }), userName && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-2-regular)",
      color: "var(--sk-text-primary)"
    }
  }, userName), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      color: "var(--sk-icon-secondary)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.5 6.5 8 10l3.5-3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function ProductPill({
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 44,
      padding: "0 8px 0 20px",
      borderRadius: "var(--sk-radius-full)",
      background: "var(--sk-surface-page)",
      boxShadow: hover ? "var(--sk-shadow-s)" : "none",
      font: "var(--sk-label-2)",
      color: "var(--sk-text-primary)",
      cursor: "pointer",
      transition: "box-shadow var(--sk-duration) var(--sk-ease)"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--sk-surface-secondary)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--sk-icon-secondary)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 5.5 7 8.5l3-3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Menu.jsx
try { (() => {
/** Standalone popover menu / dropdown. items: [{ id, label, icon?, description?, hue?("negative"), disabled?, onClick }]
    Render it yourself in a positioned wrapper, or pass `anchor` content to get a self-managing trigger. */
function Menu({
  items = [],
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sk-scroll",
    style: {
      minWidth: 200,
      maxHeight: 320,
      overflowY: "auto",
      background: "var(--sk-surface-page)",
      borderRadius: "var(--sk-radius-3)",
      boxShadow: "var(--sk-shadow-m)",
      padding: 8,
      ...style
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: "d" + i,
    style: {
      height: 1,
      background: "var(--sk-stroke-divider)",
      margin: "8px 0"
    }
  }) : /*#__PURE__*/React.createElement(MenuItem, {
    key: it.id ?? i,
    item: it,
    onClick: () => {
      if (it.disabled) return;
      it.onClick && it.onClick();
      onSelect && onSelect(it);
    }
  })));
}
function MenuItem({
  item,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const neg = item.hue === "negative";
  const fg = item.disabled ? "var(--sk-text-disabled)" : neg ? "var(--sk-text-negative)" : "var(--sk-text-primary)";
  const hoverBg = neg ? "var(--sk-negative-secondary)" : "var(--graphite-graphite-97)";
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 40,
      padding: "10px 12px",
      borderRadius: "var(--sk-radius-3)",
      background: !item.disabled && hover ? hoverBg : "transparent",
      color: fg,
      cursor: item.disabled ? "default" : "pointer",
      transition: "background var(--sk-duration) var(--sk-ease)"
    }
  }, item.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: neg ? "var(--sk-icon-negative)" : "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)"
    }
  }, item.label), item.description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, item.description)), item.postfix);
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Menu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
/** Page number buttons, 32px, radius 8; selected = accent-secondary tint. */
function Pagination({
  page = 1,
  pages = 1,
  onChange,
  style
}) {
  const go = p => {
    if (p >= 1 && p <= pages && p !== page) onChange && onChange(p);
  };
  const nums = [];
  const window = 1;
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - page) <= window) nums.push(p);else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  const Btn = ({
    children,
    onClick,
    selected,
    disabled
  }) => /*#__PURE__*/React.createElement("span", {
    onClick: disabled ? undefined : onClick,
    style: {
      minWidth: 32,
      height: 32,
      padding: "0 6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      font: "var(--sk-label-3)",
      letterSpacing: "0.005em",
      background: selected ? "var(--sk-accent-secondary)" : "transparent",
      color: disabled ? "var(--sk-text-tertiary)" : selected ? "var(--sk-text-accent)" : "var(--sk-text-primary)",
      cursor: disabled || selected ? "default" : "pointer"
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: () => go(page - 1),
    disabled: page === 1
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 4 6 8l4 4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), nums.map((n, i) => n === "…" ? /*#__PURE__*/React.createElement("span", {
    key: "e" + i,
    style: {
      color: "var(--sk-text-tertiary)",
      padding: "0 4px"
    }
  }, "\u2026") : /*#__PURE__*/React.createElement(Btn, {
    key: n,
    selected: n === page,
    onClick: () => go(n)
  }, n)), /*#__PURE__*/React.createElement(Btn, {
    onClick: () => go(page + 1),
    disabled: page === pages
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 4l4 4-4 4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SegmentedControl.jsx
try { (() => {
/** Pill group on a gray track; selected segment is white with shadow S. */
function SegmentedControl({
  items = [],
  active,
  onChange,
  size = "m",
  style
}) {
  const [internal, setInternal] = React.useState(items[0] && items[0].id);
  const current = active !== undefined ? active : internal;
  const h = size === "s" ? 32 : 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 2,
      padding: 2,
      background: "var(--sk-surface-secondary)",
      borderRadius: "var(--sk-radius-3)",
      ...style
    }
  }, items.map(it => {
    const sel = it.id === current;
    return /*#__PURE__*/React.createElement("span", {
      key: it.id,
      onClick: () => {
        if (active === undefined) setInternal(it.id);
        onChange && onChange(it.id);
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: h - 4,
        padding: "0 16px",
        borderRadius: 10,
        background: sel ? "var(--sk-surface-page)" : "transparent",
        boxShadow: sel ? "var(--sk-shadow-s)" : "none",
        font: "var(--sk-label-3)",
        letterSpacing: "0.005em",
        color: sel ? "var(--sk-text-primary)" : "var(--sk-text-secondary)",
        cursor: "pointer",
        transition: "background var(--sk-duration) var(--sk-ease)",
        whiteSpace: "nowrap"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SkillazLogo.jsx
try { (() => {
const SK_LOGO_FULL = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="24" viewBox="0 0 120 24" fill="none">
  <path d="M 12.581 3.176 C 12.581 1.422 14.011 0 15.775 0 L 30.443 0 C 32.207 0 33.637 1.422 33.637 3.176 C 33.637 4.93 32.207 6.352 30.443 6.352 L 17.346 6.352 C 15.538 6.352 15.49 8.699 17.346 8.699 L 26.056 8.699 C 26.53 8.699 26.915 9.081 26.915 9.553 L 26.915 14.196 C 26.915 14.668 26.53 15.051 26.056 15.051 L 22.476 15.051 C 21.142 15.051 20.077 15.369 19.519 16.561 C 19.177 17.289 19.179 18.084 19.704 18.758 C 20.229 19.431 20.717 20.014 20.717 20.014 C 21.011 20.339 21.011 20.831 20.717 21.156 L 18.619 23.478 C 18.456 23.658 18.224 23.761 17.98 23.761 L 2.958 23.761 C 2.714 23.761 2.482 23.658 2.319 23.478 L 0.22 21.156 C -0.073 20.831 -0.073 20.339 0.22 20.014 L 2.319 17.692 C 2.482 17.512 2.714 17.409 2.958 17.409 L 16.156 17.409 C 17.798 17.409 17.798 15.051 16.156 15.051 L 7.427 15.051 C 6.953 15.051 6.568 14.668 6.568 14.196 L 6.568 9.553 C 6.568 9.081 6.953 8.699 7.427 8.699 L 11.636 8.699 C 12.779 8.699 13.512 8.132 13.875 7.48 C 14.502 6.352 13.494 5.537 13.16 5 C 12.826 4.464 12.581 3.855 12.581 3.176 Z" fill="currentColor"></path>
  <path transform="translate(106.908 8.370)" d="M 0.266 15.761 C 0.119 15.761 0 15.643 0 15.497 L 0 13.052 C 0 12.986 0.025 12.923 0.07 12.874 L 7.989 4.224 C 8.338 3.842 8.065 3.23 7.547 3.23 L 0.266 3.23 C 0.119 3.23 0 3.112 0 2.966 L 0 0.264 C 0 0.118 0.119 0 0.266 0 L 12.826 0 C 12.973 0 13.092 0.118 13.092 0.264 L 13.092 2.685 C 13.092 2.747 13.07 2.807 13.03 2.855 L 5.63 11.553 C 5.301 11.94 5.578 12.531 6.086 12.531 L 12.826 12.531 C 12.973 12.531 13.092 12.649 13.092 12.795 L 13.092 15.497 C 13.092 15.643 12.973 15.761 12.826 15.761 L 0.266 15.761 Z" fill="currentColor"></path>
  <path transform="translate(91.205 8.131)" d="M 5.598 16.209 C 4.855 16.209 4.153 16.11 3.491 15.91 C 2.829 15.711 2.237 15.422 1.716 15.043 C 1.194 14.644 0.772 14.156 0.451 13.578 C 0.15 12.979 0 12.282 0 11.484 C 0 10.467 0.201 9.64 0.602 9.002 C 1.003 8.344 1.545 7.845 2.227 7.506 C 2.929 7.168 3.722 6.938 4.605 6.819 C 5.488 6.679 5.964 6.609 7.373 6.609 C 8.144 6.609 9.04 6.688 9.693 6.76 C 10.176 6.813 10.6 6.438 10.501 5.965 C 10.41 5.528 10.272 5.108 10.142 4.815 C 9.921 4.297 9.57 3.888 9.089 3.589 C 8.627 3.29 8.025 3.14 7.283 3.14 C 6.801 3.14 6.35 3.2 5.929 3.32 C 5.528 3.419 5.177 3.589 4.876 3.828 C 4.643 4.01 4.464 4.24 4.343 4.518 C 4.296 4.622 4.197 4.695 4.083 4.695 L 0.826 4.695 C 0.662 4.695 0.536 4.548 0.572 4.388 C 0.726 3.702 0.987 3.106 1.354 2.602 C 1.796 2.004 2.327 1.515 2.949 1.136 C 3.591 0.758 4.293 0.478 5.056 0.299 C 5.819 0.1 6.591 0 7.373 0 C 9.681 0 11.356 0.658 12.399 1.974 C 13.463 3.29 13.994 5.134 13.994 7.506 L 13.994 15.736 C 13.994 15.882 13.875 16 13.729 16 L 10.999 16 C 10.857 16 10.74 15.889 10.733 15.748 L 10.691 14.798 C 10.679 14.533 10.315 14.424 10.132 14.617 C 9.792 14.974 9.414 15.255 8.999 15.462 C 8.357 15.781 7.735 15.98 7.133 16.06 C 6.531 16.159 6.019 16.209 5.598 16.209 Z M 6.32 13.249 C 7.123 13.249 7.835 13.099 8.457 12.8 C 9.079 12.501 9.57 12.082 9.931 11.544 C 10.313 11.006 10.504 10.388 10.504 9.69 L 10.504 9.094 C 10.504 9.094 9.018 9.173 8.21 9.173 C 7.402 9.173 6.651 9.201 6.17 9.241 C 5.708 9.261 5.287 9.341 4.906 9.48 C 4.525 9.6 4.214 9.789 3.973 10.049 C 3.752 10.308 3.641 10.677 3.641 11.155 C 3.641 11.634 3.762 12.022 4.003 12.321 C 4.264 12.62 4.594 12.85 4.996 13.009 C 5.417 13.169 5.859 13.249 6.32 13.249 Z" fill="currentColor"></path>
  <path transform="translate(85.825 2.987)" d="M 0.266 21.144 C 0.119 21.144 0 21.026 0 20.88 L 0 0.264 C 0 0.118 0.119 0 0.266 0 L 3.406 0 C 3.553 0 3.672 0.118 3.672 0.264 L 3.672 20.88 C 3.672 21.026 3.553 21.144 3.406 21.144 L 0.266 21.144 Z" fill="currentColor"></path>
  <path transform="translate(79.334 2.987)" d="M 0.266 21.144 C 0.119 21.144 0 21.026 0 20.88 L 0 0.264 C 0 0.118 0.119 0 0.266 0 L 3.406 0 C 3.553 0 3.672 0.118 3.672 0.264 L 3.672 20.88 C 3.672 21.026 3.553 21.144 3.406 21.144 L 0.266 21.144 Z" fill="currentColor"></path>
  <path transform="translate(72.236 2.000)" d="M 0.747 22.131 C 0.6 22.131 0.482 22.013 0.482 21.867 L 0.482 6.634 C 0.482 6.488 0.6 6.37 0.747 6.37 L 3.888 6.37 C 4.034 6.37 4.153 6.488 4.153 6.634 L 4.153 21.867 C 4.153 22.013 4.034 22.131 3.888 22.131 L 0.747 22.131 Z M 2.317 4.546 C 1.615 4.546 1.053 4.336 0.632 3.918 C 0.211 3.499 0 2.951 0 2.273 C 0 1.615 0.221 1.077 0.662 0.658 C 1.104 0.219 1.655 0 2.317 0 C 2.959 0 3.511 0.209 3.973 0.628 C 4.434 1.047 4.665 1.595 4.665 2.273 C 4.665 2.951 4.444 3.499 4.003 3.918 C 3.561 4.336 3 4.546 2.317 4.546 Z" fill="currentColor"></path>
  <path transform="translate(56.483 2.987)" d="M 0.266 21.144 C 0.119 21.144 0 21.026 0 20.88 L 0 0.264 C 0 0.118 0.119 0 0.266 0 L 3.406 0 C 3.553 0 3.672 0.118 3.672 0.264 L 3.672 10.506 C 3.672 11.089 4.147 11.561 4.734 11.561 L 5.033 11.561 C 5.455 11.561 5.849 11.352 6.084 11.004 L 9.798 5.5 C 9.847 5.427 9.93 5.383 10.018 5.383 L 13.763 5.383 C 13.976 5.383 14.103 5.621 13.983 5.796 L 9.321 12.595 C 9.199 12.773 9.198 13.007 9.319 13.186 L 14.41 20.733 C 14.528 20.908 14.401 21.144 14.189 21.144 L 10.291 21.144 C 10.202 21.144 10.118 21.099 10.069 21.024 L 6.083 14.956 C 5.849 14.6 5.45 14.386 5.023 14.386 L 4.734 14.386 C 4.147 14.386 3.672 14.859 3.672 15.442 L 3.672 20.88 C 3.672 21.026 3.553 21.144 3.406 21.144 L 0.266 21.144 Z" fill="currentColor"></path>
  <path transform="translate(37.890 2.718)" d="M 8.766 21.652 C 7.342 21.652 5.998 21.443 4.733 21.024 C 3.489 20.586 2.446 19.898 1.603 18.961 C 0.818 18.068 0.285 16.925 0.005 15.53 C -0.027 15.369 0.098 15.222 0.263 15.222 L 3.574 15.222 C 3.691 15.222 3.793 15.298 3.832 15.408 C 4.074 16.097 4.435 16.644 4.914 17.047 C 5.456 17.485 6.088 17.794 6.81 17.974 C 7.532 18.133 8.265 18.213 9.007 18.213 C 9.669 18.213 10.291 18.133 10.873 17.974 C 11.475 17.794 11.967 17.505 12.348 17.106 C 12.749 16.708 12.95 16.179 12.95 15.522 C 12.95 15.023 12.839 14.624 12.619 14.325 C 12.418 14.006 12.127 13.747 11.746 13.548 C 11.385 13.328 10.943 13.159 10.422 13.039 C 9.92 12.88 9.378 12.74 8.796 12.621 C 8.215 12.501 7.643 12.371 7.081 12.232 C 6.519 12.092 5.987 11.913 5.486 11.693 C 4.844 11.474 4.222 11.225 3.62 10.946 C 3.038 10.647 2.526 10.288 2.085 9.869 C 1.664 9.45 1.323 8.932 1.062 8.314 C 0.801 7.696 0.671 6.958 0.671 6.101 C 0.671 5.124 0.831 4.287 1.152 3.589 C 1.493 2.871 1.935 2.283 2.476 1.824 C 3.038 1.366 3.66 1.007 4.342 0.748 C 5.044 0.488 5.767 0.299 6.509 0.179 C 7.272 0.06 7.994 0 8.676 0 C 10 0 11.204 0.219 12.288 0.658 C 13.391 1.097 14.294 1.774 14.996 2.692 C 15.652 3.548 16.045 4.63 16.176 5.938 C 16.191 6.091 16.069 6.221 15.915 6.221 L 12.795 6.221 C 12.66 6.221 12.548 6.12 12.524 5.988 C 12.42 5.419 12.19 4.958 11.836 4.606 C 11.435 4.187 10.933 3.888 10.331 3.708 C 9.729 3.509 9.077 3.409 8.375 3.409 C 7.894 3.409 7.412 3.449 6.931 3.529 C 6.469 3.609 6.048 3.748 5.666 3.948 C 5.305 4.147 5.004 4.416 4.764 4.755 C 4.543 5.074 4.433 5.483 4.433 5.981 C 4.433 6.42 4.543 6.809 4.764 7.148 C 4.984 7.467 5.285 7.736 5.666 7.955 C 6.068 8.174 6.539 8.374 7.081 8.553 C 7.783 8.832 8.546 9.042 9.368 9.181 C 10.211 9.321 11.003 9.51 11.746 9.75 C 12.468 9.949 13.13 10.198 13.732 10.497 C 14.354 10.776 14.886 11.125 15.327 11.544 C 15.769 11.943 16.11 12.441 16.35 13.039 C 16.611 13.617 16.742 14.315 16.742 15.133 C 16.742 16.329 16.521 17.346 16.08 18.183 C 15.658 19.001 15.066 19.669 14.304 20.187 C 13.562 20.705 12.709 21.084 11.746 21.323 C 10.803 21.543 9.81 21.652 8.766 21.652 Z" fill="currentColor"></path>
</svg>`;
const SK_LOGO_MARK = `<svg xmlns="http://www.w3.org/2000/svg" width="33.637" height="23.761" viewBox="0 0 33.637 23.761" fill="none">
  <path d="M 12.581 3.176 C 12.581 1.422 14.011 0 15.775 0 L 30.443 0 C 32.207 0 33.637 1.422 33.637 3.176 C 33.637 4.93 32.207 6.352 30.443 6.352 L 17.346 6.352 C 15.538 6.352 15.49 8.699 17.346 8.699 L 26.056 8.699 C 26.53 8.699 26.915 9.081 26.915 9.553 L 26.915 14.196 C 26.915 14.668 26.53 15.051 26.056 15.051 L 22.476 15.051 C 21.142 15.051 20.077 15.369 19.519 16.561 C 19.177 17.289 19.179 18.084 19.704 18.758 C 20.229 19.431 20.717 20.014 20.717 20.014 C 21.011 20.339 21.011 20.831 20.717 21.156 L 18.619 23.478 C 18.456 23.658 18.224 23.761 17.98 23.761 L 2.958 23.761 C 2.714 23.761 2.482 23.658 2.319 23.478 L 0.22 21.156 C -0.073 20.831 -0.073 20.339 0.22 20.014 L 2.319 17.692 C 2.482 17.512 2.714 17.409 2.958 17.409 L 16.156 17.409 C 17.798 17.409 17.798 15.051 16.156 15.051 L 7.427 15.051 C 6.953 15.051 6.568 14.668 6.568 14.196 L 6.568 9.553 C 6.568 9.081 6.953 8.699 7.427 8.699 L 11.636 8.699 C 12.779 8.699 13.512 8.132 13.875 7.48 C 14.502 6.352 13.494 5.537 13.16 5 C 12.826 4.464 12.581 3.855 12.581 3.176 Z" fill="currentColor" fill-rule="nonzero"></path>
</svg>`;

/** Skillaz logo (real vector). variant "full" = mark + wordmark (120x24), "mark" = S-mark only. Colors via currentColor; brand ink #0C0B23. */
function SkillazLogo({
  variant = "full",
  height = 24,
  color = "rgb(12,11,35)",
  style
}) {
  const src = variant === "mark" ? SK_LOGO_MARK : SK_LOGO_FULL;
  const w = variant === "mark" ? height / 23.761 * 33.637 : height / 24 * 120;
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "Skillaz",
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: w,
      height,
      color,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: src.replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${height}"`)
    }
  });
}
Object.assign(__ds_scope, { SkillazLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SkillazLogo.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/** App sidebar: light gray, logo, menu search, nav items with dot badges, support at bottom.
    items: [{ id, label, icon?, dot?, chevron? }] */
function Sidebar({
  items = [],
  active,
  onChange,
  collapsed = false,
  logo,
  // custom logo node
  showSearch = true,
  searchPlaceholder = "Поиск по меню",
  bottomItems = [{
    id: "support",
    label: "Поддержка"
  }],
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: collapsed ? "var(--sk-sidebar-width-collapsed)" : "var(--sk-sidebar-width)",
      minHeight: "100%",
      background: "var(--sk-surface-secondary)",
      display: "flex",
      flexDirection: "column",
      padding: collapsed ? "16px 12px" : "16px",
      gap: 12,
      flexShrink: 0,
      transition: "width 200ms var(--sk-ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: 40,
      padding: collapsed ? 0 : "0 8px",
      justifyContent: collapsed ? "center" : "flex-start"
    }
  }, logo || /*#__PURE__*/React.createElement(__ds_scope.SkillazLogo, {
    variant: collapsed ? "mark" : "full",
    height: 24
  })), showSearch && !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 40,
      padding: "0 12px",
      borderRadius: "var(--sk-radius-3)",
      background: "var(--sk-surface-page)",
      boxShadow: "inset 0 0 0 1px var(--sk-stroke)",
      color: "var(--sk-text-placeholder)",
      font: "var(--sk-label-3-regular)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      color: "var(--sk-icon-secondary)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "4.5",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 10.5 14 14",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), searchPlaceholder), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1
    }
  }, items.map(it => /*#__PURE__*/React.createElement(SidebarItem, {
    key: it.id,
    item: it,
    collapsed: collapsed,
    selected: it.id === active,
    onClick: () => onChange && onChange(it.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--sk-stroke)",
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, bottomItems.map(it => /*#__PURE__*/React.createElement(SidebarItem, {
    key: it.id,
    item: it,
    collapsed: collapsed,
    selected: it.id === active,
    onClick: () => onChange && onChange(it.id)
  }))));
}
const SkNavGlyph = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none"
}, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "14",
  height: "14",
  rx: "4",
  stroke: "currentColor",
  strokeWidth: "1.5"
}));
function SidebarItem({
  item,
  selected,
  collapsed,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    title: collapsed ? item.label : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: 40,
      padding: collapsed ? 0 : "0 12px",
      justifyContent: collapsed ? "center" : "flex-start",
      borderRadius: "var(--sk-radius-3)",
      background: selected || hover ? "var(--sk-hover-nav)" : "transparent",
      color: "var(--sk-text-primary)",
      font: selected ? "var(--sk-label-3)" : "var(--sk-label-3-regular)",
      letterSpacing: "0.005em",
      cursor: "pointer",
      transition: "background var(--sk-duration) var(--sk-ease)",
      position: "relative",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--sk-icon-secondary)",
      flexShrink: 0,
      position: "relative"
    }
  }, item.icon || /*#__PURE__*/React.createElement(SkNavGlyph, null), collapsed && item.dot && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    dot: true,
    style: {
      position: "absolute",
      top: -2,
      right: -2
    }
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, item.label), !collapsed && item.dot && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    dot: true
  }), !collapsed && item.chevron && /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      color: "var(--sk-icon-secondary)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 6.5 8 9.5l3-3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Underline tabs. items: [{ id, label, count? }] */
function Tabs({
  items = [],
  active,
  onChange,
  style
}) {
  const [internal, setInternal] = React.useState(items[0] && items[0].id);
  const current = active !== undefined ? active : internal;
  const pick = id => {
    if (active === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      borderBottom: "1px solid var(--sk-stroke)",
      ...style
    }
  }, items.map(it => {
    const sel = it.id === current;
    return /*#__PURE__*/React.createElement(TabItem, {
      key: it.id,
      selected: sel,
      onClick: () => pick(it.id),
      label: it.label,
      count: it.count
    });
  }));
}
function TabItem({
  selected,
  onClick,
  label,
  count
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 0 12px",
      marginBottom: -1,
      font: "var(--sk-label-2)",
      color: selected ? "var(--sk-text-primary)" : hover ? "var(--text-text-state-secondary-hovered)" : "var(--sk-text-secondary)",
      boxShadow: selected ? "inset 0 -2px 0 var(--sk-accent)" : "none",
      cursor: "pointer",
      transition: "color var(--sk-duration) var(--sk-ease)",
      whiteSpace: "nowrap"
    }
  }, label, count !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3-regular)",
      color: "var(--sk-text-tertiary)"
    }
  }, count));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Modal.jsx
try { (() => {
const SkCloseGlyph = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 6l12 12M18 6 6 18",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));

/** Shared overlay scrim. */
function SkOverlay({
  onClick,
  children,
  align = "flex-start",
  justify = "center",
  padding = "64px 24px"
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClick) onClick();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "var(--sk-surface-overlay, rgba(13,17,21,0.48))",
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      padding
    }
  }, children);
}

/** Header used by Modal (58px) and Drawer (52px). */
function SkOverlayHeader({
  title,
  onClose,
  actions,
  dense = false,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      background: "var(--sk-surface-page)",
      borderRadius: "inherit",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: dense ? "12px 16px 12px 24px" : "16px 16px 16px 24px",
      minHeight: dense ? 52 : 58,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--sk-title-5)",
      color: "var(--sk-text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), actions, onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    size: "s",
    onClick: onClose,
    title: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
  }, /*#__PURE__*/React.createElement(SkCloseGlyph, null))), options && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 12px"
    }
  }, options), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sk-stroke-divider)"
    }
  }));
}

/** Footer action bar: 72px, divider on top, secondary action left, primary stack right. */
function SkActionBar({
  primary,
  secondary,
  left
}) {
  if (!primary && !secondary && !left) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 24px",
      minHeight: 72,
      boxSizing: "border-box",
      borderTop: "1px solid var(--sk-stroke-divider)",
      background: "var(--sk-surface-page)",
      borderRadius: "inherit",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  }, left, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), secondary, primary);
}

/** Modal dialog: white, radius 24, top-center; sizes s=480 m=620 l=800.
    Renders nothing when `open` is false. */
function Modal({
  open = false,
  onClose,
  title,
  size = "s",
  // s | m | l
  children,
  primary,
  // primary action node (Button)
  secondary,
  // secondary action node
  headerActions,
  // extra nodes left of the close button
  options,
  // sticky header options row (search, tabs)
  maxHeight = "calc(100vh - 128px)",
  style
}) {
  if (!open) return null;
  const widths = {
    s: 480,
    m: 620,
    l: 800
  };
  return /*#__PURE__*/React.createElement(SkOverlay, {
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: widths[size] || widths.s,
      maxWidth: "100%",
      maxHeight,
      background: "var(--sk-surface-page)",
      borderRadius: "var(--sk-radius-5)",
      boxShadow: "var(--sk-shadow-l)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement(SkOverlayHeader, {
    title: title,
    onClose: onClose,
    actions: headerActions,
    options: options
  }), /*#__PURE__*/React.createElement("div", {
    className: "sk-scroll",
    style: {
      padding: 24,
      overflowY: "auto",
      flex: "1 1 auto",
      font: "var(--sk-paragraph-3)",
      color: "var(--sk-text-primary)"
    }
  }, children), /*#__PURE__*/React.createElement(SkActionBar, {
    primary: primary,
    secondary: secondary
  })));
}
Object.assign(__ds_scope, { SkCloseGlyph, SkOverlay, SkOverlayHeader, SkActionBar, Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Drawer.jsx
try { (() => {
/** Side drawer: floats with a 12px inset, radius 16, full height, position right.
    Sizes s=480 m=620 l=800. Renders nothing when `open` is false. */
function Drawer({
  open = false,
  onClose,
  title,
  size = "s",
  // s | m | l
  children,
  primary,
  secondary,
  headerActions,
  style
}) {
  if (!open) return null;
  const widths = {
    s: 480,
    m: 620,
    l: 800
  };
  return /*#__PURE__*/React.createElement(__ds_scope.SkOverlay, {
    onClick: onClose,
    align: "stretch",
    justify: "flex-end",
    padding: "12px"
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: widths[size] || widths.s,
      maxWidth: "100%",
      background: "var(--sk-surface-page)",
      borderRadius: "var(--sk-radius-4)",
      boxShadow: "var(--sk-shadow-l)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SkOverlayHeader, {
    dense: true,
    title: title,
    onClose: onClose,
    actions: headerActions
  }), /*#__PURE__*/React.createElement("div", {
    className: "sk-scroll",
    style: {
      padding: 24,
      overflowY: "auto",
      flex: "1 1 auto",
      font: "var(--sk-paragraph-3)",
      color: "var(--sk-text-primary)"
    }
  }, children), /*#__PURE__*/React.createElement(__ds_scope.SkActionBar, {
    primary: primary,
    secondary: secondary
  })));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Drawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens.jsx
try { (() => {
/* Skillaz Portal UI kit — screens. Loaded as text/babel; reads components from the DS bundle. */
const DS = window.SkillazCoreDesignSystem_bf9566;
const {
  Button,
  IconButton,
  Input,
  Checkbox,
  Switch,
  Select,
  DatePicker,
  Card,
  Avatar,
  Tag,
  Badge,
  Table,
  ProgressBar,
  ProgressCircle,
  Divider,
  Timeline,
  Alert,
  Snackbar,
  Tooltip,
  Modal,
  Drawer,
  Menu,
  Tabs,
  SegmentedControl,
  Breadcrumbs,
  Pagination,
  Sidebar,
  Header
} = DS;

/* ---------- data ---------- */
const EMPLOYEES = [{
  id: 1,
  name: "Виктория Миронова",
  role: "HR-директор",
  dept: "HR",
  status: "Активен",
  hue: "positive",
  progress: 82
}, {
  id: 2,
  name: "Игорь Петров",
  role: "Разработчик",
  dept: "Разработка",
  status: "Активен",
  hue: "positive",
  progress: 41
}, {
  id: 3,
  name: "Анна Ковалёва",
  role: "Аналитик",
  dept: "Продукт",
  status: "На проверке",
  hue: "warning",
  progress: 64
}, {
  id: 4,
  name: "Дмитрий Лебедев",
  role: "Дизайнер",
  dept: "Продукт",
  status: "Активен",
  hue: "positive",
  progress: 95
}, {
  id: 5,
  name: "Елена Соколова",
  role: "Рекрутер",
  dept: "HR",
  status: "Отпуск",
  hue: "neutral",
  progress: 12
}, {
  id: 6,
  name: "Николай Титов",
  role: "Тимлид",
  dept: "Разработка",
  status: "Активен",
  hue: "positive",
  progress: 57
}, {
  id: 7,
  name: "Ольга Романова",
  role: "Методолог",
  dept: "Обучение",
  status: "Просрочено",
  hue: "negative",
  progress: 8
}];
const REQUESTS = [{
  id: "SKZ-04122",
  who: "Игорь Петров",
  what: "Курс «Архитектура микросервисов»",
  when: "12 июн 2026",
  status: "Новая",
  hue: "accent"
}, {
  id: "SKZ-04118",
  who: "Анна Ковалёва",
  what: "Конференция ProductSense",
  when: "10 июн 2026",
  status: "Новая",
  hue: "accent"
}, {
  id: "SKZ-04097",
  who: "Ольга Романова",
  what: "Сертификация CIPD",
  when: "2 июн 2026",
  status: "Согласована",
  hue: "positive"
}];
const COURSES = [{
  id: 1,
  name: "Адаптация новичка",
  lessons: 12,
  done: 12,
  hue: "positive"
}, {
  id: 2,
  name: "Основы информационной безопасности",
  lessons: 8,
  done: 5,
  hue: "accent"
}, {
  id: 3,
  name: "Управление командой",
  lessons: 16,
  done: 3,
  hue: "accent"
}];
const SearchGlyph = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "6",
  stroke: "currentColor",
  strokeWidth: "1.6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15.5 15.5 20 20",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round"
}));
const DotsGlyph = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "5",
  cy: "12",
  r: "1.7",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1.7",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "19",
  cy: "12",
  r: "1.7",
  fill: "currentColor"
}));

/* ---------- screens ---------- */
function RowMenu({
  onAction
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(IconButton, {
    size: "s",
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement(DotsGlyph, null)), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      right: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(Menu, {
    items: [{
      id: "open",
      label: "Открыть профиль"
    }, {
      id: "course",
      label: "Назначить курс"
    }, {
      divider: true
    }, {
      id: "archive",
      label: "Архивировать",
      hue: "negative"
    }],
    onSelect: it => {
      setOpen(false);
      onAction && onAction(it.id);
    }
  })));
}
function TeamScreen({
  onOpen,
  notify
}) {
  const [tab, setTab] = React.useState("all");
  const [view, setView] = React.useState("list");
  const [page, setPage] = React.useState(1);
  const [q, setQ] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const rows = EMPLOYEES.filter(e => (tab === "all" || tab === "active" && e.status === "Активен" || tab === "attention" && (e.hue === "warning" || e.hue === "negative")) && (q === "" || e.name.toLowerCase().includes(q.toLowerCase())));
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "\u041C\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sk-title-3",
    style: {
      margin: 0,
      flex: 1
    }
  }, "\u041C\u043E\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => setAdding(true)
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "s",
    placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430\u043C",
    icon: /*#__PURE__*/React.createElement(SearchGlyph, null),
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      width: 320
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "s",
    active: view,
    onChange: setView,
    items: [{
      id: "list",
      label: "Список"
    }, {
      id: "grid",
      label: "Сетка"
    }]
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "gray",
    mode: "secondary",
    size: "s"
  }, "\u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /*#__PURE__*/React.createElement(Button, {
    variant: "gray",
    mode: "tertiary",
    size: "s"
  }, "\u042D\u043A\u0441\u043F\u043E\u0440\u0442")), /*#__PURE__*/React.createElement(Tabs, {
    active: tab,
    onChange: setTab,
    items: [{
      id: "all",
      label: "Все",
      count: EMPLOYEES.length
    }, {
      id: "active",
      label: "Активные",
      count: EMPLOYEES.filter(e => e.status === "Активен").length
    }, {
      id: "attention",
      label: "Требуют внимания",
      count: 2
    }]
  }), view === "list" ? /*#__PURE__*/React.createElement(Table, {
    density: "medium",
    onRowClick: onOpen,
    columns: [{
      key: "name",
      title: "Сотрудник",
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          gap: 12,
          alignItems: "center",
          font: "var(--sk-label-3)"
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: r.name,
        size: 36
      }), /*#__PURE__*/React.createElement("span", null, r.name, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--sk-label-4-regular)",
          color: "var(--sk-text-secondary)"
        }
      }, r.role)))
    }, {
      key: "dept",
      title: "Отдел"
    }, {
      key: "status",
      title: "Статус",
      render: r => /*#__PURE__*/React.createElement(Tag, {
        hue: r.hue
      }, r.status)
    }, {
      key: "progress",
      title: "Обучение",
      width: 180,
      render: r => /*#__PURE__*/React.createElement(ProgressBar, {
        value: r.progress,
        hue: r.progress < 20 ? "negative" : "accent"
      })
    }, {
      key: "actions",
      title: "",
      width: 48,
      align: "right",
      render: () => /*#__PURE__*/React.createElement(RowMenu, {
        onAction: id => notify(id === "archive" ? "Сотрудник архивирован" : id === "course" ? "Курс назначен" : "")
      })
    }],
    rows: rows
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, rows.map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.id,
    bordered: true,
    padding: 16,
    style: {
      cursor: "pointer"
    },
    onClick: () => onOpen(r)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.name,
    size: 48
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-label-3)"
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, r.role))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    hue: r.hue
  }, r.status), /*#__PURE__*/React.createElement(ProgressBar, {
    value: r.progress,
    style: {
      width: 90
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pages: 4,
    onChange: setPage
  })), /*#__PURE__*/React.createElement(Modal, {
    open: adding,
    onClose: () => setAdding(false),
    title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
    size: "m",
    secondary: /*#__PURE__*/React.createElement(Button, {
      variant: "gray",
      mode: "secondary",
      onClick: () => setAdding(false)
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
    primary: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: () => {
        setAdding(false);
        notify("Сотрудник добавлен");
      }
    }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F",
    required: true,
    placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0410\u043D\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0451\u0432\u0430"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430",
    required: true,
    placeholder: "name@skillaz.ru",
    helper: "\u041D\u0430 \u043D\u0435\u0451 \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u0432 \u041F\u043E\u0440\u0442\u0430\u043B"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
    placeholder: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\u041E\u0442\u0434\u0435\u043B",
    placeholder: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442",
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true,
    label: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u0440\u0441\u044B \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438"
  }))));
}
function ProfileScreen({
  person,
  onBack,
  notify
}) {
  const p = person || EMPLOYEES[0];
  const [assigning, setAssigning] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: "Моя команда",
      onClick: onBack
    }, {
      label: p.name
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 64
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sk-title-4",
    style: {
      margin: 0
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    hue: p.hue
  }, p.status), /*#__PURE__*/React.createElement(Tag, null, p.dept), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, p.role))), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    mode: "secondary"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C"), /*#__PURE__*/React.createElement(Button, {
    variant: "gray",
    mode: "secondary",
    onClick: () => setAssigning(true)
  }, "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043A\u0443\u0440\u0441")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    bordered: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sk-subtitle-1",
    style: {
      marginBottom: 16
    }
  }, "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "140px 1fr",
      gap: "10px 16px",
      font: "var(--sk-label-3-regular)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-secondary)"
    }
  }, "\u0422\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440"), /*#__PURE__*/React.createElement("span", {
    className: "sk-mono",
    style: {
      fontSize: 13
    }
  }, "SKZ-0", p.id, "87"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-secondary)"
    }
  }, "\u041F\u043E\u0447\u0442\u0430"), /*#__PURE__*/React.createElement("span", null, p.name.split(" ")[0].toLowerCase(), "@skillaz.ru"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-secondary)"
    }
  }, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"), /*#__PURE__*/React.createElement("span", null, "\u041D\u0438\u043A\u043E\u043B\u0430\u0439 \u0422\u0438\u0442\u043E\u0432"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--sk-text-secondary)"
    }
  }, "\u0412 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0441"), /*#__PURE__*/React.createElement("span", null, "\u043C\u0430\u0440\u0442 2023"))), /*#__PURE__*/React.createElement(Card, {
    bordered: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sk-subtitle-1",
    style: {
      marginBottom: 16
    }
  }, "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(ProgressCircle, {
    value: p.progress,
    size: 84,
    hue: p.progress < 20 ? "negative" : p.progress >= 80 ? "positive" : "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: Math.min(100, p.progress + 18),
    hue: "positive",
    label: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u0440\u0441\u044B"
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    value: Math.max(0, p.progress - 30),
    hue: "warning",
    label: "\u0420\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u043A\u043E\u043C\u043F\u0435\u0442\u0435\u043D\u0446\u0438\u0439"
  }))))), /*#__PURE__*/React.createElement(Card, {
    bordered: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "sk-subtitle-1",
    style: {
      marginBottom: 16
    }
  }, "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439"), /*#__PURE__*/React.createElement(Timeline, {
    items: [{
      id: 1,
      title: "Назначен курс «Управление командой»",
      meta: "Виктория Миронова",
      time: "10 июн",
      hue: "accent"
    }, {
      id: 2,
      title: "Завершена оценка 360°",
      meta: "Система",
      time: "28 май",
      hue: "positive"
    }, {
      id: 3,
      title: "Обновлена должность",
      meta: "Виктория Миронова",
      time: "14 май"
    }]
  })), /*#__PURE__*/React.createElement(Drawer, {
    open: assigning,
    onClose: () => setAssigning(false),
    title: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043A\u0443\u0440\u0441",
    size: "s",
    secondary: /*#__PURE__*/React.createElement(Button, {
      variant: "gray",
      mode: "secondary",
      onClick: () => setAssigning(false)
    }, "\u041E\u0442\u043C\u0435\u043D\u0430"),
    primary: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: () => {
        setAssigning(false);
        notify("Курс назначен");
      }
    }, "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, COURSES.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: c.id
  }, i > 0 && /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: "10px 0",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: i === 1
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-3)",
      display: "block"
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, c.lessons, " \u0443\u0440\u043E\u043A\u043E\u0432")), /*#__PURE__*/React.createElement(Tag, {
    hue: "accent"
  }, Math.round(c.done / c.lessons * 100), "%")))))));
}
function RequestsScreen({
  notify
}) {
  const [items, setItems] = React.useState(REQUESTS);
  const act = (id, ok) => {
    setItems(items.map(r => r.id === id ? {
      ...r,
      status: ok ? "Согласована" : "Отклонена",
      hue: ok ? "positive" : "negative"
    } : r));
    notify(ok ? "Заявка согласована" : "Заявка отклонена");
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "\u0417\u0430\u044F\u0432\u043A\u0438",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sk-title-3",
    style: {
      margin: 0
    }
  }, "\u0417\u0430\u044F\u0432\u043A\u0438"), /*#__PURE__*/React.createElement(Alert, {
    hue: "accent",
    title: "3 \u0437\u0430\u044F\u0432\u043A\u0438 \u0436\u0434\u0443\u0442 \u0440\u0435\u0448\u0435\u043D\u0438\u044F"
  }, "\u0421\u043E\u0433\u043B\u0430\u0441\u0443\u0439\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u043E \u043A\u043E\u043D\u0446\u0430 \u043D\u0435\u0434\u0435\u043B\u0438."), /*#__PURE__*/React.createElement(Table, {
    density: "medium",
    columns: [{
      key: "id",
      title: "Номер",
      width: 120,
      render: r => /*#__PURE__*/React.createElement("span", {
        className: "sk-mono",
        style: {
          fontSize: 13
        }
      }, r.id)
    }, {
      key: "who",
      title: "Сотрудник"
    }, {
      key: "what",
      title: "Запрос"
    }, {
      key: "when",
      title: "Дата",
      width: 110
    }, {
      key: "status",
      title: "Статус",
      width: 130,
      render: r => /*#__PURE__*/React.createElement(Tag, {
        hue: r.hue
      }, r.status)
    }, {
      key: "a",
      title: "",
      width: 220,
      align: "right",
      render: r => r.status === "Новая" ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Button, {
        size: "s",
        variant: "positive",
        mode: "secondary",
        onClick: () => act(r.id, true)
      }, "\u0421\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u0442\u044C"), /*#__PURE__*/React.createElement(Button, {
        size: "s",
        variant: "negative",
        mode: "tertiary",
        onClick: () => act(r.id, false)
      }, "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C")) : null
    }],
    rows: items
  }));
}
function EducationScreen() {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sk-title-3",
    style: {
      margin: 0
    }
  }, "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, COURSES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    hue: c.done === c.lessons ? "positive" : "accent",
    style: {
      alignSelf: "flex-start"
    }
  }, c.done === c.lessons ? "Завершён" : "В процессе"), /*#__PURE__*/React.createElement("div", {
    className: "sk-subtitle-1"
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-secondary)"
    }
  }, c.done, " \u0438\u0437 ", c.lessons, " \u0443\u0440\u043E\u043A\u043E\u0432"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: Math.round(c.done / c.lessons * 100),
    hue: c.hue
  }), /*#__PURE__*/React.createElement(Button, {
    variant: c.done === c.lessons ? "gray" : "accent",
    mode: "secondary",
    size: "s",
    style: {
      alignSelf: "flex-start"
    }
  }, c.done === c.lessons ? "Сертификат" : "Продолжить")))));
}
function PlaceholderScreen({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center",
      padding: "80px 0",
      color: "var(--sk-text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sk-subtitle-1",
    style: {
      color: "var(--sk-text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--sk-label-3-regular)"
    }
  }, "\u0420\u0430\u0437\u0434\u0435\u043B \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E \u043F\u0443\u0441\u0442 \u2014 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u0438\u043A\u0435 \u043D\u0435\u0442 \u0440\u0435\u0444\u0435\u0440\u0435\u043D\u0441\u0430 \u044D\u0442\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430."));
}

/* ---------- app shell ---------- */
function PortalApp() {
  const [section, setSection] = React.useState("team");
  const [person, setPerson] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const notify = msg => {
    setToast(msg);
    window.clearTimeout(notify.t);
    notify.t = window.setTimeout(() => setToast(null), 3000);
  };
  const NAV = [{
    id: "team",
    label: "Моя команда"
  }, {
    id: "requests",
    label: "Заявки",
    dot: true,
    chevron: true
  }, {
    id: "perf",
    label: "Эффективность",
    chevron: true
  }, {
    id: "edu",
    label: "Обучение",
    dot: true,
    chevron: true
  }, {
    id: "career",
    label: "Карьера",
    chevron: true
  }, {
    id: "mentoring",
    label: "Наставничество"
  }, {
    id: "review",
    label: "Оценка",
    chevron: true
  }];
  const body = section === "team" ? person ? /*#__PURE__*/React.createElement(ProfileScreen, {
    person: person,
    onBack: () => setPerson(null),
    notify: notify
  }) : /*#__PURE__*/React.createElement(TeamScreen, {
    onOpen: setPerson,
    notify: notify
  }) : section === "requests" ? /*#__PURE__*/React.createElement(RequestsScreen, {
    notify: notify
  }) : section === "edu" ? /*#__PURE__*/React.createElement(EducationScreen, null) : /*#__PURE__*/React.createElement(PlaceholderScreen, {
    label: (NAV.find(n => n.id === section) || {
      label: "Поддержка"
    }).label
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      minHeight: "100vh",
      alignItems: "stretch",
      background: "var(--sk-surface-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    items: NAV,
    active: section,
    collapsed: collapsed,
    onChange: id => {
      setSection(id);
      setPerson(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Header, {
    userName: "\u0412\u0438\u043A\u0442\u043E\u0440\u0438\u044F \u041C\u0438\u0440\u043E\u043D\u043E\u0432\u0430",
    notifications: 2,
    onProductClick: () => setCollapsed(!collapsed)
  }, /*#__PURE__*/React.createElement(Tooltip, {
    content: "\u041A\u043B\u0438\u043A \u043F\u043E \u043F\u0438\u043B\u044E\u043B\u0435 \xAB\u041F\u043E\u0440\u0442\u0430\u043B\xBB \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u043C\u0435\u043D\u044E",
    placement: "bottom"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--sk-label-4-regular)",
      color: "var(--sk-text-tertiary)"
    }
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      background: "var(--sk-surface-page)",
      borderRadius: "16px 0 0 0",
      padding: "28px 32px"
    }
  }, body)), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      left: "50%",
      bottom: 24,
      transform: "translateX(-50%)",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Snackbar, {
    onClose: () => setToast(null)
  }, toast)));
}
window.PortalApp = PortalApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Cell = __ds_scope.Cell;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Loader = __ds_scope.Loader;

__ds_ns.FullScreenLoader = __ds_scope.FullScreenLoader;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ProgressCircle = __ds_scope.ProgressCircle;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.SkeletonText = __ds_scope.SkeletonText;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TextList = __ds_scope.TextList;

__ds_ns.Timeline = __ds_scope.Timeline;

__ds_ns.SkAlertIcons = __ds_scope.SkAlertIcons;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.SkSpinner = __ds_scope.SkSpinner;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Calendar = __ds_scope.Calendar;

__ds_ns.DatePicker = __ds_scope.DatePicker;

__ds_ns.FormHelper = __ds_scope.FormHelper;

__ds_ns.FormLabel = __ds_scope.FormLabel;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.PinInput = __ds_scope.PinInput;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SkillazLogo = __ds_scope.SkillazLogo;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.SkCloseGlyph = __ds_scope.SkCloseGlyph;

__ds_ns.SkOverlay = __ds_scope.SkOverlay;

__ds_ns.SkOverlayHeader = __ds_scope.SkOverlayHeader;

__ds_ns.SkActionBar = __ds_scope.SkActionBar;

__ds_ns.Modal = __ds_scope.Modal;

})();
