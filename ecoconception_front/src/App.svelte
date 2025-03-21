<script>
  import { onMount } from 'svelte';

  let name = ''; // Nom de l'événement
  let date = ''; // Date de l'événement
  let place = ''; // Lieu de l'événement

  // Fonction pour ajouter un événement via POST
  const addEvent = async () => {
    try {
      const newEvent = {
        name,
        date,
        place
      };

      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: newEvent })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Événement ajouté:', data);
        // Réinitialiser les champs après l'ajout
        name = '';
        date = '';
        place = '';
      } else {
        console.error('Erreur lors de l\'ajout de l\'événement');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };
</script>

<main>
  <h1>Ajouter un événement</h1>

  <div>
    <div>
      <label for="name">Nom de l'événement:</label>
      <input id="name" type="text" bind:value={name} placeholder="Nom de l'événement" required />
    </div>
    <div>
      <label for="date">Date de l'événement:</label>
      <input id="date" type="date" bind:value={date} required />
    </div>
    <div>
      <label for="place">Lieu de l'événement:</label>
      <input id="place" type="text" bind:value={place} placeholder="Lieu de l'événement" required />
    </div>
    <button on:click={addEvent}>Ajouter un événement</button>
  </div>

  <p>Formulaire d'ajout d'événements. Les données seront envoyées au backend sous ce format:</p>
  <pre>{`{ "event": { "name": "${name}", "date": "${date}", "place": "${place}" } }`}</pre>
</main>

<style>
  /* Ajoute des styles si nécessaire */
  input {
    margin: 10px;
    padding: 8px;
    width: 100%;
  }
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
</style>
