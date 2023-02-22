
const VERTEX_STRIDE = 48;

// from https://gist.github.com/dwilliamson/72c60fcd287a94867b4334b42a7888ad
const TriangleTable = [
    [ -1 ],
    [ 3, 8, 0, -1 ],
    [ 1, 0, 9, -1 ],
    [ 9, 1, 8, 8, 1, 3, -1 ],
    [ 3, 2, 11, -1 ],
    [ 2, 11, 0, 0, 11, 8, -1 ],
    [ 1, 0, 9, 3, 2, 11, -1 ],
    [ 11, 1, 2, 11, 9, 1, 11, 8, 9, -1 ],
    [ 10, 2, 1, -1 ],
    [ 2, 1, 10, 0, 3, 8, -1 ],
    [ 0, 9, 2, 2, 9, 10, -1 ],
    [ 8, 2, 3, 8, 10, 2, 8, 9, 10, -1 ],
    [ 1, 10, 3, 3, 10, 11, -1 ],
    [ 10, 0, 1, 10, 8, 0, 10, 11, 8, -1 ],
    [ 9, 3, 0, 9, 11, 3, 9, 10, 11, -1 ],
    [ 9, 10, 8, 8, 10, 11, -1 ],
    [ 7, 4, 8, -1 ],
    [ 0, 3, 4, 4, 3, 7, -1 ],
    [ 0, 9, 1, 4, 8, 7, -1 ],
    [ 1, 4, 9, 1, 7, 4, 1, 3, 7, -1 ],
    [ 11, 3, 2, 8, 7, 4, -1 ],
    [ 4, 11, 7, 4, 2, 11, 4, 0, 2, -1 ],
    [ 3, 2, 11, 0, 9, 1, 4, 8, 7, -1 ],
    [ 9, 1, 4, 4, 1, 7, 7, 1, 2, 7, 2, 11, -1 ],
    [ 7, 4, 8, 1, 10, 2, -1 ],
    [ 7, 4, 3, 3, 4, 0, 10, 2, 1, -1 ],
    [ 10, 2, 9, 9, 2, 0, 7, 4, 8, -1 ],
    [ 7, 4, 9, 7, 9, 2, 9, 10, 2, 3, 7, 2, -1 ],
    [ 1, 10, 3, 3, 10, 11, 4, 8, 7, -1 ],
    [ 4, 0, 7, 0, 1, 10, 7, 0, 10, 7, 10, 11, -1 ],
    [ 7, 4, 8, 9, 3, 0, 9, 11, 3, 9, 10, 11, -1 ],
    [ 7, 4, 11, 4, 9, 11, 9, 10, 11, -1 ],
    [ 5, 9, 4, -1 ],
    [ 8, 0, 3, 9, 4, 5, -1 ],
    [ 1, 0, 5, 5, 0, 4, -1 ],
    [ 5, 8, 4, 5, 3, 8, 5, 1, 3, -1 ],
    [ 3, 2, 11, 5, 9, 4, -1 ],
    [ 2, 11, 0, 0, 11, 8, 5, 9, 4, -1 ],
    [ 4, 5, 0, 0, 5, 1, 11, 3, 2, -1 ],
    [ 11, 8, 2, 8, 4, 5, 2, 8, 5, 2, 5, 1, -1 ],
    [ 5, 9, 4, 1, 10, 2, -1 ],
    [ 0, 3, 8, 1, 10, 2, 5, 9, 4, -1 ],
    [ 2, 5, 10, 2, 4, 5, 2, 0, 4, -1 ],
    [ 4, 5, 8, 8, 5, 3, 3, 5, 10, 3, 10, 2, -1 ],
    [ 11, 3, 10, 10, 3, 1, 4, 5, 9, -1 ],
    [ 4, 5, 9, 10, 0, 1, 10, 8, 0, 10, 11, 8, -1 ],
    [ 4, 5, 10, 4, 10, 3, 10, 11, 3, 0, 4, 3, -1 ],
    [ 4, 5, 8, 5, 10, 8, 10, 11, 8, -1 ],
    [ 5, 9, 7, 7, 9, 8, -1 ],
    [ 3, 9, 0, 3, 5, 9, 3, 7, 5, -1 ],
    [ 7, 0, 8, 7, 1, 0, 7, 5, 1, -1 ],
    [ 3, 7, 1, 1, 7, 5, -1 ],
    [ 5, 9, 7, 7, 9, 8, 2, 11, 3, -1 ],
    [ 5, 9, 0, 5, 0, 11, 0, 2, 11, 7, 5, 11, -1 ],
    [ 2, 11, 3, 7, 0, 8, 7, 1, 0, 7, 5, 1, -1 ],
    [ 2, 11, 1, 11, 7, 1, 7, 5, 1, -1 ],
    [ 8, 7, 9, 9, 7, 5, 2, 1, 10, -1 ],
    [ 10, 2, 1, 3, 9, 0, 3, 5, 9, 3, 7, 5, -1 ],
    [ 2, 0, 10, 0, 8, 7, 10, 0, 7, 10, 7, 5, -1 ],
    [ 10, 2, 5, 2, 3, 5, 3, 7, 5, -1 ],
    [ 5, 9, 8, 5, 8, 7, 1, 10, 3, 10, 11, 3, -1 ],
    [ 1, 10, 0, 0, 10, 11, 0, 11, 7, 0, 7, 5, 0, 5, 9, -1 ],
    [ 8, 7, 0, 0, 7, 5, 0, 5, 10, 0, 10, 11, 0, 11, 3, -1 ],
    [ 5, 11, 7, 10, 11, 5, -1 ],
    [ 11, 6, 7, -1 ],
    [ 3, 8, 0, 7, 11, 6, -1 ],
    [ 1, 0, 9, 7, 11, 6, -1 ],
    [ 9, 1, 8, 8, 1, 3, 6, 7, 11, -1 ],
    [ 6, 7, 2, 2, 7, 3, -1 ],
    [ 0, 7, 8, 0, 6, 7, 0, 2, 6, -1 ],
    [ 6, 7, 2, 2, 7, 3, 9, 1, 0, -1 ],
    [ 9, 1, 2, 9, 2, 7, 2, 6, 7, 8, 9, 7, -1 ],
    [ 10, 2, 1, 11, 6, 7, -1 ],
    [ 2, 1, 10, 3, 8, 0, 7, 11, 6, -1 ],
    [ 0, 9, 2, 2, 9, 10, 7, 11, 6, -1 ],
    [ 6, 7, 11, 8, 2, 3, 8, 10, 2, 8, 9, 10, -1 ],
    [ 7, 10, 6, 7, 1, 10, 7, 3, 1, -1 ],
    [ 1, 10, 0, 0, 10, 8, 8, 10, 6, 8, 6, 7, -1 ],
    [ 9, 10, 0, 10, 6, 7, 0, 10, 7, 0, 7, 3, -1 ],
    [ 6, 7, 10, 7, 8, 10, 8, 9, 10, -1 ],
    [ 4, 8, 6, 6, 8, 11, -1 ],
    [ 6, 3, 11, 6, 0, 3, 6, 4, 0, -1 ],
    [ 11, 6, 8, 8, 6, 4, 1, 0, 9, -1 ],
    [ 6, 4, 11, 4, 9, 1, 11, 4, 1, 11, 1, 3, -1 ],
    [ 2, 8, 3, 2, 4, 8, 2, 6, 4, -1 ],
    [ 0, 2, 4, 4, 2, 6, -1 ],
    [ 9, 1, 0, 2, 8, 3, 2, 4, 8, 2, 6, 4, -1 ],
    [ 9, 1, 4, 1, 2, 4, 2, 6, 4, -1 ],
    [ 4, 8, 6, 6, 8, 11, 1, 10, 2, -1 ],
    [ 1, 10, 2, 6, 3, 11, 6, 0, 3, 6, 4, 0, -1 ],
    [ 0, 9, 10, 0, 10, 2, 4, 8, 6, 8, 11, 6, -1 ],
    [ 11, 6, 3, 3, 6, 4, 3, 4, 9, 3, 9, 10, 3, 10, 2, -1 ],
    [ 1, 10, 6, 1, 6, 8, 6, 4, 8, 3, 1, 8, -1 ],
    [ 1, 10, 0, 10, 6, 0, 6, 4, 0, -1 ],
    [ 0, 9, 3, 3, 9, 10, 3, 10, 6, 3, 6, 4, 3, 4, 8, -1 ],
    [ 4, 10, 6, 9, 10, 4, -1 ],
    [ 4, 5, 9, 6, 7, 11, -1 ],
    [ 7, 11, 6, 8, 0, 3, 9, 4, 5, -1 ],
    [ 1, 0, 5, 5, 0, 4, 11, 6, 7, -1 ],
    [ 11, 6, 7, 5, 8, 4, 5, 3, 8, 5, 1, 3, -1 ],
    [ 3, 2, 7, 7, 2, 6, 9, 4, 5, -1 ],
    [ 5, 9, 4, 0, 7, 8, 0, 6, 7, 0, 2, 6, -1 ],
    [ 1, 0, 4, 1, 4, 5, 3, 2, 7, 2, 6, 7, -1 ],
    [ 4, 5, 8, 8, 5, 1, 8, 1, 2, 8, 2, 6, 8, 6, 7, -1 ],
    [ 6, 7, 11, 5, 9, 4, 1, 10, 2, -1 ],
    [ 5, 9, 4, 7, 11, 6, 0, 3, 8, 2, 1, 10, -1 ],
    [ 7, 11, 6, 2, 5, 10, 2, 4, 5, 2, 0, 4, -1 ],
    [ 6, 7, 11, 3, 8, 4, 3, 4, 5, 3, 5, 2, 2, 5, 10, -1 ],
    [ 9, 4, 5, 7, 10, 6, 7, 1, 10, 7, 3, 1, -1 ],
    [ 5, 9, 4, 8, 0, 1, 8, 1, 10, 8, 10, 7, 7, 10, 6, -1 ],
    [ 6, 7, 10, 10, 7, 3, 10, 3, 0, 10, 0, 4, 10, 4, 5, -1 ],
    [ 4, 5, 8, 8, 5, 10, 8, 10, 6, 8, 6, 7, -1 ],
    [ 9, 6, 5, 9, 11, 6, 9, 8, 11, -1 ],
    [ 0, 3, 9, 9, 3, 5, 5, 3, 11, 5, 11, 6, -1 ],
    [ 1, 0, 8, 1, 8, 6, 8, 11, 6, 5, 1, 6, -1 ],
    [ 11, 6, 3, 6, 5, 3, 5, 1, 3, -1 ],
    [ 2, 6, 3, 6, 5, 9, 3, 6, 9, 3, 9, 8, -1 ],
    [ 5, 9, 6, 9, 0, 6, 0, 2, 6, -1 ],
    [ 3, 2, 8, 8, 2, 6, 8, 6, 5, 8, 5, 1, 8, 1, 0, -1 ],
    [ 1, 6, 5, 2, 6, 1, -1 ],
    [ 2, 1, 10, 9, 6, 5, 9, 11, 6, 9, 8, 11, -1 ],
    [ 2, 1, 10, 5, 9, 0, 5, 0, 3, 5, 3, 6, 6, 3, 11, -1 ],
    [ 10, 2, 5, 5, 2, 0, 5, 0, 8, 5, 8, 11, 5, 11, 6, -1 ],
    [ 10, 2, 5, 5, 2, 3, 5, 3, 11, 5, 11, 6, -1 ],
    [ 5, 9, 6, 6, 9, 8, 6, 8, 3, 6, 3, 1, 6, 1, 10, -1 ],
    [ 5, 9, 6, 6, 9, 0, 6, 0, 1, 6, 1, 10, -1 ],
    [ 8, 3, 0, 5, 10, 6, -1 ],
    [ 6, 5, 10, -1 ],
    [ 6, 10, 5, -1 ],
    [ 3, 8, 0, 5, 6, 10, -1 ],
    [ 9, 1, 0, 10, 5, 6, -1 ],
    [ 3, 8, 1, 1, 8, 9, 6, 10, 5, -1 ],
    [ 6, 10, 5, 2, 11, 3, -1 ],
    [ 8, 0, 11, 11, 0, 2, 5, 6, 10, -1 ],
    [ 10, 5, 6, 1, 0, 9, 3, 2, 11, -1 ],
    [ 5, 6, 10, 11, 1, 2, 11, 9, 1, 11, 8, 9, -1 ],
    [ 2, 1, 6, 6, 1, 5, -1 ],
    [ 5, 6, 1, 1, 6, 2, 8, 0, 3, -1 ],
    [ 6, 9, 5, 6, 0, 9, 6, 2, 0, -1 ],
    [ 8, 9, 3, 9, 5, 6, 3, 9, 6, 3, 6, 2, -1 ],
    [ 3, 6, 11, 3, 5, 6, 3, 1, 5, -1 ],
    [ 5, 6, 11, 5, 11, 0, 11, 8, 0, 1, 5, 0, -1 ],
    [ 0, 9, 3, 3, 9, 11, 11, 9, 5, 11, 5, 6, -1 ],
    [ 5, 6, 9, 6, 11, 9, 11, 8, 9, -1 ],
    [ 7, 4, 8, 5, 6, 10, -1 ],
    [ 0, 3, 4, 4, 3, 7, 10, 5, 6, -1 ],
    [ 4, 8, 7, 9, 1, 0, 10, 5, 6, -1 ],
    [ 6, 10, 5, 1, 4, 9, 1, 7, 4, 1, 3, 7, -1 ],
    [ 11, 3, 2, 7, 4, 8, 5, 6, 10, -1 ],
    [ 10, 5, 6, 4, 11, 7, 4, 2, 11, 4, 0, 2, -1 ],
    [ 7, 4, 8, 3, 2, 11, 9, 1, 0, 10, 5, 6, -1 ],
    [ 10, 5, 6, 7, 4, 9, 7, 9, 1, 7, 1, 11, 11, 1, 2, -1 ],
    [ 2, 1, 6, 6, 1, 5, 8, 7, 4, -1 ],
    [ 7, 4, 0, 7, 0, 3, 5, 6, 1, 6, 2, 1, -1 ],
    [ 8, 7, 4, 6, 9, 5, 6, 0, 9, 6, 2, 0, -1 ],
    [ 5, 6, 9, 9, 6, 2, 9, 2, 3, 9, 3, 7, 9, 7, 4, -1 ],
    [ 4, 8, 7, 3, 6, 11, 3, 5, 6, 3, 1, 5, -1 ],
    [ 7, 4, 11, 11, 4, 0, 11, 0, 1, 11, 1, 5, 11, 5, 6, -1 ],
    [ 4, 8, 7, 11, 3, 0, 11, 0, 9, 11, 9, 6, 6, 9, 5, -1 ],
    [ 5, 6, 9, 9, 6, 11, 9, 11, 7, 9, 7, 4, -1 ],
    [ 9, 4, 10, 10, 4, 6, -1 ],
    [ 6, 10, 4, 4, 10, 9, 3, 8, 0, -1 ],
    [ 0, 10, 1, 0, 6, 10, 0, 4, 6, -1 ],
    [ 3, 8, 4, 3, 4, 10, 4, 6, 10, 1, 3, 10, -1 ],
    [ 9, 4, 10, 10, 4, 6, 3, 2, 11, -1 ],
    [ 8, 0, 2, 8, 2, 11, 9, 4, 10, 4, 6, 10, -1 ],
    [ 11, 3, 2, 0, 10, 1, 0, 6, 10, 0, 4, 6, -1 ],
    [ 2, 11, 1, 1, 11, 8, 1, 8, 4, 1, 4, 6, 1, 6, 10, -1 ],
    [ 4, 1, 9, 4, 2, 1, 4, 6, 2, -1 ],
    [ 3, 8, 0, 4, 1, 9, 4, 2, 1, 4, 6, 2, -1 ],
    [ 4, 6, 0, 0, 6, 2, -1 ],
    [ 3, 8, 2, 8, 4, 2, 4, 6, 2, -1 ],
    [ 3, 1, 11, 1, 9, 4, 11, 1, 4, 11, 4, 6, -1 ],
    [ 9, 4, 1, 1, 4, 6, 1, 6, 11, 1, 11, 8, 1, 8, 0, -1 ],
    [ 11, 3, 6, 3, 0, 6, 0, 4, 6, -1 ],
    [ 8, 6, 11, 4, 6, 8, -1 ],
    [ 10, 7, 6, 10, 8, 7, 10, 9, 8, -1 ],
    [ 10, 9, 6, 9, 0, 3, 6, 9, 3, 6, 3, 7, -1 ],
    [ 8, 7, 0, 0, 7, 1, 1, 7, 6, 1, 6, 10, -1 ],
    [ 6, 10, 7, 10, 1, 7, 1, 3, 7, -1 ],
    [ 3, 2, 11, 10, 7, 6, 10, 8, 7, 10, 9, 8, -1 ],
    [ 6, 10, 7, 7, 10, 9, 7, 9, 0, 7, 0, 2, 7, 2, 11, -1 ],
    [ 11, 3, 2, 1, 0, 8, 1, 8, 7, 1, 7, 10, 10, 7, 6, -1 ],
    [ 6, 10, 7, 7, 10, 1, 7, 1, 2, 7, 2, 11, -1 ],
    [ 8, 7, 6, 8, 6, 1, 6, 2, 1, 9, 8, 1, -1 ],
    [ 0, 3, 9, 9, 3, 7, 9, 7, 6, 9, 6, 2, 9, 2, 1, -1 ],
    [ 8, 7, 0, 7, 6, 0, 6, 2, 0, -1 ],
    [ 7, 2, 3, 6, 2, 7, -1 ],
    [ 11, 3, 6, 6, 3, 1, 6, 1, 9, 6, 9, 8, 6, 8, 7, -1 ],
    [ 11, 7, 6, 1, 9, 0, -1 ],
    [ 11, 3, 6, 6, 3, 0, 6, 0, 8, 6, 8, 7, -1 ],
    [ 11, 7, 6, -1 ],
    [ 10, 5, 11, 11, 5, 7, -1 ],
    [ 10, 5, 11, 11, 5, 7, 0, 3, 8, -1 ],
    [ 7, 11, 5, 5, 11, 10, 0, 9, 1, -1 ],
    [ 3, 8, 9, 3, 9, 1, 7, 11, 5, 11, 10, 5, -1 ],
    [ 5, 2, 10, 5, 3, 2, 5, 7, 3, -1 ],
    [ 0, 2, 8, 2, 10, 5, 8, 2, 5, 8, 5, 7, -1 ],
    [ 0, 9, 1, 5, 2, 10, 5, 3, 2, 5, 7, 3, -1 ],
    [ 10, 5, 2, 2, 5, 7, 2, 7, 8, 2, 8, 9, 2, 9, 1, -1 ],
    [ 1, 11, 2, 1, 7, 11, 1, 5, 7, -1 ],
    [ 8, 0, 3, 1, 11, 2, 1, 7, 11, 1, 5, 7, -1 ],
    [ 0, 9, 5, 0, 5, 11, 5, 7, 11, 2, 0, 11, -1 ],
    [ 3, 8, 2, 2, 8, 9, 2, 9, 5, 2, 5, 7, 2, 7, 11, -1 ],
    [ 5, 7, 1, 1, 7, 3, -1 ],
    [ 8, 0, 7, 0, 1, 7, 1, 5, 7, -1 ],
    [ 0, 9, 3, 9, 5, 3, 5, 7, 3, -1 ],
    [ 9, 7, 8, 5, 7, 9, -1 ],
    [ 8, 5, 4, 8, 10, 5, 8, 11, 10, -1 ],
    [ 10, 5, 4, 10, 4, 3, 4, 0, 3, 11, 10, 3, -1 ],
    [ 1, 0, 9, 8, 5, 4, 8, 10, 5, 8, 11, 10, -1 ],
    [ 9, 1, 4, 4, 1, 3, 4, 3, 11, 4, 11, 10, 4, 10, 5, -1 ],
    [ 10, 5, 2, 2, 5, 3, 3, 5, 4, 3, 4, 8, -1 ],
    [ 10, 5, 2, 5, 4, 2, 4, 0, 2, -1 ],
    [ 9, 1, 0, 3, 2, 10, 3, 10, 5, 3, 5, 8, 8, 5, 4, -1 ],
    [ 10, 5, 2, 2, 5, 4, 2, 4, 9, 2, 9, 1, -1 ],
    [ 1, 5, 2, 5, 4, 8, 2, 5, 8, 2, 8, 11, -1 ],
    [ 2, 1, 11, 11, 1, 5, 11, 5, 4, 11, 4, 0, 11, 0, 3, -1 ],
    [ 4, 8, 5, 5, 8, 11, 5, 11, 2, 5, 2, 0, 5, 0, 9, -1 ],
    [ 5, 4, 9, 2, 3, 11, -1 ],
    [ 4, 8, 5, 8, 3, 5, 3, 1, 5, -1 ],
    [ 0, 5, 4, 1, 5, 0, -1 ],
    [ 0, 9, 3, 3, 9, 5, 3, 5, 4, 3, 4, 8, -1 ],
    [ 5, 4, 9, -1 ],
    [ 11, 4, 7, 11, 9, 4, 11, 10, 9, -1 ],
    [ 0, 3, 8, 11, 4, 7, 11, 9, 4, 11, 10, 9, -1 ],
    [ 0, 4, 1, 4, 7, 11, 1, 4, 11, 1, 11, 10, -1 ],
    [ 7, 11, 4, 4, 11, 10, 4, 10, 1, 4, 1, 3, 4, 3, 8, -1 ],
    [ 9, 4, 7, 9, 7, 2, 7, 3, 2, 10, 9, 2, -1 ],
    [ 8, 0, 7, 7, 0, 2, 7, 2, 10, 7, 10, 9, 7, 9, 4, -1 ],
    [ 1, 0, 10, 10, 0, 4, 10, 4, 7, 10, 7, 3, 10, 3, 2, -1 ],
    [ 7, 8, 4, 10, 1, 2, -1 ],
    [ 9, 4, 1, 1, 4, 2, 2, 4, 7, 2, 7, 11, -1 ],
    [ 8, 0, 3, 2, 1, 9, 2, 9, 4, 2, 4, 11, 11, 4, 7, -1 ],
    [ 7, 11, 4, 11, 2, 4, 2, 0, 4, -1 ],
    [ 3, 8, 2, 2, 8, 4, 2, 4, 7, 2, 7, 11, -1 ],
    [ 9, 4, 1, 4, 7, 1, 7, 3, 1, -1 ],
    [ 9, 4, 1, 1, 4, 7, 1, 7, 8, 1, 8, 0, -1 ],
    [ 3, 4, 7, 0, 4, 3, -1 ],
    [ 7, 8, 4, -1 ],
    [ 8, 11, 9, 9, 11, 10, -1 ],
    [ 0, 3, 9, 3, 11, 9, 11, 10, 9, -1 ],
    [ 1, 0, 10, 0, 8, 10, 8, 11, 10, -1 ],
    [ 10, 3, 11, 1, 3, 10, -1 ],
    [ 3, 2, 8, 2, 10, 8, 10, 9, 8, -1 ],
    [ 9, 2, 10, 0, 2, 9, -1 ],
    [ 1, 0, 10, 10, 0, 8, 10, 8, 3, 10, 3, 2, -1 ],
    [ 2, 10, 1, -1 ],
    [ 2, 1, 11, 1, 9, 11, 9, 8, 11, -1 ],
    [ 2, 1, 11, 11, 1, 9, 11, 9, 0, 11, 0, 3, -1 ],
    [ 11, 0, 8, 2, 0, 11, -1 ],
    [ 3, 11, 2, -1 ],
    [ 1, 8, 3, 9, 8, 1, -1 ],
    [ 1, 9, 0, -1 ],
    [ 8, 3, 0, -1 ],
    [ -1 ],
];

class NormalMesh {
    /**
     * Creates a new mesh and loads it into video memory.
     *
     * @param {WebGLRenderingContext} gl
     * @param {number} program
     * @param {number[]} vertices
     * @param {number[]} indices
    */
    constructor( gl, program, vertices, indices, material, use_color) {
        this.verts = create_and_load_vertex_buffer( gl, vertices, gl.STATIC_DRAW );
        this.indis = create_and_load_elements_buffer( gl, indices, gl.STATIC_DRAW );

        this.n_verts = vertices.length / VERTEX_STRIDE * 4;
        this.n_indis = indices.length;
        this.program = program;
        this.material = material;

        this.use_color = use_color ?? false;
    }

    set_vertex_attributes() {
        set_vertex_attrib_to_buffer(
            gl, this.program,
            "coordinates",
            this.verts, 3,
            gl.FLOAT, false, VERTEX_STRIDE, 0
        );

        set_vertex_attrib_to_buffer(
            gl, this.program,
            "color",
            this.verts, 4,
            gl.FLOAT, false, VERTEX_STRIDE, 12
        );

        set_vertex_attrib_to_buffer(
            gl, this.program,
            "uv",
            this.verts, 2,
            gl.FLOAT, false, VERTEX_STRIDE, 28
        );

        set_vertex_attrib_to_buffer(
            gl, this.program,
            "surf_normal",
            this.verts, 3,
            gl.FLOAT, false, VERTEX_STRIDE, 36
        )
    }


    /**
     * Create a box mesh with the given dimensions and colors. Creates normals.
     * @param {WebGLRenderingContext} gl
     */

    static box( gl, program, width, height, depth, material ) {
        let hwidth = width / 2.0;
        let hheight = height / 2.0;
        let hdepth = depth / 2.0;

        let verts = [
            hwidth, -hheight, -hdepth,  1.0, 0.0, 1.0, 1.0,     1.0, 1.0,   0.0, 0.0, -1.0,
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     0.0, 1.0,   0.0, 0.0, -1.0,
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     0.0, 0.0,   0.0, 0.0, -1.0,
            hwidth, hheight, -hdepth,   1.0, 1.0, 0.5, 1.0,     1.0, 0.0,   0.0, 0.0, -1.0,

            hwidth, -hheight, hdepth,   1.0, 0.0, 1.0, 1.0,     1.0, 1.0,   1.0, 0.0, 0.0,
            hwidth, -hheight, -hdepth,  0.0, 1.0, 1.0, 1.0,     0.0, 1.0,   1.0, 0.0, 0.0,
            hwidth, hheight, -hdepth,   0.5, 0.5, 1.0, 1.0,     0.0, 0.0,   1.0, 0.0, 0.0,
            hwidth, hheight, hdepth,    1.0, 1.0, 0.5, 1.0,     1.0, 0.0,   1.0, 0.0, 0.0,

            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     1.0, 1.0,   0.0, 0.0, 1.0,
            hwidth, -hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     0.0, 1.0,   0.0, 0.0, 1.0,
            hwidth, hheight, hdepth,    0.5, 0.5, 1.0, 1.0,     0.0, 0.0,   0.0, 0.0, 1.0,
            -hwidth, hheight, hdepth,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0,   0.0, 0.0, 1.0,

            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     0.0, 1.0,   -1.0, 0.0, 0.0,
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     1.0, 1.0,   -1.0, 0.0, 0.0,
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     1.0, 0.0,   -1.0, 0.0, 0.0,
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     0.0, 0.0,   -1.0, 0.0, 0.0,

            -hwidth, hheight, -hdepth,  1.0, 0.0, 0.0, 1.0,     0.0, 1.0,   0.0, 1.0, 0.0,
            hwidth, hheight, -hdepth,   0.0, 1.0, 0.0, 1.0,     1.0, 1.0,   0.0, 1.0, 0.0,
            hwidth, hheight, hdepth,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0,   0.0, 1.0, 0.0,
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.0, 1.0,     0.0, 0.0,   0.0, 1.0, 0.0,

            -hwidth, -hheight, -hdepth, 1.0, 0.0, 0.0, 1.0,     0.0, 1.0,   0.0, -1.0, 0.0,
            hwidth, -hheight, -hdepth,  0.0, 1.0, 0.0, 1.0,     1.0, 1.0,   0.0, -1.0, 0.0,
            hwidth, -hheight, hdepth,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0,   0.0, -1.0, 0.0,
            -hwidth, -hheight, hdepth,  1.0, 1.0, 0.0, 1.0,     0.0, 0.0,   0.0, -1.0, 0.0,
        ];

        let indis = [
            // clockwise winding
            0, 3, 2, 2, 1, 0,
            4, 7, 6, 6, 5, 4,
            8, 11, 10, 10, 9, 8,
            12, 13, 14, 14, 15, 12,
            16, 17, 18, 18, 19, 16,
            20, 23, 22, 22, 21, 20,
        ];

        return new NormalMesh( gl, program, verts, indis, material, false );
    }

    /**
     * Create a flat platform in the xz plane.
     * @param {WebGLRenderingContext} gl
     */
    static platform( gl, program, width, depth, uv_min, uv_max, material ) {
        let hwidth = width / 2;
        let hdepth = depth / 2;

        let verts = [
            -hwidth, 0, -hdepth,  1.0, 1.0, 1.0, 1.0,     uv_min, uv_max,   0.0, 1.0, 0.0,
            hwidth, 0, -hdepth,   1.0, 1.0, 1.0, 1.0,     uv_max, uv_max,   0.0, 1.0, 0.0,
            hwidth, 0, hdepth,    1.0, 1.0, 1.0, 1.0,     uv_max, uv_min,   0.0, 1.0, 0.0,
            -hwidth, 0, hdepth,   1.0, 1.0, 1.0, 1.0,     uv_min, uv_min,   0.0, 1.0, 0.0,
        ];

        let indis = [ 0, 1, 2, 2, 3, 0, ];

        return new NormalMesh( gl, program, verts, indis, material, false );
    }

    /**
     * Load a mesh from a heightmap.
     * @param {WebGLRenderingContext} gl
     * @param {WebGLProgram} program
     * @param {number[][]} map
     * @param {number} min
     * @param {number} max
     */
    static from_heightmap( gl, program, map, min, max, material ) {
        let rows = map.length;
        let cols = map[0].length;
        const MIN_HEIGHT_COLOR = 0.2;

        let off_x = cols / 2;
        let off_z = rows / 2;

        let verts = [];
        let indis = [];

        function color( height ) {
            let normed_height = height / ( max - min );
            return MIN_HEIGHT_COLOR + normed_height * ( 1 - MIN_HEIGHT_COLOR );
        }

        function push_vert( verts, vert, u, v, normal ) {
            verts.push( vert.x, vert.y, vert.z );
            let vert_bright = color( vert.y );
            verts.push( vert_bright, vert_bright, vert_bright, 1.0 );
            verts.push( u, v );
            verts.push( normal.x, normal.y, normal.z );
        }

        for( let row = 1; row < rows; row++ ) {
            for( let col = 1; col < cols; col++ ) {
                let indi_start = indis.length;

                let pos_tl = map[row - 1][col - 1];
                let pos_tr = map[row - 1][col];
                let pos_bl = map[row][col - 1];
                let pos_br = map[row][col];

                let v_tl = new Vec4( -1, pos_tl, -1 );
                let v_tr = new Vec4( 0, pos_tr, -1 );
                let v_bl = new Vec4( -1, pos_bl, 0 );
                let v_br = new Vec4( 0, pos_br, 0 );

                let normal_t1 = Vec4.normal_of_triangle( v_tl, v_tr, v_bl );
                let normal_t2 = Vec4.normal_of_triangle( v_br, v_bl, v_tr );

                // debug
                // normal_t1 = new Vec4( 0, 1, 0 );
                // normal_t2 = new Vec4( 0, 1, 0 );

                v_tl.x += col - off_x;
                v_tl.z += row - off_z;
                v_tr.x += col - off_x;
                v_tr.z += row - off_z;
                v_bl.x += col - off_x;
                v_bl.z += row - off_z;
                v_br.x += col - off_x;
                v_br.z += row - off_z;

                push_vert( verts, v_tl, 0, 1, normal_t1 );
                push_vert( verts, v_tr, 1, 1, normal_t1 );
                push_vert( verts, v_bl, 0, 0, normal_t1 );

                push_vert( verts, v_br, 1, 0, normal_t2 );
                push_vert( verts, v_bl, 0, 0, normal_t2 );
                push_vert( verts, v_tr, 1, 1, normal_t2 );

                indis.push(
                    indi_start,
                    indi_start + 1,
                    indi_start + 2,
                    indi_start + 3,
                    indi_start + 4,
                    indi_start + 5
                );
            }
        }

        return new NormalMesh( gl, program, verts, indis, material, true );
    }

    /**
     * Render the mesh. Does NOT preserve array/index buffer, program, or texture bindings!
     *
     * @param {WebGLRenderingContext} gl
     */
    render( gl ) {
        // gl.enable( gl.CULL_FACE );

        gl.useProgram( this.program );
        this.set_vertex_attributes();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.verts );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indis );
        bind_texture_samplers( gl, this.program, "tex_0" );

        gl.activeTexture( gl.TEXTURE0 );
        this.material.bind( gl, this.program );

        set_uniform_int( gl, this.program, 'use_color', this.use_color );

        gl.drawElements( gl.TRIANGLES, this.n_indis, gl.UNSIGNED_SHORT, 0 );
    }

    /**
     * Create a UV sphere.
     * @param {*} gl
     * @param {*} program
     * @param {*} radius
     * @param {*} subdivs the number of subdivisions, both vertically and radially
     * @param {*} material
     * @returns
     */
    static uv_sphere( gl, program, radius, subdivs, material ) {
        if( subdivs < 3 ) {
            throw new Error( "subdivs must be at least 3. value: " + subdivs );
        }

        let verts = []
        let indis = []

        for( let layer = 0; layer <= subdivs; layer++ ) {
            // let y = layer / subdivs - 0.5;
            let y_turns = layer /  subdivs / 2;
            let y = Math.cos( 2 * Math.PI * y_turns ) / 2;
            let radius_scale_for_layer = Math.sin( 2 * Math.PI * y_turns );

            for( let subdiv = 0; subdiv <= subdivs; subdiv++ ) {
                let turns = subdiv / subdivs;
                let rads = 2 * Math.PI * turns;

                let x = Math.cos( rads ) / 2 * radius_scale_for_layer;
                let z = Math.sin( rads ) / 2 * radius_scale_for_layer;

                let point_norm = new Vec4( x, y, z, 0.0 ).norm();
                let scaled_point = point_norm.scaled( radius );

                // coordinates
                verts.push( scaled_point.x, scaled_point.y, scaled_point.z );

                // console.log( layer, subdiv, scaled_point.x, scaled_point.y, scaled_point.z );

                // color (we're making it white for simplicity)
                verts.push( 1, 1, 1, 1 );

                // uvs
                verts.push( subdiv / subdivs, layer / subdivs );

                // normal vector. make sure you understand why the normalized coordinate is
                // equivalent to the normal vector for the sphere.
                verts.push( point_norm.x, point_norm.y, point_norm.z );
            }
        }

        function get_indi_no_from_layer_and_subdiv_no( layer, subdiv ) {
            let layer_start = layer * ( subdivs + 1 );
            return layer_start + subdiv % ( subdivs + 1 );
        }

        for( let layer = 1; layer <= subdivs; layer++ ) {
            for( let subdiv = 0; subdiv < subdivs; subdiv++ ) {
                let i0 = get_indi_no_from_layer_and_subdiv_no( layer - 1, subdiv );
                let i1 = get_indi_no_from_layer_and_subdiv_no( layer - 1, subdiv + 1 );
                let i2 = get_indi_no_from_layer_and_subdiv_no( layer, subdiv );
                let i3 = get_indi_no_from_layer_and_subdiv_no( layer, subdiv + 1 );

                indis.push( i0, i2, i3, i3, i1, i0 );
            }
        }

        return new NormalMesh( gl, program, verts, indis, material, true );
    }

    static marchingCubes( gl, program, subdivs, xpos, ypos, zpos, thresh, octaves, material ) {

        function inside(x, y, z) {
            x += xpos;
            y += ypos;
            z += zpos;

            // strarting sphere:
            if ((x-0.5)*(x-0.5) + (y-0.5)*(y-0.5) + (z-0.5)*(z-0.5) <= 0.05) {
                return 1;
            } else {
                return fractal3d(x, y, z, octaves) <= thresh;
            }
        }

        function normalVec(x, y, z) {
            let ba = new Vec4(-x, y, 0.0, 1.0);
            let ca = new Vec4(-x, 0.0, z, 1.0);
            return ba.cross(ca).norm();

        }

        let verts = [];
        let indis = [];

        let cellData = [];
        let dx0, dx1, dy0, dy1, dz0, dz1;

        for (let x = 0; x < subdivs; x++) {
            dx0 = x/(subdivs);
            dx1 = (x+1)/(subdivs);
            for (let y = 0; y < subdivs; y++) {
                dy0 = y/(subdivs);
                dy1 = (y+1)/(subdivs);
                for (let z = 0; z < subdivs; z++) {
                    dz0 = z/(subdivs);
                    dz1 = (z+1)/(subdivs);

                    // might be better to calculate the triangle index here instead
                    cellData.push([inside(dx0, dy0, dz0), inside(dx0, dy0, dz1),
                    inside(dx0, dy1, dz0), inside(dx0, dy1, dz1),
                    inside(dx1, dy0, dz0), inside(dx1, dy0, dz1),
                    inside(dx1, dy1, dz0), inside(dx1, dy1, dz1)]);
                }
            }
        }

//        +-----6-------+
//      / |            /|
//   11   7        10   5
//  +-----+2------+     |
//  |     +-----4-+-----+
//  3   8         1   9
//  | /           | /
//  +------0------+
// (except it's flipped)

        let dist = 1.0/subdivs;

        let pointTable = [
            new Vec4(dist, dist, 0.0, 1.0),
            new Vec4(dist, 0.0, -dist, 1.0),
            new Vec4(dist, -dist, 0.0, 1.0),
            new Vec4(dist, 0.0, dist, 1.0),
            new Vec4(-dist, dist, 0.0, 1.0),
            new Vec4(-dist, 0.0, -dist, 1.0),
            new Vec4(-dist, -dist, 0.0, 1.0),
            new Vec4(-dist, 0.0, dist, 1.0),
            new Vec4(0.0, dist, dist, 1.0),
            new Vec4(0.0, dist, -dist, 1.0),
            new Vec4(0.0, -dist, -dist, 1.0),
            new Vec4(0.0, -dist, dist, 1.0)
        ];

        let index = 0;
        let vertSize, triangleSize, norm, px, py, pz, cx, cy, i, t;
        let point = [];

        for (let x = 0; x < subdivs; x++) {
            cx = x * subdivs * subdivs;
            dx0 = x/(subdivs);
            for (let y = 0; y < subdivs; y++) {
                cy = y * subdivs;
                dy0 = y/(subdivs);
                for (let z = 0; z < subdivs; z++) {
                    i = cx + cy + z;
                    dz0 = z/(subdivs);

                    // prob could use bit-wise operations
                    for (let j = 0; j < 8; j++) {
                        index += Math.pow(2, j) * cellData[i][7-j];
                    }

                    vertSize = verts.length/(VERTEX_STRIDE/4);
                    triangleSize = TriangleTable[index].length - 1;
                    for (let j = 0; j < triangleSize; j++) {
                        t = TriangleTable[index][j];

                        if (point.includes(t)) {
                            indis.push(vertSize + point.indexOf(t));
                        } else {

                            px = pointTable[t].x + 2*dx0 + 2*xpos;
                            py = pointTable[t].y + 2*dy0 + 2*ypos;
                            pz = pointTable[t].z + 2*dz0 + 2*zpos;

                            // coords
                            verts.push(px, py, pz);
                            // colors
                            verts.push(0.2, 1.0, 0.2, 1.0);
                            // uvs
                            verts.push(0, y/(subdivs-1));
                            // norms
                            norm = normalVec(px, py, pz);
                            verts.push(norm.x, norm.y, norm.z);

                            indis.push(vertSize + j - (j-point.length));

                            point.push(t);
                        }
                    }

                    point = [];
                    index = 0;
                }
            }
        }

        return new NormalMesh( gl, program, verts, indis, material, true );
    }
}
