import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ScrollDetail } from '@ionic/angular';
import { idTema } from '../modelo/tema';
import { ForoService } from '../servicio/foro.service';

@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.page.html',
  styleUrls: ['./comentar.page.scss'],
})
export class ComentarPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public temas: Array<idTema>=[];
  public formComent: FormGroup;
  constructor(private http: HttpClient, private builder: FormBuilder, private router: Router,
    private comentApi: ForoService) {

    this.formComent= this.builder.group({
      comentario:['',[Validators.required]],
      fecha:['',[Validators.required]],
      nombreEstudiante:['',[Validators.required]]
    })
  }
  public guardarComentario(item: any){
     this.comentApi.agregarComentario(item).subscribe(res=>{
      console.log(res);
     })
  }

    handleScrollStart() {
      console.log('scroll start');
    }

    handleScroll(ev: CustomEvent<ScrollDetail>) {
      console.log('scroll', ev.detail);
    }

    handleScrollEnd() {
      console.log('scroll end');
    }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.comentApi.ObtenerTemas()
    this.comentApi.listaTemas$.subscribe(datosActuales =>
      {
      this.temas=datosActuales;
      if(this.scroll){
        this.scroll.complete();
      }
    })
  }

}
