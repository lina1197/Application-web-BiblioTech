import Etudiant from "../models/Etudiant.js";

export async function getAverage(req,res){
    try {
    // const {notes,coefficients}=req.body;
    const notes=req.body.notes;
    const coefficients=req.body.coefficients;
    console.log(notes);
    console.log(coefficients);
    var i, sum = 0;
    var j, sumC=0;
     for(j=0; j<coefficients.length;j++){
    sumC += parseInt(coefficients[j]);
}
    
    for(i = 0; i < notes.length; i++){
    sum += notes[i]*coefficients[i]   
}
    

    console.log(sumC);

    console.log(sum);
    console.log(notes.length);
    // const average=sum/(notes.length);
    const average=sum/sumC;

    console.log(average);
    
    const etudiant = await Etudiant.create({ notes, coefficients, average});
    
    return res.status(200).send(sum);
    } catch(error) {
    return res.status(500).send(error);
    }
}