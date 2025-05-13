# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

---

Answer:

As I understand it, this algorithm needs to process every subset out of the set of cities. This makes the set of cities a powerset, and I recall from Discrete Structures that the cardinality of a powerset is $2^n$. That makes this algorithm run in at least exponential time.

I originally had my code start from the same city every time. With that considered, with the for-loop in the main function body iterating through all unvisited nodes at each recursive call, I would think that would make the original implementation run in $O(2^n \cdot n)$ time. However, I noticed it wasn't working with the test cases, so I made it so that the starting position changes through all the nodes. That makes this whole process run another $n$ times, so that bumps the runtime up to $O(2^n \cdot n^2)$.

I think the reason that this algorithm isn't factorial, even though it basically is checking all possible permutations of routes, is that the memoization makes checking preprocessed subroutes happen more quickly.

### Memory Cost

This algorithm, because of memoization, has significant memory costs. The memo stores results for every subroute, so that is already exponential ($2^n$). The algorithm is also tracking the possibilities as far as current cities for each subroute, which could get up to $n$. Therefore, the algorithm has a space complexity of $\Theta(2^n \cdot n)$

---

I got a tip online for how to handle the resetting of the `visited` set. I couldn't figure out exactly where it made sense to do that.

**I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.**
