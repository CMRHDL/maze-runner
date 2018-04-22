import { lighten } from 'polished';

const getProp = (prop, fallback) => props => props[prop] || fallback;

const addProp = (prop, key) => {
  if (prop == null) return {};
  return key ? { [key]: prop } : { prop };
};

const colors = {
  wall: 'palevioletred',
  free: 'papayawhip',
  player: 'mediumseagreen',
};

const mazeToTiles = ({
  maze = [[]],
  colors: { wall = colors.wall, free = colors.free } = {},
  tileSize,
  moveCount,
  tail,
}) =>
  maze.map((rows, rowsIndex) =>
    rows.map((field, fieldIndex) => {
      const tileDef = {
        key: `x: ${fieldIndex}, y: ${rowsIndex}`,
        ...addProp(tileSize, 'size'),
      };

      if (field === '#') return { ...tileDef, color: wall };

      const isAheadOrAfterTail = field.every(
        ({ moveCount: _step }) => moveCount - tail > _step || _step > moveCount
      );

      if (isAheadOrAfterTail) return { ...tileDef, color: free };

      const color = lighten(
        0.5 / tail * (moveCount - field[0].moveCount),
        field[0].color
      );

      return { ...tileDef, color };
    })
  );

export { getProp, mazeToTiles };
