/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Domingo_Reto3.Reto3;

/**
 * Librerias
 */

import Domingo_Reto3.Reto3.reportes.ContadorClientes;
import Domingo_Reto3.Reto3.reportes.StatusReservas;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author YAIR RIOS
 */
@Service
public class ServiciosReservaciones {
     @Autowired
    private RepositorioReservaciones metodosCrud;

    public List<Reservaciones> getAll(){
        return metodosCrud.getAll();
    }

    public Optional<Reservaciones> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }

    public Reservaciones save(Reservaciones reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(e.isEmpty()){
                return metodosCrud.save(reservation);
            }else{
                return reservation;
            }
        }
    }

   /**
    * 
    * @param reservation
    * @return 
    */
    
    public Reservaciones update(Reservaciones reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(!e.isEmpty()){

                if(reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    e.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }
/**
 * 
 * @param reservationId
 * @return 
 */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    /**
     * 
     * @return 
     */
    public StatusReservas getReporteStatusReservaciones(){
        List<Reservaciones>completed=metodosCrud.ReservacionStatus("completed");
        List<Reservaciones>cancelled=metodosCrud.ReservacionStatus("cancelled");
        return new StatusReservas(completed.size(), cancelled.size()); 
    }
    
    /**
     * 
     * @param datoA
     * @param datoB
     * @return 
     */
    public List <Reservaciones> getReportesTiempoReservaciones(String datoA, String datoB){
    SimpleDateFormat parser=new SimpleDateFormat ("yyyy-MM-dd");
    Date datoUno = new Date();
    Date datoDos = new Date();
    
    try{
        datoUno = parser.parse(datoA);
         datoDos = parser.parse(datoB);
    } catch(ParseException evt) {
    
        evt.printStackTrace();
        
    }
    if (datoUno.before (datoDos)){
    
    return metodosCrud.ReservacionTiempo(datoUno, datoDos);
    
    } else{
    
    return new ArrayList<>();
    }
           
    
    
            }
    /**
     * 
     * @return 
     */
    public List<ContadorClientes> servicioTopClientes(){
        return metodosCrud.getTopClientes();
    }
}
