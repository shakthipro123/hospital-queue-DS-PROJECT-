// Queue implemented from scratch with a singly linked list (FIFO).
// enqueue / dequeue / peek / isEmpty / size are all O(1) because we keep
// both a head (front) and a tail (rear) pointer. No Array.shift() used.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null; // front: next to be served
    this.tail = null; // rear: last to arrive
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    if (this.tail) this.tail.next = node;
    else this.head = node;
    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return value;
  }

  peek() { return this.head ? this.head.value : null; }
  isEmpty() { return this.length === 0; }
  size() { return this.length; }

  toArray() {
    const out = [];
    for (let n = this.head; n; n = n.next) out.push(n.value);
    return out;
  }
}

module.exports = Queue;
