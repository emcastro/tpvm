# Inlining

 - Lire la littérature sur le sujet.
 - À déclencher dans les fonctions qui sont appelées souvent
 - Problème de polymorphisme ?
    - ...lorsque on fait un appel de méthode. Ce n'est pas le cas dans cette version du language.
      - Cela revient à faire l'inlining du dispatcher ; le problème du polymorphisme vient soit :
        - de l'inlining du `if` de choix de branche (nb. de branche fixe),
        - de l'inlining de la lecture du tableau d'association _type→code_ (dispatch table), qui se réécrit en un enchaînement de `if` (risque mégamorphique).

# Analyse de monadité

 - La strictness est-elle une monade ?
    ```
    foo(a+b) => foo(immediate(() => a+b))
             => foo(delayed(() => a+b))
    ```
   Pourquoi pas ?

  - L'analyse semble statique, mais la combinatoire est explosive, c'est pourquoi on la fait à l'exécution.
 
  - On peut construire une carte des conditions d'appel et du résultat, en terme de monade. L'analyse se fait sur le type monadique (ex. _done_ ou _tailcall_) du résultat. Le résultat peut être indéterminé — dans le cas des promesses et de la strictness, _indéterminé_ est contagieux.   
  L'usage de l'inlining permet d'aller plus en profondeur (comme avec la supercompilation, mais en JIT) 