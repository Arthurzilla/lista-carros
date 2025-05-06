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
  import { Router } from '@angular/router';
  import { AlertController } from '@ionic/angular';



  @Component({
    selector: 'app-lista',
    templateUrl: './lista.page.html',
    styleUrls: ['./lista.page.scss'],
    standalone: true,
    imports: [RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem, IonList, IonButton, IonIcon]
  })
  export class ListaPage implements OnInit {

    

    public dados:Array<any> = [];

    constructor(
      public rt: RealtimeDatabaseService,  
      private router: Router,
      private alertController: AlertController 
    ) {
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

    async avisar(id: number){
      const alert = await this.alertController.create({
        header: 'Confirmar exclusão',
        message: 'Você tem certeza que quer excluir este item?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Exclusão cancelada');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.excluir(id);
            }
          }
        ]
      });

      await alert.present();

    }

    excluir(id:number){
      this.rt.remove(`/lista/${id}`).then(()=>{
        this.dados = this.dados.filter(item => item.id !== id)
      });
    }

    editar(id:number){
      this.router.navigateByUrl(`/cadastro/${id}`)
    }



  }
