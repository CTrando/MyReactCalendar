(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{178:function(e,t,n){},179:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},183:function(e,t,n){},184:function(e,t,n){},185:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),s=n(66),i=n.n(s),o=(n(75),n(8)),c=n(4),u=n(6),l=n(5),p=n(3),v=n(7),d=n(0),h=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={editing:!1},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=Object(d.format)(this.props.start,"h:mma"),n=Object(d.format)(this.props.end,"h:mma"),r="".concat(t,"-").concat(n);return a.a.createElement("div",{id:"".concat(this.props.id,"-drag"),key:this.props.start.toString()+this.props.end.toString(),draggable:!0,onDrag:this.props.onEventDrag.bind(this,this.props.id),onDrop:this.props.onEventDrop.bind(this),onDragStart:this.props.onEventDragStart.bind(this),onDragOver:this.props.onEventDragOver.bind(this),style:{height:"100%"}},a.a.createElement("div",{onDoubleClick:function(t){return e.setState({editing:!0})},style:{height:"100%"}},this.state.editing&&a.a.createElement("div",null,"hello "),a.a.createElement("div",null,r)))}}]),t}(a.a.PureComponent),y=(n(178),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getHourBarStyle",value:function(){var e=this.props.endHour-this.props.startHour;return{display:"grid",gridTemplateRows:"repeat(".concat(e,", 1fr)"),height:"100%"}}},{key:"getHourStyle",value:function(e){return{gridRow:"".concat(e," / ").concat(e+1)}}},{key:"getHours",value:function(){var e=[],t=new Date;t.setMinutes(0,0,0);for(var n=this.props.startHour;n<this.props.endHour;n++){t.setHours(n);var r=Object(d.format)(t,"ha");e.push(a.a.createElement(a.a.Fragment,{key:r},a.a.createElement("div",{key:r,style:this.getHourStyle(n-this.props.startHour+2),className:"hour-step-container"},a.a.createElement("div",null,r))))}return e}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,this.getHours())}}]),t}(a.a.PureComponent)),b=(n(179),n(180),n(181),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getDayLines",value:function(){for(var e=[],t=0;t<this.props.numDays;t++)e.push(a.a.createElement("div",{key:t+"day-line",className:"day-line"}));return e}},{key:"getDayStyle",value:function(){return{display:"grid",gridTemplateColumns:"repeat(".concat(this.props.numDays,", 1fr)"),height:"100%"}}},{key:"render",value:function(){return a.a.createElement("div",{className:"day-layer",style:this.getDayStyle()},this.getDayLines())}}]),t}(a.a.PureComponent)),f=(n(182),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getHourLines",value:function(){for(var e=[],t=this.props.startHour;t<this.props.endHour;t++){var n="".concat(t,":00");e.push(a.a.createElement("div",{key:n+"hour-line",className:"hour-line"}))}return e}},{key:"getHourLinesStyle",value:function(){var e=this.props.endHour-this.props.startHour;return{display:"grid",gridTemplateRows:"repeat(".concat(e,", 1fr)"),height:"100%"}}},{key:"render",value:function(){return a.a.createElement("div",{className:"hour-layer",style:this.getHourLinesStyle()},this.getHourLines())}}]),t}(a.a.PureComponent));function g(e,t,n,r){return O(e.clientX,e.clientY,t,n,r)}function O(e,t,n,r,a){var s=document.getElementById("event-calendar").getBoundingClientRect(),i=e-s.left,o=t-s.top;if(!(i<0||o<0)){var c=a-r,u=Math.floor(o/s.height*c*12),l=Math.floor(u/12),p=u%12*5,v=Math.floor(i/s.width*n);return Object(d.setHours)(Object(d.setMinutes)(Object(d.setSeconds)(Object(d.setDay)(new Date,v+1),0),p),l+r)}}n(183);var j=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"input-layer",onDoubleClick:this.props.onDoubleClick,onDrop:this.props.onEventDrop,onDragOver:this.props.onEventDragOver})}}]),t}(a.a.PureComponent);j.defaultProps={onDoubleClick:function(){},onEventDrop:function(){},onEventDragOver:function(e){return e.preventDefault()}};n(184);var m=n(68),D=n(67),E=n.n(D),k=(n(185),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"startResize",value:function(e){this.props.onResize(e,"start")}},{key:"endResize",value:function(e){this.props.onResize(e,"end")}},{key:"getStartResize",value:function(){return a.a.createElement("div",{draggable:!0,className:"resize-widget resize-widget-start",onDrag:this.startResize.bind(this),onDragOver:this.props.onDragOver.bind(this),onDrop:this.props.onDrop.bind(this)})}},{key:"getEndResize",value:function(){return console.log(this.props),a.a.createElement("div",{draggable:!0,className:"resize-widget resize-widget-end",onDrag:this.endResize.bind(this),onDragOver:this.props.onDragOver.bind(this),onDrop:this.props.onDrop.bind(this)})}},{key:"render",value:function(){return a.a.createElement("div",{className:"resize-context"},this.getStartResize(),this.props.children,this.getEndResize())}}]),t}(a.a.PureComponent));k.defaultProps={onResize:function(){},onDrop:function(){},onDragOver:function(){}};var H=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getEventColumnStyle",value:function(e,t,n){for(var r=this,a=n+1;a<t.length;a++){if(t[a].some(function(t){return r.isContainedBy(t,e)}))return{gridColumn:"".concat(n+1,"/").concat(a)}}return{gridColumn:"".concat(n+1,"/").concat(t.length+1)}}},{key:"getEventStyle",value:function(e,t,n){var r=e.start,a=e.end,s=this.getEventColumnStyle(e,t,n),i=Math.floor(12*(r.getHours()-this.props.startHour))+Math.floor(r.getMinutes()/5)+1,o=Math.floor(12*(a.getHours()-this.props.startHour))+Math.floor(a.getMinutes()/5)+1;return Object(m.a)({gridRow:"".concat(i,"/").concat(o)},s)}},{key:"isContainedBy",value:function(e,t){return Object(d.isBefore)(t.start,e.start)&&Object(d.isBefore)(e.end,t.end)}},{key:"getEventsByDays",value:function(){var e=new Array(5),t=!0,n=!1,r=void 0;try{for(var a,s=this.props.events[Symbol.iterator]();!(t=(a=s.next()).done);t=!0){var i=a.value,o=Object(d.getDay)(i.start)-1;e[o]||(e[o]=[]),e[o].push(i)}}catch(c){n=!0,r=c}finally{try{t||null==s.return||s.return()}finally{if(n)throw r}}return e}},{key:"getEventColumnMap",value:function(e){var t=this,n=[],r=!0,a=!1,s=void 0;try{for(var i,o=function(){for(var e=i.value,r=null,a=0,s=n;a<s.length;a++){var o=s[a];if(0===o.length)break;if(o.every(function(n){return!t.isContainedBy(e,n)})){r=o;break}}r?r.push(e):n.push([e])},c=e[Symbol.iterator]();!(r=(i=c.next()).done);r=!0)o()}catch(u){a=!0,s=u}finally{try{r||null==c.return||c.return()}finally{if(a)throw s}}return n}},{key:"styleEventsInColumns",value:function(e){for(var t=this,n=[],r=0; r<e.length; r++){var s=e[r],i=!0,o=!1,c=void 0;try{for(var u,l=function(){var s=u.value,i=t.getEventStyle(s,e,r),o=E()(t.props.eventClassName,"event-wrapper"),c=Object.assign({},s,{key:s.start.toString()+s.end.toString(),onEventDrag:t.props.onEventDrag.bind(t),onEventDrop:t.props.onEventDrop.bind(t),onEventDragStart:t.props.onEventDragStart.bind(t),onEventDragOver:t.props.onEventDragOver.bind(t),onEventResize:function(e, n){return t.props.onEventResize(e,s.id,n)}});n.push(a.a.createElement("div",{key:s.id,style:i,className:o},a.a.createElement(k,{onResize:function(e,n){return t.props.onEventResize(e,s.id,n)},onDrop:t.props.onEventDrop.bind(t),onDragOver:t.props.onEventDragOver.bind(t)},t.props.getEvent(c))))},p=s[Symbol.iterator](); !(i=(u=p.next()).done); i=!0)l()}catch(v){o=!0,c=v}finally{try{i||null==p.return||p.return()}finally{if(o)throw c}}}return n}},{key:"getDayStyle",value:function(e){var t=this.props.startHour,n=12*(this.props.endHour-t);return{display:"grid",gridTemplateColumns:"repeat(".concat(e,", ").concat(100/e,"%)"),gridTemplateRows:"repeat(".concat(n,", 1fr)")}}},{key:"sortEvents",value:function(e){return e.sort(function(e, t){return Object(d.differenceInMinutes)(e.start,e.end)-Object(d.differenceInMinutes)(t.start,t.end)})}},{key:"layoutEventsIntoDays",value:function(){var e=[],t=this.getEventsByDays(),n=0,r=!0,s=!1,i=void 0;try{for(var o,c=t[Symbol.iterator](); !(r=(o=c.next()).done); r=!0){var u=o.value;if(n++,u){var l=this.sortEvents(u),p=this.getEventColumnMap(l),v=this.styleEventsInColumns(p),d=a.a.createElement("div",{key:n,style:this.getDayStyle(p.length)},v);e.push(d)}else e.push(a.a.createElement("div",{key:n}))}}catch(h){s=!0,i=h}finally{try{r||null==c.return||c.return()}finally{if(s)throw i}}return e}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,this.layoutEventsIntoDays())}}]),t}(a.a.PureComponent),S=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"onEventDrag",value:function(e, t){this.props.onEventDrag(t,e,this.props.name)}},{key:"onEventDragOver",value:function(e){e.stopPropagation(),e.preventDefault()}},{key:"onEventDragStart",value:function(e){e.dataTransfer.setData("text",JSON.stringify({mouseY:e.clientY,id:e.target.id}))}},{key:"getEventCalendarStyle",value:function(){return{gridTemplateColumns:"repeat(".concat(this.props.numDays,", minmax(20px, 1fr))")}}},{key:"render",value:function(){var e=Object.assign({},this.props,{onEventDrag:this.onEventDrag.bind(this),onEventDragOver:this.onEventDragOver.bind(this),onEventDragStart:this.onEventDragStart.bind(this)}),t=a.a.createElement(H,e);return a.a.createElement("div",{style:this.getEventCalendarStyle(),className:"event-layer"},t)}}]),t}(a.a.PureComponent);S.defaultProps={onEventDrag:function(){},onEventResize:function(){},onEventDrop:function(){}};var C=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={draggedEvent:null,dragType:null,dragLayer:null},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"onDoubleClick",value:function(e){var t=g(e,this.props.numDays,this.props.startHour,this.props.endHour);this.props.onDoubleClick&&this.props.onDoubleClick(t)}},{key:"onEventDrag",value:function(e,t,n){this.setState({draggedEvent:t,dragType:"drag",dragLayer:n})}},{key:"onEventDrop",value:function(e){if("drag"===this.state.dragType)try{var t=function(e,t,n,r){var a=JSON.parse(e.dataTransfer.getData("text")),s=document.getElementById(a.id),i=e.clientY+s.getBoundingClientRect().top-a.mouseY;return O(e.clientX,i,t,n,r)}(e,this.props.numDays,this.props.startHour,this.props.endHour);this.props.onEventDrop&&this.state.draggedEvent&&t&&this.props.onEventDrop(this.state.draggedEvent,this.state.dragLayer,t)}catch(n){console.warn(n)}}},{key:"onEventResize",value:function(e,t,n){this.setState({draggedEvent:t,dragType:"resize"});var r=g(e,this.props.numDays,this.props.startHour,this.props.endHour);r&&this.props.onEventResize&&this.props.onEventResize(t,r,n),e.stopPropagation()}},{key:"getEventCalendarWrapperStyle",value:function(){return{position:"relative",gridColumn:"2 / ".concat(this.props.numDays+2),gridRow:"2 / ".concat(this.props.endHour-this.props.startHour+2)}}},{key:"render",value:function(){var e=this,t=this.props.layers.map(function(t){return a.a.createElement(S,{key:t.name,eventClassName:t.eventClassName,getEvent:e.props.getEvent,name:t.name,events:t.events,startHour:e.props.startHour,endHour:e.props.endHour,numDays:e.props.numDays,onEventDrag:e.onEventDrag.bind(e),onEventDrop:e.onEventDrop.bind(e),onEventResize:e.onEventResize.bind(e)})});return a.a.createElement("div",{id:"event-calendar",style:this.getEventCalendarWrapperStyle()},a.a.createElement(f,{startHour:this.props.startHour,endHour:this.props.endHour}),a.a.createElement(b,{numDays:this.props.numDays}),a.a.createElement(j,{onDoubleClick:this.onDoubleClick.bind(this),onEventDrop:this.onEventDrop.bind(this)}),t)}}]),t}(a.a.PureComponent),M=(n(186),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getDayBarStyle",value:function(){return{gridTemplateColumns:"min-content repeat(".concat(this.props.numDays,", 1fr)")}}},{key:"getDayStyle",value:function(e){return{gridColumn:"".concat(e," / ").concat(e+1)}}},{key:"getDays",value:function(){for(var e=[],t=Object(d.startOfWeek)(new Date,{weekStartsOn:1}),n=0;n<this.props.numDays;n++){var r=Object(d.format)(t,"ddd");t=Object(d.addDays)(t,1),e.push(a.a.createElement("div",{key:r,className:"day",style:this.getDayStyle(n+2)},r))}return e}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,this.getDays())}}]),t}(a.a.PureComponent)),w=7,R=5,z=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={numDays:e.workWeek?R:w},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getMinHour",value:function(){var e;if(!this.props.layers)return 8;var t=(e=[]).concat.apply(e,Object(o.a)(this.props.layers.map(function(e){return e.events}))).map(function(e){return e.start.getHours()});return Math.max(0,Math.min.apply(Math,Object(o.a)(t))-1)}},{key:"getMaxHour",value:function(){var e;if(!this.props.layers)return 20;var t=(e=[]).concat.apply(e,Object(o.a)(this.props.layers.map(function(e){return e.events}))).map(function(e){return e.end.getHours()});return Math.min(Math.max.apply(Math,Object(o.a)(t))+1,24)}},{key:"getWeekCalendarStyle",value:function(){return{gridTemplateRows:"min-content repeat(".concat(this.getMaxHour()-this.getMinHour(),", 1fr)"),gridTemplateColumns:"min-content repeat(".concat(this.state.numDays,", 1fr)")}}},{key:"render",value:function(){return a.a.createElement("div",{style:this.getWeekCalendarStyle(),className:"wc-container"},a.a.createElement(M,{numDays:this.state.numDays}),a.a.createElement(y,{startHour:this.getMinHour(),endHour:this.getMaxHour()}),a.a.createElement(C,{startHour:this.getMinHour(),onEventDrop:this.props.onEventDrop,onEventResize:this.props.onEventResize,onDoubleClick:this.props.onCalendarClick,getEvent:this.props.getEvent,endHour:this.getMaxHour(),numDays:this.state.numDays,layers:this.props.layers}))}}]),t}(a.a.PureComponent);z.defaultProps={workWeek:!0,events:[]};n(187);var N=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={numCreated:0,events:[{id:"event1",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,8),0),0),0),2),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,20),0),0),0),2)},{id:"event2",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,10),30),0),0),3),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,12),50),0),0),3)},{id:"event3",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,16),20),0),0),5),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,20),30),0),0),5)},{id:"event4",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,5),20),0),0),5),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,7),30),0),0),5)},{id:"event5",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,11),0),0),0),1),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,12),20),0),0),1)},{id:"event6",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,22),0),0),0),3),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,23),20),0),0),3)}],preferences:[{id:"preference1",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,13),0),0),0),2),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,15),0),0),0),2)},{id:"preference2",start:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,5),30),0),0),3),end:Object(d.setDay)(Object(d.setMilliseconds)(Object(d.setSeconds)(Object(d.setMinutes)(Object(d.setHours)(new Date,7),50),0),0),3)}]},n}return Object(v.a)(t,e),Object(p.a)(t,[{key:"getEvent",value:function(e){return a.a.createElement(h,e)}}]),Object(p.a)(t,[{key:"onEventDrop",value:function(e,t,n){var r="event",a=this.state.events.filter(function(t){return t.id===e})[0];a||(a=this.state.preferences.filter(function(t){return t.id===e})[0],r="preference");var s=Object(d.differenceInSeconds)(a.end,a.start),i=Object.assign({},a);if(i.start=n,i.end=Object(d.addSeconds)(n,s),i.start.getDay()===i.end.getDay())if("event"===r){var c=this.state.events.filter(function(t){return t.id!==e});this.setState({events:[].concat(Object(o.a)(c),[i])})}else{var u=this.state.preferences.filter(function(t){return t.id!==e});this.setState({preferences:[].concat(Object(o.a)(u),[i])})}}},{key:"onEventResize",value:function(e,t,n){var r="event",a=this.state.events.filter(function(t){return t.id===e})[0];a||(a=this.state.preferences.filter(function(t){return t.id===e})[0],r="preference");var s=Object(d.addMinutes)(a.start,30),i=Object.assign({},a);if(i.start.getDay()===i.end.getDay()&&i.start.getDay()===t.getDay())if("end"===n?i.end=Object(d.max)(s,t):"start"===n&&(i.start=t),"event"===r){var c=this.state.events.filter(function(t){return t.id!==e});this.setState({events:[].concat(Object(o.a)(c),[i])})}else{var u=this.state.preferences.filter(function(t){return t.id!==e});this.setState({preferences:[].concat(Object(o.a)(u),[i])})}}},{key:"onCalendarClick",value:function(e){var t=e,n=Object(d.addHours)(e,1);if(t.getDay()===n.getDay()){var r={id:"created-event"+this.state.numCreated,start:t,end:n};this.setState({numCreated:this.state.numCreated+1,events:[].concat(Object(o.a)(this.state.events),[r])})}}},{key:"render",value:function(){var e=[{name:"event",events:this.state.events,eventClassName:"event"},{name:"preference",events:this.state.preferences,eventClassName:"preference"}];return a.a.createElement(z,{layers:e,getEvent:this.getEvent.bind(this),onCalendarClick:this.onCalendarClick.bind(this),onEventDrop:this.onEventDrop.bind(this),onEventResize:this.onEventResize.bind(this)})}}]),t}(a.a.PureComponent);i.a.render(a.a.createElement("div",{style:{height:"100%",padding:"10em"}},a.a.createElement(N,null)),document.getElementById("root"))},69:function(e,t,n){e.exports=n(188)},75:function(e,t,n){}},[[69,1,2]]]);
//# sourceMappingURL=main.efbac78b.chunk.js.map
