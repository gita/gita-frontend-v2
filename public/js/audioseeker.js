var player = document.getElementById("a1");
player.addEventListener("timeupdate", function () {
  var currentTime = player.currentTime;
  var duration = player.duration;
  $(".hp_range")
    .stop(true, true)
    .animate(
      { width: ((currentTime + 0.25) / duration) * 100 + "%" },
      250,
      "linear"
    );
});

function sayLoc(e) {
  e = e || window.event;
  var tgt = document.getElementById("audiobar");

  // Get left co-ords of div
  var divX = findPosX(tgt);
  var pXo = getPXoffset();

  var clickX = e.clientX - divX + pXo;
  var width = tgt.offsetWidth;
  var percent = clickX / width;
  if (percent <= 1 && percent >= 0) {
    player.currentTime = percent * player.duration;
  }
}

function findPosX(obj) {
  var curleft = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      curleft += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  } else if (obj.x) {
    curleft += obj.x;
  }
  return curleft;
}

function findPosY(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
  } else if (obj.y) {
    curtop += obj.y;
  }
  return curtop;
}

function getPXoffset() {
  if (self.pageXOffset) {
    // all except Explorer
    return self.pageXOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    // Explorer 6 Strict
    return document.documentElement.scrollLeft;
  } else if (document.body) {
    // all other Explorers
    return document.body.scrollLeft;
  }
}

function getPYoffset() {
  if (self.pageYOffset) {
    // all except Explorer
    return self.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    // Explorer 6 Strict
    return document.documentElement.scrollTop;
  } else if (document.body) {
    // all other Explorers
    return document.body.scrollTop;
  }
}
