/* =========================
   CONFIG
========================= */

const CONFIG = {

    studentName:
        "Phạm Thị Ngọc Huyền",

    major:
        "Marketing",

    university:
        "Đại học Văn Lang",

    ceremonyDate:
        "2026-08-09T00:00:00",

    locationName:
        "Trường Đại học Văn Lang - Cơ sở chính",

    locationAddress:
        "69/68 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP.HCM",

    googleMapsLink:
        "https://maps.app.goo.gl/XELCfF6g8D1A1VMp9",

    mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.0067538928224!2d106.70002579999999!3d10.827539600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmcgLSBDxqEgc-G7nyBjaMOtbmg!5e1!3m2!1svi!2s!4v1782317447686!5m2!1svi!2s",

    
};

/* =========================
   WELCOME SCREEN
========================= */

const enterBtn =
document.getElementById(
    "enterSite"
);

const welcomeScreen =
document.getElementById(
    "welcomeScreen"
);

const bgMusic =
document.getElementById(
    "bgMusic"
);

enterBtn.addEventListener(
    "click",
    () => {

        bgMusic.play()
        .catch(err => {

            console.log(
                "Không thể phát nhạc:",
                err
            );

        });

        welcomeScreen.classList.add(
            "hideWelcome"
        );

    }
);

/* =========================
   SCROLL ANIMATION
========================= */

const scenes =
document.querySelectorAll(
    ".scene"
);

const observer =
new IntersectionObserver(

(entries) => {

    entries.forEach(
        entry => {

            if(
                entry.isIntersecting
            ){

                entry.target
                .classList
                .add("show");

            }

        }
    );

},
{
    threshold:0.2
}

);

scenes.forEach(scene => {

    observer.observe(scene);

});
/*==================================================
                COUNTDOWN
==================================================*/

function updateCountdown(){

    const target =
        new Date(CONFIG.ceremonyDate);

    const now =
        new Date();

    const diff =
        target - now;

    const countdown =
        document.getElementById("countdown");

    const graduationDay =
        document.querySelector(".graduation-day");

    if(diff <= 0){

        countdown.innerHTML =

        `
            <div class="today-box">

                🎉

                <h2>
                    Hôm nay là ngày tốt nghiệp!
                </h2>

                <p>
                    Chúc mừng Huyền 🎓💜
                </p>

            </div>
        `;

        if(graduationDay){

            graduationDay.classList.add("today");

        }

        return;

    }

    const days =
        Math.floor(diff/(1000*60*60*24));

    const hours =
        Math.floor(
            (diff%(1000*60*60*24))
            /(1000*60*60)
        );

    const minutes =
        Math.floor(
            (diff%(1000*60*60))
            /(1000*60)
        );

    const seconds =
        Math.floor(
            (diff%(1000*60))
            /1000
        );

    countdown.innerHTML =

    `
        <div class="countdown-grid">

            <div class="count-box">

                <span>${days}</span>

                <small>Ngày</small>

            </div>

            <div class="count-box">

                <span>${hours}</span>

                <small>Giờ</small>

            </div>

            <div class="count-box">

                <span>${minutes}</span>

                <small>Phút</small>

            </div>

            <div class="count-box">

                <span>${seconds}</span>

                <small>Giây</small>

            </div>

        </div>
    `;

    if(graduationDay){

        graduationDay.classList.remove(
            "week-left",
            "day-left",
            "today"
        );

        if(days <= 7){

            graduationDay.classList.add(
                "week-left"
            );

        }

        if(days <= 1){

            graduationDay.classList.remove(
                "week-left"
            );

            graduationDay.classList.add(
                "day-left"
            );

        }

    }

}

updateCountdown();

setInterval(updateCountdown,1000);

/*==================================================
                CONFETTI
==================================================*/

function launchConfetti(){

    if(window.confettiPlayed) return;

    window.confettiPlayed = true;

    for(let i=0;i<120;i++){

        const confetti =
        document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
        Math.random()*100+"vw";

        confetti.style.animationDelay =
        Math.random()*2+"s";

        confetti.style.background =
        ["#EC4899","#F472B6","#A855F7","#FFD6E8"]

        [Math.floor(Math.random()*4)];

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },4000);

    }

}
/* =========================
   MAP
========================= */

document.getElementById("map").innerHTML = `


<div class="map-wrapper">

    <iframe
        src="${CONFIG.mapEmbed}"
        loading="lazy">
    </iframe>

</div>
`;

document.getElementById("rsvpForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "entry.731306202",
        document.getElementById("name").value
    );

    formData.append(
        "entry.1427368111",
        document.getElementById("email").value
    );

    formData.append(
        "entry.1267456834",
        document.getElementById("phone").value
    );

    formData.append(
        "entry.680829365",
        document.getElementById("status").value
    );

    formData.append(
        "entry.1041377157",
        document.getElementById("message").value
    );

    try{

        await fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLScHLK13nIgno3pk4u2rcJ9_DmZv_JQ8UNlUKo46mjGZH2xKcg/formResponse",
            {
                method:"POST",
                mode:"no-cors",
                body:formData
            }
        );

        document.getElementById("rsvpResult").innerHTML = `
            💜 Cảm ơn <strong>${document.getElementById("name").value}</strong>!
            <br>
            Phản hồi của bạn đã được ghi nhận.
        `;

        this.reset();

    }catch(err){

        document.getElementById("rsvpResult").innerHTML =
        "❌ Có lỗi xảy ra, vui lòng thử lại.";

    }

});

/* =========================
   HERO APPEAR
========================= */

window.addEventListener(
    "load",
    () => {

        document
        .querySelector(".hero")
        .classList
        .add("show");

    }
);
/*====================================================
                JOURNEY STORY V2
====================================================*/

const journeySection = document.querySelector(".journey-section");

if (journeySection) {

    const path = document.getElementById("journeyPath");
    const bgPath = document.getElementById("journeyPathBg");

    const cards = document.querySelectorAll(".memory-card");

    const modal = document.getElementById("memoryModal");
    const closeBtn = document.getElementById("closeMemory");

    const title = document.getElementById("memoryTitle");
    const text = document.getElementById("memoryText");
    const image = document.getElementById("memoryImage");

    /*==============================
            PATH
    ==============================*/

    const length = bgPath.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    let currentProgress = 0;
    let targetProgress = 0;

    /*==============================
            MOUSE MOVE
    ==============================*/

    journeySection.addEventListener("mousemove", (e) => {

        const rect = journeySection.getBoundingClientRect();

        targetProgress =

            (e.clientY - rect.top)

            / rect.height;

        targetProgress = Math.max(0, Math.min(1, targetProgress));

    });

    /*==============================
            MOUSE LEAVE
    ==============================*/

    journeySection.addEventListener("mouseleave", () => {

        targetProgress = 0;

    });

    /*==============================
            ANIMATION
    ==============================*/

    function animate() {

        currentProgress +=

            (targetProgress - currentProgress)

            * 0.08;

        path.style.strokeDashoffset =

            length - currentProgress * length;

    

        requestAnimationFrame(animate);

    }

    animate();

    /*==============================
            CARD ACTIVE
    ==============================*/

    

    /*==============================
            MEMORY DATA
    ==============================*/

    const memories = {

        0: {

            title: "🏫 Ngày đầu nhập học",

            image: "assets/images/start.jpg",

            text:
                "Ngày đầu tiên bước chân vào Đại học Văn Lang là một cảm giác vừa hồi hộp vừa háo hức. Từ đây, hành trình thanh xuân của Huyền chính thức bắt đầu."

        },

        1: {

            title: "🌱 Năm nhất",

            image: "assets/images/1.jpg",

            text:
                "Những buổi học đầu tiên, những người bạn đầu tiên và vô vàn điều mới mẻ đã tạo nên những ký ức không thể quên."

        },

        2: {

            title: "💜 Năm hai",

            image: "assets/images/2.jpg",

            text:
                "Thanh xuân rực rỡ với những hoạt động câu lạc bộ, sự kiện, những đêm chạy deadline và rất nhiều tiếng cười."

        },

        3: {

            title: "✨ Năm ba",

            image: "assets/images/3.jpg",

            text:
                "Những dự án Marketing, các trải nghiệm thực tế và từng bước trưởng thành để chuẩn bị cho tương lai."

        },

        4: {

            title: "🎓 Ngày tốt nghiệp",

            image: "assets/images/graduation.jpg",

            text:
                "Khép lại hành trình đại học bằng lòng biết ơn dành cho gia đình, thầy cô và bạn bè. Một chương mới của cuộc đời chính thức bắt đầu."

        }

    };

    /*==============================
            OPEN MODAL
    ==============================*/

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const year = Number(card.dataset.year);

            const memory = memories[year];

            if (!memory) return;

            title.textContent = memory.title;

            text.textContent = memory.text;

            image.src = memory.image;

            modal.style.display = "flex";

        });

    });

    /*==============================
            CLOSE MODAL
    ==============================*/

    closeBtn.addEventListener("click", () => {

        modal.style.display = "none";

    });

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.style.display = "none";

        }

    });

}

/*==============================
        INVITATION
==============================*/

const invitationModal =
document.getElementById("invitationModal");

const openInvitation =
document.getElementById("openInvitation");

const closeInvitation =
document.getElementById("closeInvitation");

openInvitation.addEventListener(

    "click",

    ()=>{

        invitationModal.style.display =
        "flex";

    }

);

closeInvitation.addEventListener(

    "click",

    ()=>{

        invitationModal.style.display =
        "none";

    }

);

invitationModal.addEventListener(

    "click",

    (e)=>{

        if(e.target===invitationModal){

            invitationModal.style.display =
            "none";

        }

    }

);

/*==================================================
            BACKGROUND PETALS
==================================================*/

const petals =
document.getElementById("petals");

function createPetal(){

    const petal =
    document.createElement("div");

    petal.className =
    "petal";

    petal.style.left =
    Math.random()*100+"vw";

    petal.style.animationDuration =
    (8+Math.random()*8)+"s";

    petal.style.opacity =
    .15+Math.random()*.3;

    petal.style.transform =
    `rotate(${Math.random()*360}deg)`;

    petals.appendChild(
        petal
    );

    setTimeout(()=>{

        petal.remove();

    },16000);

}

setInterval(

    createPetal,

    1200

);