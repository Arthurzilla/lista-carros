import { Component, OnInit, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonLabel,IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { trashOutline } from 'ionicons/icons';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { DataSnapshot } from 'firebase/database';
import { IonFab } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonList, IonButton, IonIcon]
})
export class ListaPage implements OnInit {

  public dados:Array<any> = [];

  constructor(public rt: RealtimeDatabaseService) {
    addIcons({createOutline, trashOutline})
   }

  ngOnInit() {
    this.load(); // Carregar os dados assim que a página for inicializada
  }

    // Função que carrega os dados do Firebase
  load(){

    this.rt.query('lista', (snapshot: DataSnapshot) => {
      if (snapshot.exists()){
        this.dados = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key]
        }))
      }
    })
    
  }

  excluir(id:number){
    this.rt.remove(`/lista/${id}`).then();
  }

}
