import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from "@angular/core";
import { ScheduleService } from "../../../services/schedule.service";
import { ScheduleDto } from "../../../models/schedule.model";
import { DatePickerComponent } from "../../../shared/date-picker/date-picker.component";
import { ConfirmClickDirective } from "../../../shared/confirm-click.directive";
import { ToastService } from "../../../shared/toast/toast.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-schedule-list",
  standalone: true,
  templateUrl: "./schedule-list.component.html",
  styleUrls: ["./schedule-list.component.scss"],
  imports: [DatePickerComponent, ConfirmClickDirective, CommonModule],
})
export class ScheduleListComponent implements OnInit {
  private scheduleService = inject(ScheduleService);
  private toastService = inject(ToastService);

  @Input()
  taskId!: string;
  schedules = signal<ScheduleDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  filteredSchedules = computed(() =>
    this.schedules().filter((s) => s.taskId === this.taskId)
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.fetchSchedules();
  }

  fetchSchedules() {
    this.loading.set(true);
    this.error.set(null);
    this.scheduleService.getSchedules().subscribe({
      next: (schedules) => {
        this.schedules.set(schedules);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load schedules.");
        this.loading.set(false);
      },
    });
  }

  deleteSchedule(id: string) {
    this.scheduleService.deleteSchedule(id).subscribe({
      next: () => {
        this.schedules.set(this.schedules().filter((s) => s.id !== id));
        this.toastService.show("Schedule deleted!", "success");
      },
      error: () => {
        this.error.set("Failed to delete schedule.");
        this.toastService.show("Failed to delete schedule.", "error");
      },
    });
  }
}
