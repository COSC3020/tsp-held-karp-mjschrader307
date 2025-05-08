class Memo {
  memo_obj;

  constructor() {
    this.memo_obj = {};
  }

  // Key format: "visited_cities, current_cities"
  createKey(visited_cities, current_city) {
    return `${[...visited_cities]},${current_city}`;
  }

  get(key) {
    return this.memo_obj[key];
  }

  add(key, value) {
    this.memo_obj[key] = value;
  }

  has(key) {
    return key in this.memo_obj;
  }

  print() {
    console.log(this.memo_obj);
  }
}

function heldKarp(distance_matrix) {
  let start = 0;
  let memo = new Memo();
  let visited = new Set([start]);

  return HK(distance_matrix, visited, start, memo);
}

function HK(cities, visited, current, memo) {
  let key = memo.createKey(visited, current);

  if (memo.has(key)) return memo.get(key);

  if (visited.size === cities.length) {
    memo.add(key, 0);
    return 0;
  }

  let min_cost_known = Infinity;

  for (let c = 0; c < cities.length; c++) {
    // c: Other cities to visit

    if (visited.has(c)) continue;

    const cost = cities[current][c];

    const V = new Set(visited);
    V.add(c);

    const remaining_cost = HK(cities, V, c, memo);

    const total_cost = cost + remaining_cost;

    if (total_cost < min_cost_known) {
      min_cost_known = total_cost;
    }
  }

  memo.add(key, min_cost_known);
  return min_cost_known;
}
