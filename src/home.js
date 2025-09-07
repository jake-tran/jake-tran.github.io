function playSound(file) {
    var audio = new Audio('sounds/' + file);
    audio.play();
}

var selectedAppID = "";
var selectedApp = -1;

document.addEventListener("DOMContentLoaded", function () {
    const apps = document.getElementsByClassName("app");
    var appCaption = document.getElementById("caption");
    var openButton = document.getElementById("open");
    for (let i=0; i<apps.length; i++){
        var displayImg = document.createElement('img'); //creates app icon
        displayImg.src = "assets/appIcons/" + apps[i].dataset.src + ".png";
        displayImg.classList.add("app-icon");
        apps[i].appendChild(displayImg); //adds app icon
        apps[i].addEventListener("click", () => { //adds click function
            playSound("select.wav");
            if (selectedApp!=i) {
                setTimeout(playSound('app/' + apps[i].dataset.src + '.mp3'), 3000);
            }
            selectedAppID = apps[i].dataset.src;
            selectedApp = i;
            appCaption.innerHTML = selectedAppID + "<br>Jake Tran";
        });
        apps[i].style.left = i*128+50 + "px";
    }

    openButton.addEventListener("click", () => {
        playSound("open.wav");
    });
    /*addEventListener("click", () => {
        playSound("SE_CTR_HOME_TOUCH.wav");
    });*/



    //DRAG MENU BG
    var menuBg = document.getElementById('menu-bg');
    var toNew=0;
    dragX(menuBg);

    function scrollBg(elmnt, duration) {
        if (toNew>0.1) toNew=0;
        if (toNew<-480) toNew = -480;
        elmnt.animate([
            {
                transform: "translateX(" + toNew + "px)",
            }
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
            toNew -= pos1x^1.1;
            scrollBg(menuBg, 1000);
            //elmnt.style.left = (elmnt.offsetLeft - pos1x) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    var rightScroll = document.getElementById("scrRight");
    var leftScroll = document.getElementById("scrLeft");
    rightScroll.addEventListener("click", () => {scroll(1);});
    leftScroll.addEventListener("click", () => {scroll(-1);});
    function scroll(dir) {
        toNew -= 480*dir;
        scrollBg(menuBg, 400);

    }
        
});