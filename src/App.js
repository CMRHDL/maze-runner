import * as React from 'react';
import { Maze } from './Components/Maze';
import { Flex } from './Components/Flex';
import { Control } from './Container/Control';
import { mazeToTiles, getProp } from './lib';
import { escapes } from './escapes';
import styled from 'styled-components';
import { withState, compose } from 'recompose';

const FirstColumn = styled(Flex).attrs({ direction: 'column' })`
  max-width: 75%;
  overflow: auto;
  padding: 5rem;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

class Container extends React.Component {
  state = {
    mazeWithSolutions: [[]],
    moveCount: 0,
  };

  start = [];

  nextStep = () => {
    const { isRunning, speed } = this.props;

    setTimeout(() => {
      if (isRunning) {
        this.setState(({ moveCount }) => ({ moveCount: moveCount + 1 }));
      }

      this.nextStep();
    }, speed);
  };

  componentDidMount = () => {
    this.nextStep();
  };

  static getDerivedStateFromProps = nextProps => {
    let { maze, activeEscapeFunctions } = nextProps;

    // ¯\_(ツ)_/¯
    if (
      JSON.stringify(activeEscapeFunctions.map(getProp('id'))) !==
      JSON.stringify(
        this.props && this.props.activeEscapeFunctions.map(getProp('id'))
      )
    ) {
      const solutions = activeEscapeFunctions.map(({ fn, ...props }) => ({
        ...props,
        moves: fn(maze),
      }));

      const mazeWithSolutions = maze.map((rows, rowsIndex) =>
        rows.split('').map((field, fieldIndex) => {
          if (field === '#') return '#';
          if (field === ' ') return [];
          this.start = [fieldIndex, rowsIndex, field];
          return [];
        })
      );

      const turnAround = (currentDirection, moveDirection) => {
        const directions = {
          '<': {
            R: '^',
            B: '>',
            L: 'v',
          },
          '>': {
            R: 'v',
            B: '<',
            L: '^',
          },
          '^': {
            R: '>',
            B: 'v',
            L: '<',
          },
          v: {
            R: '<',
            B: '^',
            L: '>',
          },
        };

        return directions[currentDirection][moveDirection];
      };

      solutions.forEach(({ id, moves, color }) => {
        let [x, y, facing] = this.start;
        moves.forEach((m, i) => {
          mazeWithSolutions[y][x] = [
            ...mazeWithSolutions[y][x],
            { id, color, moveCount: i, facing },
          ];
          if (/R|B|L/.test(m)) {
            facing = turnAround(facing, m);
          } else {
            x = facing === '<' ? x - 1 : facing === '>' ? x + 1 : x;
            y = facing === '^' ? y - 1 : facing === 'v' ? y + 1 : y;
          }
        });
      });

      return { mazeWithSolutions };
    }
  };

  render() {
    const { tileSize, tail } = this.props;
    const { moveCount, mazeWithSolutions } = this.state;
    const tiles = mazeToTiles({
      maze: mazeWithSolutions,
      tileSize,
      moveCount,
      tail,
    });

    return (
      <Flex>
        <FirstColumn>
          <Control {...this.props} />
          <Maze tiles={tiles} />
        </FirstColumn>
      </Flex>
    );
  }
}

const states = [
  [
    'maze',
    'setMaze',
    [
      '#########################################',
      '#<    #       #     #         # #   #   #',
      '##### # ##### # ### # # ##### # # # ### #',
      '# #   #   #   #   #   # #     #   #   # #',
      '# # # ### # ########### # ####### # # # #',
      '#   #   # # #       #   # #   #   # #   #',
      '####### # # # ##### # ### # # # #########',
      '#   #     # #     # #   #   # # #       #',
      '# # ####### ### ### ##### ### # ####### #',
      '# #             #   #     #   #   #   # #',
      '# ############### ### ##### ##### # # # #',
      '#               #     #   #   #   # #   #',
      '##### ####### # ######### # # # ### #####',
      '#   # #   #   # #         # # # #       #',
      '# # # # # # ### # # ####### # # ### ### #',
      '# # #   # # #     #   #     # #     #   #',
      '# # ##### # # ####### # ##### ####### # #',
      '# #     # # # #   # # #     # #       # #',
      '# ##### ### # ### # # ##### # # ### ### #',
      '#     #     #     #   #     #   #   #    ',
      '#########################################',
    ],
  ],
  ['tileSize', 'onSetTileSize', 3],
  ['activeEscapeFunctions', 'setActiveEscapeFunctions', [escapes[0]]],
  ['tail', 'onSetTail', 5],
  ['isRunning', 'onToggleRunning', false],
  ['exitReached', 'setExitReached', false],
  ['speed', 'onSetSpeed', 200],
];

const App = compose(...states.map(state => withState(...state)))(Container);

export { App };
