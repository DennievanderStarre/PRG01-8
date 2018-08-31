## PRG01-8, Object Oriented Programming Design Patterns in Game Development 

## Hungry Fish!
In deze game is het de bedoeling om de drie verschillende vissen in leven te houden. De ene is een grote eter, terwijl de andere juist veel langer zonder voedsel kan. Daar komt bij dat je op het juiste moment moet voeren, anders zwemt een ander net voorbij en eet het voedsel op! Wanneer alle vissen dood zijn verlies je de game.

## Besturing:
Pijltjestoetsen: naar links en rechts bewegen
Spatiebalk: voeren

## Installatie:
#### Stap 1 (clonen):
Clone het project naar `localhost`
- `git clone git@github.com:Hsnzync/monster-shooter.git`

#### Stap 2 (editen):
Na het aanpassen van de repository:
- `git add . / git add -p`
- `git commit -m "beschrijving"`
- `git push origin master`

#### Stap 3 (runnen / watch):
Open het project in Visual Studio Code
- Open project in `localhost`
- Watch: `Ctrl + Shift + B`

## UML:
![uml](https://github.com/DennievanderStarre/PRG01-8/blob/master/UML.png) 

## Peer review:
Pull request: 
Peer review:

## Singleton:
De Singleton is toegepast op cGame. Deze instantieerd zichzelf.

## Polymorfisme:
1. De eerste vorm is toegpast op de verschillende vissen die in een vervolgens in een array gepushed worden in cGame. 
2. De tweede vorm is toegepast in de vorm van een tweede(!) strategy pattern, namelijk de iStatus_style.

## Strategy:
Het eerste strategy pattern is toegpast op de beweging van de vissen, dus de iMove_behaviour. Dit zorgt er (o.a. in combinatie met de observer pattern) voor dat er een verandering in gedrag ontstaat bij bepaalde voedingsniveau's.

## Observer:
Zoals hierboven al genoemd is de observer pattern toegepast om ervoor te zorgen dat er een verandering in gedrag ontstaat wanneer de speler wat voor in het aquarium gooit. De vissen zullen dan heel even een boost op hun speed characteristic krijgen.

## Lvl 3 elementen:
1. Howler.js
2. Sound and music
3. Canvas