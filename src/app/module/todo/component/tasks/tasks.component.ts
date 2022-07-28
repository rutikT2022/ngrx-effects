import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) { }

  @Input() tasks!: any[];
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  editingId: any;

  editForm = new FormGroup({
    id: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required),
    assignee: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.modalService.hide();
    this.editTask.emit(this.editForm.value);
  }
  // delete task
  delTask(task: any) {
    this.deleteTask.emit(task);
  }
  // edit task
  openModal(template: TemplateRef<any>, task: any) {
    console.log("template", template);
    console.log("task", task);
    this.modalService.hide(1);
    this.editingId = task.id;
    this.editForm.setValue({ id: task.id, task: task.task, assignee: task.assignee, status: task.status });
    this.modalRef = this.modalService.show(template);
  }
}