const schedules = {
  "Lilla-base": [
    { time: "08:15 - 09:00", teacher: "Lars Greger", subject: "Møte" },
    { time: "09:00 - 09:45", teacher: "Kristoffer", subject: "Verksted" },
    { time: "09:45 - 10:30", teacher: "Magnus", subject: "Presentasjon" },
    { time: "10:30 - 11:15", teacher: "Granlund", subject: "Diskusjon" },
    { time: "11:15 - 11:30", teacher: "", subject: "Pause" },
    { time: "11:30 - 12:15", teacher: "", subject: "Lunsj" },
    { time: "12:15 - 13:00", teacher: "Ingvild Alida", subject: "Seminar" },
    { time: "13:00 - 13:45", teacher: "Bjerke", subject: "Teambuilding" },
    { time: "13:45 - 14:30", teacher: "Madeleine", subject: "Gjennomgang" },
    { time: "14:30 - 15:15", teacher: "Mathias", subject: "Planlegging" },
    { time: "15:15 - 15:30", teacher: "Erik Søgård", subject: "Avslutning" },
  ],
  "Oransje-base": [],
  esport: [],
  "Blå-base": [
    { time: "08:15 - 09:00", teacher: "Lars Greger", subject: "Møte" },
    { time: "09:00 - 09:45", teacher: "Kristoffer", subject: "Verksted" },
    { time: "09:45 - 10:30", teacher: "Magnus", subject: "Presentasjon" },
    { time: "10:30 - 11:15", teacher: "Granlund", subject: "Diskusjon" },
    { time: "11:15 - 11:30", teacher: "", subject: "Pause" },
    { time: "11:30 - 12:15", teacher: "", subject: "Lunsj" },
    { time: "12:15 - 13:00", teacher: "Ingvild Alida", subject: "Seminar" },
    { time: "13:00 - 13:45", teacher: "Bjerke", subject: "Teambuilding" },
    { time: "13:45 - 14:30", teacher: "Madeleine", subject: "Gjennomgang" },
    { time: "14:30 - 15:15", teacher: "Mathias", subject: "Planlegging" },
    { time: "15:15 - 15:30", teacher: "Erik Søgård", subject: "Avslutning" },
  ],
  "Grønn-base": [],
};

function showSchedule(roomId) {
  const scheduleDiv = document.getElementById("schedule");
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const currentClass = schedules[roomId].find((item) => {
    const [start, end] = item.time.split(" - ").map((t) => {
      const [hours, minutes] = t.split(":").map(Number);
      return hours * 60 + minutes;
    });
    return currentTime >= start && currentTime < end;
  });

  if (currentClass) {
    scheduleDiv.innerHTML = `<ul><li>${currentClass.time}: ${currentClass.subject} med ${currentClass.teacher}</li></ul>`;
  } else {
    scheduleDiv.innerHTML = "<p>Ingen pågående klasse</p>";
  }

  document
    .querySelectorAll(".room")
    .forEach((room) => room.classList.remove("active"));
  document.getElementById(roomId).classList.add("active");
}

document.querySelectorAll(".room").forEach((room) => {
  room.addEventListener("click", () => showSchedule(room.id));
});
