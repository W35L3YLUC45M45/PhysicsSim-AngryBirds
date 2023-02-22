# Angry Birds

PROJECT DEVELOPED BY: Arnau Metaute and Wesley Lucas

- Levels read by JSON: The JSONs are read when loading the program, and each of the levels is loaded when selected.
- Throwing the bird from the shooter: Made the birds only come out when the origin is located in the slingshot.
- Scoring System: Created a simple scoring system based on "birds available". The more pigs you defeat the more birds you can throw. If you run out of points, you lose. The goal is to get the highest possible score.
- Basic Bird Creation: Both simple birds have been created. The large bird is characterized by a wider radius.
- Each Block Type (Wood, Ice, Iron): All three simple blocks have been created. The wooden block has no special characteristics, while the ice block has less friction and the metal block costs more hits to break.
- Each Pig Type (Normal, Helmet): Both basic pig types have been created. Although you need to carry a minimum of speed to be defeated, the helmeted pig has more life.
- Level selection menu: A simple status manager has been implemented that allows the exchange between the menus and the different levels.
- Aesthetics, visuals (including sprite changes on collision): Tried to keep the same aesthetic throughout the show, with the addition of changes to blocks and pigs based on their life/durability.
- Each special bird (yellow, blue): Both special birds have been implemented. Yellow breaks wood first and has the ability to go faster, while blue breaks ice first while also having the ability to split into three.
- Every Invented Bird: Two new invented birds have been implemented. The "random" bird, whose ability is unknown until it is activated, and the "bomb", which has the same implementation as the TNT (explosion).
- Every Block Invented: Two new blocks have been implemented. The lava, which kills the bird when touched, and the "bedrock", which is an indestructible and immobile block;
- Implement TNT: Implemented TNT and its explosion, which damages blocks and pigs around it while sending them flying.
