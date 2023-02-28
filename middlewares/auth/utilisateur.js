const verifyRole=async (req, res, next) => {
  try {
  
    if ( req.Utilisateur.role == 'employee') {
      next();
    } else {
      res.status(401).json({
        message: "not allowed" 
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({  
      message: "utilisateur authentication failed",
    });
  }
};

export default verifyRole;