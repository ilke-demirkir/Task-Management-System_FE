import {
  Component,
  forwardRef,
  inject,
  Input,
  OnInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { UserService } from "../../services/user.service";
import { ApplicationUserDto } from "../../models/user.model";
import { MatFormFieldAppearance } from "@angular/material/form-field";

@Component({
  selector: "app-user-selector",
  standalone: true,
  templateUrl: "./user-selector.component.html",
  styleUrls: ["./user-selector.component.scss"],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UserSelectorComponent),
    multi: true,
  }],
})
export class UserSelectorComponent implements OnInit, ControlValueAccessor {
  private userService = inject(UserService);
  @Input()
  appearance: MatFormFieldAppearance = "fill";
  @Input()
  label = "Select User";

  users = signal<ApplicationUserDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  value: string | null = null;
  isDisabled = false;

  private onChange: (v: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading.set(true);
    this.error.set(null);
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load users.");
        this.loading.set(false);
      },
    });
  }

  // CVA hooks
  writeValue(val: string | null): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  pick(v: string | null) {
    this.value = v;
    this.onChange(v);
    this.onTouched();
  }
}
