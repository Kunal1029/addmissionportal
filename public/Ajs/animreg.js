var tl = gsap.timeline();
tl
   
   .from(".row .row1",{
    opacity:0,
      y:20,
      duration: 1
   })
   .from(".fom .gs1 ",{
    opacity:0,
    y:20,
    duration:1 // blur bottom to top full
    // delay: -1
 })
 .from(".h3 h3",{
    y:20,
    opacity:0,
    delay : "-1",
    duration: 1
 })
 .from(".gform",{
    y:-60,
    scale:1.6,
    opacity:0,
    duration:1,
    delay:"-1", 
 })
 .from("form .g5",{
    x:-60,
    scale:1.6,
    opacity:0,
    duration:1,
    delay:"-1", 
 })
 .from("form .g6",{
    x:-60,
    scale:1.6,
    opacity:0,
    // duration:1,
    delay:"-1", 
 })
 .from("form .log",{
    x:-60,
    scale:1.6,
    opacity:0,
    // duration:1,
    delay:"-1", 
 })
 ;