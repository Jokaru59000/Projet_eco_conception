<script>
  import "./app.css";

  let name = "";
  let date = "";
  let place = "";
  let successMessage = "";

  let events = [];
  let currentPage = 1;
  let totalPages = 1;
  let eventsPerPage = 3;
  let apiPage = 1;

  const addEvent = async () => {
    const newEvent = { name, date, place };

    const response = await fetch("http://localhost:3000/event/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: newEvent }),
    });

    if (response.ok) {
      successMessage = "Événement ajouté avec succès !";
      name = "";
      date = "";
      place = "";
      currentPage = 1;
      fetchEvents(1);
    } else {
      successMessage =
        "Erreur lors de l'ajout de l'événement. Veuillez réessayer.";
    }
  };

  const fetchEvents = async (page) => {
    console.log(page);
    const response = await fetch(
      `http://localhost:3000/event/pagination/${page}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const prevLength = events.length;

      events = [
        ...new Map(
          [...events, ...data.eventList.events].map((event) => [
            event.id,
            event,
          ])
        ).values(),
      ];
      totalPages = Math.ceil(data.totalEvents / eventsPerPage);
      if (prevLength == events.length) {
        //apiPage--;
      }
    } else {
      console.error("Erreur lors de la récupération des événements");
    }
  };

  fetchEvents(apiPage);

  const nextPage = async () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      console.log(
        apiPage,
        events.length,
        eventsPerPage * currentPage,
        currentPage * eventsPerPage + eventsPerPage,
        { eventList: events }
      );
      if (events.length <= currentPage * eventsPerPage + eventsPerPage) {
        apiPage += events.length % 10 == 0 ? 1 : 0;
        fetchEvents(apiPage);
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      currentPage -= 1;
    }
  };

  $: displayedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );
</script>

<main>
  <div class="mainDiv">
    <h1>Ajouter un événement</h1>

    <div>
      <label for="name">Nom de l'événement:</label>
      <input
        id="name"
        type="text"
        bind:value={name}
        placeholder="Nom de l'événement"
        required
      />
    </div>

    <div>
      <label for="date">Date:</label>
      <input id="date" type="date" bind:value={date} required />
    </div>

    <div>
      <label for="place">Lieu:</label>
      <input
        id="place"
        type="text"
        bind:value={place}
        placeholder="Lieu de l'événement"
        required
      />
    </div>

    <button on:click={addEvent}>Ajouter l'événement</button>
  </div>

  {#if successMessage}
    <p>{successMessage}</p>
  {/if}

  <h2>Liste des événements</h2>

  {#if displayedEvents.length > 0}
    <ul>
      {#each displayedEvents as event}
        <li>
          {event.name} - {new Date(event.date).toLocaleDateString("fr-FR")} - {event.place}
        </li>
      {/each}
    </ul>

    <div class="pagination">
      <button on:click={prevPage} disabled={currentPage === 1}>Précédent</button
      >
      <span>Page {currentPage} / {totalPages}</span>
      <button on:click={nextPage} disabled={currentPage === totalPages}
        >Suivant</button
      >
    </div>
  {:else}
    <p>Aucun événement trouvé.</p>
  {/if}
</main>

<style>
  .pagination {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
</style>
