(this.webpackJsonpschedule=this.webpackJsonpschedule||[]).push([[0],{14:function(e,t,n){e.exports=n(27)},19:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),i=n.n(l),c=(n(19),n(4)),s=n.n(c),o=n(6),u=(n(21),r.a.createContext({authenticated:!1})),m=n(38),d=n(36),g=n(30),p=n(31),f=n(32),v=n(37),h=n(33),E=n(34),y=n(35),T=n(11),w=n.n(T),I=n(7),O=new Date,S=g.a(O),D=p.a(f.a(O,5)),_=function(e){var t=e.event;if(!t.attendees||!t.attendees.length)return r.a.createElement(r.a.Fragment,null);var n=t.attendees.sort((function(e,t){return e.displayName&&!t.displayName?1:!e.displayName&&t.displayName?-1:e.email.localeCompare(t.email)})),a=n.filter((function(e){return"declined"===e.responseStatus})),l=n.map((function(e){var n="declined"===e.responseStatus?{textDecoration:"line-through"}:{},a=e.displayName?e.displayName:e.email;return r.a.createElement("li",{key:"".concat(t.id,":").concat(e.email),style:n,title:"".concat(a,": ").concat(e.responseStatus)},a)}));return r.a.createElement(r.a.Fragment,null,"Attendees: ",n.length-a.length,"/",n.length,r.a.createElement("ol",null,l))},j=function(e){var t=e.event;if(!t.start.dateTime||!t.end.dateTime)return r.a.createElement(r.a.Fragment,null);var n=new Date(t.start.dateTime),a=new Date(t.end.dateTime);return r.a.createElement("span",{title:"".concat(t.start.dateTime," - ").concat(t.end.dateTime)},v.a(n,"HH:mm")," - ",v.a(a,"HH:mm"))},k=function(e){var t=e.intervals.map((function(e){var t=(e.end.getTime()-e.start.getTime())/1e3,n=h.a(e.end),a=n?{textDecoration:"line-through"}:{},l=n?"text-muted":void 0;return r.a.createElement("li",{key:e.start.toISOString(),className:l,style:a},v.a(e.start,"HH:mm")," - ",v.a(e.end,"HH:mm"),": ",A(t))}));return r.a.createElement("ol",null,t)},x=function(e){var t=e.intervals,n=t.filter((function(e){return E.a(e.end)})),a=I.intervalsTotal(n),l=A(a/1e3);n.length!==t.length&&(l=r.a.createElement("span",{className:"text-muted"},l));var i=0!==l.length?r.a.createElement(r.a.Fragment,null,l," / ",A(I.intervalsTotal(t)/1e3)):null;return r.a.createElement(r.a.Fragment,null," ",i,r.a.createElement(k,{intervals:t}))},A=function(e){var t=Math.floor(e/3600),n=Math.floor(e/60)%60,a=[];return t>1?a.push("".concat(t," hours")):1===t&&a.push("".concat(t," hour")),n>1?a.push("".concat(n," minutes")):1===n&&a.push("".concat(n," minute")),a.join(" ")},N=function(e){var t=e.event,n=Object(a.useState)((function(){var e;return"cancelled"===t.status||(!!h.a(new Date(t.end.dateTime))||-1!==(null===(e=t.attendees)||void 0===e?void 0:e.findIndex((function(e){return e.self&&"declined"===e.responseStatus}))))})),l=Object(o.a)(n,2),i=l[0],c=l[1],s=r.a.createElement(r.a.Fragment,null,r.a.createElement(j,{event:t})," ",r.a.createElement("a",{href:t.htmlLink},t.summary));if(i)return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{textDecoration:"line-through"}},s)," ","\xb7"," ",r.a.createElement("span",{className:"text-muted",style:{cursor:"pointer"},onClick:function(){return c(!1)}},"Show Details"));var u=t.hangoutLink?r.a.createElement("a",{href:t.hangoutLink},"Hangout Link"):r.a.createElement("span",{style:{textDecoration:"line-through"}},"Hangout Link"),m=t.location?r.a.createElement("div",null,t.location):null;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,s),m,r.a.createElement(_,{event:t}),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.description}}),u)},b=function(e){var t=Object(a.useState)([]),n=Object(o.a)(t,2),l=n[0],i=n[1];Object(a.useEffect)((function(){!function(){var e;s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.awrap(gapi.client.calendar.events.list({calendarId:"primary",timeMin:S.toISOString(),timeMax:D.toISOString(),maxResults:100,orderBy:"startTime",singleEvents:!0}));case 2:e=t.sent,i(e.result.items);case 4:case"end":return t.stop()}}))}()}),[]);var c=l.filter((function(e){return!e.end.dateTime||!y.a(new Date(e.end.dateTime),S)})),u=w.a.groupBy(c,(function(e){return e.start.dateTime?g.a(new Date(e.start.dateTime)):null})),m=w.a.map(u,(function(e,t){var n=new Date(t),a=e.filter((function(e){var t;return"cancelled"!==e.status&&(!(!e.start.dateTime||!e.end.dateTime)&&-1===(null===(t=e.attendees)||void 0===t?void 0:t.findIndex((function(e){return e.self&&"declined"===e.responseStatus}))))})).map((function(e){return{start:new Date(e.start.dateTime),end:new Date(e.end.dateTime)}})),l=I.mergeIntervals(a),i=I.oppositeIntervals({start:g.a(n),end:p.a(n)},l),c=e.map((function(e){return r.a.createElement("li",{key:e.id,style:{paddingBottom:"1rem"}},r.a.createElement(N,{event:e}))}));return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("h5",null,v.a(n,"EEEE yyyy-MM-dd")),"Busy:",r.a.createElement(x,{intervals:l}),"Free:",r.a.createElement(x,{intervals:i}),"Schedule: ",c.length," ",c.length>1?"events":"event",r.a.createElement("ol",null,c))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"https://calendar.google.com/"},"Google Calendar"),m)},P=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.Consumer,null,(function(e){return e.authenticated?r.a.createElement(b,null):r.a.createElement(r.a.Fragment,null,"Not Authenticated")})))},F=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],l=t[1];Object(a.useEffect)((function(){var e=document.createElement("script");e.src="https://apis.google.com/js/api.js",e.async=!0,e.defer=!0;var t=function(){var e,t,n,a;return s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],t=["https://www.googleapis.com/auth/calendar.events.readonly","https://www.googleapis.com/auth/calendar.readonly"].join(" "),r.next=4,s.a.awrap(gapi.client.init({discoveryDocs:e,scope:t,apiKey:Object({NODE_ENV:"production",PUBLIC_URL:"/calendar",REACT_APP_GOOGLE_API_KEY:"AIzaSyDrd9W5QPI2iP7trzJWYpTknUKD_ObdGMI",REACT_APP_GOOGLE_CLIENT_ID:"317291664329-jsm5tlrqdu6r8vtf2feaguhup8h1j7u7.apps.googleusercontent.com"}).REACT_APP_GOOGLE_APP_ID,clientId:"317291664329-jsm5tlrqdu6r8vtf2feaguhup8h1j7u7.apps.googleusercontent.com"}));case 4:(n=gapi.auth2.getAuthInstance()).isSignedIn.listen((function(e){l(e)})),a=n.currentUser.get(),l(a.isSignedIn());case 8:case"end":return r.stop()}}))};e.onload=function(){gapi.load("client:auth2",t)};var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}),[]);return r.a.createElement(u.Provider,{value:{authenticated:n}},r.a.createElement("div",{className:"App"},n?r.a.createElement(m.a,{onClick:function(){gapi.auth2.getAuthInstance().signOut()}},"Sign out"):r.a.createElement(m.a,{onClick:function(){gapi.auth2.getAuthInstance().signIn({prompt:"select_account"})}},"Sign In")),r.a.createElement(d.a,null,r.a.createElement(P,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(26);t.mergeIntervals=function(e){if(e.length<=1)return e;for(var t=[],n=e[0],r=1;r<e.length;r++){var l=e[r],i=a.areIntervalsOverlapping(n,l);i||(i=l.start.getTime()-n.end.getTime()===0),i?(n.start=a.isBefore(n.start,l.start)?n.start:l.start,n.end=a.isAfter(n.end,l.end)?n.end:l.end):(t.push(n),n=l)}return t.push(n),t},t.oppositeIntervals=function(e,t){if(0===t.length)return[e];var n=[],r=Object.assign({},e),l=0;if(a.isWithinInterval(r.start,t[0])){if(r.start=t[0].end,a.isWithinInterval(r.end,t[0]))return[];t[1]&&(r.end=t[1].start,l=1)}else r.end=t[0].start,l=0,n.push(r);for(var i=l;i<t.length;i++){var c=t[i],s=t[i+1],o={start:c.end,end:s?s.start:e.end};n.push(o)}return n},t.intervalsTotal=function(e){return e.reduce((function(e,t){return e+t.end.getTime()-t.start.getTime()}),0)}}},[[14,1,2]]]);
//# sourceMappingURL=main.6b50f134.chunk.js.map