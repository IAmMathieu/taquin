const sideTilesNb = 4;
const numberOfTiles = sideTilesNb ** 2;
let count = 0;


// Generation d'un tableau aléatoire de valeur numérique allant de 1 à 16
function generateRandomArray(tilesNb: number): number[] {
  return new Array(tilesNb)
    .fill("")
    .map((_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
}


// Comptage du nombre de permutation nécessaire pour ordonner le tableau de la valeur la plus petite à la plus grande
// Exemple:

// (13, 2, 3, 12, 9, 11, 1, 10, 16, 6, 4, 14, 15, 8, 7, 5)
// (13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 14, 15, 8, 7, 16)
// (13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 14, 7, 8, 15, 16)
// (13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 8, 7, 14, 15, 16)
// (7, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 8, 13, 14, 15, 16)
// (7, 2, 3, 8, 9, 11, 1, 10, 5, 6, 4, 12, 13, 14, 15, 16)
// (7, 2, 3, 8, 9, 4, 1, 10, 5, 6, 11, 12, 13, 14, 15, 16)
// (7, 2, 3, 8, 9, 4, 1, 6, 5, 10, 11, 12, 13, 14, 15, 16)
// (7, 2, 3, 8, 5, 4, 1, 6, 9, 10, 11, 12, 13, 14, 15, 16)
// (7, 2, 3, 6, 5, 4, 1, 8, 9, 10, 11, 12, 13, 14, 15, 16)
// (1, 2, 3, 6, 5, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
// (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
function permutationsCount(arr: number[]): number {
  const arrCopy: number[] = [...arr];
  if (arrCopy.length !== 0) {
    const highestNumberIndex = arrCopy.findIndex((el) => el === arrCopy.length);

    if (highestNumberIndex === arrCopy.length - 1) {
      arrCopy.pop();
      permutationsCount(arrCopy);
    } else {
      const getArrayLastNumber = arrCopy.at(-1);

      if (getArrayLastNumber !== undefined) {
        arrCopy.splice(highestNumberIndex, 1, getArrayLastNumber);
        arrCopy.pop();
        count++;
        permutationsCount(arrCopy);
      }
    }
  }
  return count;
}


// évaluation de la parité d'un nombre
function isOdd(num: number): boolean {
  return num % 2 == 0;
}


// génération d'un tableau de parité des cases du taquin suivant la taille du taquin (nb de case par côté)
function tilesParityArray(sideTilesNb: number): boolean[] {
  const tilesParityArray = [];

  let j: number = 0;

  if (isOdd(sideTilesNb)) {
    while (j < sideTilesNb) {
      for (let i = 1; i <= sideTilesNb; i++) {
        if (!isOdd(j)) {
          tilesParityArray.push(isOdd(i));
        } else {
          tilesParityArray.push(!isOdd(i));
        }
      }
      j++;
    }
  } else {
    for (let i = 1; i <= sideTilesNb ** 2; i++) {
      tilesParityArray.push(!isOdd(i));
    }
  }

  return tilesParityArray;
}


// Récupération de la parité de la case de départ du taquin (case vide, ici la case avec le nombre 16)
function startingTileParity(arr: number[], tilesNb: number): boolean {
  const startingTile = arr.findIndex((el) => el === arr.length);
  const tilesParityArr = tilesParityArray(tilesNb);

  const startingTileParity = tilesParityArr.at(startingTile);

  if (typeof startingTileParity === "undefined") {
    throw new Error("value is undefined");
  } else {
    return startingTileParity;
  }
}


// évaluation de la validité du taquin
// pour qu'il soit valide il faut que la parité de la case vide et la parité du nombre de permutation necessaire pour ordonné le tableau de départ soit les mêmes
// si non valide, on génère un nouveau tableau et on re test la validité du taquin
function isTaquinSolvable(emptyTile: boolean, permutNb: number): boolean {
  if ((emptyTile && isOdd(permutNb)) || (!emptyTile && !isOdd(permutNb))) {
    return true;
  } else {
    count = 0;
    return false;
  }
}

// fonction de génération d'un taquin valide qui sera appeler dans l'application
export default function generateValidTaquin(): {
  value: number;
  index: number;
}[] {
  const taquinArr = generateRandomArray(numberOfTiles);
  const neededPermutation = permutationsCount(taquinArr);
  const emptyTileParity = startingTileParity(taquinArr, sideTilesNb);

  if (!isTaquinSolvable(emptyTileParity, neededPermutation)) {
    generateValidTaquin();
  }
  const validArray = taquinArr.map((v: number, i: number) => ({
    value: v,
    index: i,
  }));

  return validArray;
}

/**
 * For knowledge purpose here is an example of how to sort a mixed array with numbers and letters
 *
 * const array = [13, 2, 3, 12, 9, 11, 1, 10, "V", 6, 4, 14, 15, 8, 7, 5]
 * console.log(array.sort((a, b) => {return (((typeof b === "number") - (typeof a === "number")) || a - b)}));
 *
 * Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "V"]
 *
 * to sort string first use ((typeof a === "number") - (typeof b === "number"))
 */
