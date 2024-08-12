import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';

@Component({
selector: 'app-edit-trip',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './edit-trip.component.html',
styleUrl: './edit-trip.component.css'
})

public editForm!; FormGroup; 
trip!; trip;
submitted = false;
message : string = '';

export class EditTripComponent implements OnInit {
addForm!: FormGroup;
submitted = false;
constructor(
private formBuilder: FormBuilder,
private router: Router,
private tripService: TripDataService
) { }
ngOnInit() : void{
  // Retrieve stashed trip ID
let tripCode = localStorage.getItem("tripCode");
if (!tripCode) {
alert("Something wrong, couldn't find where I stashed tripCode!");
this.router.navigate(['']);
return;
}
console.log('EditTripComponent::ngOnInit');
console.log('tripcode:' + tripCode);

this.addForm = this.formBuilder.group({
_id: [],
code: ['', Validators.required],
name: ['', Validators.required],
length: ['', Validators.required],
start: ['', Validators.required],
resort: ['', Validators.required],
perPerson: ['', Validators.required],
image: ['', Validators.required],
description: ['', Validators.required],
})

this.tripDataService.getTrip(tripCode)
.subscribe({
  next: (value: any) => {
this.trip = value;
// Populate our record into the form
this.editForm.patchValue(value[0]);
if(!value)
{
this.message = 'No Trip Retrieved!';
}
else{
this.message = 'Trip: ' + tripCode + ' retrieved';
}
console.log(this.message);
},
error: (error: any) => {
console.log('Error: ' + error);
}
})
}

public onSubmit() 
{
this.submitted = true;

if(this.addForm.valid)
  {
this.tripService.addTrip(this.addForm.value).subscribe( {
  next: (data: any) => {
    console.log(data);
    this.router.navigate(['']);
},
error: (error: any) => {
  console.log('Error: ' + error);
}
})
}
}
// get the form short name to access the form fields
get f() { return this.addForm.controls; }
};
