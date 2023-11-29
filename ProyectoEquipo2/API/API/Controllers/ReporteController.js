const ReporteService = require('../Services/ReporteService');

const _ReporteService = new ReporteService();

class ReporteController{
    constructor(){

    }
    
    async Get(req, res){
        console.log("GET EN REPORTE");
        const data = req.body;
       
        try{
            const caca = await _ReporteService.GetReporte(data.mes, data.gastosMes)
            //response.push(_ReporteService.GetReporte(data.mes, data.gastosMes));
            res.status(201).json(caca);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
    
}

module.exports = new ReporteController();