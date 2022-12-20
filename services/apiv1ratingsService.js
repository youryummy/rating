export function getRating(req, res) {
    res.send({
        message: 'This is the mockup controller for getRating'
    });
}

export function addRating(req, res) {
    const {like, comment, idRecipe, idUser} = req.body;

  const rating = new Rating({
    like, 
    comment, 
    idRecipe, 
    idUser
  });

  //pendiente añadir comprobacion con perspective api

  try{
    rating.save();
    return res.sendStatus(201);
  } catch(e) {
    if(e.errors){
      debug("Validation problem when saving");
      res.status(400).send({error: e.message});
    }else{
      debug("DB problem", e);
      res.sendStatus(500);
    }
   
  }
}

