import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TasksEditController extends Controller {
  @action
  editTask(id){
    let self = this;
    let task = this.get('model.task');
    let completed = this.get('model.completed');

    //update task
    this.store.findRecord('task', id).then(function(res){
      res.task = task;
      res.completed = completed;

      // save to DB
      res.save();
    }).then(() => {
      self.transitionToRoute('tasks');
  });
  }
}
