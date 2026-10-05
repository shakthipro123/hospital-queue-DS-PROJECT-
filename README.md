# Hospital Patient Waiting System

A full-stack project demonstrating the **Queue** data structure (FIFO).

https://hospital-queue-ds-project.onrender.com/

## How the DSA is used
- `queue.js` is a Queue written from scratch using a **singly linked list** with `head` (front) and `tail` (rear) pointers.
- `enqueue`, `dequeue`, `peek`, `isEmpty` and `size` are all **O(1)**. `Array.shift()` is deliberately not used (it is O(n)).
- Patients are enqueued on arrival and dequeued when the doctor calls them.
- Two queues run side by side: an **emergency queue** and a **regular queue**. The server always dequeues from the emergency queue first, a simple form of priority scheduling.

## Stack
- Frontend: HTML, CSS, vanilla JS (served from `public/`). It draws each queue as a chain of linked nodes.
- Backend: Node.js + Express.
- Storage: in memory (the queue resets when the server restarts).

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/queue` | Current queues and recently served patients |
| GET | `/api/peek` | Next patient to be called |
| POST | `/api/enqueue` | Add a patient `{ name, complaint, emergency }` |
| POST | `/api/dequeue` | Call the next patient |

## Run locally
```bash
npm install
npm start      # http://localhost:3000
npm test       # unit tests for the Queue
```

## Deploy (free)
1. Push this folder to a **public** GitHub repo.
2. On [Render](https://render.com): New → Web Service → connect the repo.
3. Build command `npm install`, start command `npm start`.
4. Paste the Render URL into this README and submit the repo link.

The Express server serves the frontend too, so one deployment covers both.
