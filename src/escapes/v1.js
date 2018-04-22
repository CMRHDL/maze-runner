const escape = maze => {
  maze = maze.map(m => m.replace(/ /g, 0).split(''));

  if (
    maze[0].indexOf('0') === -1 &&
    maze[maze.length - 1].indexOf('0') === -1 &&
    maze.map(y => y[0]).indexOf('0') === -1 &&
    maze.map(y => y[y.length - 1]).indexOf('0') === -1
  )
    return [];

  if (
    maze[0].every((field, i) => field === '#' || maze[1][i] === '#') &&
    maze[maze.length - 1].every(
      (field, i) => field === '#' || maze[maze.length - 2][i] === '#'
    ) &&
    maze
      .map(y => y[0])
      .every((field, i) => field === '#' || maze.map(y => y[1])[i] === '#') &&
    maze
      .map(y => y[y.length - 1])
      .every(
        (field, i) => field === '#' || maze.map(y => y[y.length - 2])[i] === '#'
      )
  ) {
    return [];
  }

  const getPosition = maze =>
    maze
      .map((y, i) => {
        const player = y.find(spot => /<|>|\^|v/.test(spot));
        if (player) return [y.indexOf(player), i];
      })
      .filter(Boolean)[0];

  const getOptions = (maze, [x, y]) => [
    { name: 'north', field: maze[y - 1][x], pos: [x, y - 1] },
    { name: 'east', field: maze[y][x + 1], pos: [x + 1, y] },
    { name: 'south', field: maze[y + 1][x], pos: [x, y + 1] },
    { name: 'west', field: maze[y][x - 1], pos: [x - 1, y] },
  ];

  const getBestOption = options => {
    return options
      .filter(({ field }) => !(field === '#'))
      .reduce(
        ({ name, pos, field }, c) =>
          field == null || field > c.field ? c : { name, pos, field },
        {}
      );
  };

  const getDirection = player => {
    const dirs = {
      '^': 'north',
      '>': 'east',
      v: 'south',
      '<': 'west',
      north: '^',
      east: '>',
      south: 'v',
      west: '<',
    };

    return dirs[player];
  };

  const moveIntoDirection = (currentDirection, moveDirection) => {
    let move = '';

    if (currentDirection === 'north') {
      if (moveDirection === 'east') move += 'R';
      if (moveDirection === 'south') move += 'B';
      if (moveDirection === 'west') move += 'L';
    }

    if (currentDirection === 'south') {
      if (moveDirection === 'east') move += 'L';
      if (moveDirection === 'north') move += 'B';
      if (moveDirection === 'west') move += 'R';
    }

    if (currentDirection === 'east') {
      if (moveDirection === 'south') move += 'R';
      if (moveDirection === 'north') move += 'L';
      if (moveDirection === 'west') move += 'B';
    }

    if (currentDirection === 'west') {
      if (moveDirection === 'south') move += 'L';
      if (moveDirection === 'north') move += 'R';
      if (moveDirection === 'east') move += 'B';
    }

    return move + 'F';
  };

  let moveCounter = 0;
  let moves = '';
  const move = (maze, position) => {
    const [x, y] = position || getPosition(maze);
    if (
      x === 0 ||
      y === 0 ||
      x === maze[0].length - 1 ||
      y === maze.length - 1
    ) {
      return moves;
    }

    const { name, pos, field } = getBestOption(getOptions(maze, [x, y]));

    moveCounter++;
    const player = maze[y][x];
    const facing = getDirection(player);
    maze[y][x] = moveCounter;

    const [newX, newY] = pos;
    maze[newY][newX] = getDirection(name);
    moves += moveIntoDirection(getDirection(player), name);

    return move(maze, pos);
  };

  return move(maze).split('');
};

export { escape };
