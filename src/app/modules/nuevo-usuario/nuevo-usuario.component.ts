import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  usuario: User | undefined;
  existe = false;
  cargado = false;
  id: number;
  usuarioForm: FormGroup;
  alertPlaceholder: HTMLElement | null;

  constructor(
    private route: ActivatedRoute,
    private readonly userService: UserService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.alertPlaceholder = document.getElementById('liveAlert');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      maidenName: [null, Validators.required],
      age: [null, Validators.required],
      gender: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      birthDate: [null, Validators.required],
      bloodGroup: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      eyeColor: [null, Validators.required],
      hair: this.formBuilder.group({
        color: [null, Validators.required],
        type: [null, Validators.required],
      }),
      domain: [null, Validators.required],
      ip: [null, Validators.required],
      address: this.formBuilder.group({
        address: [null, Validators.required],
        city: [null, Validators.required],
        coordinates: this.formBuilder.group({
          lat: [null, Validators.required],
          lng: [null, Validators.required],
        }),
        postalCode: [null, Validators.required],
        state: [null, Validators.required],
      }),
      macAddress: [null, Validators.required],
      university: [null, Validators.required],
      bank: this.formBuilder.group({
        cardExpire: [null, Validators.required],
        cardNumber: [null, Validators.required],
        cardType: [null, Validators.required],
      })
    })
  }

  ngOnInit(): void {
    this.iniciaUsuario();
    if (this.id == 0) {
      this.existe = false;
    } else {
      this.cargaDatos();
      this.existe = true;
    }
    this.cargado = true;
  }

  async cargaDatos() {
    await this.getUsuario();

    if (!this.usuario) {
      return;
    }

    this.usuarioForm.patchValue({
      firstName: this.usuario.firstName,
      lastName: this.usuario.lastName,
      maidenName: this.usuario.maidenName,
      age: this.usuario.age,
      gender: this.usuario.gender,
      email: this.usuario.email,
      phone: this.usuario.phone,
      username: this.usuario.username,
      password: this.usuario.password,
      birthDate: this.usuario.birthDate,
      bloodGroup: this.usuario.bloodGroup,
      height: this.usuario.height,
      weight: this.usuario.weight,
      eyeColor: this.usuario.eyeColor,
      hair: {
        color: this.usuario.hair.color,
        type: this.usuario.hair.type,
      },
      domain: this.usuario.domain,
      ip: this.usuario.ip,
      address: {
        address: this.usuario.address.address,
        city: this.usuario.address.city,
        coordinates: {
          lat: this.usuario.address.coordinates.lat,
          lng: this.usuario.address.coordinates.lng,
        },
        postalCode: this.usuario.address.postalCode,
        state: this.usuario.address.state,
      },
      macAddress: this.usuario.macAddress,
      university: this.usuario.university,
      bank: {
        cardExpire: this.usuario.bank.cardExpire,
        cardNumber: this.usuario.bank.cardNumber,
        cardType: this.usuario.bank.cardType,
      }
      
    });
  }

  iniciaUsuario() {
    this.usuario = {
      id: 0,
      firstName: "",
      lastName: "",
      maidenName: "",
      age: 0,
      gender: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      birthDate: "",
      image: "",
      bloodGroup: "",
      height: 0,
      weight: 0,
      eyeColor: "",
      hair: {
        color: "",
        type: "",
      },
      domain: "",
      ip: "",
      address: {
        address: "",
        city: "",
        coordinates: {
          lat: 0,
          lng: 0,
        },
        postalCode: "",
        state: "",
      },
      macAddress: "",
      university: "",
      bank: {
        cardExpire: "",
        cardNumber: "",
        cardType: "",
        currency: "",
        iban: "",
      },
      company: {
        address: {
          address: "",
          city: "",
          coordinates: {
            lat: 0,
            lng: 0,
          },
          postalCode: "",
          state: "",
        },
        department: "",
        name: "",
        title: "",
      },
      ein: "",
      ssn: "",
      userAgent: ""
    };
  }

  guardar() {
    if (!this.usuario) {
      return;
    }

    if (this.existe) {
      this.updateUser();
    } else {
      this.guardarNuevoUsuario();
    }
  }

  async getUsuario() {
    //En este caso no se puede emplear la estructura habitual de next, error, complete, ya que no podriamos hacer el await
    //De la siguiente manera soluciono el problema de la sincronía a la hora de cargar los datos en el fomulario
    this.usuario = await firstValueFrom(this.userService.getUserById(this.id));
  }

  goBack() {
    this.location.back();
  }

  alerta(message: string, type: string) {
    this.alertPlaceholder = document.getElementById('liveAlert');
    console.log('entro en alerta');
    console.log(this.alertPlaceholder);
    if (!this.alertPlaceholder) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

    this.alertPlaceholder.appendChild(wrapper);
  }

  guardarNuevoUsuario() {
    if (!this.usuario) {
      return;
    }

    this.userService.addUser(this.usuario).subscribe({
      next: (response) => {
        this.usuario = response;
        this.alerta('El usuario' + this.usuario.username + ' ha sido creado correctamente', 'success');
        
      },
      error: (error) => {
        this.alerta('El usuario no se ha podido guardar', 'danger');
        console.log(error);
      }
    })
  }

  updateUser() {
    if (!this.usuario) {
      return;
    }

    this.userService.updateUser(this.id, this.usuario).subscribe({
      next: (response) => {
        this.usuario = response;
        this.alerta('El usuario' + this.usuario.username + ' ha sido actualizado correctamente', 'success');
      },
      error: (error) => {
        this.alerta('El usuario no se ha podido actualizar', 'danger');
        console.log(error);
      }
    })
  }

}
