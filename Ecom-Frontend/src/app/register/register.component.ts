import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService:UserService,
    private router:Router){}


  registerData(registerForm:NgForm){
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (resp)=>{
        console.log(resp);
        registerForm.reset();
        alert("Successfully Registered");
        this.router.navigate(['/login']);
        
      },(err)=>{
        console.log(err);
        
      }
    );
  }
}
