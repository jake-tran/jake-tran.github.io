

var loadedAudioNames = [];
var loadedAudio = [];

function playSound(file) {
    //network optimisation for loading audio files
    if (loadedAudioNames.includes(file) == false) {
        loadedAudioNames.push(file);
        loadedAudio.push(new Audio('sounds/' + file));
        //console.log('found : ' + file);
        //console.log(loadedAudio);
    }
    loadedAudio[loadedAudioNames.indexOf(file)].play();
}

function returnName(appIn) {
    switch(appIn) {
        case "mii": return "About Mii<br>Jake Tran";
        case "healthSafety": return "Experience + Achievements<br>Jake Tran";
        case "camera": return "My Work<br>Jake Tran";
        case "settings": return "FAQ<br>Jake Tran";
        default: return "No game selected";
    }
}

var selectedAppID = "none";
var selectedApp = -1;
var inApp = selectedAppID;

document.addEventListener("DOMContentLoaded", function () {
    //
    //DRAG MENU BG
    //
    var menuBg = document.getElementById('menu-bg');
    var toNew=0;
    dragX(menuBg);

    function scrollBg(elmnt, duration) {
        if (toNew>0.1) toNew=0;
        if (toNew<-360) toNew = -360;
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
        if (toNew<-355) {
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

    //
    //APP MENU SETUP
    //
    const apps = document.getElementsByClassName("app");
    var appCaption = document.getElementById("caption");
    var openButton = document.getElementById("open");
    var selector = document.getElementById("selector");
    var displays = document.getElementsByClassName("displays")[0];
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
                selector.style.left = apps[i].style.left;
                var oappX = apps[i].style.left;
                var appX = Number(oappX.substring(0,oappX.length-2));
                if (appX+toNew>displays.clientWidth-120){
                    toNew = (Math.round(appX/-120)+3)*120;
                    scrollBg(menuBg, 300);
                }
                if (appX+toNew<0){
                    toNew = (Math.round(appX/-120)+1)*120;
                    scrollBg(menuBg, 300);
                }
                //setting variables for later
                selectedAppID = apps[i].dataset.src;
                selectedApp = i;
                appCaption.innerHTML = returnName(selectedAppID); //creates caption
            }
        });
        apps[i].style.left = i*120+62.5 + "px"; //adds the spacing between apps
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
                duration: 700,
                easing: "ease-in",
                fill: "forwards",
            });
            selector.animate([
                {
                    transform: "scale(1.5)",
                    opacity: 0,
                }
            ], {
                duration: 300,
                easing: "ease-in",
                fill: "forwards",
            });
            document.getElementById(selectedAppID + "-app").style.display = "block";
        }
    });

    //SCROLL BUTTONS
    var rightScroll = document.getElementById("scrRight");
    var leftScroll = document.getElementById("scrLeft");
    rightScroll.addEventListener("click", () => {scroll(1);});
    leftScroll.addEventListener("click", () => {scroll(-1);});
    function scroll(dir) {
        toNew -= 360*dir;
        playSound('scroll.wav');
        scrollBg(menuBg, 350);
    }

    //DRAG MENU FUNCTION
        
    function dragX(elmnt) {
        var pos1x=0, pos2x=0;
        
        elmnt.onmousedown = dragMouseDown;

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
            toOld = Math.round(toNew/120)*120;
            toNew -= pos1x;
            if (toOld!=Math.round(toNew/120)*120) playSound('scroll.wav');
            scrollBg(menuBg, 1000);
            //elmnt.style.left = (elmnt.offsetLeft - pos1x) + "px";
        }
        function closeDragElement() {
            // stop moving when mouse button is released:
            toNew = Math.round(toNew/120)*120;
            scrollBg(menuBg,200);
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
        
});