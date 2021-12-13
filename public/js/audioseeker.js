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
