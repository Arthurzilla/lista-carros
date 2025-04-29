import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput,IonItem, IonList, IonButton]
})
export class CadastroPage implements OnInit {


  public carro ={
    nome: '',
    modelo: '',
    ano: ''
  }
  constructor(
    private rt: RealtimeDatabaseService,
    private router: Router
  ) { }

  ngOnInit() {}

  salvar() {
    this.rt.push('lista', this.carro).then(() => {
      this.carro = { nome: '', modelo: '', ano: ''};
      this.router.navigateByUrl('/lista');
    });
  }

}
