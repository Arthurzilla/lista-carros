import { Component, OnInit, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonLabel,IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { trashOutline } from 'ionicons/icons';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonList, IonButton, IonIcon]
})
export class ListaPage implements OnInit {

  public dados:Array<any> = [];

  constructor(
    public rt: RealtimeDatabaseService
  ) {
    addIcons({createOutline, trashOutline})
   }

  ngOnInit() {
    this.load();
  }

  load(){
    this.rt.query('lista', (snapshot:any) => {
      this.dados = Object(snapshot.val()).map((item:any, key:number) => {
        item.id = key;
        return item;
      }).filter((item:any) => item != null)
    })
  }

  excluir(id:number){
    this.rt.remove(`/lista/${id}`).then();
  }

}
