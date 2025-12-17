import{j as e,L as t}from"./index-BsWfoasX.js";import{u as l}from"./useRoscoStore-BeiVoP0J.js";import{e as o,f as c,g as m}from"./index-D0syVKdH.js";function h(){const{roscoPlaying:r,clearRoscoPlaying:s}=l(),n=r.every(a=>a.description!=="");return e.jsxs("div",{className:"flex flex-col  lg:flex-row  items-center justify-center h-screen",children:[e.jsxs("div",{className:"md:w-[50%]",children:[e.jsx("h1",{className:"font-extrabold text-[clamp(3.5rem,5vw,5rem)] text-center text-blue-800",children:"Pasapalabras"}),e.jsx("h1",{className:"font-extrabold text-[clamp(3.5rem,5vw,5rem)] text-center text-blue-800",children:"Educativo"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center bg-white shadow-md  rounded-lg gap-2",children:[n&&e.jsxs(t,{to:"/game",className:`\r
          flex items-center gap-2 justify-center text-center\r
          text-white bg-blue-500 font-bold w-90 h-16 rounded-lg\r
          hover:bg-blue-400 hover:text-blue-800\r
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]`,children:[e.jsx(o,{size:45}),"¡Continuar Jugando!"]}),e.jsxs(t,{to:"/game",onClick:()=>{s()},className:`\r
          flex items-center gap-2 justify-center text-center\r
          text-white bg-blue-500 font-bold w-90 h-16 rounded-lg\r
          hover:bg-blue-400 hover:text-blue-800\r
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]`,children:[e.jsx(c,{size:45}),"¡A Jugar!"]}),e.jsxs(t,{to:"/disenio",className:`\r
          flex items-center gap-2 justify-center text-center\r
          text-white bg-cyan-500  font-bold w-90 h-16 rounded-lg\r
          hover:bg-cyan-400 hover:text-cyan-700\r
           md:h-24 md:w-120 text-[clamp(2rem,2.5vw,2.5rem)]`,children:[e.jsx(m,{size:45}),"Crear/Editar Rosco"]})]})]})}export{h as component};
