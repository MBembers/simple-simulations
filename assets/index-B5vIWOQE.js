var m=Object.defineProperty;var p=(r,t,e)=>t in r?m(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var s=(r,t,e)=>(p(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))h(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&h(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();class f{constructor(t){s(this,"is_playing");s(this,"clear_screen");s(this,"scale");s(this,"objects");this.clear_screen=!0,this.is_playing=!1,this.scale=t,this.objects=[]}addObject(t){this.objects.push(t)}simulate(t){this.objects.forEach(e=>e.simulate(t))}draw(t){this.objects.forEach(e=>e.draw(t,this.scale))}}class o{constructor(t,e,h,i,a,n,c,l,d=0,u=0){s(this,"x0");s(this,"y0");s(this,"l1");s(this,"l2");s(this,"theta1");s(this,"theta2");s(this,"m1");s(this,"m2");s(this,"damping1");s(this,"damping2");s(this,"theta1_v");s(this,"theta2_v");s(this,"period_start");s(this,"color");this.x0=t,this.y0=e,this.l1=h,this.l2=i,this.theta1=a,this.theta2=n,this.m1=c,this.m2=l,this.damping1=d,this.damping2=u,this.theta1_v=0,this.theta2_v=0,this.period_start=0,this.color="white"}set_color(t){this.color=t}start_period(){this.period_start=performance.now()}end_period(){return performance.now()-this.period_start}f_theta1(){return this.theta1_v}f_theta2(){return this.theta2_v}f_theta1_v(t){let h=-9.81*(2*this.m1+this.m2)*Math.sin(this.theta1)-this.m2*9.81*Math.sin(this.theta1-2*this.theta2)-2*Math.sin(this.theta1-this.theta2)*this.m2*(this.theta2_v**2*this.l2+t**2*this.l1*Math.cos(this.theta1-this.theta2));return h=h/(this.l1*2*this.m1+this.m2-this.m2*Math.cos(2*this.theta1-2*this.theta2)),h}f_theta2_v(t){let h=2*Math.sin(this.theta1-this.theta2)*(this.theta1_v**2*this.l1*(this.m1+this.m2)+9.81*(this.m1+this.m2)*Math.cos(this.theta1)+t**2*this.l2*this.m2*Math.cos(this.theta1-this.theta2));return h=h/(this.l2*2*this.m1+this.m2-this.m2*Math.cos(2*this.theta1-2*this.theta2)),h}simulate(t){this.theta1_v+=this.f_theta1_v(this.theta1_v)*t,this.theta2_v+=this.f_theta2_v(this.theta2_v)*t,this.theta1+=this.f_theta1()*t,this.theta2+=this.f_theta2()*t}draw(t,e){t.strokeStyle=this.color,t.fillStyle=this.color,t.lineWidth=2;const h=this.x0+this.l1*Math.sin(this.theta1)*e,i=this.y0+this.l1*Math.cos(this.theta1)*e,a=h+this.l2*Math.sin(this.theta2)*e,n=i+this.l2*Math.cos(this.theta2)*e;t.beginPath(),t.moveTo(this.x0,this.y0),t.lineTo(h,i),t.lineTo(a,n),t.stroke(),t.beginPath(),t.arc(h,i,4,0,2*Math.PI),t.fill(),t.beginPath(),t.arc(a,n,4,0,2*Math.PI),t.fill()}acceleration1(){return 0}}class _{constructor(){s(this,"canvas");s(this,"ctx");s(this,"fps_label");s(this,"start_button");s(this,"scene");s(this,"prev_t");this.canvas=document.querySelector("#sim-canvas"),this.fps_label=document.querySelector("#fps"),this.start_button=document.querySelector("#start-btn"),this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.scene=new f(180),this.prev_t=0,this.setupControls(),this.setupScene()}update(){let t=(performance.now()-this.prev_t)/1e3;this.prev_t=performance.now();let e=1/t,h=performance.now();this.scene.is_playing&&this.scene.simulate(t);let i=performance.now()-h;h=performance.now(),this.scene.is_playing&&this.draw();let a=performance.now()-h;this.fps_label.innerHTML=`FPS: ${e.toFixed(0)} Calc time: ${i.toFixed(2)}ms Draw time: ${a.toFixed(0)}ms`,requestAnimationFrame(()=>this.update())}draw(){this.scene.clear_screen&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="white",this.scene.draw(this.ctx)}setupScene(){let t=new o(this.canvas.width/2,this.canvas.height/2,1,1,Math.PI/2,Math.PI/2,1,1);t.set_color("red"),this.scene.addObject(t);let e=new o(this.canvas.width/2,this.canvas.height/2,1,1,Math.PI/2+.001,Math.PI/2,1,1);e.set_color("blue"),this.scene.addObject(e)}setupControls(){this.start_button.onclick=()=>{this.scene.is_playing=!this.scene.is_playing,this.start_button.innerHTML=this.scene.is_playing?"Pause":"Start"}}start(){this.update()}}document.querySelector("#app").innerHTML=`
  <div class="main">
    <canvas id="sim-canvas" width="700" height="700"></canvas>
    <div class="side-right sidebar">
      <button id="start-btn">Start</button>
      <button id="clear-btn">Clear</button>
      <div id="fps">FPS: 0</div>
    </div>
  </div>
`;const v=new _;v.start();