const $ = id => document.getElementById(id);

const canvas = $("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let shootingStars = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];

  for(let i = 0; i < 190; i++){
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      alpha: .35 + Math.random() * .65,
      speed: .08 + Math.random() * .16
    });
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(star=>{
    star.y += star.speed;

    if(star.y > canvas.height){
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });

  if(Math.random() < .003){
    shootingStars.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height*.4,
      life:48
    });
  }

  shootingStars.forEach((star,index)=>{
    ctx.strokeStyle = `rgba(247,231,190,${star.life/48})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x,star.y);
    ctx.lineTo(star.x-85,star.y-36);
    ctx.stroke();

    star.x += 7;
    star.y += 3;
    star.life--;

    if(star.life <= 0){
      shootingStars.splice(index,1);
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();

function showScene(scene){
  document.querySelectorAll(".scene").forEach(item=>{
    item.classList.remove("active");
  });

  scene.classList.add("active");
  scene.scrollTop = 0;
}

/* MÚSICA */

const music = $("bgMusic");
const musicButton = $("musicButton");
let musicStarted = false;

function startMusic(){
  if(musicStarted) return;

  musicStarted = true;
  music.volume = 0;

  music.play().catch(()=>{
    musicStarted = false;
  });

  let volume = 0;
  const fade = setInterval(()=>{
    volume += .02;

    if(volume >= .34){
      volume = .34;
      clearInterval(fade);
    }

    music.volume = volume;
  },180);
}

musicButton.addEventListener("click",()=>{
  if(!musicStarted){
    startMusic();
    musicButton.textContent = "♫";
    return;
  }

  if(music.paused){
    music.play();
    musicButton.textContent = "♫";
  }else{
    music.pause();
    musicButton.textContent = "🔇";
  }
});

/* INTRO */

const introText = $("introText");
const william = $("william");
const thanks = $("thanks");
const thanksEnglish = $("thanksEnglish");
const startButton = $("startButton");

setTimeout(()=>introText.classList.add("show"),900);
setTimeout(typeWilliam,4800);

const williamText = "William...";
let williamIndex = 0;

function typeWilliam(){
  william.classList.add("show");
  william.innerHTML = "";

  const typing = setInterval(()=>{
    william.innerHTML += williamText.charAt(williamIndex);
    williamIndex++;

    if(williamIndex === williamText.length){
      clearInterval(typing);
      setTimeout(showThanks,650);
    }
  },170);
}

function showThanks(){
  thanks.textContent = "Gracias por existir.";
  thanks.classList.add("show");

  setTimeout(()=>{
    thanksEnglish.textContent = "Thank you for existing.";
    thanksEnglish.classList.add("show");
  },650);

  setTimeout(()=>startButton.classList.add("show"),1300);
}

startButton.addEventListener("click",()=>{
  startMusic();
  startButton.classList.add("to-star");

  setTimeout(()=>{
    showScene($("envelopeScene"));
    setTimeout(()=>$("message1").classList.add("show"),600);
    setTimeout(()=>$("message2").classList.add("show"),1600);
    setTimeout(()=>$("envelope").classList.add("show"),2600);
  },1700);
});

/* SOBRE Y CARTA */

const carta = `Mi amor:

Si estás leyendo esto, es porque decidiste abrir este pequeño rincón de mi corazón. Y creo que no había una mejor forma de celebrar tu existencia que regalándote un lugar donde siempre puedas volver cuando quieras recordar cuánto significas para mí.

Yo no estaba buscando enamorarme. No estaba esperando que alguien llegara a cambiar tantas cosas dentro de mí. Pero entonces apareciste tú, con esa perseverancia tan tuya, con esa encantadora insistencia que poco a poco fue derribando cada uno de mis miedos.

Sin darme cuenta, comprendí que eras todo aquello que, en el fondo, siempre había querido encontrar.

Hoy admiro muchas cosas de ti, pero hay una que siempre me hace sonreír: tu pasión por el fútbol. Para muchas personas el fútbol es solo un deporte; para mí, pensar en fútbol es pensar en William.

Me encanta ver cómo tu rostro se ilumina cuando hablas de aquello que amas. Verte emocionarte por el fútbol me recuerda todos los días la hermosa persona que eres.

Cuando estoy contigo me siento como una niña pequeña: mimada, consentida, protegida, amada y deseada. Contigo encuentro a mi mejor amigo, pero también al hombre que todavía consigue hacerme suspirar con un abrazo, una mirada o una simple sonrisa.

Gracias por aparecer en mi vida. Gracias por no rendirte cuando quizá yo todavía no sabía que también necesitaba encontrarte. Gracias por hacerme descubrir una forma de amar que no conocía. Y, sobre todo, gracias por devolverme la idea de enamorarme.

Deseo que nunca dejes de creer en ti, porque eres mucho más fuerte y mucho más valioso de lo que a veces alcanzas a ver.

Este regalo no pretende ser perfecto. Solo quiere recordarte algo que espero nunca olvides:

Tu existencia cambió mi vida para siempre.

Gracias por existir.`;

const firma = `Con todo mi corazón,\nTu Zully ❤️`;

$("envelope").addEventListener("click",()=>{
  $("envelope").classList.add("open");

  setTimeout(()=>{
    showScene($("letterScene"));
    typeLetter();
  },1500);
});

function typeLetter(){
  let index = 0;
  $("letterText").innerHTML = "";
  $("letterSignature").innerHTML = "";

  const typing = setInterval(()=>{
    const char = carta.charAt(index);
    $("letterText").innerHTML += char === "\n" ? "<br>" : char;
    index++;

    if(index >= carta.length){
      clearInterval(typing);

      setTimeout(()=>{
        $("letterSignature").innerHTML = firma.replace("\n","<br>");
        $("letterContinue").classList.remove("hidden");
      },700);
    }
  },18);
}

$("letterContinue").addEventListener("click",startMemories);

/* RECUERDOS */

const memories = [
  ["foto01.jpeg","Nuestro primer viaje","Aquel día todavía no lo sabíamos... pero aquí empezaba una historia que cambiaría mi vida para siempre."],
  ["foto02.jpeg","Un lugar nuevo","Descubrí un lugar nuevo… pero lo más bonito fue descubrirlo contigo."],
  ["foto03.jpeg","Nuestro primer road trip","Ojalá aquel no haya sido nuestro primer y último viaje por carretera, porque contigo cualquier camino vale la pena."],
  ["foto04.jpeg","Paisajes","Conocí paisajes hermosos… pero mi vista favorita siempre terminó siendo tú."],
  ["foto05.jpeg","Una caminata","Quién diría que un plan tan simple podía convertirse en uno de mis recuerdos más felices."],
  ["foto06.jpeg","Nuevas experiencias","Gracias por volver a vivir experiencias que ya conocías, solo para hacerme feliz viviéndolas conmigo."],
  ["foto07.jpeg","Tú siendo tú","No necesito grandes momentos. Mi lugar favorito siempre será la versión más auténtica de ti."],
  ["foto08.jpeg","Una cena","No recuerdo exactamente qué cenamos… pero sí recuerdo lo feliz que era compartiendo ese momento contigo."],
  ["foto09.jpeg","Una maravilla del mundo","Conocí una maravilla del mundo… pero la verdadera suerte fue vivir ese momento a tu lado."],
  ["foto10.jpeg","Agua helada","Gracias por seguir cada una de mis ideas, incluso aquellas que incluían agua helada, solo porque sabías que me harían feliz."],
  ["foto11.jpeg","Tu pasión","Gracias por compartir conmigo la pasión que hace brillar tus ojos. El fútbol siempre me recordará a ti."],
  ["foto12.jpeg","El fin del mundo","Desde el principio te hablé de un sueño: conocer el fin del mundo. Nunca imaginé que ese sueño se cumpliría de tu mano. Y si la vida nos lo permite, me encantaría seguir descubriendo el mundo contigo, un lugar a la vez."]
];

let currentMemory = 0;

function startMemories(){
  showScene($("memoriesScene"));
  $("memoryStack").innerHTML = "";
  currentMemory = 0;

  setTimeout(()=>$("memoryIntro1").classList.add("show"),500);
  setTimeout(()=>$("memoryIntro2").classList.add("show"),1300);
  setTimeout(()=>{
    renderMemory();
    $("memoryControls").classList.remove("hidden");
  },2100);
}

function renderMemory(){
  const memory = memories[currentMemory];

  $("memoryStack").innerHTML = `
    <div class="polaroid">
      <img src="img/recuerdos/${memory[0]}" alt="${memory[1]}">
      <h3>${memory[1]}</h3>
      <p>${memory[2]}</p>
    </div>
  `;

  $("prevMemory").disabled = currentMemory === 0;
  $("nextMemory").textContent =
    currentMemory === memories.length - 1
      ? "Terminar recuerdos / Finish"
      : "Siguiente / Next →";
}

$("prevMemory").addEventListener("click",()=>{
  if(currentMemory > 0){
    currentMemory--;
    renderMemory();
  }
});

$("nextMemory").addEventListener("click",()=>{
  if(currentMemory < memories.length - 1){
    currentMemory++;
    renderMemory();
  }else{
    $("memoryControls").classList.add("hidden");
    $("memoryFinalText").textContent =
      "...porque todavía quiero seguir creando recuerdos contigo.";
    $("memoryFinalText").classList.add("show");
    $("memoriesContinue").classList.remove("hidden");
  }
});

$("memoriesContinue").addEventListener("click",startDreams);

/* SUEÑOS */

const dreams = [
  "Quiero recorrer el mundo contigo.",
  "Quiero construir un hogar donde siempre sintamos paz.",
  "Quiero casarme contigo.",
  "Quiero que algún día conozcamos a una pequeña Wen.",
  "Quiero construir una familia llena de amor.",
  "Quiero despertar cada mañana a tu lado.",
  "Quiero seguir cocinando contigo, incluso cuando alguna receta no salga perfecta.",
  "Quiero seguir celebrando cada cumpleaños contigo, sin importar cuántos pasen.",
  "Quiero seguir viviendo muchas primeras veces a tu lado.",
  "Quiero que siempre seamos el lugar seguro del otro.",
  "Quiero seguir jugando, riendo y siendo niños cuando estemos juntos.",
  "Quiero llegar a viejitos tomándote de la mano.",
  "Deseo que nunca dejes de ser tú.",
  "Deseo que siempre encuentres motivos para sonreír.",
  "Deseo que nunca dejes de creer en el amor.",
  "Deseo que cumplas cada uno de tus sueños.",
  "Deseo que siempre te permitas amar y ser amado.",
  "Mi mayor deseo es que algún día podamos construir el hogar que tantas veces imaginamos.",
  "Quiero una vida donde podamos mirar atrás y recordar momentos increíbles.",
  "Y que, después de todo este tiempo, podamos seguir eligiéndonos. Cada día."
];

const dreamPositions = [
  [8,20],[24,8],[42,18],[62,10],[80,24],
  [14,48],[34,40],[52,52],[70,42],[88,55],
  [18,78],[38,70],[58,76],[76,72],[48,30],
  [28,58],[68,62],[50,8],[10,62],[84,82]
];

const heartPositions = [
  [50,18],[36,24],[64,24],[26,36],[74,36],[22,52],[78,52],
  [28,66],[72,66],[38,78],[62,78],[50,90],[42,36],[58,36],
  [34,50],[66,50],[42,64],[58,64],[50,72]
];

let selectedDreams = 0;
let heartCreated = false;

function startDreams(){
  showScene($("dreamsScene"));
  $("dreamSky").innerHTML = "";
  $("dreamText").textContent = "";
  $("dreamText").classList.remove("show");
  selectedDreams = 0;
  heartCreated = false;

  setTimeout(()=>$("dreamIntro1").classList.add("show"),500);
  setTimeout(()=>$("dreamIntro2").classList.add("show"),1300);
  setTimeout(createDreamStars,2100);
}

function createDreamStars(){
  dreams.forEach((dream,index)=>{
    const star = document.createElement("div");
    star.className = "dream-star";
    star.style.left = dreamPositions[index][0] + "%";
    star.style.top = dreamPositions[index][1] + "%";

    star.addEventListener("click",()=>{
      if(!star.classList.contains("selected")){
        star.classList.add("selected");
        selectedDreams++;
      }

      showDreamText(dream);

      if(selectedDreams === dreams.length && !heartCreated){
        heartCreated = true;
        setTimeout(createHeart,1000);
      }
    });

    $("dreamSky").appendChild(star);
    setTimeout(()=>star.classList.add("show"),index*110);
  });
}

function showDreamText(text){
  $("dreamText").classList.remove("show");

  setTimeout(()=>{
    $("dreamText").textContent = text;
    $("dreamText").classList.add("show");
  },220);
}

function createHeart(){
  const dreamStars = [...document.querySelectorAll(".dream-star")];

  dreamStars.forEach((star,index)=>{
    const target = heartPositions[index % heartPositions.length];
    star.style.left = target[0] + "%";
    star.style.top = target[1] + "%";
  });

  setTimeout(()=>{
    showDreamText("Mi mayor deseo es seguir eligiéndonos. Cada día.");
  },2400);

  setTimeout(()=>{
    $("dreamsContinue").classList.remove("hidden");
  },3800);
}

$("dreamsContinue").addEventListener("click",startBirthday);

/* CUMPLEAÑOS */

function startBirthday(){
  showScene($("birthdayScene"));

  setTimeout(()=>$("birthdayIntro").classList.add("show"),500);
  setTimeout(()=>$("birthdayIntro2").classList.add("show"),1300);
  setTimeout(()=>$("cakeBox").classList.add("show"),2200);
  setTimeout(()=>$("happyBirthday").classList.add("show"),3000);
  setTimeout(()=>$("wishButton").classList.add("show"),3800);
}

$("wishButton").addEventListener("click",()=>{
  document.querySelectorAll(".flame").forEach(flame=>{
    flame.classList.add("off");
  });

  $("wishButton").classList.add("hidden");

  setTimeout(()=>{
    $("wishMessage").innerHTML =
      `Mi deseo ya se cumplió...<br><br>
       Porque te conocí.<br>
       <span class="english-line">My wish already came true... because I met you.</span>`;
    $("wishMessage").classList.add("show");
  },700);

  setTimeout(()=>{
    $("birthdayContinue").classList.remove("hidden");
  },1800);
});

$("birthdayContinue").addEventListener("click",startHeartRoom);

/* RINCÓN DEL CORAZÓN */

const reasons = [
  "Porque nunca dejaste de intentarlo.",
  "Porque me haces sentir en paz.",
  "Porque me haces reír incluso cuando no tengo ganas.",
  "Porque encontraste una forma única de llamarme... Tu Zully.",
  "Porque me devolviste las ganas de un futuro.",
  "Porque me hiciste ilusionar con una mini Wen.",
  "Porque viste más que el físico.",
  "Porque me conquistaste antes de besarme.",
  "Porque eres mi amigo.",
  "Porque lo sigues intentando.",
  "Porque sigues aquí.",
  "Porque tus besos me acarician el alma.",
  "Porque me haces ser cursi.",
  "Porque me haces sentir amada.",
  "Porque me haces sentir deseada.",
  "Porque contigo el tiempo no se detiene.",
  "Porque podemos hablar como loritos.",
  "Porque no me dejas dormir enojada.",
  "Porque me mimas.",
  "Porque intentas conocerme más.",
  "Porque me has llenado de recuerdos.",
  "Porque exploraste conmigo un lugar que quería conocer.",
  "Porque no te importa repetir el plan.",
  "Porque prefieres verme feliz.",
  "Porque intentas ser feliz.",
  "Por amarme.",
  "Por aconsejarme.",
  "Por acariciarme.",
  "Por acolitarme.",
  "Por soportarme.",
  "Porque me escribes cartas inesperadamente.",
  "Porque siempre me sorprendes.",
  "Porque escuchas Morat conmigo.",
  "Porque abres tu corazón a mí.",
  "Por tu confianza.",
  "Por tu honestidad.",
  "Por tu cariño.",
  "Por tu calidez.",
  "Por tus besos en mi cara.",
  "Por tus besos en mis manos.",
  "Por no soltar mi mano.",
  "Por cuidarme.",
  "Por hablar incluso cuando deseas callar.",
  "Por ser tú.",
  "Por ser mi fotógrafo.",
  "Por tratar de entenderme.",
  "Por viajar a Guayaquil, aunque no te gusta.",
  "Por ver más que lo superficial.",
  "Por ser mi pareja.",
  "Por tener paciencia."
];

let currentReason = 0;

const changedText = `
Cuando llegaste a mi vida venía de una etapa en la que nunca imaginé volver a encontrar a alguien como tú.<br><br>
No pensé que existiría un hombre tan dulce, que primero quisiera conocer mi corazón antes que fijarse en mi apariencia.<br><br>
No imaginé que llegaría alguien con quien esperaría hablar todos los días, ver películas y volver a ilusionarme con un futuro.<br><br>
Siempre soñé con tener un hogar, pero nunca imaginé que tú formarías parte de ese sueño.<br><br>
Cambiaste también cosas pequeñas. Antes jamás me habría sentado a ver un partido de fútbol; hoy lo hago porque verte disfrutarlo es una de mis formas favoritas de admirarte.<br><br>
Podría pasar horas simplemente mirándote, acariciando tu cabello, llenándote de pequeños besitos... y para mí, ese ya sería un día perfecto.
`;

const secretLetter = `
Si estás leyendo esto otra vez... quizá solo querías recordar un bonito cumpleaños.<br><br>
O quizá la vida ha estado siendo un poco más pesada de lo normal. Si es así, quiero pedirte algo: léelo despacito.<br><br>
No para recordar cuánto te amo, sino para recordar al hombre que siempre he visto en ti.<br><br>
Al hombre que nunca dejó de intentarlo. Al hombre que ama profundamente. Al hombre que cuida. Al hombre que protege. Al hombre que hace reír incluso cuando él mismo tiene preocupaciones.<br><br>
A veces olvidamos quiénes somos. Por eso quise dejarte este pequeño lugar.<br><br>
Para que, cuando tengas dudas, puedas mirarte por un instante con mis ojos.<br><br>
Porque yo nunca he dejado de ver todo lo bueno que existe en ti.<br><br>
Y espero que algún día tú también puedas verlo.<br><br>
Gracias...<br><br>
<strong>Por existir.</strong><br><br>
Tu Zully ❤️
`;

function startHeartRoom(){
  showScene($("heartRoomScene"));

  setTimeout(()=>$("heartRoomTitle").classList.add("show"),500);
  setTimeout(()=>$("heartRoomSubtitle").classList.add("show"),1200);
  setTimeout(()=>$("heartLibrary").classList.add("show"),2100);
  setTimeout(()=>$("goToEpilogue").classList.remove("hidden"),3000);
}

$("bookReasons").addEventListener("click",()=>{
  currentReason = 0;
  openModal("Pequeñas cosas que quizá nunca te dije...",getReasonCard());
  $("nextReason").classList.remove("hidden");
});

$("bookChanges").addEventListener("click",()=>{
  openModal("Lo que cambiaste en mí",changedText);
  $("nextReason").classList.add("hidden");
});

$("bookLetter").addEventListener("click",()=>{
  openModal("Si algún día vuelves aquí...",secretLetter);
  $("nextReason").classList.add("hidden");
});

function getReasonCard(){
  return `
    <div class="reason-card">
      <div>❤️</div>
      <p>${reasons[currentReason]}</p>
    </div>
  `;
}

$("nextReason").addEventListener("click",()=>{
  currentReason = (currentReason + 1) % reasons.length;
  $("modalBody").innerHTML = getReasonCard();
});

function openModal(title,body){
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = body;
  $("bookModal").classList.add("active");
  $("bookModal").setAttribute("aria-hidden","false");
}

$("closeBook").addEventListener("click",()=>{
  $("bookModal").classList.remove("active");
  $("bookModal").setAttribute("aria-hidden","true");
});

$("goToEpilogue").addEventListener("click",startEpilogue);

/* EPÍLOGO */

function startEpilogue(){
  showScene($("epilogueScene"));

  setTimeout(()=>$("epilogueLine1").classList.add("show"),1000);
  setTimeout(()=>$("epilogueLine2").classList.add("show"),2200);
  setTimeout(()=>$("finalThanks").classList.add("show"),4800);
  setTimeout(()=>$("finalThanksEnglish").classList.add("show"),5900);
}
