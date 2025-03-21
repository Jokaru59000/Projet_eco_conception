<script>
  import './app.css';
  let name = '';
  let date = '';
  let place = '';
  let successMessage = '';  
  let events = [];  

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
      body: JSON.stringify({ event: newEvent })  
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Événement ajouté:', data);
      successMessage = "Événement ajouté avec succès !"; 
      name = '';
      date = '';
      place = '';
      getEvents();
    } else {
      console.error('Erreur lors de l\'ajout de l\'événement');
      successMessage = "Erreur lors de l'ajout de l'événement. Veuillez réessayer.";
    }
  };
  const getEvents = async () => {
    const response = await fetch('http://localhost:3000/event/list');
    if (response.ok) {
      const data = await response.json();
      events = data; 
    } else {
      console.error('Erreur lors de la récupération des événements');
    }
  };

  getEvents();
</script>

<main>
  <h1>Ajouter un événement</h1>
  
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

  {#if successMessage}
    <p>{successMessage}</p>
  {/if}

  <h2>Liste des événements</h2>

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

