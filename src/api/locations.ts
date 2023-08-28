export const fetchLocations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ locations, success: true, error: false });
    }, 1000);
  });
};

export const locations = [
  {
    city: "Paris",
    lat: 48.856614,
    lng: 2.352222,
  },
  {
    city: "Marseille",
    lat: 43.296482,
    lng: 5.36978,
  },
  {
    city: "Lyon",
    lat: 45.764043,
    lng: 4.835659,
  },
  {
    city: "Toulouse",
    lat: 43.604652,
    lng: 1.444209,
  },
  {
    city: "Nice",
    lat: 43.710173,
    lng: 7.261953,
  },
  {
    city: "Nantes",
    lat: 47.218371,
    lng: -1.553621,
  },
  {
    city: "Strasbourg",
    lat: 48.573405,
    lng: 7.752111,
  },
  {
    city: "Montpellier",
    lat: 43.610769,
    lng: 3.876716,
  },
  {
    city: "Bordeaux",
    lat: 44.837789,
    lng: -0.57918,
  },
  {
    city: "Lille",
    lat: 50.62925,
    lng: 3.057256,
  },
  {
    city: "Rennes",
    lat: 48.117266,
    lng: -1.677793,
  },
  {
    city: "Reims",
    lat: 49.258329,
    lng: 4.031696,
  },
  {
    city: "Le Havre",
    lat: 49.49437,
    lng: 0.107929,
  },
  {
    city: "Saint-Étienne",
    lat: 45.439695,
    lng: 4.387178,
  },
  {
    city: "Toulon",
    lat: 43.124228,
    lng: 5.928,
  },
  {
    city: "Angers",
    lat: 47.478419,
    lng: -0.563166,
  },
  {
    city: "Grenoble",
    lat: 45.188529,
    lng: 5.724524,
  },
  {
    city: "Dijon",
    lat: 47.322047,
    lng: 5.04148,
  },
  {
    city: "Nîmes",
    lat: 43.836699,
    lng: 4.360054,
  },
  {
    city: "Aix-en-Provence",
    lat: 43.529742,
    lng: 5.447427,
  },
] as const;
