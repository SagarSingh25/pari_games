
import { useState } from 'react';
import { Alert, PanResponder, Text, TouchableOpacity, View } from 'react-native';

const MazeGame = () => {
  // Simple maze layout (1 = wall, 0 = path, 2 = start, 3 = end)
  const maze = [
    [2, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 3]
  ];

  const cellSize = 40;
  const [path, setPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(5);

  // Get cell position from coordinates
  const getCellFromCoords = (x, y) => {
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row >= 0 && row < maze.length && col >= 0 && col < maze[0].length) {
      return { row, col };
    }
    return null;
  };

  // Check if a cell is valid path
  const isValidCell = (row, col) => {
    return maze[row] && (maze[row][col] === 0 || maze[row][col] === 2 || maze[row][col] === 3);
  };

  // Check if path reaches the end
  const checkWinCondition = (currentPath) => {
    return currentPath.some(cell => 
      cell.row === 6 && cell.col === 6 && maze[6][6] === 3
    );
  };

  // Pan responder for drag interaction
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const cell = getCellFromCoords(locationX, locationY);
      
      if (cell && maze[cell.row][cell.col] === 2) {
        setIsDrawing(true);
        setPath([cell]);
        setGameWon(false);
      }
    },

    onPanResponderMove: (evt) => {
      if (!isDrawing) return;

      const { locationX, locationY } = evt.nativeEvent;
      const cell = getCellFromCoords(locationX, locationY);
      
      if (cell && isValidCell(cell.row, cell.col)) {
        setPath(prevPath => {
          // Avoid duplicate adjacent cells
          const lastCell = prevPath[prevPath.length - 1];
          if (lastCell && lastCell.row === cell.row && lastCell.col === cell.col) {
            return prevPath;
          }
          
          const newPath = [...prevPath, cell];
          
          // Check win condition
          if (checkWinCondition(newPath)) {
            setGameWon(true);
            setIsDrawing(false);
            setTimeout(() => {
              Alert.alert(
                "🦕 Great Job!", 
                "You found the path! The dinosaur made it safely!",
                [{ text: "Play Again", onPress: resetGame }]
              );
            }, 100);
          }
          
          return newPath;
        });
      }
    },

    onPanResponderRelease: () => {
      setIsDrawing(false);
      if (!gameWon) {
        setAttempts(prev => prev + 1);
        // Show retry message after a short delay
        setTimeout(() => {
          Alert.alert(
            "🦕 Try Again!", 
            "The dinosaur got lost! Can you help find the right path?",
            [{ text: "Retry", onPress: () => setPath([]) }]
          );
        }, 100);
      }
    },
  });

  const resetGame = () => {
    setPath([]);
    setGameWon(false);
    setIsDrawing(false);
    setAttempts(0);
  };

  const renderCell = (cellValue, row, col) => {
    const isInPath = path.some(p => p.row === row && p.col === col);
    
    let backgroundColor = '#8B4513'; // Brown for walls
    let content = '';
    
    if (cellValue === 0) {
      backgroundColor = '#90EE90'; // Light green for path
    } else if (cellValue === 2) {
      backgroundColor = '#FFD700'; // Gold for start
      content = '🦕'; // Dinosaur emoji
    } else if (cellValue === 3) {
      backgroundColor = '#FF6347'; // Tomato for end
      content = '🏠'; // House emoji
    }

    return (
      <View
        key={`${row}-${col}`}
        style={{
          width: cellSize,
          height: cellSize,
          backgroundColor: isInPath ? '#FF69B4' : backgroundColor, // Pink trail
          borderWidth: 1,
          borderColor: '#654321',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>{content}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#87CEEB', padding: 20 }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 10,
        color: '#2F4F4F'
      }}>
        🦕 Dino Park Maze 🦕
      </Text>
      
      <Text style={{ 
        fontSize: 16, 
        textAlign: 'center', 
        marginBottom: 20,
        color: '#2F4F4F'
      }}>
        Help the dinosaur get home! Drag from 🦕 to 🏠
      </Text>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 14, color: '#2F4F4F' }}>
          Attempts: {attempts}
        </Text>
      </View>

      <View 
        style={{ 
          alignSelf: 'center',
          borderWidth: 3,
          borderColor: '#654321',
          borderRadius: 10,
          overflow: 'hidden'
        }}
        {...panResponder.panHandlers}
      >
        {maze.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={resetGame}
        style={{
          backgroundColor: '#32CD32',
          padding: 15,
          borderRadius: 25,
          marginTop: 30,
          alignSelf: 'center',
          minWidth: 120,
        }}
      >
        <Text style={{ 
          color: 'white', 
          fontSize: 16, 
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🔄 New Game
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 12, color: '#696969', textAlign: 'center' }}>
          💡 Tip: Start dragging from the dinosaur and stay on the green path!
        </Text>
      </View>
    </View>
  );
};

export default MazeGame;