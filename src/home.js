function playSound(file) {
    var audio = new Audio('sounds/' + file);
    audio.play();
}

function returnName(appIn) {
    switch(appIn) {
        case "mii": return "About Mii<br>Jake Tran";
        case "healthSafety": return "Overview + Achievements<br>Jake Tran";
        case "camera": return "Work<br>Jake Tran";
        case "settings": return "FAQ<br>Jake Tran";
        default: return "No ";
    }
}

var selectedAppID = "none";
var selectedApp = -1;
var inApp = selectedAppID;

document.addEventListener("DOMContentLoaded", function () {
    const apps = document.getElementsByClassName("app");
    var appCaption = document.getElementById("caption");
    var openButton = document.getElementById("open");
    for (let i=0; i<apps.length; i++){
        //creates app icon
        var displayImg = document.createElement('img');
        displayImg.src = "assets/appIcons/" + apps[i].dataset.src + ".png";
        displayImg.classList.add("app-icon");

        apps[i].appendChild(displayImg); //adds app icon
        apps[i].addEventListener("click", () => { //adds click function
            if (inApp=='none') {
                playSound("select.wav");
                if (selectedApp!=i) {
                    setTimeout(playSound('app/' + apps[i].dataset.src + '.mp3'), 3000);
                }
                //setting variables for later
                selectedAppID = apps[i].dataset.src;
                selectedApp = i;
                appCaption.innerHTML = returnName(selectedAppID); //creates caption
            }
        });
        apps[i].style.left = i*125+55 + "px"; //adds the spacing between apps
    }

    openButton.addEventListener("click", () => {
        if (selectedAppID!="none") {
            playSound("open.wav");
            inApp=selectedAppID;
            //makes app float away
            document.getElementsByClassName("app")[selectedApp].animate([
                {
                    transform: "translateY(-400px)",
                    opacity: 0,
                }
            ], {
                duration: 1000,
                easing: "ease-in",
                fill: "forwards",
            });
        }
    });
    /*addEventListener("click", () => {
        playSound("SE_CTR_HOME_TOUCH.wav");
    });*/

    //SCROLL BUTTONS
    var rightScroll = document.getElementById("scrRight");
    var leftScroll = document.getElementById("scrLeft");
    rightScroll.addEventListener("click", () => {scroll(1);});
    leftScroll.addEventListener("click", () => {scroll(-1);});
    function scroll(dir) {
        toNew -= 480*dir;
        playSound('scroll.wav');
        scrollBg(menuBg, 400);
    }

    //DRAG MENU BG
    var menuBg = document.getElementById('menu-bg');
    var toNew=0;
    dragX(menuBg);

    function scrollBg(elmnt, duration) {
        if (toNew>0.1) toNew=0;
        if (toNew<-480) toNew = -480;
        //shows/hides left scroll
        if (toNew>-5) {
            leftScroll.animate(
                [{transform:"translateX(-50px)"}],
                {duration:200, easing: "ease-in", fill: "forwards"});
        } else {
            leftScroll.animate(
                [{transform:"translateX(0px)"}],
                {duration:200, easing: "ease-out", fill: "forwards"});
        }
        if (toNew<-475) {
            rightScroll.animate(
                [{transform:"translateX(50px)"}],
                {duration:200, easing: "ease-in", fill: "forwards"});
        } else {
            rightScroll.animate(
                [{transform:"translateX(0px)"}],
                {duration:200, easing: "ease-out", fill: "forwards"});
        }
        elmnt.animate([
            { transform: "translateX(" + toNew + "px)", }
        ], {
            duration: duration,
            easing: "ease-out",
            fill: "forwards",
        });
    }

    function dragX(elmnt) {
        var pos1x=0, pos2x=0;
        if (0==1) {
            document.getElementById(elmnt.id + "drag").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            //sets mouse pos
            pos2x = e.clientX;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            //calculates mouse difference
            pos1x = pos2x - e.clientX;
            pos2x = e.clientX;
            toNew -= pos1x;
            scrollBg(menuBg, 1000);
            //elmnt.style.left = (elmnt.offsetLeft - pos1x) + "px";
        }
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
        
});