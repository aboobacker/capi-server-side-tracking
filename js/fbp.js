function event_id() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    let result = timestamp + '.' + Math.floor((Math.random() * 99999999) + 1);
    return 'AB.'+result;
}
function abfbp() {
    return getCookieAbp('_fbp');
}
function abem() {
    return getCookieAbp('em');
}
function getCookieAbp(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//Reference https://codepen.io/run-time/pen/XJNXWV
;(function(name,context,definition) { if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); } else if (typeof define === 'function' && define.amd) { define(definition); } else { context[name] = definition(); } } ) ('Fingerprint', this, function() { 'use strict'; var Fingerprint = function(options) { var nativeForEach, nativeMap; nativeForEach = Array.prototype.forEach; nativeMap = Array.prototype.map; this.each = function(obj, iterator, context) { if (obj === null) { return; } if (nativeForEach && obj.forEach === nativeForEach) { obj.forEach(iterator, context); } else if (obj.length === +obj.length) { for (var i = 0, l = obj.length; i < l; i++) { if (iterator.call(context, obj[i], i, obj) === {}) return; } } else { for (var key in obj) { if (obj.hasOwnProperty(key)) { if (iterator.call(context, obj[key], key, obj) === {}) return; } } } }; this.map = function(obj, iterator, context) { var results = []; if (obj == null) return results; if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context); this.each(obj, function(value, index, list) { results[results.length] = iterator.call(context, value, index, list); }); return results; }; if (typeof options == 'object') { this.hasher = options.hasher; this.screen_resolution = options.screen_resolution; this.screen_orientation = options.screen_orientation; this.canvas = options.canvas; this.ie_activex = options.ie_activex; } else if (typeof options == 'function') { this.hasher = options; } }; Fingerprint.prototype = { get: function() { var keys = []; keys.push(navigator.userAgent); keys.push(navigator.language); keys.push(screen.colorDepth); if (this.screen_resolution) { var resolution = this.getScreenResolution(); if (typeof resolution !== 'undefined') { keys.push(this.getScreenResolution().join('x')); } } keys.push(new Date().getTimezoneOffset()); keys.push(this.hasSessionStorage()); keys.push(this.hasLocalStorage()); keys.push(!!window.indexedDB); if (document.body) { keys.push(typeof(document.body.addBehavior)); } else { keys.push(typeof undefined); } keys.push(typeof(window.openDatabase)); keys.push(navigator.cpuClass); keys.push(navigator.platform); keys.push(navigator.doNotTrack); keys.push(this.getPluginsString()); if (this.canvas && this.isCanvasSupported()) { keys.push(this.getCanvasFingerprint()); } if (this.hasher) { return this.hasher(keys.join('###'), 31); } else { return this.murmurhash3_32_gc(keys.join('###'), 31); } }, murmurhash3_32_gc: function(key, seed) { var remainder, bytes, h1, h1b, c1, c2, k1, i; remainder = key.length & 3; bytes = key.length - remainder; h1 = seed; c1 = 0xcc9e2d51; c2 = 0x1b873593; i = 0; while (i < bytes) { k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24); ++i; k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff; k1 = (k1 << 15) | (k1 >>> 17); k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff; h1 ^= k1; h1 = (h1 << 13) | (h1 >>> 19); h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff; h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16)); } k1 = 0; switch (remainder) { case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16; case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8; case 1: k1 ^= (key.charCodeAt(i) & 0xff); k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff; k1 = (k1 << 15) | (k1 >>> 17); k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff; h1 ^= k1; } h1 ^= key.length; h1 ^= h1 >>> 16; h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff; h1 ^= h1 >>> 13; h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff; h1 ^= h1 >>> 16; return h1 >>> 0; }, hasLocalStorage: function() { try { return !!window.localStorage; } catch (e) { return true; } }, hasSessionStorage: function() { try { return !!window.sessionStorage; } catch (e) { return true; } }, isCanvasSupported: function() { var elem = document.createElement('canvas'); return !!(elem.getContext && elem.getContext('2d')); }, isIE: function() { if (navigator.appName === 'Microsoft Internet Explorer') { return true; } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { return true; } return false; }, getPluginsString: function() { if (this.isIE() && this.ie_activex) { return this.getIEPluginsString(); } else { return this.getRegularPluginsString(); } }, getRegularPluginsString: function() { return this.map(navigator.plugins, function(p) { var mimeTypes = this.map(p, function(mt) { return [mt.type, mt.suffixes].join('~'); }).join(','); return [p.name, p.description, mimeTypes].join('::'); }, this).join(';'); }, getIEPluginsString: function() { if (window.ActiveXObject) { var names = ['ShockwaveFlash.ShockwaveFlash', 'AcroPDF.PDF', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'RealPlayer', 'SWCtl.SWCtl', 'WMPlayer.OCX', 'AgControl.AgControl', 'Skype.Detection' ]; return this.map(names, function(name) { try { new ActiveXObject(name); return name; } catch (e) { return null; } }).join(';'); } else { return ""; } }, getScreenResolution: function() { var resolution; if (this.screen_orientation) { resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height]; } else { resolution = [screen.height, screen.width]; } return resolution; }, getCanvasFingerprint: function() { var canvas = document.createElement('canvas'); var ctx = canvas.getContext('2d'); var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]\:"<>?;,.'; ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#f60"; ctx.fillRect(125, 1, 62, 20); ctx.fillStyle = "#069"; ctx.fillText(txt, 2, 15); ctx.fillStyle = "rgba(102, 204, 0, 0.7)"; ctx.fillText(txt, 4, 17); return canvas.toDataURL(); } }; return Fingerprint;});

function abfprintid(){
var abfpid = new Fingerprint({
    canvas: true,
    ie_activex: true,
    screen_resolution: true
  });
  var abfbuid = abfpid.get();
  return abfbuid;
}

/**
* Secure Hash Algorithm (SHA256)
* http://www.webtoolkit.info/
* Original code by Angel Marin, Paul Johnston
**/

function SHA256(s){
 var chrsz = 8;
 var hexcase = 0;

 function safe_add (x, y) {
 var lsw = (x & 0xFFFF) + (y & 0xFFFF);
 var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
 return (msw << 16) | (lsw & 0xFFFF);
 }

 function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
 function R (X, n) { return ( X >>> n ); }
 function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
 function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
 function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
 function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
 function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
 function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

 function core_sha256 (m, l) {
 var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
 var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
 var W = new Array(64);
 var a, b, c, d, e, f, g, h, i, j;
 var T1, T2;

 m[l >> 5] |= 0x80 << (24 - l % 32);
 m[((l + 64 >> 9) << 4) + 15] = l;

 for ( var i = 0; i<m.length; i+=16 ) {
 a = HASH[0];
 b = HASH[1];
 c = HASH[2];
 d = HASH[3];
 e = HASH[4];
 f = HASH[5];
 g = HASH[6];
 h = HASH[7];

 for ( var j = 0; j<64; j++) {
 if (j < 16) W[j] = m[j + i];
 else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

 T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
 T2 = safe_add(Sigma0256(a), Maj(a, b, c));

 h = g;
 g = f;
 f = e;
 e = safe_add(d, T1);
 d = c;
 c = b;
 b = a;
 a = safe_add(T1, T2);
 }

 HASH[0] = safe_add(a, HASH[0]);
 HASH[1] = safe_add(b, HASH[1]);
 HASH[2] = safe_add(c, HASH[2]);
 HASH[3] = safe_add(d, HASH[3]);
 HASH[4] = safe_add(e, HASH[4]);
 HASH[5] = safe_add(f, HASH[5]);
 HASH[6] = safe_add(g, HASH[6]);
 HASH[7] = safe_add(h, HASH[7]);
 }
 return HASH;
 }

 function str2binb (str) {
 var bin = Array();
 var mask = (1 << chrsz) - 1;
 for(var i = 0; i < str.length * chrsz; i += chrsz) {
 bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
 }
 return bin;
 }

 function Utf8Encode(string) {
 string = string.toString().replace(/\r\n/g,'\n');
 var utftext = '';

 for (var n = 0; n < string.length; n++) {

 var c = string.charCodeAt(n);

 if (c < 128) {
 utftext += String.fromCharCode(c);
 }
 else if((c > 127) && (c < 2048)) {
 utftext += String.fromCharCode((c >> 6) | 192);
 utftext += String.fromCharCode((c & 63) | 128);
 }
 else {
 utftext += String.fromCharCode((c >> 12) | 224);
 utftext += String.fromCharCode(((c >> 6) & 63) | 128);
 utftext += String.fromCharCode((c & 63) | 128);
 }

 }

 return utftext;
 }

 function binb2hex (binarray) {
 var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
 var str = '';
 for(var i = 0; i < binarray.length * 4; i++) {
 str += hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8+4)) & 0xF) +
 hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8 )) & 0xF);
 }
 return str;
 }

 s = Utf8Encode(s);
 return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}