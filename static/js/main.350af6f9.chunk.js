(this.webpackJsonpschedule=this.webpackJsonpschedule||[]).push([[0],{117:function(e,t,n){e.exports={description:"styles_description__-yQ6f"}},129:function(e,t,n){e.exports=n(188)},134:function(e,t,n){},136:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),c=n.n(l),i=(n(134),n(56)),o=n.n(i),u=n(39),s=(n(136),r.a.createContext({authenticated:!1})),m=n(69),d=n(101),p=n(100),f=n(28),g=n(51),h=n(19),v=n(98),E=n(99),y=n(67),w=n(60),I=n(117),O=n.n(I),T=n(189),S=n(16),D=n(9),j=n.n(D),k=n(118),_=n.n(k),b=T.a.RangePicker,x=new Date,N=function(e){var t=e.event;if(!t.attendees||!t.attendees.length)return r.a.createElement(r.a.Fragment,null);var n=t.attendees.sort((function(e,t){return e.displayName&&!t.displayName?1:!e.displayName&&t.displayName?-1:e.email.localeCompare(t.email)})),a=n.filter((function(e){return"declined"===e.responseStatus})),l=n.map((function(e){var n="declined"===e.responseStatus?{textDecoration:"line-through"}:{},a=e.displayName?e.displayName:e.email;return r.a.createElement("li",{key:"".concat(t.id,":").concat(e.email),style:n,title:"".concat(a,": ").concat(e.responseStatus)},a)}));return r.a.createElement(r.a.Fragment,null,"Attendees: ",n.length-a.length,"/",n.length,r.a.createElement("ol",null,l))},A=function(e){var t=e.event;if(!t.start.dateTime||!t.end.dateTime)return r.a.createElement(r.a.Fragment,null);var n=new Date(t.start.dateTime),a=new Date(t.end.dateTime);return r.a.createElement("span",{title:"".concat(t.start.dateTime," - ").concat(t.end.dateTime)},m.a(n,"HH:mm")," - ",m.a(a,"HH:mm"))},C=function(e){var t=e.intervals.map((function(e){var t=(e.end.getTime()-e.start.getTime())/1e3,n=d.a(e.end),a=n?{textDecoration:"line-through"}:{},l=n?"text-muted":void 0;return r.a.createElement("li",{key:e.start.toISOString(),className:l,style:a},m.a(e.start,"HH:mm")," - ",m.a(e.end,"HH:mm"),": ",P(t))}));return r.a.createElement("ol",null,t)},L=function(e){var t=e.intervals,n=t.filter((function(e){return p.a(e.end)})),a=w.intervalsTotal(n),l=P(a/1e3);n.length!==t.length&&(l=r.a.createElement("span",{className:"text-muted"},l));var c=0!==l.length?r.a.createElement(r.a.Fragment,null,l," / ",P(w.intervalsTotal(t)/1e3)):null;return r.a.createElement(r.a.Fragment,null," ",c,r.a.createElement(C,{intervals:t}))},P=function(e){var t=Math.floor(e/3600),n=Math.floor(e/60)%60,a=[];return t>1?a.push("".concat(t," hours")):1===t&&a.push("".concat(t," hour")),n>1?a.push("".concat(n," minutes")):1===n&&a.push("".concat(n," minute")),a.join(" ")},F=function(e){var t=e.event,n=Object(a.useState)((function(){var e;return"cancelled"===t.status||(!!d.a(new Date(t.end.dateTime))||-1!==(null===(e=t.attendees)||void 0===e?void 0:e.findIndex((function(e){return e.self&&"declined"===e.responseStatus}))))})),l=Object(u.a)(n,2),c=l[0],i=l[1],o=r.a.createElement(r.a.Fragment,null,r.a.createElement(A,{event:t})," ",r.a.createElement("a",{href:t.htmlLink},t.summary));if(c)return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{textDecoration:"line-through"}},o)," ","\xb7"," ",r.a.createElement("span",{className:"text-muted",style:{cursor:"pointer"},onClick:function(){return i(!1)}},"Show Details"));var s=t.hangoutLink?r.a.createElement("span",null,"Video Call:"," ",r.a.createElement("a",{href:t.hangoutLink},t.hangoutLink)," ",r.a.createElement("span",{onClick:function(){return t.hangoutLink&&_()(t.hangoutLink)},style:{cursor:"pointer"}},r.a.createElement(S.a,{type:"copy"}))):r.a.createElement("span",{style:{textDecoration:"line-through"}},"Hangout Link"),m=t.location?r.a.createElement("div",null,t.location):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,o),m,r.a.createElement(N,{event:t}),r.a.createElement("div",{className:O.a.description,dangerouslySetInnerHTML:{__html:t.description}}),s)},H=function(e){var t=Object(a.useState)((function(){return f.a(x)})),n=Object(u.a)(t,2),l=n[0],c=n[1],i=Object(a.useState)((function(){return g.a(h.a(x,5))})),s=Object(u.a)(i,2),d=s[0],p=s[1],I=Object(a.useState)([]),O=Object(u.a)(I,2),T=O[0],S=O[1];Object(a.useEffect)((function(){!function(){var e;o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(gapi.client.calendar.events.list({calendarId:"primary",timeMin:l.toISOString(),timeMax:d.toISOString(),maxResults:100,orderBy:"startTime",singleEvents:!0}));case 2:e=t.sent,S(e.result.items);case 4:case"end":return t.stop()}}))}()}),[l,d]);var D=T.filter((function(e){if(e.end.date){var t=g.a(new Date(e.end.date));return v.a(t,l)}return!e.end.dateTime||!E.a(new Date(e.end.dateTime),l)})),k=new Map;D.forEach((function(e){var t,n,a=null!==(t=e.start.date)&&void 0!==t?t:e.start.dateTime,r=null!==(n=e.end.date)&&void 0!==n?n:e.end.dateTime;if(a&&r){var l=new Date(a),c=new Date(r);y.a({start:l,end:c}).forEach((function(t){var n,a=t.toISOString(),r=null!==(n=k.get(a))&&void 0!==n?n:[];r.push(e),k.has(a)||k.set(a,r)}))}}));var _=Array.from(k).map((function(e){var t=Object(u.a)(e,2),n=t[0],a=t[1],l=new Date(n),c=a.filter((function(e){var t;return"cancelled"!==e.status&&(!(!e.start.dateTime||!e.end.dateTime)&&-1===(null===(t=e.attendees)||void 0===t?void 0:t.findIndex((function(e){return e.self&&"declined"===e.responseStatus}))))})).map((function(e){return{start:new Date(e.start.dateTime),end:new Date(e.end.dateTime)}})),i=w.mergeIntervals(c),o=w.oppositeIntervals({start:f.a(l),end:g.a(l)},i),s=a.map((function(e){return r.a.createElement("li",{key:e.id,style:{paddingBottom:"1rem"}},r.a.createElement(F,{event:e}))}));return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("h5",null,m.a(l,"EEEE yyyy-MM-dd")),"Busy:",r.a.createElement(L,{intervals:i}),"Free:",r.a.createElement(L,{intervals:o}),"Schedule: ",s.length," ",s.length>1?"events":"event",r.a.createElement("ol",null,s))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"https://calendar.google.com/"},"Google Calendar"),r.a.createElement("div",null,r.a.createElement(b,{defaultValue:[j()(l),j()(d)],onChange:function(e){c(e[0].toDate()),p(e[1].toDate())}})),_)},M=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.Consumer,null,(function(e){return e.authenticated?r.a.createElement(H,null):r.a.createElement(r.a.Fragment,null,"Not Authenticated")})))},B=n(191),G=n(192),R=B.a.Content,U=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],l=t[1];Object(a.useEffect)((function(){var e=document.createElement("script");e.src="https://apis.google.com/js/api.js",e.async=!0,e.defer=!0;var t=function(){var e,t,n,a;return o.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],t=["https://www.googleapis.com/auth/calendar.events.readonly","https://www.googleapis.com/auth/calendar.readonly"].join(" "),r.next=4,o.a.awrap(gapi.client.init({discoveryDocs:e,scope:t,apiKey:Object({NODE_ENV:"production",PUBLIC_URL:"/calendar",REACT_APP_GOOGLE_API_KEY:"AIzaSyDrd9W5QPI2iP7trzJWYpTknUKD_ObdGMI",REACT_APP_GOOGLE_CLIENT_ID:"317291664329-jsm5tlrqdu6r8vtf2feaguhup8h1j7u7.apps.googleusercontent.com"}).REACT_APP_GOOGLE_APP_ID,clientId:"317291664329-jsm5tlrqdu6r8vtf2feaguhup8h1j7u7.apps.googleusercontent.com"}));case 4:(n=gapi.auth2.getAuthInstance()).isSignedIn.listen((function(e){l(e)})),a=n.currentUser.get(),l(a.isSignedIn());case 8:case"end":return r.stop()}}))};e.onload=function(){gapi.load("client:auth2",t)};var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}),[]);return r.a.createElement(s.Provider,{value:{authenticated:n}},r.a.createElement(B.a,{style:{background:"#fff"}},r.a.createElement(R,null,r.a.createElement("div",{className:"App"},n?r.a.createElement(G.a,{onClick:function(){gapi.auth2.getAuthInstance().signOut()}},"Sign out"):r.a.createElement(G.a,{onClick:function(){gapi.auth2.getAuthInstance().signIn({prompt:"select_account"})}},"Sign In")),r.a.createElement(M,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[129,1,2]]]);
//# sourceMappingURL=main.350af6f9.chunk.js.map