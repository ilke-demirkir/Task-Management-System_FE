import { Component, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TaskService } from "../../../services/task.service";
import { UserSelectorComponent } from "../../../shared/user-selector/user-selector.component";
import { DatePickerComponent } from "../../../shared/date-picker/date-picker.component";
import { ToastService } from "../../../shared/toast/toast.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ApplicationUserDto } from "../../../models/user.model";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../../services/auth.service";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-task-create",
  standalone: true,
  templateUrl: "./task-create.component.html",
  styleUrls: ["./task-create.component.scss"],
  imports: [
    UserSelectorComponent,
    DatePickerComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  error = signal<string | null>(null);
  users: ApplicationUserDto[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    const projectId = this.route.snapshot.queryParamMap.get("projectId") || "";
    this.taskForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      dueDate: ["", Validators.required],
      projectId: [projectId],
      assignedToId: ["", Validators.required],
    });
  }

  createTask() {
    if (this.taskForm.invalid) return;
    this.error.set(null);
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset();
        this.toastService.show("Task created!", "success");
      },
      error: () => {
        this.error.set("Failed to create task.");
        this.toastService.show("Failed to create task.", "error");
      },
    });
  }
}
