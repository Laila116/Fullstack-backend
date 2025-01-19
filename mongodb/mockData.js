db = db.getSiblingDB("mongo_eventdb");

db.events.insertMany([
    {
      name: 'Konzert in Mannheim',
      category: 'Konzert',
      date: new Date('2024-01-15'),
      location: 'Mannheim',
      description: 'Ein großartiges Konzert in Mannheim.',
      imageUrl: '../../../assets/event1.jpg',
      VeranstalterEmail: 'veranstalter1@example.com'
    },
    {
      name: 'Theater in Stuttgart',
      category: 'Theater',
      date: new Date('2025-03-10'),
      location: 'Stuttgart',
      description: 'Ein spannendes Theater.',
      imageUrl: '../../../assets/event2.jpg',
      VeranstalterEmail: 'veranstalter1@example.com'
    },
    {
      name: 'Comedy Show in Hamburg',
      category: 'Comedy',
      date: new Date('2025-04-20'),
      location: 'Hamburg',
      description: 'Eine lustige Show für die ganze Familie.',
      imageUrl: '../../../assets/event3.jpg',
      VeranstalterEmail: 'veranstalter2@example.com'
    },
    {
      name: 'Konzert in Luxemburg',
      category: 'Konzert',
      date: new Date('2024-05-20'),
      location: 'Hamburg',
      description: 'Volle Abenteuer waretet auf dich!',
      imageUrl: '../../../assets/event4.jpg',
      VeranstalterEmail: 'veranstalter2@example.com'
    },
    {
      name: 'Tech Conference 2024',
      category: 'Konferenz',
      date: new Date('2025-06-01'),
      location: 'Luxemburg',
      description: 'Eine spannende Konferenz für Technologie-Interessierte.',
      imageUrl: '../../../assets/event6-Konferenz.jpeg',
      VeranstalterEmail: 'veranstalter3@example.com'
    },
    {
      name: 'IT Veranstaltung in Mannheim',
      category: 'Konferenz',
      date: new Date('2025-07-10'),
      location: 'Mannheim',
      description: 'Spannende IT und KI Themen.',
      imageUrl: '../../../assets/event5-Konferenz.jpg',
      VeranstalterEmail: 'veranstalter3@example.com'
    }
]);

db.feedbacks.insertMany([
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d1'), userEmail: 'user1@example.com', feedback: 5, comment: 'Super Konzert!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d2'), userEmail: 'user2@example.com', feedback: 4, comment: 'Tolle Musik, ich liebe es!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d3'), userEmail: 'user3@example.com', feedback: 3, comment: 'Es war okey, definitiv luft nach oben.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d4'), userEmail: 'user1@example.com', feedback: 5, comment: 'Schön.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d5'), userEmail: 'user2@example.com', feedback: 4, comment: 'Großartige Ausstellung!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d6'), userEmail: 'user3@example.com', feedback: 2, comment: 'Toll.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d7'), userEmail: 'veranstalter1@example.com', feedback: 5, comment: 'Hab mich in das Konzept verliebt.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d8'), userEmail: 'veranstalter2@example.com', feedback: 4, comment: 'Schön, habe viele neue Ideen!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d9'), userEmail: 'veranstalter3@example.com', feedback: 3, comment: 'nteressant, aber war mir persönlich zu technisch.' }
]);