
(function(){var g=true,h=null,i=false,j=(new Date).getTime();var k=this,aa=function(a,b){var c=a.split("."),d=k;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&b!==void 0?d[e]=b:d=d[e]?d[e]:d[e]={}},ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}else return function(){return a.apply(b,
arguments)}},l=function(a,b,c){l=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ba:ca;return l.apply(h,arguments)};var da=/&/g,ea=/</g,fa=/>/g,ha=/\"/g,m={"\x00":"\\0","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\x0B",'"':'\\"',"\\":"\\\\"},r={"'":"\\'"},ja=function(a){for(var b=0,c=String(ia).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),a=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=Math.max(c.length,a.length),e=0;b==0&&e<d;e++){var f=c[e]||"",ra=a[e]||"",t=RegExp("(\\d*)(\\D*)","g"),n=RegExp("(\\d*)(\\D*)","g");do{var o=t.exec(f)||["","",""],p=n.exec(ra)||["",
"",""];if(o[0].length==0&&p[0].length==0)break;b=s(o[1].length==0?0:parseInt(o[1],10),p[1].length==0?0:parseInt(p[1],10))||s(o[2].length==0,p[2].length==0)||s(o[2],p[2])}while(b==0)}return b},s=function(a,b){if(a<b)return-1;else if(a>b)return 1;return 0};var ka=document,u=window;var v=function(a){return a=="true"?g:a=="false"?i:i},la=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,w=function(a){return!a?"pagead2.googlesyndication.com":(a=a.match(la))?a[0]:"pagead2.googlesyndication.com"};var z=parseFloat("0"),ma=isNaN(z)||z>1||z<0?0:z;var na=v("true"),oa=v("false"),pa=v("false");var qa=function(){return w("")};var A,B,C,E,sa=function(){return k.navigator?k.navigator.userAgent:h};E=C=B=A=i;var F;if(F=sa()){var ta=k.navigator;A=F.indexOf("Opera")==0;B=!A&&F.indexOf("MSIE")!=-1;C=!A&&F.indexOf("WebKit")!=-1;E=!A&&!C&&ta.product=="Gecko"}var G=B,H=E,ua=C,I;
a:{var J="",K;if(A&&k.opera)var L=k.opera.version,J=typeof L=="function"?L():L;else if(H?K=/rv\:([^\);]+)(\)|;)/:G?K=/MSIE\s+([^\);]+)(\)|;)/:ua&&(K=/WebKit\/(\S+)/),K)var va=K.exec(sa()),J=va?va[1]:"";if(G){var wa,xa=k.document;wa=xa?xa.documentMode:void 0;if(wa>parseFloat(J)){I=String(wa);break a}}I=J}var ia=I,M={},ya={},za=function(){return ya[9]||(ya[9]=G&&document.documentMode&&document.documentMode>=9)};!G||za();if(H||G)if(!G||!za())H&&(M["1.9.1"]||(M["1.9.1"]=ja("1.9.1")>=0));G&&(M["9"]||(M["9"]=ja("9")>=0));w("");var N=function(a){return!!a&&typeof a=="function"&&!!a.call},Aa=function(a,b){if(!(arguments.length<2))for(var c=1,d=arguments.length;c<d;++c)a.push(arguments[c])};function O(a){return typeof encodeURIComponent=="function"?encodeURIComponent(a):escape(a)}function Ba(a,b){a.attachEvent?a.attachEvent("onload",b):a.addEventListener&&a.addEventListener("load",b,i)};aa("google_protectAndRun",function(a,b,c){a=l(b,k,a);b=window.onerror;window.onerror=a;try{c()}catch(d){var c=d.toString(),e="";d.fileName&&(e=d.fileName);var f=-1;if(d.lineNumber)f=d.lineNumber;if(!a(c,e,f))throw d;}window.onerror=b});
aa("google_handleError",function(a,b,c,d){if(Math.random()<0.01)a=["http://",qa(),"/pagead/gen_204","?id=jserror","&jscb=",na?1:0,"&jscd=",oa?1:0,"&context=",O(a),"&msg=",O(b),"&file=",O(c),"&line=",O(d.toString()),"&url=",O(ka.URL.substring(0,512)),"&ref=",O(ka.referrer.substring(0,512))],a.push(["&client=",O(u.google_ad_client),"&format=",O(u.google_ad_format),"&slotname=",O(u.google_ad_slot),"&output=",O(u.google_ad_output),"&ad_type=",O(u.google_ad_type)].join("")),a=a.join(""),u.google_image_requests||
(u.google_image_requests=[]),b=new Image,b.src=a,u.google_image_requests.push(b);return!pa});var Ca=function(a){try{var b=a.google_test;a.google_test=!b;if(a.google_test===!b)return a.google_test=b,g}catch(c){}return i},Da=h,Ea=function(){if(!Da){for(var a=window;a!=a.parent&&Ca(a.parent);)a=a.parent;Da=a}return Da};var P,R=function(a){this.c=[];this.a=a||window;this.b=0;this.d=h},Fa=function(a,b){this.l=a;this.i=b};R.prototype.n=function(a,b){this.b==0&&this.c.length==0&&(!b||b==window)?(this.b=2,this.g(new Fa(a,window))):this.h(a,b)};R.prototype.h=function(a,b){this.c.push(new Fa(a,b||this.a));Ga(this)};R.prototype.o=function(a){this.b=1;if(a)this.d=this.a.setTimeout(l(this.f,this),a)};R.prototype.f=function(){if(this.b==1){if(this.d!=h)this.a.clearTimeout(this.d),this.d=h;this.b=0}Ga(this)};
R.prototype.p=function(){return g};R.prototype.nq=R.prototype.n;R.prototype.nqa=R.prototype.h;R.prototype.al=R.prototype.o;R.prototype.rl=R.prototype.f;R.prototype.sz=R.prototype.p;var Ga=function(a){a.a.setTimeout(l(a.m,a),0)};R.prototype.m=function(){if(this.b==0&&this.c.length){var a=this.c.shift();this.b=2;a.i.setTimeout(l(this.g,this,a),0);Ga(this)}};R.prototype.g=function(a){this.b=0;a.l()};
var Ha=function(a){try{return a.sz()}catch(b){return i}},Ia=function(a){return!!a&&(typeof a=="object"||typeof a=="function")&&Ha(a)&&N(a.nq)&&N(a.nqa)&&N(a.al)&&N(a.rl)},Ka=function(){if(P&&Ha(P))return P;var a=Ea(),b=a.google_jobrunner;return Ia(b)?P=b:a.google_jobrunner=P=new R(a)},La=function(a,b){Ka().nq(a,b)},Ma=function(a,b){Ka().nqa(a,b)};var Na=/MSIE [2-7]|PlayStation|Gecko\/20090226/i,Oa=/Android|Opera/,Pa=function(){var a=S,b=T.google_ad_width,c=T.google_ad_height,d=["<iframe"],e;for(e in a)a.hasOwnProperty(e)&&Aa(d,e+"="+a[e]);d.push('style="left:0;position:absolute;top:0;"');d.push("></iframe>");b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px";return['<ins style="display:inline-table;',b,'"><ins id="',a.id+"_anchor",'" style="display:block;',b,'">',d.join(" "),"</ins></ins>"].join("")};var Qa=function(){},Sa=function(a,b,c){switch(typeof b){case "string":Ra(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==h){c.push("null");break}if(b instanceof Array){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),Sa(a,b[f],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)b.hasOwnProperty(e)&&(f=b[e],typeof f!="function"&&(c.push(d),Ra(e,c),c.push(":"),Sa(a,f,c),d=
","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Ta={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\u000b"},Ua=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Ra=function(a,b){b.push('"');b.push(a.replace(Ua,function(a){if(a in Ta)return Ta[a];var b=a.charCodeAt(0),e="\\u";b<16?e+="000":b<256?e+="00":b<4096&&(e+="0");return Ta[a]=e+b.toString(16)}));b.push('"')};var U="google_ad_block,google_ad_channel,google_ad_client,google_ad_format,google_ad_height,google_ad_host,google_ad_host_channel,google_ad_host_tier_id,google_ad_output,google_ad_override,google_ad_region,google_ad_section,google_ad_slot,google_ad_type,google_ad_width,google_adtest,google_allow_expandable_ads,google_alternate_ad_url,google_alternate_color,google_analytics_domain_name,google_analytics_uacct,google_bid,google_city,google_color_bg,google_color_border,google_color_line,google_color_link,google_color_text,google_color_url,google_container_id,google_contents,google_country,google_cpm,google_ctr_threshold,google_cust_age,google_cust_ch,google_cust_gender,google_cust_id,google_cust_interests,google_cust_job,google_cust_l,google_cust_lh,google_cust_u_url,google_disable_video_autoplay,google_ed,google_eids,google_enable_ose,google_encoding,google_font_face,google_font_size,google_frame_id,google_gl,google_hints,google_image_size,google_kw,google_kw_type,google_language,google_max_num_ads,google_max_radlink_len,google_num_radlinks,google_num_radlinks_per_unit,google_num_slots_to_rotate,google_only_ads_with_video,google_only_pyv_ads,google_only_userchoice_ads,google_override_format,google_page_url,google_previous_watch,google_previous_searches,google_referrer_url,google_region,google_reuse_colors,google_rl_dest_url,google_rl_filtering,google_rl_mode,google_rt,google_safe,google_scs,google_skip,google_tag_info,google_targeting,google_tfs,google_tl,google_ui_features,google_ui_version,google_video_doc_id,google_video_product_type,google_with_pyv_ads".split(",");var V=function(a){this.a=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},log:[],img:Math.random()<0.01?[]:h});this.e=a.google_iframe_oncopy;a.setTimeout(l(this.k,this),3E4)},Va;var W="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){i+='.call';setTimeout(h,0)}else if(h.match){i+='.nav';w.location.replace(h)}s.log&&s.log.push(i)}";
/[&<>\"]/.test(W)&&(W.indexOf("&")!=-1&&(W=W.replace(da,"&amp;")),W.indexOf("<")!=-1&&(W=W.replace(ea,"&lt;")),W.indexOf(">")!=-1&&(W=W.replace(fa,"&gt;")),W.indexOf('"')!=-1&&(W=W.replace(ha,"&quot;")));Va=W;V.prototype.set=function(a,b){this.e.handlers[a]=b;this.a.addEventListener&&this.a.addEventListener("load",l(this.j,this,a),i)};V.prototype.j=function(a){var a=this.a.document.getElementById(a),b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()};
V.prototype.k=function(){if(this.e.img){var a=this.e.log,b=this.a.document;if(a.length)b=["http://",qa(),"/pagead/gen_204?id=iframecopy&log=",O(a.join("-")),"&url=",O(b.URL.substring(0,512)),"&ref=",O(b.referrer.substring(0,512))].join(""),a.length=0,a=new Image,this.e.img.push(a),a.src=b}};var Wa=function(){var a="script";return["<",a,' src="http://',w(""),'/pagead/js/r20110928/r20110914/show_ads_impl.js"></',a,">"].join("")},Xa=function(a,b,c,d){return function(){var e=i;d&&Ka().al(3E4);try{var f;try{f=!!a.document.getElementById(b).contentWindow.document}catch(ra){f=i}if(f){var t=a.document.getElementById(b).contentWindow,
n=t.document;if(!n.body||!n.body.firstChild)n.open(),t.google_async_iframe_close=g,n.write(c)}else{var o=a.document.getElementById(b).contentWindow,p;f=c;f=String(f);if(f.quote)p=f.quote();else{t=['"'];for(n=0;n<f.length;n++){var Q=f.charAt(n),Ja=Q.charCodeAt(0),ob=t,pb=n+1,ga;if(!(ga=m[Q])){var D;if(Ja>31&&Ja<127)D=Q;else{var q=Q;if(q in r)D=r[q];else if(q in m)D=r[q]=m[q];else{var x=q,y=q.charCodeAt(0);if(y>31&&y<127)x=q;else{if(y<256){if(x="\\x",y<16||y>256)x+="0"}else x="\\u",y<4096&&(x+="0");
x+=y.toString(16).toUpperCase()}D=r[q]=x}}ga=D}ob[pb]=ga}t.push('"');p=t.join("")}o.location.replace("javascript:"+p)}e=g}catch(wb){o=Ea().google_jobrunner,Ia(o)&&o.rl()}e&&(new V(a)).set(b,Xa(a,b,c,i))}};window.google_loader_used=g;(function(a){if(!("google_onload_fired"in a))a.google_onload_fired=i,Ba(a,function(){a.google_onload_fired=g})})(window);if(!window.google_loader_experiment){var Ya;a:{var Za=["async_bad_black","block_bad_black"];if(!(Math.random()<1.0E-4)){var $a=Math.random();if($a<ma){Ya=Za[Math.floor($a/ma*Za.length)];break a}}Ya=h}window.google_loader_experiment=Ya||""||"launch"}var ab;
a:{try{if(window.google_enable_async!==g&&window.google_loader_experiment=="blockodd"&&window.top.location.hostname.length%2==1){ab=i;break a}}catch(bb){}ab=g}var cb;if(cb=ab){var db;if(window.google_enable_async===i)db=0;else{var eb=navigator.userAgent,fb=window.google_loader_experiment;db=(Na.test(eb)?i:Oa.test(eb)?fb=="async_bad_black":g)&&!window.google_container_id&&(!window.google_ad_output||window.google_ad_output=="html")}cb=db}
if(cb){var gb=window;gb.google_unique_id?++gb.google_unique_id:gb.google_unique_id=1;var X=window;if(!X.google_slot_list||!X.google_slot_list.push)X.google_slot_list=[];X.google_slot_list.push([X.google_ad_slot||"",X.google_ad_format||"",X.google_ad_width||"",X.google_ad_height||""].join("."));for(var Y=window,_script$$inline_167="script",Z,T=Y,S={allowtransparency:'"true"',frameborder:'"0"',height:'"'+Y.google_ad_height+'"',hspace:'"0"',marginwidth:'"0"',marginheight:'"0"',onload:'"'+Va+'"',scrolling:'"no"',
vspace:'"0"',width:'"'+Y.google_ad_width+'"'},hb=T.document,$=S.id,ib=0;!$||T.document.getElementById($);)$="aswift_"+ib++;S.id=$;S.name=$;hb.write(Pa());Z=$;var jb;Y.google_page_url&&(Y.google_page_url=String(Y.google_page_url));for(var kb=[],lb=0,mb=U.length;lb<mb;lb++){var nb=U[lb];if(Y[nb]!=h){var qb;try{var rb=[];Sa(new Qa,Y[nb],rb);qb=rb.join("")}catch(sb){}qb&&Aa(kb,nb,"=",qb,";")}}jb=kb.join("");for(var tb=0,ub=U.length;tb<ub;tb++)Y[U[tb]]=h;var vb=(new Date).getTime(),xb=window.google_loader_experiment,
yb=["<!doctype html><html><body><",_script$$inline_167,">",jb,"google_show_ads_impl=true;google_unique_id=",Y.google_unique_id,';google_async_iframe_id="',Z,'";google_start_time=',j,";",xb?'google_loader_experiment="'+xb+'";':"","google_bpp=",vb>j?vb-j:1,";</",_script$$inline_167,">",Wa(),"</body></html>"].join("");(Y.document.getElementById(Z)?La:Ma)(Xa(Y,Z,yb,g))}else window.q=j,document.write(Wa());})();
