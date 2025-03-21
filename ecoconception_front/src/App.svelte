<script>
  import './app.css';
  let name = '';
  let date = '';
  let place = '';
  let successMessage = '';  // Variable pour le message de succès
  let events = [];  // Liste des événements récupérée de l'API

  // Fonction pour ajouter un événement
  const addEvent = async () => {
    const newEvent = { 
      name, 
      date, 
      place 
    };

    const response = await fetch('http://localhost:3000/event/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: newEvent })  // On envoie l'objet sous la clé "event"
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Événement ajouté:', data);
      successMessage = "Événement ajouté avec succès !"; // Afficher le message de succès
      name = '';
      date = '';
      place = '';
      // Récupérer la liste des événements après ajout
      getEvents();
    } else {
      console.error('Erreur lors de l\'ajout de l\'événement');
      successMessage = "Erreur lors de l'ajout de l'événement. Veuillez réessayer.";
    }
  };

  // Fonction pour récupérer la liste des événements
  const getEvents = async () => {
    const response = await fetch('http://localhost:3000/event/list');
    if (response.ok) {
      const data = await response.json();
      events = data;  // On met à jour la liste des événements
    } else {
      console.error('Erreur lors de la récupération des événements');
    }
  };

  // Appel initial pour récupérer les événements à l'affichage de la page
  getEvents();
</script>

<main>
  <h1>Ajouter un événement</h1>
  
  <!-- Formulaire d'ajout d'événement -->
  <div>
    <label for="name">Nom de l'événement:</label>
    <input id="name" type="text" bind:value={name} placeholder="Nom de l'événement" required />
  </div>

  <div>
    <label for="date">Date:</label>
    <input id="date" type="date" bind:value={date} required />
  </div>

  <div>
    <label for="place">Lieu:</label>
    <input id="place" type="text" bind:value={place} placeholder="Lieu de l'événement" required />
  </div>

  <button on:click={addEvent}>Ajouter l'événement</button>

  <!-- Message de succès ou d'erreur -->
  {#if successMessage}
    <p>{successMessage}</p>
  {/if}

  <h2>Liste des événements</h2>

  <!-- Affichage des événements -->
  {#if events.length > 0}
    <ul>
      {#each events as event}
        <li>{event.name} - {event.date} - {event.place}</li>
      {/each}
    </ul>
  {:else}
    <p>Aucun événement trouvé.</p>
  {/if}
</main>

