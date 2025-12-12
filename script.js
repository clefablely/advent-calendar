const TEST_MODE = false;  

const eu_tz = "Europe/Berlin";

const paths = {
  christmas_music: "music/christmas.mp3",
  key_sound: "sounds/key.mp3",
  day1: "gifts/day1.mp4", 
  day3_playlist: "https://open.spotify.com/playlist/5FeCehGOmJYMZCm67VjCIQ?si=613f487100754e06&pt=4e59c0b9372fdff34c11022e22efe285",
  day6_image: "gifts/day6.jpeg",
  day8_image: "gifts/eyes.jpeg",
  day12_audio: "gifts/njoc_cover.mp3",
  day10_link: "https://notion.so"
};

const bgMusic = new Audio(paths.christmas_music);
bgMusic.loop = true;
bgMusic.volume = 0.22;

const keySound = new Audio(paths.key_sound);
keySound.volume = 0.9;

let bgStarted = false;

window.addEventListener("load", () => {
  bgMusic.play().then(() => { bgStarted = true; }).catch(()=>{});
});

function nowInEurope() {
  const str = new Date().toLocaleString("en-GB", { timeZone: eu_tz });
  return new Date(str);
}

function unlockDateForDoor(day) {
  const year = new Date().getFullYear();
  const month = 11; 
  const date = 12 + day; 
  const nowEu = nowInEurope();
  const d = new Date(nowEu);
  d.setFullYear(year);
  d.setMonth(month);
  d.setDate(date);
  d.setHours(0,0,0,0);
  return d;
}

function doorIsUnlocked(day) {
  if (TEST_MODE) return true;
  const now = nowInEurope();
  const unlock = unlockDateForDoor(day);
  return now >= unlock;
}

function showReward(html) {
  const modal = document.getElementById("reward-modal");
  const box = document.getElementById("reward-content");
  box.innerHTML = html;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeReward() {
  const modal = document.getElementById("reward-modal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  const box = document.getElementById("reward-content");
  box.querySelectorAll("video,audio").forEach(media => {
    try { media.pause(); media.currentTime = 0; } catch(e){}
  });
}

document.getElementById("close-reward").addEventListener("click", closeReward);
document.getElementById("reward-modal").addEventListener("click", (e) => {
  if (e.target.id === "reward-modal") closeReward();
});

function ensureBgMusicOnInteraction() {
  if (!bgStarted) {
    bgMusic.play().then(()=>{ bgStarted = true; }).catch(()=>{});
  }
}
document.addEventListener("click", ensureBgMusicOnInteraction, { once: true, capture: true });

let day12specialAudio = null;

function openReward(day) {
  if (day !== 12 && day12specialAudio) {
    try { day12specialAudio.pause(); day12specialAudio.currentTime = 0; } catch(e){}
    if (bgMusic.paused) bgMusic.play().catch(()=>{});
  }

  switch(day) {
 case 1:
  showReward(`
    <div style="text-align:center;font-family:'christmas',sans-serif;">
      <p>sorry, this one kind of sucks :( it also made me lower the quality to fit on a github site..</p>
      <div style="max-width:820px;margin:0 auto;">
        <video id="day1video" src="${paths.day1}" style="width:100%;border-radius:8px;background:#000" preload="metadata"></video>
        <button id="play-day1" style="margin-top:10px;padding:10px 14px;border-radius:8px;border:none;background:var(--lilac);color:#fff;cursor:pointer">click to watch</button>
      </div>
    </div>
  `);

  const btn = document.getElementById("play-day1");
  const vid = document.getElementById("day1video");

  btn.addEventListener("click", () => {
    ensureBgMusicOnInteraction();

    try { bgMusic.pause(); } catch(e){}

    vid.play().catch(()=>{});

    vid.addEventListener("ended", () => {
      try { bgMusic.play().catch(()=>{}); } catch(e){}
    });

    btn.style.display = "none";
  });

  return;

    case 2:
      showReward(`<p>first day of writing, first compliment. sigh. feeding your ego, i guess. you care a lot, you do your best to tend to everyone’s needs. although that can be positive, try to remember that that isn’t always achievable. you can’t always please everyone, so try to at least please yourself. i’ll give a second thing since that was a bit ehh. your presence alone is a joy. i know a lot of people agree, i’m sure you know it too. you should try to enjoy it sometime, you’ll find that you’re great company. comfortable. you're so easy to talk to and enjoy the company of. not overwhelming, not boring, a perfect middle that is almost impossible to find. aren't i lucky to have met such a person? also, please do note, even in your absence you’re a treasured soul. you don’t need to have a constant presence to mean something, you don’t need to be visible to be remembered. you’re my first and last thought of every day and god knows that you aren’t right fucking next to me. don’t let anyone bother you over taking space, and if you’re tired to argue i am more than happy to step up. (be flattered, i rarely argue with people.)</p>`);
      return;

    case 3:
      showReward(`<p>here's a little something. very little something. songs that remind me of you/us (positive only)</p><p><a href="${paths.day3_playlist}" target="_blank" rel="noopener" style="color:var(--lilac)">listen here</a></p>`);
      return;

    case 4:
      showReward(`<p>you often say that you aren't witty anymore, but can i just completely disagree with you? don't think things between us are too great at the time of writing (091225), yet you're still managing to slip your humour into the simplest things. you used to make me laugh a lot, i was always giggling like a fucking loser. you still have that ability, a little brainfog won't stop the great katzerro. this is completely unrelated but i wrote this thinking it fit and need to add it in. thinking about how sweet you were when i had my krp concerns. i can’t believe i was ever scared to mention it. you were so patient, calm and clear with it all. i’m so, so glad to have met you. i hope you stay in my life for a long time. please do, those six months were agonising. and i was still spamming the notion.. i'll get a little serious for a second. don't get used to it. i'm not good at talking when i'm upset. i've always been a big cry baby. growing up, that was something i got scolded for pretty often. my hurt was treated like a crime, as if i'd snatched the queen's jewels right before her eyes. naturally, opening up now is pretty hard. i struggle to recognise if my pain is even valid, hence the need to torture myself until i can accept that being upset is allowed. thank you for allowing me to feel safe enough to open up, even over something so trivial. i appreciate it more than you know. yeah i'm just gonna start flirting with you in these from now on ahaha.. sorry about that</p>`);
      return;

    case 5:
      showReward(`<p>roses are red,<br>violets are blue,<br>hi i love you</p>`);
      return;

    case 6:
      showReward(`<p>for you:</p><img src="${paths.day6_image}" alt="day 6 image" />`);
      return;

    case 7:
      showReward(`<p>okay! this one is a little roleplay/writing compliment. take it however you wish, it applies to a lot of things. i find your characters so interesting (as proven with my numerous crash outs establishing how badly i needed to interact with you.) the general style of them is always so.. different. i find it incredible that you can create such varied characters, even making clear differences in their speech, interactions, etc. your portrayal of characters is so fascinating. i only really stick to making loser characters, i normally stick to a format too, but you always create something different. the way you show off your creativity through said characters is an amazing sight too. this is me complimenting your stories. the effort that goes into them is directly reflected through the beauty that they are. it's a shame you drop your accounts, it'd be nice to see them fully fleshed out. it'd be a lot to keep up with though, can't blame you.</p>`);
      return;

    case 8:
      showReward(`
        <div id="jigsaw-container" style="font-family:'Christmas',sans-serif">
          <h2 style="font-family:'Amore',sans-serif;color:var(--lilac)">a personalised jigsaw puzzle! bet you've never had one of those, huh? heheh</h2>
          <div id="jigsaw-board"></div>
          <div id="jigsaw-pieces"></div>
          <p id="jigsaw-hint" style="color:var(--muted)">put our eyes together!</p>
        </div>
      `);
      setTimeout(() => startJigsaw(), 60);
      return;

    case 9:
      showReward(`<p>hey handsome</p>`);
      return;

    case 10:
      showReward(`<p>my birthday! yay! remember that Monet calendar i showed you? enjoy this! please use it at least a little, i worked hard on it. <3</p><p><a href="${paths.day10_link}" target="_blank" rel="noopener">${paths.day10_link}</a></p>`);
      return;

    case 11:
      showReward(`<p> think this one will be the main message from this calendar, tomorrow is more of a gift thing. i had the idea for it since like.. october. anyway! you make me happy. like, really happy. loving someone wholeheartedly is a blessing, thank you for letting me love you. i’m sorry if it’s a lot sometimes, and i truly hope i don’t make you uncomfortable or anything. i’m happy if you are happy, i don’t expect anything from you either. not romantically, nothing like that. all i want is for you to be happy, that is what i committed myself to back in september and i stand by that. talking to you is the highlight of my day, thinking of you warms my soul. you bring a light to my life that i haven’t had before, and you deserve so much joy for yourself too. i hope this calendar has made you feel a little better this month, i know it hasn’t been good for you. you’ll hold on though, right? you can get through this, you have before. your mom is there with you, i’ll come hold your hand next christmas. i’ll smother it in kisses too, if you’d let me. but i am here now too, as long as you’ll have me. i do hope you’ll keep me around. but you’re doing well, so so well. i’m proud of you, you should be proud of you too. sorry, this went very off track. you have beautiful eyes. i don’t actually have a thing for eyes, never once got the hype, but yours? when you told me they were green, i got a little excited already. “different!” i don’t know many people with green eyes. when you showed me them, i think my heart melted. don’t get me wrong, i’m a loser. i get a little swoony at a lot of things. what i couldn’t predict though would be how fucking stunning they are. how are you not permanently gazing into a mirror? your pretty eyes and glasses? you’re an entire dream come true. i wish i could narrow down your list of attributes to just one thing, one reason as to why i’m so.. disgustingly enamoured by you, but i think that’s impossible. you are just so.. you. i’ve never met someone like you, and i doubt i will again. everything about you is so perfectly unique. i don’t think i’ll ever be able to move on if i hyper fixate on it right now. well. the way you turn on caps lock to express your joy, the way you type (literate), the cute doodles you send, you beautiful beautiful eyes, meowmeow whom i could love more than koko, your adorable selection of gifs (though i do miss some old ones), the way you get so invested in the things that you love, the way you’re passionate in the things that bother you, the way you style yourself, the way your mind works miracles through the ways you display your creativity and intellect. i could go on for hours about why you being.. you is just so amazing, but i won’t. this is pretty long already and you have a christmas to enjoy. you also have a me to enjoy. please come and enjoy me. i miss you. </p>`);
      return;

    case 12:
      try { bgMusic.pause(); } catch(e){}
      day12specialAudio = new Audio(paths.day12_audio);
      day12specialAudio.volume = 0.95;
      day12specialAudio.play().catch(()=>{});
      showReward(`<p>hi :) this one took a lot, please be nice ♡
but merry christmas, have a wonderful day. i’m sorry that this month wasn’t too great (atleast as of when i’m writing this..) but i hope to make the rest of your winter a little jolly. we have to get married, remember? 
love you always, 
aisha.</p>`);
      return;

    default:
      showReward(`<p>not configured yet</p>`);
  }
}

function initDoors() {
  document.querySelectorAll(".door").forEach(door => {
    const day = parseInt(door.dataset.day, 10);

    if (TEST_MODE) {
      door.classList.remove("locked");
      door.classList.add("unlocked");
    } else {
      if (doorIsUnlocked(day)) {
        door.classList.remove("locked");
        door.classList.add("unlocked");
      } else {
        door.classList.add("locked");
        door.classList.remove("unlocked");
      }
    }

    door.addEventListener("click", () => {
      try { keySound.currentTime = 0; keySound.play().catch(()=>{}); } catch(e){}
      ensureBgMusicOnInteraction();

      if (!TEST_MODE && !doorIsUnlocked(day)) {
        const unlock = unlockDateForDoor(day);
        const dateStr = unlock.toLocaleString("en-GB", { timeZone: eu_tz, hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
        showReward(`<p>ah-ah, not so fast! this door opens on ${dateStr}.</p>`);
        return;
      }

      openReward(day);
      door.classList.add("opened");
    });
  });
}

function startJigsaw() {
  const rows = 4;
  const cols = 9;
  const total = rows * cols;
  const image = paths.day8_image;

  const board = document.getElementById("jigsaw-board");
  const piecesArea = document.getElementById("jigsaw-pieces");
  board.innerHTML = "";
  piecesArea.innerHTML = "";

  const gap = 6;
  const padding = 6;
  const boardWidth = 540;
  const boardHeight = boardWidth * (1377 / 4006) + (rows - 1) * gap + padding * 2;
  board.style.width = boardWidth + "px";
  board.style.height = boardHeight + "px";

  const pieceWidth = (boardWidth - (cols - 1) * gap - padding * 2) / cols;
  const pieceHeight = (boardHeight - (rows - 1) * gap - padding * 2) / rows;

  for (let i = 0; i < total; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.correct = i;
    slot.style.width = pieceWidth + "px";
    slot.style.height = pieceHeight + "px";
    board.appendChild(slot);
  }

  const indexes = [...Array(total).keys()];
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  indexes.forEach(idx => {
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.draggable = true;
    piece.dataset.index = idx;

    const x = (idx % cols) * -pieceWidth;
    const y = Math.floor(idx / cols) * -pieceHeight;

    piece.style.width = pieceWidth + "px";
    piece.style.height = pieceHeight + "px";
    piece.style.backgroundImage = `url(${image})`;
    piece.style.backgroundPosition = `${x}px ${y}px`;
    piece.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;

    piecesArea.appendChild(piece);
  });

  setupDragEvents();
}

function setupDragEvents() {
  const pieces = document.querySelectorAll(".piece");
  const slots = document.querySelectorAll(".slot");
  let dragged = null;

  pieces.forEach(p => {
    p.addEventListener("dragstart", () => { dragged = p; setTimeout(()=>p.style.opacity="0.6",20); });
    p.addEventListener("dragend", () => { dragged=null; pieces.forEach(x=>x.style.opacity="1"); });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", () => {
      if (!dragged) return;
      const existing = slot.firstElementChild;
      if (existing) document.getElementById("jigsaw-pieces").appendChild(existing);
      slot.appendChild(dragged);
      dragged.style.position="static";
      dragged.style.margin="0";
      checkJigsawComplete();
    });
  });
}

function checkJigsawComplete() {
  const slots = document.querySelectorAll(".slot");
  for (let slot of slots) {
    const piece = slot.firstElementChild;
    if (!piece) return;
    if (piece.dataset.index !== slot.dataset.correct) return;
  }
  const hint = document.getElementById("jigsaw-hint");
  if (hint) hint.textContent = "good job!!!!";
  setTimeout(() => {
    showReward(`<p>oh my god!!!! you did it! it was hard, right? now come spend time with me :D i'm getting old and frail, what if i die? come spend time with me.</p>`);
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => { initDoors(); });
