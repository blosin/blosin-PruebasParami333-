import { Component, OnInit } from '@angular/core';
import {EstadoEvento} from '../../Modelos/EstadoEvento';
import {Evento} from '../../Modelos/Evento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogsService } from '../../Servicios/modal-dialogs.service';
import { Prueba } from '../../Modelos/Prueba';
import { EventoService } from '../../Servicios/evento.service';
import { ProjectService } from '../../Servicios/project.service';
import { QueryService } from '../../Servicios/query.service';
import { fileURLToPath } from 'url';
import { Project } from 'src/app/Modelos/Project';
import { Query } from 'src/app/Modelos/Query';
import { Formato } from '../../Modelos/Formato';
import { CategoriaService} from 'src/app/Servicios/categoria.service';
import { Category } from '../../Modelos/Category';
import { Usuario } from '../../Modelos/Usuario';
/*import { EstadoServiceService } from "../../services/estado-service.service";
import {EventosServiceService} from "../../services/eventos-service.service";*/

@Component({
  selector: 'app-root',
  templateUrl: './form-cron.component.html',
  styleUrls: ['./form-cron.component.css']
})
export class FormCronComponent implements OnInit {

  Titulo = 'Events';
  linea1: string;
  linea2: string;
  SinUsuarios=false;
  OpcionesUsuarioSeleccionadas: Usuario[]=[];
  lineasRestantes:string;
  OpcionesFormato: Formato[]=[];
  OpcionesCategoria:  Category[]=[];
  OpcionesUsuario: Usuario[]=[];
 
 

  //Documentos: TipoDocumento[] = []; 
  //mievento: Evento={IdEvento:0, Minuto:0, Hora:0, Dia:0,Mes:0,DiaSemana:0,Tarea:'',IdEstado:0,FechaAlta:'',Usuario:''};
  TituloAccionABMC = {
    A: '(Add)',
    A2: '(Add)',
    B: '(Delete)',
    M: '(Modify)',
    C: '(Search)',
    L: '(List)'
  };
  prueba: Prueba;
  AccionABMC = 'L'; 
  Mensajes = {
    SD: ' No event/alarm can be found...',
    RD: ' Review the data provided...'
  };

  Lista: Evento[] = [];
  Lista22: Evento[] = [];
  OpcionesProyectos: Project[]=[];
  OpcionesQuery: Query[]=[];
  RegistrosTotal: number;
  RegistrosTotalQuerys: number;
  RegistrosTotalTicket: number;
  Estados: EstadoEvento[]=[];
  SinBusquedasRealizadas = true;
  SinBusquedasRealizadas2=true;
  //MensajeError

  Pagina = 1;
  OpcionesEstado = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'Done' },
    { Id: false, Nombre: 'Pending ' }
  ];

  FormFiltro: FormGroup;
  FormReg: FormGroup;
  FormReg2:FormGroup;
  FormMensaje: FormGroup;
  submitted = false;
  submitted2 = false;
  AgregadoUser= false;
  ErrorDias=false;

  constructor(
    public formBuilder: FormBuilder,
    /* FUTUROS SERVICIOS */
    private modalDialogService: ModalDialogsService,
    private eventoService: EventoService,
    private projectService: ProjectService,
    private queryService: QueryService,
    private categoriaService: CategoriaService
  ) {       
    this.OpcionesFormato=[{IdFormato:1, NombreFormato:'pdf'},{IdFormato:2, NombreFormato:'csv'}];
    }

  ngOnInit() {
    /*this.FormMensaje= this.formBuilder.group({
        txt: ['']
    });*/
    this.FormFiltro = this.formBuilder.group({
      Activo: [null]
    });
    //'[\*][0-9]{1,2}'||'[0-9]{1,2}'
  //FormReg2
    this.FormReg = this.formBuilder.group({
      Id: [0],
      Minuto: [
        '',
        [Validators.required, Validators.max(59), Validators.min(0), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],  
      Hora: [
        '',
        [Validators.required, Validators.max(23), Validators.min(0), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],      
      Dia: [
        '',
        [Validators.required, Validators.max(31), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],
      Mes: [
        '',
        [Validators.required, Validators.max(12), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],
      DiaSemana: [
        '',
        [Validators.required, Validators.min(0), Validators.max(7), Validators.pattern('([\*]|[0-9]{1})')]
      ],
      Tarea:[''],
      IdProyecto: ['',[Validators.required]],
      IdQuery: ['-9999',[Validators.required]],
      NombreFormato:['', [Validators.required]],
      IdEstado: [''],
      FechaAlta: [
        '',
        [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}')
        ]
      ], 
      Usuario: [
        ''],
      UsuariosSeleccionados: [
        ''],
      Activo: [true]
    });

    this.FormReg2 = this.formBuilder.group({
      Id: [0],
      Minuto: [
        '',
        [Validators.required, Validators.max(59), Validators.min(0), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],  
      Hora: [
        '',
        [Validators.required, Validators.max(23), Validators.min(0), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],      
      Dia: [
        '',
        [Validators.required, Validators.max(31), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],
      Mes: [
        '',
        [Validators.required, Validators.max(12), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],
      DiaSemana: [
        '',
        [Validators.required, Validators.min(0), Validators.max(7), Validators.pattern('([\*]|[0-9]{1})')]
      ],
      DayRemainder: ['',
        [Validators.required, Validators.pattern('([0-9]{1,3})')]
      ],
      Tarea:[''],
      IdProyecto: ['',[Validators.required]],
      IdCategoria: ['',[Validators.required]],
      IdUsuario: [''],
      IdEstado: [''],
      FechaAlta: [
        '',
        [Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}')
        ]
      ], 
      Usuario: [
        ''],
      Activo: [true]
    });

    this.GetEstados();
    this.GetProyectos();
    
    this.GetArchivo();
    /*Dia: [
        '',
        [Validators.required, Validators.max(31), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],
      Mes: [
        '',
        [Validators.required, Validators.max(12), Validators.min(1), Validators.pattern('([\*]|[0-9]{1,2})')]
      ],*/
  }

  BorrarUsuario(Dto: Usuario){
    this.OpcionesUsuarioSeleccionadas=this.OpcionesUsuarioSeleccionadas.filter(item => item.Id!==Dto.Id);
   /*let value = 3

let arr = [1, 2, 3, 4, 5, 3]

arr = arr.filter(item => item !== value)*/
  }


  AgregarUsuario()
  {
    this.SinUsuarios=false;

    this.ErrorDias=false;
    let boo=false;
    if(this.FormReg2.controls.IdUsuario.value=='' || this.FormReg2.controls.IdUsuario.value==undefined)
    {
      //console.log('valor vacio');
      return;
    }
    //console.log(this.FormReg2.controls.IdUsuario.value);
    if(this.FormReg2.controls.IdUsuario.value==-1)
    {
      //console.log('valor 0');
      let ListaUsuarios: Usuario[]=[];
      let usuario={} as Usuario;
      usuario.Id=-1;         
      usuario.Firstname='All users';
      usuario.Lastname='All Users';
      usuario.NombreUsuario='All users';     
      ListaUsuarios.push(usuario);
      this.OpcionesUsuarioSeleccionadas=ListaUsuarios;
      
      //console.log(ListaUsuarios);//OpcionesUsuarioSeleccionadas
      //console.log(this.OpcionesUsuario);//OpcionesUsuarioSeleccionadas
      //this.OpcionesUsuarioSeleccionadas=[];
      //this.OpcionesUsuarioSeleccionadas[0]=
    }
    
 // OpcionesUsuarioSeleccionadas: Usuario[]=[];
 
    for (let i = 0; i < this.OpcionesUsuarioSeleccionadas.length; i++) {
      console.log('entro una ves por aca antes');
      if(this.OpcionesUsuarioSeleccionadas[i].Id==-1)
      {
        boo=true;
        console.log('Entro iguales'+this.OpcionesUsuarioSeleccionadas[i].Id);
      console.log(this.FormReg2.controls.IdUsuario.value);
        return;
      }
     
      if(this.OpcionesUsuarioSeleccionadas[i].Id==this.FormReg2.controls.IdUsuario.value)
      {
        boo=true;
        console.log('Entro iguales'+this.OpcionesUsuarioSeleccionadas[i].Id);
      console.log(this.FormReg2.controls.IdUsuario.value);
        return;
      }

    }
    if(boo==false)
    {
      
      let usuario={} as Usuario;
      /*const inventory = [
        {name: 'apples', quantity: 2},
        {name: 'bananas', quantity: 0},
        {name: 'cherries', quantity: 5}
      ];
      
      const result = inventory.find( ({ name }) => name === 'cherries' );      
      console.log(result) // { name: 'cherries', quantity: 5 }*/     
      console.log('Entro por no agregado');
      usuario=this.OpcionesUsuario.find(({Id}) => Id===this.FormReg2.controls.IdUsuario.value      
      );
      console.log(usuario);
      //usuario.Id=this.FormReg2.controls.IdUsuario.value;
      //usuario.Firstname=this.OpcionesUsuario.;
      //usuario.Lastname=this.OpcionesUsuario;         
      this.OpcionesUsuarioSeleccionadas.push(usuario);
    }
    else{
      //activar mensaje de error
      console.log('Entro por WTF');
      this.ErrorDias=true;
    }
  }
  Borrar(Dto) {   
    this.modalDialogService.Confirm(
      "Are you sure you want to permanently remove this \"alarm\"?",
      'Warning',
      'Ok',
      'Cancel',
      () =>
        this.eventoService  
          .delete(Dto.Linea)
          .subscribe((res: any) => 
            this.Buscar()
          ),
      null
    );     
    
  }

  Ver(Dto) {   
    //todo esto va a ir dentro de un servicio q devuelva los usuaruios
    this.modalDialogService.Alert("Usuario1  -  Usuario2  -  Usuario3",'Users','i');     
    
  }



  ModalFormato()
  {
    this.modalDialogService.Alert('Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday:7-0.','Reference information','i');
  }
  // enviar formulario
  Grabar() {


   /* if(this.FormReg.controls.Mes.value!==null&&this.FormReg.controls.Dia.value!==null&&this.FormReg.controls.DiaSemana.value==null||this.FormReg.controls.Mes.value==null&&this.FormReg.controls.Dia.value==null&&this.FormReg.controls.DiaSemana.value!==null)
      {
       ;
      }
      else{
        
        this.FormReg.patchValue({
          DiaSemana:null,
          Dia:null,
          Mes:null        
        });
        this.ErrorDias=true;
        //setmensaje
        //console.log({ ...this.FormReg.value });
      }   
    

    */     
        this.FormReg.patchValue({
          Dia:'*',
          Mes:'*'
        }); 
        //console.log({ ...this.FormReg.value });
      //return;
        //console.log({ ...this.FormReg.value });       
      

/*      if(this.FormReg.controls.DiaSemana.value==null&&this.FormReg.controls.Dia.value!==null&&this.FormReg.controls.Mes.value!==null)
      {
        this.FormReg.patchValue({
          DiaSemana:'*'        
        });
        //console.log({ ...this.FormReg.value });
      }*/





    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }
   
      
  
    // hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };
    //console.log(itemCopy);
    
    if(itemCopy.Minuto=='*')
    itemCopy.Minuto='x';
    if(itemCopy.Hora=='*')
    itemCopy.Hora='x';
    if(itemCopy.Dia='*')
    itemCopy.Dia='x';
    if(itemCopy.Mes=='*')
    itemCopy.Mes='x';
    if(itemCopy.DiaSemana=='*')
    itemCopy.DiaSemana='x';
    //console.log(itemCopy);
    // convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    if(itemCopy.FechaAlta!==null)
    {   
      let arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
      if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(arrFecha[2],arrFecha[1] - 1,arrFecha[0]).toISOString();
    }
    //allProjectsAllIssues
    if(this.FormReg.controls.IdProyecto.value==0 && this.FormReg.controls.IdQuery.value==0)
    {
        this.eventoService.postAllIssuesAllProjects(itemCopy).subscribe(data =>{
          this.AccionABMC= 'L';
          this.modalDialogService.Alert('your crontab has been successfully updated', 'crontab updated', 's');
          this.Buscar();
        },
        error => {this.modalDialogService.Alert('Unable to update crontab due to an error','Please try again','w')
        });
    }
    //1Proyecto todas las issues
    if(this.FormReg.controls.IdProyecto.value!==0 && this.FormReg.controls.IdQuery.value==0)
    {
      this.eventoService.postOneProjectAllIssues(itemCopy).subscribe(data =>{
        this.AccionABMC= 'L';
        this.modalDialogService.Alert('your crontab has been successfully updated', 'crontab updated', 's');
        this.Buscar();
      },
      error => {this.modalDialogService.Alert('Unable to update crontab due to an error','Please try again','w')
      });
    }
    //console.log(this.FormMensaje.controls.txt.value);
    //QueryGeneral
    if(this.FormReg.controls.IdProyecto.value==0 && this.FormReg.controls.IdQuery.value!==0)
    {
      this.eventoService.postQueryGeneral(itemCopy).subscribe( data => {      
        this.AccionABMC= 'L';
        this.modalDialogService.Alert('your crontab has been successfully updated', 'crontab updated', 's');
        this.Buscar();
  
        
      },
      error => {this.modalDialogService.Alert('Unable to update crontab due to an error','Please try again','w')});   
    }
    //1Proyecto1Issue //QueryGeneral 1Proyecto
    if(this.FormReg.controls.IdProyecto.value!==0 && this.FormReg.controls.IdQuery.value!==0)
    {
      this.eventoService.postOneProjectOneIssue(itemCopy).subscribe( data => {      
        this.AccionABMC= 'L';
        this.modalDialogService.Alert('your crontab has been successfully updated', 'crontab updated', 's');
        this.Buscar();
  
        
      },
      error => {this.modalDialogService.Alert('Unable to update crontab due to an error','Please try again','w')});   
    }
    


  }

 
  Grabar2()
  {
    this.FormReg2.patchValue({
      Dia:'*',
      Mes:'*'
    }); 
    this.submitted2 = true;
    // verificar que los validadores esten OK
    if (this.FormReg2.invalid) {
      return;
    }
     //console.log(this.OpcionesUsuarioSeleccionadas.length);
     //console.log(this.OpcionesUsuarioSeleccionadas);
    if(this.OpcionesUsuarioSeleccionadas.length==0)
    {
      this.SinUsuarios=true;
      return;
    }
    let usuarios='';
    
    //UsuariosSeleccionados
    for (let i = 0; i <  this.OpcionesUsuarioSeleccionadas.length; i++) {
      if(this.OpcionesUsuarioSeleccionadas[i].Id==-1)
      {
        usuarios='X';
        break;
      }
      if(i==this.OpcionesUsuarioSeleccionadas.length-1)
      {
        usuarios+=`${this.OpcionesUsuarioSeleccionadas[i].Id}`;
      }
      else
      usuarios+=`${this.OpcionesUsuarioSeleccionadas[i].Id},`;
      
    }
   
    
    // hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg2.value };
    //console.log(itemCopy);
    itemCopy.Users=usuarios;
    if(itemCopy.IdCategoria==0){
      itemCopy.IdCategoria='X';
    }
    if(itemCopy.IdProyecto==0){
      itemCopy.IdProyecto='X';
    }

    if(itemCopy.Minuto=='*')
    itemCopy.Minuto='x';
    if(itemCopy.Hora=='*')
    itemCopy.Hora='x';
    if(itemCopy.Dia='*')
    itemCopy.Dia='x';
    if(itemCopy.Mes=='*')
    itemCopy.Mes='x';
    if(itemCopy.DiaSemana=='*')
    itemCopy.DiaSemana='x';
    //console.log(itemCopy);
    // convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    console.log(itemCopy);

   
    this.eventoService.postReminder(itemCopy).subscribe(data => {      
      this.AccionABMC= 'L';
      this.modalDialogService.Alert('your crontab has been successfully updated', 'crontab updated', 's');
      this.Buscar();
      
    },
    error => {this.modalDialogService.Alert('Unable to update crontab due to an error','Please try again','w');    
    });  
    

  }
  

  GetQuerys(idProyecto: number) {
    throw new Error('Method not implemented.');
  }

  GrabarTxt()
  {
    //this.eventoService.
   /* console.log(this.FormMensaje.controls.txt.value);
    this.eventoService.post(this.FormMensaje.controls.txt.value).subscribe( data => {
      this.modalDialogService.Alert('La operación se realizo con éxito', 'txt modificado', 's');
     
    },
    error => {this.modalDialogService.Alert('Error en la actualizacion','Error','w')});*/
  }

  GetArchivo()
  {      
      //console.log(itemCopy);
      //console.log(itemCopy[0][0]);
      /*console.log( itemCopy[0].length);//1
      console.log( itemCopy[1].length);//1
      console.log( itemCopy[2].length);//1
      console.log(itemCopy[0][0].length);//6*/

      
      /*for(let i=0; i<itemCopy[0][0].length;i++)
      {
        for(let j=0;j<itemCopy[i].length;j++)
        {
          if(itemCopy[i][j]!==undefined)
          {
            if(i==0 && j==0)
            {
              if(itemCopy[i][j]!==undefined)
              this.linea1=itemCopy[0][0];
            }
            else
            {
              if(i==0)
              {
                this.linea1+=' '+itemCopy[0][j];
              }

              if(i==1)
              {
                if(this.linea2=='')
                this.linea2=itemCopy[1][0];
                else
                this.linea2+=' '+itemCopy[1][j];
              }
              if(i!==0 && i!==1)
              {
                if(itemCopy[i][j]!==undefined)
                {
                  if(this.lineasRestantes=='')
                  {
                    this.lineasRestantes=itemCopy[i][j];
                  }
                  else
                  {
                    this.lineasRestantes+=' '+itemCopy[i][j];
                  }
                }
              }

            }
          }
        } 
      }*/       
  
    /*this.linea2='';
    this.lineasRestantes='';*/
  }
  GetEstados() {
    
    /*OBTENER ESTADOS SERVICE*/
   
  }
  /*GetPrueba(){     
    this.eventoService.get().subscribe((res: Prueba) => {
      this.prueba = res;
      console.log(this.prueba);
    });
  }*/


  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset({ Activo: true });
    this.submitted = false;
    this.FormReg.markAsUntouched();
  }
  Agregar2(){
    this.AccionABMC = "A2";
    this.FormReg2.reset({ Activo: true });
    this.submitted2 = false;
    this.SinUsuarios=false;
    this.FormReg2.markAsUntouched();
    this.OpcionesUsuarioSeleccionadas=[];
  }

  GetProyectos() {
    let idProyecto=0
    this.projectService.get().subscribe((res: any)=>{
      const itemCopy={...res};      
      let ListaProyectos: Project[] = [];      
      let milegnht = Object.keys(itemCopy).length;     
      
      
      for(let i=0; i<milegnht; i++)
      {        
        let miProject={} as Project;     
        
        miProject.id=itemCopy[i].id;
        miProject.name=itemCopy[i].name;
        miProject.identifier=itemCopy[i].identifier;
        miProject.description=itemCopy[i].description;
        miProject.status=itemCopy[i].status;
        miProject.is_public=itemCopy[i].is_public;
        miProject.created_on=itemCopy[i].created_on;
        miProject.updated_on=itemCopy[i].updated_on;       
        ListaProyectos.push(miProject);
      }
      let miProject= {} as Project;
      miProject.id=0;
      miProject.name='All projects';
      ListaProyectos.push(miProject);
      this.OpcionesProyectos=ListaProyectos;
    
    });
    
    
  
    //this.GetQuerys(idProyecto);
  }
  /**Carga las categorias de un proyecto) */
  CargarCategorias(){
    this.OpcionesCategoria=[];

    //this.SinBusquedasRealizadas=false;
    if(this.FormReg2.value.IdProyecto==='')
    {
      this.OpcionesCategoria=[];
      return;
    }
    else
    {
      if(this.FormReg2.value.IdProyecto==0)
      {
        let ListaCategorias: Category[]=[];
        let categoria={} as Category;
        categoria.id=0;
        categoria.name='All Categories';
        ListaCategorias.push(categoria);
        this.OpcionesCategoria=ListaCategorias;
      }
      else{
        this.categoriaService.getById(this.FormReg2.value.IdProyecto).subscribe((res:any)=> {
          const itemCopy2={...res};
          let ListaCategorias: Category[]=[];
          let largor=Object.keys(itemCopy2).length;
         /* if(largor==0)
          {
            this.SinBusquedasRealizadas = true;
            return;
          }*/
          
          for(let i=0; i<largor; i++)
          {
            let categoria={} as Category;
            categoria.id=itemCopy2[i].id;
            categoria.project_id=this.FormReg2.value.IdProyecto;
            categoria.name=itemCopy2[i].name;
            ListaCategorias.push(categoria);
          }
          let categoria={} as Category;
          categoria.id=0;
          categoria.name='All Categories';
          ListaCategorias.push(categoria);
          this.OpcionesCategoria=ListaCategorias;
  
  
        });
      }
    
    }
    this.cargarUsuarios();
  
    
  }
  /**Devuelve los usuarios miembros de un proyecto (definido por un combobox) */
  cargarUsuarios(){
    this.OpcionesUsuario=[];

    //this.SinBusquedasRealizadas=false;
    if(this.FormReg2.value.IdProyecto==='')
    {
      this.OpcionesUsuario=[];
      return;
    }
    else
    {
      if(this.FormReg2.value.IdProyecto==0)
      {
        let ListaUsuarios: Usuario[]=[];
        let usuario={} as Usuario;
        usuario.Id=-1;                
        usuario.NombreUsuario='All users';     
        ListaUsuarios.push(usuario);
        this.OpcionesUsuario=ListaUsuarios;
      }
      else{
        this.projectService.getUsuarios(this.FormReg2.value.IdProyecto).subscribe((res:any)=> {
          const itemCopy2={...res};
          let ListaUsuarios: Usuario[]=[];
          let largor=Object.keys(itemCopy2).length;
          /*if(largor==0)
          {
            this.SinBusquedasRealizadas2 = true;
            return;
          }*/
          
          for(let i=0; i<largor; i++)
          {
            let usuario={} as Usuario;
            usuario.Id=itemCopy2[i].id;  
            usuario.Firstname=itemCopy2[i].firstname;
            usuario.Lastname=itemCopy2[i].lastname;
            usuario.NombreUsuario=`${itemCopy2[i].firstname} ${itemCopy2[i].lastname}`
            ListaUsuarios.push(usuario);
          }
          let usuario={} as Usuario;
          usuario.Id=-1;
          usuario.NombreUsuario='All users';   
          ListaUsuarios.push(usuario);
          this.OpcionesUsuario=ListaUsuarios;
  
  
        });
      }
    
    }
  }


  cargarQuerys()
  {    
   
    this.queryService.getQuerys().subscribe((res: any) => { 
      const itemCopy = {...res};
      //console.log(itemCopy);
      let ListaQuerys: Query[] = [];     
      
      let milegnht = Object.keys(itemCopy).length;
      for(let i=0; i<milegnht; i++)
      {
        //console.log(this.FormReg.value.IdProyecto);
        //console.log(itemCopy[i].project_id);
        //if(this.FormReg.value.IdProyecto==0)
        if(itemCopy[i].project_id==null)
        {
          let query={} as Query;
          query.id=itemCopy[i].id;
          query.name=itemCopy[i].name;
          query.project_id=itemCopy[i].project_id;
          query.user_id=itemCopy[i].user_id;
          ListaQuerys.push(query);
        }
        if(itemCopy[i].project_id==this.FormReg.value.IdProyecto)
        {

          let query={} as Query;
          query.id=itemCopy[i].id;
          query.name=itemCopy[i].name;
          query.project_id=itemCopy[i].project_id;
          query.user_id=itemCopy[i].user_id;
          ListaQuerys.push(query);
        }           
      }
      if(this.FormReg.value.IdProyecto!=='')
      {
      let query2={} as Query;
      query2.id=0;
      query2.name='All Trouble tickets';
      query2.project_id=this.FormReg.value.IdProyecto;
      query2.user_id=undefined;
      ListaQuerys.push(query2);
      }

      this.OpcionesQuery=ListaQuerys;
      //console.log(ListaQuerys);
      //console.log(this.OpcionesQuery);
    });
  }
  VerUsuarios(Dto: Evento){
    
    this.modalDialogService.Alert(Dto.Users,'Users','i');    
  }
  // Buscar lineas del crontab redmine 
  Buscar() {
    //console.log(this.eventoService.delete(2));
    this.Lista=[];
    this.Lista22=[];
    //console.log(JSON.parse(JSON.stringify(this.Lista))); 
    this.SinBusquedasRealizadas=true;
    this.SinBusquedasRealizadas2=false;
    this.eventoService.get().subscribe((res: any)=> {
      const itemCopy= {...res}; 
      let Lista2: Evento[] = [];
      let Lista3: Evento[] = [];
      //console.log(itemCopy);
      //console.log(Object.keys(itemCopy).length);
      //console.log(Object.keys(res).length);
      let milegnht = Object.keys(itemCopy).length;
      this.RegistrosTotal=milegnht;
      this.RegistrosTotalQuerys=0;
      this.RegistrosTotalTicket=0;

      

      for(let i=0; i<milegnht; i++)
      {
        //this.Lista=itemCopy[i];
        //for(let j=0; j<itemCopy[i].length;j++)
        //{
          let mievento={} as Evento;           
          //console.log(i);

          
          mievento.IdEvento=0;
          mievento.Linea=i;
          mievento.Minuto=itemCopy[i][0];
          mievento.Hora=itemCopy[i][1];
          mievento.Dia=itemCopy[i][2];
          mievento.Mes=itemCopy[i][3];
          mievento.DiaSemana=itemCopy[i][4];
          mievento.Tarea=itemCopy[i][5];
          if(itemCopy[i][6]!==undefined)
          {
            var arrUrl = itemCopy[i][6].substr(1, 26).split("/");
            if(arrUrl[4]=='ttMai')
            {
              //itemCopy[i][7];//days
              this.RegistrosTotalTicket++;
              //itemCopy[i][8];//trackers number o X
              //itemCopy[i][9];//Proyectos number o X
              //itemCopy[i][10];//Usuarios string de numeros separados por ,
              mievento.Days=itemCopy[i][7];
              if(itemCopy[i][8]=='X')
              {
                mievento.Tracker='All categories';
              }
              else{
                this.categoriaService.getCategoriaInfo(itemCopy[i][8]).subscribe((res: any)=>{
                  const itemCopy2={...res};  
                  mievento.Tracker=itemCopy2[0].name;
                });
              }

              if(itemCopy[i][9]=='X')
              {

                mievento.Project='All projects';
              }
              else{
                this.projectService.getProyectoSolo(itemCopy[i][9]).subscribe((res2: any)=> {
                  const itemCopy3={...res2};  
                  mievento.Project=itemCopy3[0].name;
                });
              }

              if(itemCopy[i][10]=='X')
              {
                mievento.Users='All users';
                Lista3.push(mievento);
              }
              else{
                var tempUsers=itemCopy[i][10].split(",");
                let TempUserstring='';
                for (let z = 0; z < tempUsers.length; z++) { 
               
                    this.projectService.getUsuarioSolo(tempUsers[z]).subscribe((res3: any)=>{
                      const itemCopy4={...res3};
                     // console.log('Respuesta del getUsuario: '+itemCopy4);
                      //console.log(itemCopy4);
                      
                        TempUserstring+=`-- ${itemCopy4[0].firstname} ${itemCopy4[0].lastname} -- `;
                        console.log('Valor string antes de ultimo ciclo:'+TempUserstring);                  
                        mievento.Users=TempUserstring;
                          
                      
                    });                
                }             
               
                Lista3.push(mievento);      
                console.log('valor lista 3 hasta el momento:'+Lista3);
                
              }
        
              //falta if todos los usuarios

              console.log('Agregue supoestamente todos los usuarios en Lista3: '+Lista3);
              this.Lista22=Lista3;
            
             

              continue;
            }
            if(arrUrl[4]=='files')
            {
              continue;              
            }
            if(arrUrl[4]=='allip')
            {
              mievento.Proyecto='All projects';
              mievento.Query='All Trouble tickets';
              mievento.Formato=itemCopy[i][7];
            }
            if(arrUrl[4]=='prjct')
            {
              this.projectService.get().subscribe((res: any)=>{
                const itemCopy2={...res};      
                //let ListaProyectos: Project[] = [];      
                let milegnht = Object.keys(itemCopy2).length;     
                
                
                for(let j=0; j<milegnht; j++)
                {        
                  //let miProject={} as Project;     
                  if(itemCopy2[j].id==itemCopy[i][8])
                  {
                    mievento.Proyecto=itemCopy2[j].name;
                    return;
                  }               
                }   
              
              });
              
              mievento.Query='All Trouble tickes';
              mievento.Formato=itemCopy[i][7];
            }
            if(arrUrl[4]=='issue')
            {
              this.queryService.getQuerys().subscribe((res: any) => { 
                const itemCopy3 = {...res};             
                //let ListaQuerys: Query[] = [];     
                
                let milegnht = Object.keys(itemCopy).length;
                for(let i2=0; i2<milegnht; i2++)
                {                
                  if(itemCopy3[i2].id==itemCopy[i][8])
                  {
                    mievento.Query=itemCopy3[i2].name;
                  }
                  
                }    
               
              });
  
  
              mievento.Proyecto='All projects';          
              mievento.Formato=itemCopy[i][7];
            }          
  
            if(arrUrl[4]=='sngpr')
            {
              this.projectService.get().subscribe((res: any)=>{
                const itemCopy5={...res};      
                //let ListaProyectos: Project[] = [];      
                let milegnht = Object.keys(itemCopy5).length;     
                
                
                for(let i4=0; i4<milegnht; i4++)
                {        
                  //let miProject={} as Project;     
                  if(itemCopy5[i4].id==itemCopy[i][8])
                  {
                    mievento.Proyecto=itemCopy5[i4].name;
                    return;
                  }               
                }   
              
              });
              
              this.queryService.getQuerys().subscribe((res: any) => { 
                const itemCopy6 = {...res};             
                //let ListaQuerys: Query[] = [];     
                
                let milegnht = Object.keys(itemCopy6).length;
                for(let i5=0; i5<milegnht; i5++)
                {                
                  if(itemCopy6[i5].id==itemCopy[i][9])
                  {
                    mievento.Query=itemCopy6[i5].name;
                  }
                  
                }    
               
              });
              //mievento.Proyecto='All projects';
              //mievento.Query='All issues';
              mievento.Formato=itemCopy[i][7];
            }
           
            

          }
        
         
    
         
          mievento.IdEstado=0;
          mievento.FechaAlta='1900-01-01T00:00:00';
          mievento.Usuario='UserUndefined';
          //console.log(mievento);
          
         
          /*Lista2.push(new Evento{IdEvento:0, Minuto: itemCopy[i][0], Hora: itemCopy[i][1], Dia: itemCopy[i][2], Mes: itemCopy[i][3], DiaSemana: itemCopy[i][4], 
            Tarea: itemCopy[i][5], IdEstado:0, FechaAlta:'1900-01-01T00:00:00', Usuario: 'UserUndefined'});*/
          Lista2.push(mievento);
          //console.log(JSON.parse(JSON.stringify(Lista2)));        
          //this.Lista.push(this.mievento);
          
                
          
        //}
      }
      this.Lista=Lista2;
      this.RegistrosTotalQuerys=this.RegistrosTotal-this.RegistrosTotalTicket;
      
      if(this.Lista.length==0)
      this.SinBusquedasRealizadas=false;
      if(this.Lista22.length==0)
      this.SinBusquedasRealizadas=false;
     
    
     // var cant = itemCopy.filter(o => o.).length;
     // itemCopy.forEach(() => {
      //  this.RegistrosTotal++;
    //})
      
     // for(let i=0; i<this.RegistrosTotal;i++)
      //{
        //this.Lista.push=itemCopy[i];
        /*for(let j=0;j<itemCopy[i].length;j++)
        {
         
          
        }*/
          
      //} 
      
    },
    error => {
      this.SinBusquedasRealizadas=false;
      this.SinBusquedasRealizadas2=false;
      let evento={} as Evento;      
      evento.Dia=0;
      evento.DiaSemana=0;
      evento.FechaAlta="02/02/2000";
      evento.Hora=0;
      evento.IdEstado=0;
      evento.IdEvento=0;
      evento.Mes=0;
      evento.Minuto=0;
      evento.Tarea="Your connection was interrupted";
      evento.Usuario="Your connection was interrupted";
      evento.Query="Your connection was interrupted";
      evento.Proyecto="Your connection was interrupted";
      evento.Formato="Your connection was interrupted";
      this.RegistrosTotal=1;
      
          

      this.Lista.push(evento);
    });
    //DATOS FALSOS, DEBERIAN VENIR DEL SERVICE
    /*this.Lista=[
      {
        IdEvento: 1,
      Minuto: 1,
      Hora: 1,
      Dia: 1,
      Mes: 1,
      DiaSemana: 5,
      IdEstado: 1,
      FechaAlta: '2017-01-04T00:00:00',
      Usuario: 'User 1'
      },
      {
        IdEvento: 2,
        Minuto: 2,
        Hora: 2,
        Dia: 2,
        Mes: 2,
        DiaSemana: 4,
        IdEstado: 1,
        FechaAlta: '2020-01-04T14:15:00',
        Usuario: 'User 2'
      }];;*/
      
    
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

   /*  TRATADO DE FECHA:

      // formatear fecha de  ISO 8061 a string dd/MM/yyyy
      let arrFecha = res.FechaAlta.substr(0, 10).split('-');
      this.FormReg.controls.FechaAlta.patchValue(
        arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0]
      );
     
    */
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, 'C');
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    if (!Dto.Activo) {
      this.modalDialogService.Alert(
        'No puede modificarse un registro Inactivo.'
      );
      //return;
    }
    this.submitted = false;
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
    this.BuscarPorId(Dto, 'M');
  }

  
  // representa la baja logica
  ActivarDesactivar(Dto) {
   /* this.modalDialogService.Confirm(
      'Esta seguro de " +
        (Dto.Activo ? "desactivar" : "activar") +
        " este registro?',
      undefined,
      undefined,
      undefined,
      () =>
        this.eventosService
          .delete(Dto.Id)
          .subscribe((res: any) => this.Buscar()),
      null
    );*/
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    this.modalDialogService.Alert('Sin desarrollar...');
  }

  GetEstadoNombre(Id) {
    let Estado = this.Estados.filter(
      x => x.IdEstado === Id
    )[0];
    if (Estado) return Estado.Nombre;
    else return '';
  }


  /*LectorDeArchivos()
  {
    
  }*/











}

