## PRG01-8, Object Oriented Programming Design Patterns in Game Development 

## Hungry Fish!
In deze game is het de bedoeling om de drie verschillende vissen in leven te houden. De ene is een grote eter, terwijl de andere juist veel langer zonder voedsel kan. Daar komt bij dat je op het juiste moment moet voeren, anders zwemt een ander net voorbij en eet het voedsel op! Wanneer alle vissen dood zijn verlies je de game.

Spelen op: https://stud.hosted.hr.nl/0853213/PRG01-8/ 

## Besturing:
Pijltjestoetsen: naar links en rechts bewegen

Spatiebalk: voeren

## Installatie:
#### Stap 1 (clonen):
Clone het project naar `localhost`
- `https://github.com/DennievanderStarre/PRG01-8.git`

#### Stap 2 (editen):
Na het aanpassen van de file(s):
- `git add [filename] / git add .` 
- `git commit -m "[opmerking]"`
- `git push`

#### Stap 3 (run / watch TypeScript compiler):
Open het project in Visual Studio Code
- Open project in `localhost`
- Watch: `Ctrl + Shift + B`

## UML:
![uml](https://github.com/DennievanderStarre/PRG01-8/blob/master/UML.png) 

## Peer review:
1. Pull request: https://github.com/Hsnzync/monster-shooter/pull/4
2. Peer review: https://github.com/Hsnzync/monster-shooter/issues/3

## Singleton:
De Singleton is toegepast op cGame. Deze instantieerd zichzelf.

## Polymorfisme:
1. De eerste vorm is toegpast op de verschillende vissen die in een vervolgens in een array gepushed worden in cGame. NOTE! Deze had beter gekund door niet gelijk te erfen van cGame_object, maar er eerst een overkoepelende cFish tussen te plaatsen. Dit had het een en ander aan duplicate code kunnen voorkomen.  
2. De tweede vorm is toegepast in de vorm van een tweede(!) strategy pattern, namelijk de iStatus_style.

## Strategy:
Het eerste strategy pattern is toegpast op de beweging van de vissen, dus de iMove_behaviour. Dit zorgt er (o.a. in combinatie met de observer pattern) voor dat er een verandering in gedrag ontstaat bij bepaalde voedingsniveau's.

## Observer:
Zoals hierboven al genoemd is de observer pattern toegepast om ervoor te zorgen dat er een verandering in gedrag ontstaat wanneer de speler wat voor in het aquarium gooit. De vissen zullen dan heel even een boost op hun speed characteristic krijgen.

## Lvl 3 elementen:
1. Howler.js
2. Sound and music
3. Canvas