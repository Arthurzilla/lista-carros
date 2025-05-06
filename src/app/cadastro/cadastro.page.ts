import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput,IonItem, IonList, IonButton]
})
export class CadastroPage implements OnInit {

  public id: string | null = null; // Tornando a propriedade 'id' pública


  public carro ={
    nome: '',
    modelo: '',
    ano: ''
  }
  constructor(
    private rt: RealtimeDatabaseService,
    private router: Router,
    private route: ActivatedRoute //pega o id da rota
  ) { }

  ngOnInit() {
    // Verifica se a rota tem um parâmetro 'id' (modo edição)
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // Se existe 'id', estamos no modo edição, então carregue os dados do carro
      this.carregarCarro(this.id);
    }
   
  }

  carregarCarro(id: string) {
    this.rt.query(`lista/${id}`, (snapshot: any) => {
      if (snapshot.exists()) {
        this.carro = snapshot.val(); // Carrega os dados do carro para o formulário
      }
    });
  }

  salvar() {
    if (this.id) {
      // Se existe 'id', estamos editando, então usamos 'update'
      this.rt.update(`/lista/${this.id}`, this.carro).then(() => {
        this.router.navigateByUrl('/lista');
      });
    } else {
      // Se não existe 'id', estamos criando um novo carro
      this.rt.push('lista', this.carro).then(() => {
        this.carro = { nome: '', modelo: '', ano: '' }; // Limpa os campos
        this.router.navigateByUrl('/lista');
      });
    }
  }

  

}
