# Structure du BackEnd pour partage des points

On doit avoir la liste de tous les users et avoir un boutton pour pouvoir les suivre 
Quand on clique sur le boutton suivre, ce user va figurer dans tes **Followees** et tu va figurer dans ses **Followers** .Ainsi, tu pourra voir la liste de ses points. 

Chaque user va avoir un *bloc* ou figure ses points et tout ses **Followers** pourront aussi voir ce *bloc* .

Dans **Followee**, il yaura le *id du User* ,*nom du user*, *les id de ses points*

Dans **Followers**, il yaura son *id* et son *nom*

## Methodes

### Followee
 post, et get
### Followers
 post et get

## Routes
followee et followers

## Models
followee, followers et les incluire dans le modele de user

## Queries
 
 ### Followee

- Pouvoir trouver un followee *findOnre
- Pouvoir trouver tous les followee *findAll
- Pouvoir ajouter un followees *Create
- Pouvoir supprimer un followees *deleteOne
- Pouvoir supprimer tous les followees *deleteAll

 ### Followers

- Pouvoir trouver un followers *findOnre
- Pouvoir trouver tous les followers *findAll
- Pouvoir ajouter un follower *Create



