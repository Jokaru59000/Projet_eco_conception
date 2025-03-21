<script>
  let title = "";
  let date = "";
  let location = "";

  // Tableau pour stocker les événements
  let events = [];

  // Fonction pour ajouter un événement
  const addEvent = () => {
    if (title && date && location) {
      const newEvent = { title, date, location };
      events = [...events, newEvent]; // Ajouter l'événement à la liste
      title = ""; // Réinitialiser les champs du formulaire
      date = "";
      location = "";
    } else {
      alert("Tous les champs doivent être remplis.");
    }
  };
</script>

<main>
  <h1>Événements à venir</h1>

  <!-- Formulaire pour ajouter un nouvel événement -->
  <form on:submit|preventDefault={addEvent}>
    <div>
      <label for="title">Titre de l'événement:</label>
      <input id="title" type="text" bind:value={title} placeholder="Nom de l'événement" required />
    </div>
    <div>
      <label for="date">Date:</label>
      <input id="date" type="date" bind:value={date} required />
    </div>
    <div>
      <label for="location">Lieu:</label>
      <input id="location" type="text" bind:value={location} placeholder="Lieu de l'événement" required />
    </div>
    <button type="submit">Ajouter l'événement</button>
  </form>

  <ul>
    <!-- Affichage des événements -->
    {#each events as event}
      <li>
        <h3>{event.title}</h3>
        <p>Date: {event.date}</p>
        <p>Lieu: {event.location}</p>
      </li>
    {/each}
  </ul>
</main>

<style>
  /* Styles comme précédemment */
</style>
