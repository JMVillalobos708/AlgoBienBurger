const pool = require("../config/db");

class ReporteService{
    constrcutor(){

    }

    async GetReportePagados(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1 AND bol_pago = true;`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total Pagado: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR Pagado", error);
        }
    }

    async GetReporteNoPagados(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes_no
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1 AND bol_pago = false;`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total No Pagado: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR No Pagado", error);
        }
    }
    
    async GetReporteMes(mes){
        console.log("El Mes es: ", mes);
        const query = `SELECT
                            SUM(total) AS total_mes
                        FROM
                            public.cuenta
                        WHERE
                            EXTRACT(MONTH FROM fecha) = $1`;
        try{
            let {rows} = await pool.query(query, [mes]);
            console.info("Total: ", rows[0])
            return rows[0]
        }   
        catch(error){
            console.error("ERROR", error);
        }
    }

    async GetReporte(mes, gastosMes){
        var reportesPagados = await this.GetReportePagados(mes);
        var reportesNoPagados = await this.GetReporteNoPagados(mes);
        var total_ventas = await this.GetReporteMes(mes);
        var resultado = reportesPagados - reportesNoPagados;
        var resultado_terminal = resultado - gastosMes;
        console.log("Reporte Pagados: ", reportesPagados);
        console.log("Reporte No Pagados: ", reportesNoPagados);
        console.log("Reporte Valor Ventas: ", total_ventas);
        console.log("Reporte Pagadas - No Pagadas: ", resultado);
        console.log("Reporte Gastos Mes: ", gastosMes);
        console.log("Reporte Total Mes: ", resultado_terminal);
        const response = {
            pagadas: reportesPagados.total_mes,
            no_pagadas: reportesNoPagados.total_mes_no,
            total_ventas: total_ventas,
            resultado: resultado,
            resultado_terminal: resultado_terminal,
            mes: mes, 
        };
        return response;
    }

}

module.exports = ReporteService;