import { renderHook, act } from '@testing-library/react';
import useTicTacToeGame from './useTicTacToeGame';

describe('useTicTacToeGame', () => {
  test('should initialize game state', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    expect(result.current.size).toBe(3);
    expect(result.current.boardState).toEqual([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    expect(result.current.currentPlayer).toMatch(/X|O/);
    expect(result.current.winner).toBeNull();
    expect(result.current.message).toBe('');
    expect(result.current.playerCount).toBe(1);
    expect(result.current.easyMode).toBe(false);
  });

  test('should restart the game', () => {
    const { result } = renderHook(() => useTicTacToeGame());

    act(() => {
      // Make some moves
      result.current.handleCellClick(0, 0);
      result.current.handleCellClick(0, 1);
      result.current.handleCellClick(1, 0);
      result.current.restart();
    });

    // Make sure board is set back to initial state
    expect(result.current.boardState).toEqual([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    expect(result.current.currentPlayer).toMatch(/X|O/);
    expect(result.current.winner).toBeNull();
  });

  // Calculate Winner Function Tests
  test('should calculate winner for horizontal line', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(result.current.calculateWinner(board)).toBe('X');
  });

  test('should calculate winner for vertical line', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const board = [
      ['X', '', ''],
      ['X', '', ''],
      ['X', '', '']
    ];
    expect(result.current.calculateWinner(board)).toBe('X');
  });

  test('should calculate winner for diagonal line', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    expect(result.current.calculateWinner(board)).toBe('X');
  });

  test('should calculate winner for tie', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const board = [
      ['X', 'O', 'X'],
      ['X', 'X', 'O'],
      ['O', 'X', 'O']
    ];
    expect(result.current.calculateWinner(board)).toBe('Tie');
  });

  test('should return null if no winner and board is not full', () => {
    const { result } = renderHook(() => useTicTacToeGame());
    const board = [
      ['X', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    expect(result.current.calculateWinner(board)).toBeNull();
  });

});
