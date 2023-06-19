# Jeu du Taquin

> Le taquin est un jeu solitaire en forme de damier créé vers 18701 aux États-Unis. Sa théorie mathématique a été publiée par l'American Journal of mathematics pure and applied2 en 1879. 

[Wikipedia](https://fr.wikipedia.org/wiki/Taquin)



## Principe
Le principe est donc d'avoir un tableau de N cases dont une est vide, mélanger et de le remettre dans l'ordre en déplaçant les cases 1 par 1 en permutant la case vide avec une case adjacente.

![Taquin mélangé](/assets/tauqin_shuffled.jpeg)
![Taquin classé](/assets/taquin_ordered.jpeg)

Attention toute fois, même si il existe !N dispositions de départ (N etant le nombre de case du taquin, ici 16), seules la moitié de ces dispositions peuvent être résolues.

Pour savoir si une disposition peut être résolue, il faut 2 informations:

- la parité de la case de départ (la case vide)
- la parité du nombre de permutation nécessaire pour ordonner le tableau de nombre de départ


### Partité de la case de départ:


La parité de la case de départ correspond à la parité du nombre minimal de permutation nécessaire pour déplacé celle-ci à sa place final (en bas à droite dans notre exemple). Si le nombre de permutation nécessaire est un nombre pair, la parité de la case initiale est pair.

![Parité de la case de départ suivant sa position et la taille du taquin](/assets/parite_case_depart.png)

Dans l'exemple si dessus, une case verte a une parité pair, et une rouge impair.
J'ai pris comme solution de créer un tableau de boolean, true pour une parité pair et false pour une partié impair. La case en haut à gauche étant l'index 0 et celle en bas à droite l'index 15, on prend ligne après ligne de gauche à droite en sauvegardant le boolean dans le tableau.

La difficulté cependant provient de la taille de départ du jeu, si il y a un nombre de case de côté pair (taquin de 4x4) alors il y a une permutation à chaque ligne.


### Parité du nombre de permutation nécessaire pour ordonner le tableau du taquin.

Le taquin est générer via un tableau de valeurs allant de 1 à 16 (pour un taquin 4x4).
Le nombre de permutation ne se fait pas ici dans le sens du taquin (permuter la case vide et une case adjacente) mais une simple permutation d'index d'un tableau suivant leur valeur.

Exemple:

[13, 2, 3, 12, 9, 11, 1, 10, 16, 6, 4, 14, 15, 8, 7, 5]

[13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 14, 15, 8, 7, 16]

[13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 14, 7, 8, 15, 16]

[13, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 8, 7, 14, 15, 16]

[7, 2, 3, 12, 9, 11, 1, 10, 5, 6, 4, 8, 13, 14, 15, 16]

[7, 2, 3, 8, 9, 11, 1, 10, 5, 6, 4, 12, 13, 14, 15, 16]

[7, 2, 3, 8, 9, 4, 1, 10, 5, 6, 11, 12, 13, 14, 15, 16]

[7, 2, 3, 8, 9, 4, 1, 6, 5, 10, 11, 12, 13, 14, 15, 16]

[7, 2, 3, 8, 5, 4, 1, 6, 9, 10, 11, 12, 13, 14, 15, 16]

[7, 2, 3, 6, 5, 4, 1, 8, 9, 10, 11, 12, 13, 14, 15, 16]

[1, 2, 3, 6, 5, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

Ici le nombre de permutation est 11 donc sa parité est impair.


## Le projet

J'ai utilisé NextJS pour faire ce projet en React


Pour installer et lancer le projet:

> npm i
> npm run dev

### Reste à faire:

- le loading de la page qui laisse entrevoir la page de victoire lors du premier chagement
- lorsque la case vide se trouve sur un bord du tableau la case opposé sur la ligne supérieur ou inferieur ne devrait pas pouvoir être permutée. (juste contrôler la position de la case vide avant la permutation)