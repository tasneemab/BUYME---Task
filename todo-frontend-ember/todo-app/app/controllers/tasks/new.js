import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TasksNewController extends Controller {
  @action
  addTask(){
    let self = this;
    let task = this.get('task');
    let completed = this.get('completed');

    //create new task
    let newTask = this.store.createRecord('task',{
      task: task,
      completed: completed,
    });

    // save to DB
    newTask.save();

    //clear form
    this.setProperties({
      task:'',
      completed: false
    });

    self.transitionToRoute('tasks');
  }

}
