import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import useGame from "../../../hooks/useGame";

import { Move } from "../../../shared/types";

const display = () => {
  const { id } = useLocalSearchParams();
  const { game } = useGame(id as string);
  const router = useRouter();
  const yAxis = Array.from(Array(10).keys()).map((val) =>
    (val + 10).toString(36).toUpperCase()
  ); // Letters
  const xAxis = Array.from(Array(10).keys()).map((val) => val + 1); // Numbers
  const player1 = game?.player1?.id;
  const player2 = game?.player2?.id;
  const player1Color = "#CAF4FF";
  const player2Color = "#FFCBCB";
  console.log(id);
  console.log(game);

  const displayMove = (number: number, letter: string) => {
    const isPositionFound = game?.moves?.find((pos: Move) => {
      return pos.x === letter && pos.y === number;
    });
    if (!player1 || !player2) {
      return {
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
      };
    }
    if (isPositionFound?.result === true) {
      return {
        backgroundColor: "#FFDA78",
      };
    }
    if (isPositionFound?.playerId === player1) {
      return {
        backgroundColor: player1Color,
      };
    }
    if (isPositionFound?.playerId === player2) {
      return {
        backgroundColor: player2Color,
      };
    }
    return {
      backgroundColor: "white",
      borderColor: "grey",
      borderWidth: 1,
    };
  };
  const displayShip = (number: number, letter: string) => {
    const isPositionFound = game?.moves?.find((pos: Move) => {
      return pos.x === letter && pos.y === number;
    });
    if (!player1 || !player2) {
      return <Text>&nbsp;</Text>;
    }
    if (isPositionFound?.playerId === player1) {
      return <Ionicons name="navigate" color="#FF5F00" size={15}></Ionicons>;
    }
    if (isPositionFound?.playerId === player2) {
      return <Ionicons name="navigate" color="black" size={15}></Ionicons>;
    }
    return <Text>&nbsp;</Text>;
  };
  if (!game) {
    return (
      <View>
        <Text>Loading game...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          {
            flexDirection: "row",
            backgroundColor: "#6c757d",
          },
        ]}
        onPress={() => {
          router.push("feed/index");
        }}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={styles.text}>Go back </Text>
      </Pressable>
      <Text>
        See game: Battle between {player1} and {player2}
      </Text>
      <View style={{flexDirection: "row"}}>
        <Text>Player 1 color: </Text>
        <View
          style={{ width: 20, height: 20, backgroundColor: player1Color }}
        ></View>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text>Player 2 color: </Text>
        <View
          style={{ width: 20, height: 20, backgroundColor: player2Color }}
        ></View>
      </View>

      <View style={styles.numberCellContainer}>
        {xAxis.map((number, columnIndex) => (
          <View key={columnIndex} style={styles.numeberTextContainer}>
            <Text style={styles.numberText}>{number}</Text>
          </View>
        ))}
      </View>
      {yAxis.map((letter, rowIndex) => (
        <View key={rowIndex} style={styles.letterContainer}>
          <View style={styles.letterTextContainer}>
            <Text style={styles.letterText}>{letter}</Text>
          </View>
          {xAxis.map((number, columnIndex) => (
            <View
              key={columnIndex}
              style={[
                styles.cellContainer,
                displayMove(number, letter),
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              {displayShip(number, letter)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  numberCellContainer: {
    flexDirection: "row",
    marginLeft: 40,
  },
  numeberTextContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
  },
  numberText: {
    textAlign: "center",
  },
  letterContainer: {
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 1,
  },
  letterTextContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
  },
  letterText: {
    color: "black",
    textAlign: "center",
  },

  boardCell: {
    flexDirection: "row",
    width: 40,
    height: 40,
  },
  boardCellText: {
    textAlign: "center",
    // lineHeight: 40,
    // marginHorizontal: 10
  },
  cellContainer: {
    flexDirection: "row",
    width: 40,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    border: "50%",
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#0d6efd",
    marginTop: 8,
    borderRadius: 20,
    alignItems: "center",
  },
});

export default display;
