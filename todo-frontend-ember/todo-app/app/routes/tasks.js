import Route from '@ember/routing/route';

export default class TasksRoute extends Route {
  model() {
    let completedTasks = 0;
    let uncompletedTasks = 0;

    let tasks = this.store.findAll('task');
    this.store.findAll('task').then(resp => {
      resp.forEach((task, i) => {
        if(task.completed) {
          completedTasks+=1;
        } else {
          uncompletedTasks+=1;
        }
      });
      tasks.set('completedTasks',completedTasks);
      tasks.set('uncompletedTasks',uncompletedTasks);
      tasks.save();
    })
    .catch(error => {
    });
    return tasks;
  }
}
