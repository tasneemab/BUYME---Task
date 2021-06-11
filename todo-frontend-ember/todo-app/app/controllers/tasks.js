import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TasksController extends Controller {

  @action
  updateTask(id) {
    this.store.findRecord('task', id)  // => GET /task/id
    .then(function(res) {
      if(res.completed) {
        res.completed = false;
      } else {
        res.completed = true;
      }
      res.save();
    });
    }

    @action
    deleteTask(id) {
      let self = this;
      //find the record then delete it
      this.store.findRecord('task',id,  { reload: true }).then( (res) =>{
        res.destroyRecord();
      }).then(() => {
        self.transitionToRoute('tasks');
    });
    }
}
