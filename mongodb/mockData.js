db = db.getSiblingDB("mongo_eventdb");

db.events.insertMany([
    {
      name: 'Rock Concert',
      category: 'Music',
      date: new Date('2025-02-15'),
      location: 'Berlin',
      description: 'A rocking good time!',
      imageUrl: '../../../assets/Event.jpg',
      VeranstalterEmail: 'veranstalter1@example.com'
    },
    {
      name: 'Jazz Night',
      category: 'Music',
      date: new Date('2025-03-10'),
      location: 'Munich',
      description: 'An evening of smooth jazz.',
      imageUrl: '../../../assets/event1.jpg',
      VeranstalterEmail: 'veranstalter1@example.com'
    },
    {
      name: 'Tech Conference',
      category: 'Conference',
      date: new Date('2025-04-20'),
      location: 'Frankfurt',
      description: 'Technology enthusiasts unite!',
      imageUrl: '../../../assets/event2.jpg',
      VeranstalterEmail: 'veranstalter2@example.com'
    },
    {
      name: 'Startup Weekend',
      category: 'Workshop',
      date: new Date('2025-05-05'),
      location: 'Hamburg',
      description: 'Innovation and entrepreneurship.',
      imageUrl: '../../../assets/event3.jpg',
      VeranstalterEmail: 'veranstalter2@example.com'
    },
    {
      name: 'Art Exhibition',
      category: 'Art',
      date: new Date('2025-06-01'),
      location: 'Cologne',
      description: 'A beautiful collection of modern art.',
      imageUrl: '../../../assets/event4.jpg',
      VeranstalterEmail: 'veranstalter3@example.com'
    },
    {
      name: 'Food Festival',
      category: 'Food',
      date: new Date('2025-07-10'),
      location: 'Düsseldorf',
      description: 'A delicious food extravaganza.',
      imageUrl: '../../../assets/Event.jpg',
      VeranstalterEmail: 'veranstalter3@example.com'
    }
]);

db.feedbacks.insertMany([
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d1'), userEmail: 'user1@example.com', feedback: 5, comment: 'Amazing concert!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d2'), userEmail: 'user2@example.com', feedback: 4, comment: 'Loved the music!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d3'), userEmail: 'user3@example.com', feedback: 3, comment: 'It was okay, could be better.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d4'), userEmail: 'user1@example.com', feedback: 5, comment: 'Such a great event!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d5'), userEmail: 'user2@example.com', feedback: 4, comment: 'Great exhibition!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d6'), userEmail: 'user3@example.com', feedback: 2, comment: 'The food was okay, but nothing special.' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d7'), userEmail: 'user1@example.com', feedback: 5, comment: 'Loved the concept, learned a lot!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d8'), userEmail: 'user2@example.com', feedback: 4, comment: 'A great weekend full of new ideas!' },
    { eventID: ObjectId('5f50c31b9d9e9c3b35c8e3d9'), userEmail: 'user3@example.com', feedback: 3, comment: 'Interesting, but a bit too technical.' }
]);