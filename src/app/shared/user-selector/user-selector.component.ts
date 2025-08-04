import { Component, OnInit, Output, EventEmitter, signal, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApplicationUserDto } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  imports: [CommonModule]
})
export class UserSelectorComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<ApplicationUserDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedUserId: string | null = null;

  @Output() selectionChange = new EventEmitter<string>();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
        this.error.set('Failed to load users.');
        this.loading.set(false);
      }
    });
  }

  selectUser(id: string) {
    this.selectedUserId = id;
    this.selectionChange.emit(id);
  }

  onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value;
    this.selectUser(value);
  }
}
