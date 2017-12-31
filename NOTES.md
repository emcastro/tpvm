# FAIT

  - Essais sur de statistiques (comptage) de sites d'appel et de cibles d'appels
    - On voit bien apparaître les points chauds.
    - On est un peu court sur les Map à clés complexes
  - 

# À FAIRE
  - Découpage de l'évaluateur en fonctions, là où on voudra apporter des modifications. L'idée directrice est qu'on doit apporter des modifications plutôt au début ou plutôt à la fin des functions.
  - Améliorer les Map à clés complexes pour que cela puisse être des listes, sous-listes ou case-classes (éventuellement marquée)
  - Tester la bibliothèques de calcul d'_oid_ d'objets (≃ System.identityHashCode()).
  - **Construire les statistiques** des valeurs fonctionnelles lors de leur utilisation :
    - Dans le cas des closures : en fonction des paramètres et des variables libres (**Attention** : comment inclure les variables libres dans la signature à construire) ;
    - Dans le cas des primitives : se fier, pour le moment, à la signature déjà présente dans _primitive1.ts_ ;
    - **(attention au cas des listes `(idx) => result`).**
    - Dans le cas des valeurs non fonctionnelle : c'est marqué explicitement dessus !
    - Dans le cas des closures qui serait dans des promesses : considérer cela comme insolvable, et si c'est pas trop complexe, faire une statistique.

---

# Inlining

 - Lire la littérature sur le sujet.
 - À déclencher dans les fonctions qui sont appelées souvent.
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
  L'usage de l'inlining permet d'aller plus en profondeur (comme avec la supercompilation, mais en JIT).