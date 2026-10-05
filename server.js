const express = require('express');
const path = require('path');
const Queue = require('./queue');

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Two FIFO queues: emergency patients are always served before regular ones.
const emergency = new Queue();
const regular = new Queue();
const served = []; // most recent first, capped at 10
let nextToken = 1;

const snapshot = () => ({
  emergency: emergency.toArray(),
  regular: regular.toArray(),
  served,
  waiting: emergency.size() + regular.size(),
});

app.get('/api/queue', (req, res) => res.json(snapshot()));

app.get('/api/peek', (req, res) => {
  res.json({ next: emergency.peek() || regular.peek() });
});

app.post('/api/enqueue', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 60);
  const complaint = String(req.body.complaint || '').trim().slice(0, 120);
  if (!name) return res.status(400).json({ error: 'Patient name is required.' });
  const patient = {
    token: nextToken++,
    name,
    complaint,
    emergency: Boolean(req.body.emergency),
    arrivedAt: new Date().toISOString(),
  };
  (patient.emergency ? emergency : regular).enqueue(patient);
  res.status(201).json({ patient, ...snapshot() });
});

app.post('/api/dequeue', (req, res) => {
  const patient = emergency.dequeue() || regular.dequeue();
  if (!patient) return res.status(409).json({ error: 'No patients are waiting.' });
  served.unshift({ ...patient, servedAt: new Date().toISOString() });
  if (served.length > 10) served.pop();
  res.json({ patient, ...snapshot() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Hospital queue running on port ${PORT}`));
