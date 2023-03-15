   import Livre from '../../models/Livre.js'
   import Catégorie from '../../models/Catégorie.js';
   import Utilisateur from '../../models/Utilisateur.js';
   import nodemailer from 'nodemailer';

   // Add a book
    export async function AddBook (req, res) {

        try {
    const { name, catégorie, note, auteur,nombreEmprunts,nombreCopiesDisponible } = req.body;
   

Utilisateur.find({}, 'email', (err, utilisateurs) => {
  if (err) {
    console.error(err);
    return;
  }

  const emails = utilisateurs.map(utilisateur => utilisateur.email);
  const emailList = emails.join(',');

  console.log(emailList); // will output comma separated email list
});

const foundCategory = await Catégorie.findById(catégorie);
    if (!foundCategory) {
      return res.status(400).send({ message: 'Invalid category ID' });
    }
            const foundBook = await Livre.findOne({ name, catégorie, note, auteur, nombreEmprunts,nombreCopiesDisponible});
            if (!foundBook) {
                  
                const livre = await Livre.create({ name, catégorie, note, auteur, nombreEmprunts,nombreCopiesDisponible });
              let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bibliotech2.23@gmail.com',
        pass: ''
    }
});
 
let mailDetails = {
    from: 'bibliotech2.23@gmail.com',
    to: 'emailList', //to test, you can input your personal email 
    subject: 'Test mail',
    text: 'a new book has been added.'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});

                return res.send(livre);
            } else {

                return res.send({ message: 'EXISTS' });
            }
        } catch (error) {
            
            return res.status(500).send(error);
        }
    }

