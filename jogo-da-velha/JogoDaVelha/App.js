import React, { useState } from 'react';
import { EvilIcons} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TicTacToe() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerXNext, setIsPlayerXNext] = useState(true);

  const handleCellPress = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isPlayerXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsPlayerXNext(!isPlayerXNext);
  };

  const marcarJogo = (index) => (
    <TouchableOpacity style={styles.cell} onPress={() => handleCellPress(index)}>
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>

  );

  const reset = (index) => (
    <TouchableOpacity style={styles.cell} onPress={() => handleCellPress(index)}>
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
    
  );

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isPlayerXNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <TouchableOpacity style={styles.reset} onPress={() => reset()}>
          <EvilIcons name="refresh" size={40} color="black" />
        </TouchableOpacity>
          <View style={styles.coluna}>
            {marcarJogo(0)}
            {marcarJogo(1)}
            {marcarJogo(2)}
          </View>
          <View style={styles.coluna}>
            {marcarJogo(3)}
            {marcarJogo(4)}
            {marcarJogo(5)}
          </View>
          <View style={styles.coluna}>
            {marcarJogo(6)}
            {marcarJogo(7)}
            {marcarJogo(8)}
          </View>

    </View>        
      
  );
}

const styles = StyleSheet.create({
  reset:{
    marginBottom: 10
  },

  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  coluna:{
    flexDirection: 'row',
  },  

  status: {
    marginBottom: 10,
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    height: 100,
    width: 100,
  },
  cellText: {
    fontSize: 36,
  },
});

const calculateWinner = (squares) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};
