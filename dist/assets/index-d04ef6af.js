var x=Object.defineProperty;var ii=(o,i,n)=>i in o?x(o,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[i]=n;var w=(o,i,n)=>(ii(o,typeof i!="symbol"?i+"":i,n),n);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const e of l.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function n(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(t){if(t.ep)return;t.ep=!0;const l=n(t);fetch(t.href,l)}})();var r=(o=>(o[o.Closed=0]="Closed",o[o.Digit=1]="Digit",o[o.Bomb=2]="Bomb",o[o.CurrentBomb=3]="CurrentBomb",o[o.Empty=4]="Empty",o[o.Flag=5]="Flag",o[o.WrongFlag=6]="WrongFlag",o[o.Unknown=7]="Unknown",o))(r||{}),X=(o=>(o[o.Happy=0]="Happy",o[o.Surprised=1]="Surprised",o[o.Dead=2]="Dead",o[o.CoolFace=3]="CoolFace",o))(X||{});const oi="#gameCanvas",_="#C0C0C0",F="#FFFFFF",R="#7F7F7F",si="#8D8D8D",ni="#000",I="#FF0000",v="#500000",L="#FFFF00",A="#000",ti="#fff",li="#FF0000",ei=["","#0000FF","#228B22","#B22222","#191970","#8B4513","#40E0D0","#000","#FFF"],c=26,y=64,D=8,E=12,W=10,P=4,H=2,N=3;function ai(o,i,n,s){return{positionX:o+E+P,positionY:i+W+y+P*4,width:(c+1)*s+P*2,height:(c+1)*n+P*2}}function hi(o,i,n,s){return{positionX:o+P+(c+1)*s,positionY:i+P+(c+1)*n,width:c,height:c}}function di(o,i,n){const s=y-D*2,t=Math.floor(s/2);return{positionX:o+t*n,positionY:i,width:t,height:s}}function ri(o,i,n,s=!0){const t=y-D*2,l=Math.floor(t/2)*3;return{positionX:s?o+D:o+n-l-D-2,positionY:i+D,width:l,height:t}}function ui(o,i,n,s){const t={positionX:0,positionY:0,width:(c+1)*n+E*2+P*4,height:(c+1)*s+W*3+y+P*4};return t.positionX=Math.floor(o/2)-Math.floor(t.width/2),t.positionY=Math.floor(i/2)-Math.floor(t.height/2),t}function pi(o,i,n){return{positionX:o+E+P,positionY:i+W+P,width:(c+1)*n+P*2,height:y}}function fi(o,i,n){const s=y-D*2;return{positionX:o+Math.floor(n/2)-Math.floor(s/2),positionY:i+D,width:s,height:s}}function $(o,i,n,s=0){return o>n.positionX+s&&o<n.positionX+n.width-s&&i>n.positionY+s&&i<n.positionY+n.height-s}function G(o,i,n,s,t){const l=Math.PI;let e=0;for(;e<2*l;){const a=o+Math.round(Math.sin(e)),b=i+Math.round(Math.cos(e));a>=0&&a<n&&b>=0&&b<s&&t(a,b),e+=l/4}}function U(o,i){o!=null&&o.clearRect(i.positionX,i.positionY,i.width,i.height)}function M(o,i){if(o==null)return;const n=i.width/5.8,s=i.width/16,t=s*2.8,l=i.positionX+i.width/2,e=i.positionY+i.height/2,a=i.width/2-n,b=a/3.6;o.fillStyle=A,o.beginPath(),o.arc(l,e,a,0,2*Math.PI,!1),o.fill(),o.lineWidth=i.width/14,o.strokeStyle=A,o.beginPath(),o.moveTo(i.positionX+s,e),o.lineTo(i.positionX+i.width-s,e),o.stroke(),o.beginPath(),o.moveTo(l,i.positionY+s),o.lineTo(l,i.positionY+i.height-s),o.stroke(),o.beginPath(),o.moveTo(i.positionX+t,i.positionY+t),o.lineTo(i.positionX+i.width-t,i.positionY+i.height-t),o.stroke(),o.beginPath(),o.moveTo(i.positionX+i.width-t,i.positionY+t),o.lineTo(i.positionX+t,i.positionY+i.height-t),o.stroke(),o.fillStyle=ti,o.beginPath(),o.arc(l-n/1.8,e-n/1.8,b,0,2*Math.PI,!1),o.fill()}function wi(o,i,n){if(o==null)return;const s=Math.floor(i.width/1.5);o.fillStyle=ei[n],o.font=`${s}px Minesweeper`,o.textAlign="center",o.textBaseline="middle",o.fillText(n.toString(),i.positionX+i.width/2,i.positionY+i.height/2)}function gi(o,i){if(o==null)return;const n=i.width/5.8,s=i.width/16,t=s*2.8,l=i.positionX+i.width/2,e=i.positionY+i.height/2;o.lineWidth=i.width/14,o.strokeStyle="#000",o.beginPath(),o.moveTo(l,e+s*.8),o.lineTo(l,i.positionY+i.height-s*2.8),o.stroke(),o.fillStyle="#000",o.fillRect(i.positionX+s*2.4,i.positionY+i.height-s*3.6,i.width-s*4.8,t*.5),o.beginPath(),o.moveTo(i.positionX+s*2.4,i.positionY+i.height-s*3.6),o.lineTo(l,e+s*2.2),o.lineTo(i.positionX+i.width-s*2.4,i.positionY+i.height-s*3.6),o.lineTo(i.positionX+s,i.positionY+i.height-s*3.6),o.fill(),o.beginPath(),o.fillStyle=li,o.moveTo(l+i.width/22,e+s*1.4),o.lineTo(i.positionX+s*2,e-n),o.lineTo(l+i.width/22,i.positionY+s*2),o.lineTo(l+i.width/22,e+s*1.4),o.fill()}function bi(o,i){if(o==null)return;const n=i.width/7,s=i.positionX+i.width/2,t=i.positionY+i.height/2,l=i.width/2-n,e=i.width/5,a=l/3.4,b=Math.PI;o.fillStyle=L,o.beginPath(),o.arc(s,t,l,0,2*b,!1),o.fill(),o.lineWidth=1,o.strokeStyle="#000",o.stroke(),o.beginPath(),o.lineWidth=2,o.arc(s,t,e,b/6,b-b/6,!1),o.stroke(),o.fillStyle="#000",o.fillRect(s-a*2.4,t-a*1.4,a*4.7,a/2),o.beginPath(),o.lineWidth=1,o.arc(s-e/1.6,t-e/2,a,0,b,!1),o.fill(),o.beginPath(),o.lineWidth=1,o.arc(s+e/1.6,t-e/2,a,0,b,!1),o.fill(),o.lineWidth=2,o.beginPath(),o.moveTo(s-a*2.2,t-a*1.4),o.lineTo(s-l,t),o.stroke(),o.beginPath(),o.moveTo(s+a*2.2,t-a*1.4),o.lineTo(s+l,t),o.stroke()}function mi(o,i,n,s,t){if(o!=null)for(let l=0;l<=t;++l)o.strokeStyle=n,o.beginPath(),o.lineWidth=1,o.moveTo(i.positionX+l,i.positionY+i.height-l),o.lineTo(i.positionX+l,i.positionY+l),o.lineTo(i.positionX+i.width-l,i.positionY+l),o.stroke(),o.strokeStyle=s,o.beginPath(),o.lineWidth=1,o.moveTo(i.positionX+l,i.positionY+i.height-l),o.lineTo(i.positionX-l+i.width,i.positionY+i.height-l),o.lineTo(i.positionX-l+i.width,i.positionY+l),o.stroke()}function Pi(o,i){if(o==null)return;const n=i.width/14;o.lineWidth=i.width/10,o.strokeStyle="#DD0000",o.beginPath(),o.moveTo(i.positionX+n,i.positionY+n),o.lineTo(i.positionX+i.width-n,i.positionY+i.height-n),o.stroke(),o.beginPath(),o.moveTo(i.positionX+i.width-n,i.positionY+n),o.lineTo(i.positionX+n,i.positionY+i.height-n),o.stroke(),o.fill()}function Ci(o,i){if(o==null)return;const n=i.width/7,s=i.positionX+i.width/2,t=i.positionY+i.height/2,l=i.width/2-n,e=i.width/5,a=l/7;o.fillStyle=L,o.beginPath(),o.arc(s,t,l,0,2*Math.PI,!1),o.fill(),o.lineWidth=1,o.strokeStyle="#000",o.stroke(),o.beginPath(),o.lineWidth=2,o.arc(s,t+e*1.4,e,-Math.PI+Math.PI/6,-Math.PI/6,!1),o.stroke(),o.fillStyle="#000",o.beginPath(),o.lineWidth=1,o.moveTo(s-e/2-a,t-e/2-a),o.lineTo(s-e/2+a,t-e/2+a),o.moveTo(s-e/2+a,t-e/2-a),o.lineTo(s-e/2-a,t-e/2+a),o.stroke(),o.beginPath(),o.moveTo(s+e/2-a,t-e/2-a),o.lineTo(s+e/2+a,t-e/2+a),o.moveTo(s+e/2+a,t-e/2-a),o.lineTo(s+e/2-a,t-e/2+a),o.stroke()}function V(o,i,n){if(o==null)return;const Q=[n!==1&&n!==4?I:v,n!==5&&n!==6?I:v,n!==2?I:v,n!==1&&n!==4&&n!==7?I:v,n!==1&&n!==3&&n!==4&&n!==5&&n!==7&&n!==9?I:v,n!==1&&n!==2&&n!==3&&n!==7?I:v,n!==0&&n!==1&&n!==7?I:v],h=i.width/8,u=i.width/6,f=2,m=i.height/2,Y=[[[i.positionX+h,i.positionY+h],[i.positionX+i.width-h-f,i.positionY+h],[i.positionX+i.width-h-f-u,i.positionY+h+u],[i.positionX+h+u+f,i.positionY+h+u],[i.positionX+h,i.positionY+h]],[[i.positionX+i.width-h,i.positionY+h],[i.positionX+i.width-h,i.positionY+m-f],[i.positionX+i.width-h-u,i.positionY+m-f-u],[i.positionX+i.width-h-u,i.positionY+h+u],[i.positionX+i.width-h,i.positionY+h]],[[i.positionX+i.width-h,i.positionY+m+f],[i.positionX+i.width-h,i.positionY+i.height-h],[i.positionX+i.width-h-u,i.positionY+i.height-h-u],[i.positionX+i.width-h-u,i.positionY+m+u+f],[i.positionX+i.width-h,i.positionY+m+f]],[[i.positionX+i.width-h-f,i.positionY+i.height-h],[i.positionX+h,i.positionY+i.height-h],[i.positionX+h+u,i.positionY+i.height-h-u],[i.positionX+i.width-h-f-u,i.positionY+i.height-h-u],[i.positionX+i.width-h-f,i.positionY+i.height-h]],[[i.positionX+h,i.positionY+i.height-h-f],[i.positionX+h,i.positionY+m+f],[i.positionX+h+u,i.positionY+m+f+u],[i.positionX+h+u,i.positionY+i.height-h-u-f],[i.positionX+h,i.positionY+i.height-h-f]],[[i.positionX+h,i.positionY+m-f],[i.positionX+h,i.positionY+h+f],[i.positionX+h+u,i.positionY+h+u],[i.positionX+h+u,i.positionY+m-u-f],[i.positionX+h,i.positionY+m-f]],[[i.positionX+h,i.positionY+m],[i.positionX+h+u,i.positionY+m-u/2],[i.positionX+i.width-h-f-u,i.positionY+m-u/2],[i.positionX+i.width-h,i.positionY+m],[i.positionX+i.width-h-f-u,i.positionY+m+u/2],[i.positionX+h+u,i.positionY+m+u/2],[i.positionX+h,i.positionY+m]]];for(let C=0;C<7;++C){o.fillStyle=Q[C],o.beginPath(),o.moveTo(Y[C][0][0],Y[C][0][1]);for(let S=1;S<5;++S)o.lineTo(Y[C][S][0],Y[C][S][1]);C===6&&(o.lineTo(Y[C][5][0],Y[C][5][1]),o.lineTo(Y[C][6][0],Y[C][6][1])),o.fill()}}function _i(o,i,n,s=1){o!=null&&(o.lineWidth=s,o.strokeStyle=n,o.strokeRect(i.positionX,i.positionY,i.width,i.height))}function K(o,i,n){o!=null&&(o.fillStyle=n,o.fillRect(i.positionX,i.positionY,i.width,i.height))}function j(o,i){if(o==null)return;const n=i.width/7,s=i.positionX+i.width/2,t=i.positionY+i.height/2,l=i.width/2-n,e=i.width/5,a=l/8;o.fillStyle=L,o.beginPath(),o.arc(s,t,l,0,2*Math.PI,!1),o.fill(),o.lineWidth=1,o.strokeStyle="#000",o.stroke(),o.beginPath(),o.lineWidth=2,o.arc(s,t,e,Math.PI/6,Math.PI-Math.PI/6,!1),o.stroke(),o.fillStyle="#000",o.beginPath(),o.lineWidth=1,o.arc(s-e/2,t-e/2,a,0,2*Math.PI,!1),o.fill(),o.beginPath(),o.lineWidth=1,o.arc(s+e/2,t-e/2,a,0,2*Math.PI,!1),o.fill()}function q(o,i){if(o==null)return;const n=i.width/7,s=i.positionX+i.width/2,t=i.positionY+i.height/2,l=i.width/2-n,e=i.width/5,a=l/6;o.fillStyle=L,o.beginPath(),o.arc(s,t,l,0,2*Math.PI,!1),o.fill(),o.lineWidth=1,o.strokeStyle="#000",o.stroke(),o.beginPath(),o.lineWidth=1,o.arc(s,t+e/1.8,a*1.4,0,2*Math.PI,!1),o.stroke(),o.fillStyle="#000",o.beginPath(),o.lineWidth=1,o.arc(s-e/2,t-e/2,a,0,2*Math.PI,!1),o.fill(),o.beginPath(),o.lineWidth=1,o.arc(s+e/2,t-e/2,a,0,2*Math.PI,!1),o.fill()}function ci(o,i,n,s){o!=null&&(o.fillStyle=n,o.font=i.font,o.textAlign=i.align,o.textBaseline="middle",o.fillText(s,i.positionX,i.positionY))}function Xi(o,i,n){return{rowIndex:Math.floor((i-n.positionY-P)/(c+1)),columnIndex:Math.floor((o-n.positionX-P)/(c+1)),isLeftButton:!1,state:r.Closed}}function z(o,i){return Math.floor(Math.random()*(i-o+1))+o}class Yi{constructor(){w(this,"canvas");w(this,"_context");this.canvas=document.querySelector(oi),this._context=this.canvas.getContext("2d"),ci(this._context,{positionX:-30,positionY:-30,fontSize:16,font:"16px Minesweeper",align:"left"},"#000","Start game!")}drawRectWithShadow(i,n,s,t,l){K(this._context,i,n),mi(this._context,i,s,t,l)}drawGameForm(i){this.drawRectWithShadow(i.rect,_,F,R,P),this.drawInfoPanel(i.infoPanel),this.drawBombsField(i.bombsField)}drawInfoPanel(i){this.drawRectWithShadow(i.rect,_,R,F,P),this.drawDigitsPanel(i.bombsCounter),this.drawDigitsPanel(i.timer),this.drawSmileButton(i.button)}drawBombsField(i){this.drawRectWithShadow(i.rect,_,R,F,P),this.drawCells(i)}drawCells(i){i.cells.forEach((n,s)=>{n.forEach((t,l)=>{this.drawCell(i,s,l)})})}drawCell(i,n,s){const t=i.getCellRect(n,s),l=i.cells[n][s],e=()=>{this.drawRectWithShadow(t,_,F,R,H)},a=b=>{K(this._context,t,b),_i(this._context,t,si)};switch(l.state){case r.Closed:e();break;case r.Empty:a(_);break;case r.Bomb:a(_),M(this._context,t);break;case r.CurrentBomb:a("#CC0000"),M(this._context,t);break;case r.Flag:e(),gi(this._context,t);break;case r.Digit:a(_),wi(this._context,t,l.value);break;case r.WrongFlag:a(_),M(this._context,t),Pi(this._context,t);break}}drawCellPressed(i,n,s){const t=i.getCellRect(n,s);this.drawRectWithShadow(t,_,R,F,H)}clearCell(i,n,s){const t=i.getCellRect(n,s);U(this._context,t)}clearRect(i){U(this._context,i)}drawDigitsPanel(i){this.drawRectWithShadow(i.rect,ni,R,F,1),this.drawDigits(i.digitRects,i.values)}drawDigits(i,n){i.forEach((s,t)=>{V(this._context,s,n[t])})}drawDigit(i,n){V(this._context,i,n)}drawSmileButton(i,n=X.Happy){switch(this.drawRectWithShadow(i,_,F,R,N),n){case X.Happy:j(this._context,i);break;case X.Surprised:q(this._context,i);break;case X.Dead:Ci(this._context,i);break;case X.CoolFace:bi(this._context,i);break;default:j(this._context,i);break}}drawSmileButtonPressed(i){this.drawRectWithShadow(i,_,R,F,Math.round(N/2)),q(this._context,i)}get canvasRect(){return this.canvas.getBoundingClientRect()}get context(){return this._context}}class Fi{constructor(i,n,s,t,l){w(this,"rect");w(this,"_cells");w(this,"_bombs");w(this,"rowsCount");w(this,"columnsCount");w(this,"bombsCount");this.rowsCount=s,this.columnsCount=t,this.bombsCount=l,this.rect=ai(i,n,s,t),this._bombs=[],this._cells=[],this.reset()}reset(){this._bombs=[],this._cells=[];for(let i=0;i<this.rowsCount;++i){const n=[];for(let s=0;s<this.columnsCount;++s)n.push({state:r.Closed,value:0});this._cells.push(n)}}createBombs(i,n){for(this._bombs=[];this._bombs.length<this.bombsCount;){const s=z(0,this.rowsCount-1),t=z(0,this.columnsCount-1);i!==s&&n!==t&&!this._bombs.some(l=>l.rowIndex===s&&l.columnIndex===t)&&this._bombs.push({rowIndex:s,columnIndex:t})}}isWin(){let i=0;return this._cells.forEach(n=>{n.forEach(s=>{i=s.state===r.Empty||s.state===r.Digit?i+1:i})}),this.rowsCount*this.columnsCount-i===this.bombsCount}isBomb(i,n){var s;return((s=this._bombs)==null?void 0:s.length)===0?!1:this._bombs.some(t=>t.rowIndex===i&&t.columnIndex===n)}openCell(i,n){if(i<0||n<0||i>=this.rowsCount||n>=this.columnsCount||this.isBomb(i,n)||this.getCellState(i,n)!==r.Closed)return;const t=this._bombs.filter(l=>l.rowIndex>i-2&&l.rowIndex<i+2&&l.columnIndex>n-2&&l.columnIndex<n+2).length;if(t>0){const l=this._cells[i][n];l.state=r.Digit,l.value=t;return}this.setCellState(i,n,r.Empty),G(i,n,this.rowsCount,this.columnsCount,(l,e)=>{this.getCellState(l,e)===r.Closed&&this.openCell(l,e)})}getCellState(i,n){return this._cells[i][n].state}openCellAroundDigit(i,n){const s=this.getCellState(i,n);if(console.log("openCellAroundDigit",s),s!==r.Digit)return;const t=[];G(i,n,this.rowsCount,this.columnsCount,(a,b)=>{t.push(this._cells[a][b])});const l=this._cells[i][n].value,e=t.filter(a=>a.state===r.Flag).length;console.log("openCellAroundDigit",l,e)}openBombs(i,n){this._bombs.forEach(s=>{const t=this._cells[s.rowIndex][s.columnIndex];t.state!==r.Bomb&&t.state!==r.Flag&&(t.state=r.Bomb),s.rowIndex===i&&s.columnIndex===n&&(t.state=r.CurrentBomb)}),this._cells.forEach((s,t)=>{s.forEach((l,e)=>{l.state===r.Flag&&!this._bombs.some(a=>a.rowIndex===t&&a.columnIndex===e)&&(l.state=r.WrongFlag)})})}setCellState(i,n,s){this._cells[i][n].state=s}isFieldClick(i,n){return $(i,n,this.rect,P)}clickHanlder(i,n){const s=Xi(i,n,this.rect);return s.state=this.getCellState(s.rowIndex,s.columnIndex),s}getCellRect(i,n){return hi(this.rect.positionX,this.rect.positionY,i,n)}get cells(){return this._cells}get bombs(){return this._bombs}}class Z{constructor(i,n,s,t=0,l=!0){w(this,"rect");w(this,"digitRects");w(this,"_value");w(this,"_initialValue");this._value=t,this._initialValue=t,this.rect=ri(i,n,s,l),this.digitRects=[];for(let e=0;e<3;++e)this.digitRects.push(di(this.rect.positionX,this.rect.positionY,e))}increase(){++this._value}decrease(){--this._value}reset(){this._value=this._initialValue}get values(){if(this._value<0)return[0,0,0];if(this._value>999)return[9,9,9];const i=[];let n=100,s=this._value;for(;i.length<3;){const t=Math.trunc(s/n);i.push(t),s=s-t*n,n=n/10}return i}}class Ri{constructor(i,n,s,t,l){w(this,"rect");w(this,"infoPanel");w(this,"bombsField");this.rect=ui(i,n,s,t),this.infoPanel=new Ii(this.rect.positionX,this.rect.positionY,t,l),this.bombsField=new Fi(this.rect.positionX,this.rect.positionY,s,t,l)}reset(){this.infoPanel.timer.reset(),this.infoPanel.bombsCounter.reset(),this.bombsField.reset()}}class Ii{constructor(i,n,s,t){w(this,"rect");w(this,"timer");w(this,"bombsCounter");w(this,"button");this.rect=pi(i,n,s),this.bombsCounter=new Z(this.rect.positionX,this.rect.positionY,this.rect.width,t),this.timer=new Z(this.rect.positionX,this.rect.positionY,this.rect.width,0,!1),this.button=fi(this.rect.positionX,this.rect.positionY,this.rect.width)}isButtonClick(i,n){return $(i,n,this.rect)}}class vi{constructor(i){w(this,"_canvasRect");this._canvasRect=i}getEventHadler(i){const n=this._canvasRect.left,s=this._canvasRect.top;return function(t){const l=t.clientX-n,e=t.clientY-s,a=t.button===0;i(l,e,a)}}}const p=new Yi,J=new vi(p.canvasRect),d=new Ri(p.canvas.width,p.canvas.height,9,9,10);p.drawGameForm(d);let k=!1,g,B=!1,O=0,T=!1;const Di=()=>{d.infoPanel.timer.increase(),p.clearRect(d.infoPanel.timer.rect),p.drawDigitsPanel(d.infoPanel.timer)},Ti=(o,i,n)=>{if(d.infoPanel.isButtonClick(o,i)){B=!0,p.clearRect(d.infoPanel.button),p.drawSmileButtonPressed(d.infoPanel.button);return}if(d.bombsField.isFieldClick(o,i)&&!T)if(g=d.bombsField.clickHanlder(o,i),n){if(g.state!==r.Closed&&g.state!==r.Digit){g=null;return}if(g.state===r.Digit)return;p.clearCell(d.bombsField,g.rowIndex,g.columnIndex),p.drawCellPressed(d.bombsField,g.rowIndex,g.columnIndex),p.clearRect(d.infoPanel.button),p.drawSmileButton(d.infoPanel.button,X.Surprised)}else g.state!==r.Closed&&g.state!==r.Flag&&(g=null)},yi=(o,i,n)=>{if(B){p.clearRect(d.infoPanel.button),p.drawSmileButton(d.infoPanel.button),d.infoPanel.isButtonClick(o,i)&&k&&(clearInterval(O),d.reset(),k=!1,p.drawGameForm(d),T=!1),B=!1;return}if(g!==null&&!T){const s=d.bombsField.clickHanlder(o,i);if(s.rowIndex===g.rowIndex&&s.columnIndex===g.columnIndex){if(console.log("mouseup ",s),n)s.state===r.Closed&&(d.bombsField.isBomb(s.rowIndex,s.columnIndex)?(d.bombsField.openBombs(s.rowIndex,s.columnIndex),clearInterval(O),p.clearRect(d.infoPanel.button),p.drawSmileButton(d.infoPanel.button,X.Dead),T=!0):k&&d.bombsField.openCell(s.rowIndex,s.columnIndex)),s.state===r.Digit&&d.bombsField.openCellAroundDigit(s.rowIndex,s.columnIndex),T||(p.clearRect(d.infoPanel.button),d.bombsField.isWin()?(p.drawSmileButton(d.infoPanel.button,X.CoolFace),T=!0,clearInterval(O)):p.drawSmileButton(d.infoPanel.button,X.Happy));else{let t=r.Closed;g.state===r.Closed&&(t=r.Flag,d.infoPanel.bombsCounter.decrease()),g.state===r.Flag&&(t=r.Closed,d.infoPanel.bombsCounter.increase()),t!==g.state&&(p.clearRect(d.infoPanel.bombsCounter.rect),p.drawDigitsPanel(d.infoPanel.bombsCounter)),d.bombsField.setCellState(s.rowIndex,s.columnIndex,t)}k||(k=!0,O=setInterval(Di,1e3),d.bombsField.createBombs(s.rowIndex,s.columnIndex),d.bombsField.openCell(s.rowIndex,s.columnIndex))}p.clearRect(d.bombsField.rect),p.drawBombsField(d.bombsField)}g=null,B=!1};p.canvas.addEventListener("mousedown",J.getEventHadler(Ti));p.canvas.addEventListener("mouseup",J.getEventHadler(yi));p.canvas.oncontextmenu=o=>{o.preventDefault()};
