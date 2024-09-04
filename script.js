const schedules = {
  room1: [
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
  room2: [
    { time: "08:15 - 09:00", teacher: "Astri", subject: "Yoga" },
    { time: "09:00 - 09:45", teacher: "Magnus", subject: "Meditasjon" },
    { time: "09:45 - 10:30", teacher: "Kristoffer", subject: "Strekkøvelser" },
    { time: "10:30 - 11:15", teacher: "Granlund", subject: "Pilates" },
    { time: "11:15 - 11:30", teacher: "", subject: "Pause" },
    { time: "11:30 - 12:15", teacher: "", subject: "Lunsj" },
    {
      time: "12:15 - 13:00",
      teacher: "Ingvild Alida",
      subject: "Kondisjonstrening",
    },
    { time: "13:00 - 13:45", teacher: "Bjerke", subject: "Styrketrening" },
    { time: "13:45 - 14:30", teacher: "Madeleine", subject: "Nedtrapping" },
    { time: "14:30 - 15:15", teacher: "Mathias", subject: "Fleksibilitet" },
    { time: "15:15 - 15:30", teacher: "Erik Søgård", subject: "Refleksjon" },
  ],
  room3: [
    { time: "08:15 - 09:00", teacher: "Astri", subject: "Koding" },
    { time: "09:00 - 09:45", teacher: "Magnus", subject: "Feilsøking" },
    {
      time: "09:45 - 10:30",
      teacher: "Kristoffer",
      subject: "Kodegjennomgang",
    },
    { time: "10:30 - 11:15", teacher: "Granlund", subject: "Parprogrammering" },
    { time: "11:15 - 11:30", teacher: "", subject: "Pause" },
    { time: "11:30 - 12:15", teacher: "", subject: "Lunsj" },
    {
      time: "12:15 - 13:00",
      teacher: "Ingvild Alida",
      subject: "Designmønstre",
    },
    { time: "13:00 - 13:45", teacher: "Bjerke", subject: "Algoritmeøvelse" },
    { time: "13:45 - 14:30", teacher: "Madeleine", subject: "Prosjektarbeid" },
    { time: "14:30 - 15:15", teacher: "Mathias", subject: "Testing" },
    { time: "15:15 - 15:30", teacher: "Erik Søgård", subject: "Distribusjon" },
  ],
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

function addSchedule() {
  const roomId = document.querySelector(".room.active").id;
  const time1 = document.getElementById("time1").value;
  const time2 = document.getElementById("time2").value;
  const teacher = document.getElementById("teacher").value;
  const subject = document.getElementById("subject").value;

  const time = `${time1} - ${time2}`;
  const newSchedule = { time, teacher, subject };

  schedules[roomId] = schedules[roomId].filter(
    (item) => !isOverlapping(item.time, newSchedule.time),
  );

  schedules[roomId].push(newSchedule);

  schedules[roomId].sort(
    (a, b) =>
      new Date(`1970/01/01 ${a.time.split(" - ")[0]}`) -
      new Date(`1970/01/01 ${b.time.split(" - ")[0]}`),
  );

  showSchedule(roomId);
}

function isOverlapping(time1, time2) {
  const [start1, end1] = time1
    .split(" - ")
    .map((t) => new Date(`1970/01/01 ${t}`));
  const [start2, end2] = time2
    .split(" - ")
    .map((t) => new Date(`1970/01/01 ${t}`));

  return start1 < end2 && start2 < end1;
}
