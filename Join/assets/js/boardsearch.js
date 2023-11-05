/**
 * Adds event listeners for search functionality.
 */
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#boardSearchID");

  document.addEventListener("click", function (event) {
    if (event.target !== searchInput) {
      searchInput.value = "";

      const taskElements = document.querySelectorAll(".card");
      taskElements.forEach((taskElement) => {
        taskElement.classList.remove("d-none", "highlight");
      });
    }
  });

  // Event-Listener für das Input-Ereignis im Suchfeld
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const taskElements = document.querySelectorAll(".card"); // Alle Aufgabenkarten auswählen
    taskElements.forEach((taskElement) => {
      const title = taskElement
        .querySelector(".cardTextI")
        .textContent.toLowerCase();
      const description = taskElement
        .querySelector(".cardTextII")
        .textContent.toLowerCase();
      const initials = taskElement
        .querySelector(".cardContactsBadge")
        .textContent.toLowerCase();
      const assignedName = taskElement
        .querySelector(".cardTextI")
        .textContent.toLowerCase();

      const cardPlaceholders = document.querySelectorAll(".cardplaceholder");
      cardPlaceholders.forEach((placeholder) => {
        placeholder.classList.add("d-none");
      });

      if (
        title.includes(searchText) ||
        description.includes(searchText) ||
        initials.includes(searchText) ||
        assignedName.includes(searchText)
      ) {
        taskElement.classList.add("highlight");
      } else {
        taskElement.classList.add("d-none");
        taskElement.classList.remove("highlight");
      }
    });

    if (searchInput.value === "") {
      const taskElements = document.querySelectorAll(".card");
      const cardPlaceholders = document.querySelectorAll(".cardplaceholder");
      cardPlaceholders.forEach((placeholder) => {
        placeholder.classList.remove("d-none");
      });
      taskElements.forEach((taskElement) => {
        taskElement.classList.remove("d-none", "highlight");
      });
    }
  });
});
