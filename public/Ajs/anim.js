// gsap.from('#center h1',{
//     opacity:0,
//     duration:2
// }
// )
// gsap.to("#center h1",{
//     color:"red",
//     duration:2
// })




// gsap.from("nav",{
//     y:20,
//     duration:4//bottom to top nav motion
// })
var tl = gsap.timeline();
tl
   
   .from(".rowlogin",{
    opacity:0,
      y:20,
      duration:0.5
   })
   .from(".fom img ",{
    opacity:0,
    y:20,
    duration:0.5 // blur bottom to top full
    // delay:-1,
 })
 .from(".h3 h3",{
    y:20,
    opacity:0,
    delay : "-1",
    duration:0.5
 })
 .from("form .g4",{
    x:-60,
    scale:1.6,
    opacity:0,
   
    // delay:"-1", 
    duration:0.5
 })
 .from("form .g5",{
    x:-60,
    scale:1.6,
    opacity:0,
    duration:0.5,
    // delay:"-1", 
 })
 .from("form .g6",{
    x:-60,
    scale:1.6,
    opacity:0,
    // duration:1,
    // delay:"-1", 
 })
 .from("form .log",{
    x:-60,
    scale:1.6,
    opacity:0,
    // duration:1,
    // delay:"-1", 
 })
 
 
 .from(".cardall .card",{
    scale:0.2,
    opacity:0,
    // delay:-1,
    duration:0.5
 })
//  .to(".cardall .g7",{
//     y:20,
//     yoyo:"true",
//     repeat:"-1"
//  })
//  .to(".sec6 img",{
//     y:20,
//     yoyo:"true", // jump like yoyo
//     repeat:"-1" // infinite loop of jump
//  })
 ;


