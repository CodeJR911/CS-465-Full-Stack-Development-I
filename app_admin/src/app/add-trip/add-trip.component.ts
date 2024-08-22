import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips'; 
import { AuthenticationService } from '../services/authentication.service';
import { trips } from '../data/trips'; 

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import AuthenticationService
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {

  public addForm!: FormGroup;
  trip!: Trip; // Or use the type from your data/trips file
  submitted = false;
  errorMessage = ''; // For displaying errors

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService // Inject AuthenticationService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required, Validators.min(1)], // Example: Minimum length
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required, Validators.min(0)], // Example: Minimum price
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Error adding trip:', error);
            this.errorMessage = 'An error occurred while adding the trip. Please try again.';
          }
        });
    }
  }

  // Get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}

