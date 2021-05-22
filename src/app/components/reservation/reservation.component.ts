import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public reservation: Reservation;
  public pass;

  constructor(private restReservation: RestReservationService,
    private router: Router) {
    this.pass = '';
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restReservation.updateReservation(this.reservation).subscribe((res:any) => {
      delete this.reservation.serviceBefore;
      delete this.reservation.room;
      if(res.reservationUpdate){
        delete res.reservationUpdate.password;
        localStorage.setItem('reservation', JSON.stringify(res.reservationUpdate))
        alert(res.message)
      }else{
        alert(res.message);
        this.reservation;
      }
    },
      (error:any) => alert(error.error.message)
    )
  }

  removeReservation(){
    this.restReservation.removeReservation(this.reservation._id, this.pass).subscribe((res:any) => {
      if(!res.reservationRemoved){
        alert(res.message)
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('home');
      }
    },
    (error:any) => alert(error.error.message)
    )
  }
}
